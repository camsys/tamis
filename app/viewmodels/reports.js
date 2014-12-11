define(['plugins/http', 'durandal/app', 'knockout', 'jstree', 'bootstrap', 'datatables', 'jquery-ui', './reportsbase', '../definitions/reportdefs', '../config/appstate', 'plugins/router', '../config/config', './querydescription'],
    function (http, app, ko, jstree, bootstrap, datatables, jqueryui, reportsbase, reportdefs, appstate, router, config, querydescription) {

        return {
            pivotTables: ko.observableArray([]),

            activate: function () {
                var that = this;
                return $.get("assets/json/appstate_q1.json",
                    function (queryData) {
                        var fields = Object.keys(queryData);
                        $.each(fields, function (index, field) {
                            appstate[field] = queryData[field]
                        });

                        that.realactivate();
                    }
                );
            },

            realactivate: function () {
                this.resetObservables();
                var data = appstate.queryResults;
                var queryName = appstate.queryName;
                if (data && queryName) {
                    this.reportdef = $.extend({}, reportdefs[queryName]); //make a local copy of the report def since we'll be modifying it
                    this.configuredReports = [];
                    var that = this;
                    $(Object.keys(that.reportdef)).each(function (index, tabname) {
                        var tabdef = that.reportdef[tabname];
                        if (data[tabdef.dataKey] && data[tabdef.dataKey].length > 0) {
                            var reportObj = that.generateReport(data[tabdef.dataKey], tabdef, index, tabname);
                            var configuredReport =
                            {
                                html: ko.observable(reportObj.html),
                                title: ko.observable(reportObj.title),
                                id: reportObj.id,
                                selectedOrder: ko.observable(reportObj.selectedOrder),
                                levelOrders: reportObj.levelOrders,
                                tabdef: tabdef,
                                rows: data[tabdef.dataKey],
                                index: index,
                                tabname: tabname
                            };
                            that.configuredReports.push(configuredReport);
                        }
                    });
                    this.pivotTables(this.configuredReports);
                } else {
                    app.showMessage(config.noResultsMessage.message, config.noResultsMessage.title).then(function (dialogResult) {
                        router.navigate('queryconfig');
                    });
                    return;
                }
            },

            bindingComplete: function () {
                var rootscope = this;
                $.each(this.configuredReports, function (index, pivotTable) {
                    var selectedOrder = pivotTable.selectedOrder;
                    this.tabindex = index;
                    var that = this;
                    selectedOrder.subscribe(function (newValue) {
                        $.each(that.levelOrders, function (index, levelOrder) {
                            if(levelOrder.name == newValue){
                                that.tabdef.levels = levelOrder.value;
                                var reportObj = rootscope.generateReport(that.rows, that.tabdef, that.index, that.tabname);
                                rootscope.pivotTables()[that.index].html(reportObj.html);
                                rootscope.pivotTables()[that.index].title(reportObj.title);
                            }
                        });
                    });
                });
            },

            resetObservables: function(){
                this.pivotTables([]);
            },

            refreshTables: function(){
                var that = this;
                $.each(this.levelOrders(), function (index, levelOrder) {
                    if(levelOrder.name == that.selectedOrder()){
                        that.reportdef.levels = levelOrder.value;
                    }
                });
            },

            generateReport: function (data, tabdef, id, title) {

                var featureData = data;

                var summaryGrid = {
                    cells: [],
                    add: function (cell) {
                        this.cells.push(cell);
                    }
                }

                var tree = reportsbase.buildTree(featureData, tabdef);

                this.buildTable(tree, summaryGrid, tabdef);  //add the data to the table

                if(tabdef.levels.length > 1) {
                    //now add a summary section below that aggregates by the second dimension
                    var topLevel = tabdef.levels.shift();
                    tree = reportsbase.buildTree(featureData, tabdef);
                    var summaryRoot = {};
                    summaryRoot.level = topLevel;
                    var topleveltitle = tabdef.headers[tabdef.fields.indexOf(topLevel)];
                    topleveltitle = /s$/.test(topleveltitle) ? topleveltitle + "es" : topleveltitle + 's';
                    summaryRoot.text = "All " + topleveltitle;
                    summaryRoot.children = tree;

                    tabdef.levels.unshift(topLevel);  //put the level back in so the column offsets are correct
                    $.each(tabdef.sums, function (index, sum) {
                        $.each(summaryRoot.children, function (index, child) {
                            if (!summaryRoot[sum]) {
                                summaryRoot[sum] = 0;
                            }
                            summaryRoot[sum] = Number(summaryRoot[sum]) + Number(child[sum]);
                        });
                    });
                    this.buildTable([summaryRoot], summaryGrid, tabdef);  //add the data to the table
                }

                var columnCount = tabdef.headers.length;
                var orderTitle = tabdef.levelOrders[0].name;
                if(appstate.queryName == 'Asset Conditions'){
                    orderTitle = orderTitle + ', then by Condition'
                }
                var table = '<p class=\"reportheader\">ADOT&PF ' + title + ' ' + orderTitle;
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
                return {
                    html: table.toString(),
                    title: title,
                    id: "pivotTable-" + id,
                    selectedOrder: tabdef.levelOrders[0],
                    levelOrders: tabdef.levelOrders
                };

            },

            buildTable: function (tree, table, reportdef) {
                var that = this;
                $.each(tree, function (index, node) {
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