define(['plugins/http', 'durandal/app', 'knockout', 'jstree', 'bootstrap', 'datatables', 'jquery-ui', './reportsbase', '../definitions/reportdefs', '../config/appstate', 'plugins/router', '../config/config', './querydescription'],
    function (http, app, ko, jstree, bootstrap, datatables, jqueryui, reportsbase, reportdefs, appstate, router, config, querydescription) {

        return {
            querydescription: querydescription,
            pivotTables: ko.observableArray([]),
            levelOrders: ko.observableArray([]),
            selectedOrder: ko.observable(),
            reportdef:null,
            configuredReports: [],

            activate: function () {
                this.resetObservables();
                var data = appstate.queryResults;
                var queryName = appstate.queryName;

                if (data && queryName) {
                    this.reportdef = $.extend({}, reportdefs[queryName]); //make a local copy of the report def since we'll be modifying it
                    if(this.reportdef.levelOrders && this.reportdef.levelOrders.length > 0){
                        this.selectedOrder(this.reportdef.levelOrders[0].name); //set default
                        this.levelOrders(this.reportdef.levelOrders);
                    }
                    this.selectedOrder.subscribe(function (newValue) {
                        that.refreshTables();
                    });
                    var that = this;
                    $(this.reportdef.tabs).each(function (index, tabname) {
                        var dataKey = that.reportdef.dataKeys[index];
                        if (data[dataKey] && data[dataKey].length > 0) {
                            var report = {};
                            report.title = tabname;
                            report.data = data[dataKey];
                            report.id = index;
                            that.configuredReports.push(report);
                        }
                    });
                    this.selectReport();
                } else {
                    app.showMessage(config.noResultsMessage.message, config.noResultsMessage.title).then(function (dialogResult) {
                        router.navigate('queryconfig');
                    });
                    return;
                }
            },

            resetObservables: function(){
                this.pivotTables([]);
                this.levelOrders([]);
                this.selectedOrder(null);
                this.reportdef = null,
                this.configuredReports = [];
            },

            refreshTables: function(){
                var that = this;
                $.each(this.levelOrders(), function (index, levelOrder) {
                    if(levelOrder.name == that.selectedOrder()){
                        that.reportdef.levels = levelOrder.value;
                    }
                });
                this.selectReport();
            },

            selectReport: function () {

                var that = this;
                that.pivotTablesArray = [];
                $.each(that.configuredReports, function (index, report) {

                    var featureData = report.data;

                    var summaryGrid = {
                        cells: [],
                        add: function (cell) {
                            console.log(JSON.stringify(cell))
                            this.cells.push(cell);
                        }
                    }

                    var tree = reportsbase.buildTree(featureData, that.reportdef);

                    that.buildTable(tree, summaryGrid, that.reportdef);  //add the data to the table

                    if(that.reportdef.levels.length > 1) {
                        //now add a summary section below that aggregates by the second dimension
                        var topLevel = that.reportdef.levels.shift();
                        tree = reportsbase.buildTree(featureData, that.reportdef);
                        var summaryRoot = {};
                        summaryRoot.level = topLevel;
                        var topleveltitle = that.reportdef.headers[that.reportdef.fields.indexOf(topLevel)];
                        topleveltitle = /s$/.test(topleveltitle) ? topleveltitle + "es" : topleveltitle + 's';
                        summaryRoot.text = "All " + topleveltitle;
                        summaryRoot.children = tree;

                        that.reportdef.levels.unshift(topLevel);  //put the level back in so the column offsets are correct
                        $.each(that.reportdef.sums, function (index, sum) {
                            $.each(summaryRoot.children, function (index, child) {
                                if (!summaryRoot[sum]) {
                                    summaryRoot[sum] = 0;
                                }
                                summaryRoot[sum] = Number(summaryRoot[sum]) + Number(child[sum]);
                            });
                        });
                        that.buildTable([summaryRoot], summaryGrid, that.reportdef);  //add the data to the table
                    }

                    var columnCount = that.reportdef.headers.length;
                    var table = '<p class=\"reportheader\">ADOT&PF ' + report.title + ' ' + that.selectedOrder();//' By ' + that.reportdef.headers[0] + ', Then By ' + that.reportdef.headers[1];
                    table = table.concat('<table class="gridtable"><tbody><tr>');
                    var rowcount = 0;
                    $.each(summaryGrid.cells, function (index, cell) {
                        table = table.concat('<td'
                            + (cell.cellCls ? ' class=' + cell.cellCls : '')
                            + (cell.colspan ? ' colspan=' + cell.colspan : '') + '>'
                            + (cell.html ? cell.html.toString() : '&nbsp;') + '</td>');
                        rowcount = rowcount + (cell.colspan ? cell.colspan : 1);
                        if (rowcount % columnCount == 0) {
                            table = table.concat('</tr><tr>');
                            rowcount = 0;
                        }
                    });

                    table.concat('</tr></tbody></table>');
                    var pivotTable = {};
                    pivotTable.html = table.toString()
                    pivotTable.title = that.reportdef.tabs[index];
                    pivotTable.id = "pivotTable-" + index;
                    that.pivotTablesArray.push(pivotTable);
                });

                this.pivotTables(this.pivotTablesArray);

            },

            buildTable: function (tree, table, reportdef) {
                var that = this;
                $.each(tree, function (index, node) {
                    if (!node.text) {
                        console.log(node);
                    }
                    var levelIndex = reportdef.levels.indexOf(node.level);

                    //pad the left level columns with empty cells
                    for (i = 0; i < levelIndex; i++) {
                        table.add({
                            html: "&nbsp;"
                        });
                    }

                    if (levelIndex < reportdef.levels.length - 1) {
                        //add a level header row
                        table.add({
                            html: node.text,
                            cellCls: 'header',
                            colspan: reportdef.fields.length - levelIndex
                        });
                    } else {
                        //bottom level
                        table.add({
                            html: node.text
                        });
                        $.each(reportdef.fields, function (index, field) {
                            if (reportdef.levels.indexOf(field) == -1) {


                                if (reportdef.sums.indexOf(field) > -1 && node[field] == null) {
                                    value = 0;
                                } else {
                                    var value = node[field] == null ? "&nbsp;" : node[field];
                                }

                                if (typeof value == 'number') {
                                    value = value.toFixed(2);
                                }
                                table.add({
                                    html: value.toString()
                                });
                            }

                        });
                    }

                    if (node.level && reportdef.levels.indexOf(node.level) < reportdef.levels.length - 1) {
                        if (reportdef.levels.indexOf(node.level) == reportdef.levels.length - 2) {
                            //add subheader above detail rows
                            for (i = 0; i < levelIndex + 1; i++) {
                                table.add({
                                    html: "&nbsp;"
                                });
                            }
                            table.add({
                                html: reportdef.headers[levelIndex + 1],
                                colspan: reportdef.levels.length - levelIndex - 1,
                                cellCls: 'header'
                            });
                            for (i = reportdef.levels.length; i < reportdef.headers.length; i++) {
                                table.add({
                                    html: reportdef.headers[i],
                                    cellCls: 'header'
                                });
                            }

                            that.buildTable(node.children, table, reportdef);

                            var parentText = node.text;
                            var parent = node.parent;
                            while (parent != null && parent.text != null) {
                                parentText = parent.text;
                                parent = parent.parent;
                            }

                            //add subtotal row
                            for (i = 0; i < levelIndex + 1; i++) {
                                table.add({
                                    html: "&nbsp;"
                                });
                            }
                            table.add({
                                html: parentText.indexOf('All') == 0 ? "Total" : "Subtotal",
                                cellCls: 'subtotal'
                            });
                            $.each(reportdef.fields, function (index, field) {
                                if (reportdef.levels.indexOf(field) == -1) {

                                    var value = node[field] == null ? "&nbsp;" : node[field];
                                    if (typeof value == 'number') {
                                        value = value.toFixed(2);
                                    }
                                    table.add({
                                        html: value.toString(),
                                        cellCls: 'subtotal'
                                    });
                                }
                            });
                        } else {
                            that.buildTable(node.children, table, reportdef);
                        }
                    }
                });
            },

            print: function () {
                var printOutput = $('<div></div>');
                $('.nav-tabs li > a').each(function (index, tab) {
                    var tabTitle = $(tab).find('span').text();
                    var chartDivId = tab.href.split('#')[1];
                    var reportNode = $('#' + chartDivId).clone();
                    $(reportNode).show();
                    printOutput.append(reportNode);
                });

                var popupWin = window.open('', '_blank', 'width=800,height=600');
                popupWin.document.open()
                popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printOutput.html() + '</html>');
                popupWin.document.close();
            },

        };


    });