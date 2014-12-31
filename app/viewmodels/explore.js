define(['durandal/system', 'plugins/http', 'durandal/app', 'knockout', 'bootstrap', 'jquery-ui', '../config/appstate', 'plugins/router', 'pivottable', './querydescription', '../definitions/reportdefs', '../definitions/tabledefs', '../definitions/pivotdefs', '../definitions/pivotcolumns', '../config/config' /*,'gchart', 'goog!visualization'*/],
    function (system, http, app, ko, bootstrap, jqueryui, appstate, router, pivottable, querydescription, reportdefs, tabledefs, pivotdefs, pivotcolumns, config/*, gchart, google*/) {

        return{
            querydescription: querydescription,
            tabs: null,
            hasCookie: ko.observable(false),
            username: ko.observable(),
            selectedpivots: ko.observable(),

            activate: function () {
                if(!appstate.queryName){
                    app.showMessage(config.noResultsMessage.message, config.noResultsMessage.title).then(function (dialogResult) {
                        router.navigate('queryconfig');
                    });
                    return;
                }
                this.reportdef = reportdefs[appstate.queryName];
                this.pivotdefs = pivotdefs[appstate.queryName];
                var tabs = [];
                var that = this;
                $.each(Object.keys(this.reportdef), function (index, tabname) {
                    if(appstate.queryResults[that.reportdef[tabname].dataKey]){
                        var tabChoices = [];
                        if(that.pivotdefs){
                            $.each(that.pivotdefs[tabname], function (k, v) {
                                tabChoices.push({name: k})
                            });
                        }else{
                            tabChoices = null;
                        }
                        tabs.push({name: tabname, choices: tabChoices, selectedpivot: ko.observable()});
                    }
                });
                this.tabs = tabs;
            },


            bindingComplete: function () {
                var that = this;
                $.each(this.tabs, function (index, tab) {
                    var selectedpivot = tab.selectedpivot;
                    selectedpivot.subscribe(function (newValue) {
                        that.updatepivot(index, tab.name, newValue);
                    });
                });
                this.renderpivots();
            },

            renderpivots: function () {

                var tabledef = tabledefs[appstate.queryName];
                var pivotdef = pivotdefs[appstate.queryName];
                this.rawdata = [];
                var that = this;
                $.each(tabledef.dataKeys, function (index, dataKey) {
                    if(appstate.queryName == 'Unstable Slopes'){
                        if(dataKey == 'RouteFeatureResults'){
                            return;
                        }else{
                            if(index > 0){
                                index--;
                            }
                        }
                    }
                    var sourcedata = appstate.queryResults[dataKey];
                    if(sourcedata){
                        var columndefs = pivotcolumns[dataKey];
                        var labels = {};
                        $.each(columndefs, function (index, columndef) {
                            labels[columndef.data] = columndef.title;
                        });
                        var targetdata = [];
                        $.each(sourcedata, function (index, sourcerow) {
                            var targetrow = {};
                            $.each(labels, function (k, v) {
                                if(typeof(sourcerow[k]) != 'undefined'){
                                    targetrow[v] = sourcerow[k];
                                }
                            });
                            targetdata.push(targetrow);
                        });
                        if(pivotdef){
                            var selectedpivot = Object.keys(pivotdef)[index];
                            var pivotconfig = pivotdef[selectedpivot];
                            pivotconfig = pivotconfig[Object.keys(pivotconfig)[0]]
                            pivotconfig.renderers = that.renderers;
                            pivotconfig.derivedAttributes = that.derivedAttributes;
                        }
                        that.rawdata.push(targetdata);
                        $("#table_" + index).append('<div id="tableholder_' + index + '"></div>');
                        $("#tableholder_" + index).pivotUI(targetdata, pivotconfig);
                    }
                });
            },

            updatepivot: function(index, tabname, selectedpivot){
                var pivotdef = pivotdefs[appstate.queryName];
                var pivotTabDef = pivotdef[tabname];
                var pivotconfig = pivotTabDef[selectedpivot];
                pivotconfig.renderers = this.renderers;
                pivotconfig.derivedAttributes = this.derivedAttributes;
                var data = this.rawdata[index];
                $("#tableholder_" + index).remove();
                $("#table_" + index).append('<div id="tableholder_' + index + '"></div>');
                $("#tableholder_" + index).pivotUI(data, pivotconfig);
            },

            print: function () {
                var printOutput = $('<div></div>');

                $('.nav-tabs li > a').each(function (index, tab) {
                    var tabTitle = $(tab).find('span').text();
                    printOutput.append('<div class="chart-printout">' + tabTitle + '</div>');
                    var chartDivId = tab.href.split('#')[1];
                    $('#' + chartDivId).find('.pvtRendererArea').each(function (index, chartContainer) {
                        printOutput.append($(chartContainer).clone());
                    });
                });

                var popupWin = window.open('', '_blank', 'width=800,height=600');
                popupWin.document.open()
                popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="css/print.css" /></head><body onload="window.print()">' + printOutput.html() + '</html>');
                popupWin.document.close();
            },

        };


    });