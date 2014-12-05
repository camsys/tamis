define(['durandal/system', 'plugins/http', 'durandal/app', 'knockout', 'bootstrap', 'jquery-ui', '../config/appstate', 'plugins/router', 'pivottable', './querydescription', '../definitions/reportdefs', '../definitions/tabledefs', '../definitions/pivotdefs', '../config/config' /*,'gchart', 'goog!visualization'*/],
    function (system, http, app, ko, bootstrap, jqueryui, appstate, router, pivottable, querydescription, reportdefs, tabledefs, pivotdefs, config/*, gchart, google*/) {

        return{
            querydescription: querydescription,
            tabs: null,
            hasCookie: ko.observable(false),
            username: ko.observable(),
            selectedpivots: ko.observable(),

            /*activate: function () {

                this.derivedAttributes =  {
                    "Lane Miles": function(row) {
                        if(row["NumberOfLanes"] && mp["Length"]){
                            return row["NumberOfLanes"] * row["Length"]
                        }
                        return 0;
                    }
                };

                if(appstate.queryResults){
                    return;
                }
                this.derivers = $.pivotUtilities.derivers;
                this.renderers = $.extend($.pivotUtilities.renderers, $.pivotUtilities.gchart_renderers);
                var that = this;
                $.get("assets/json/results.json",
                    function (queryData) {

                        appstate.queryResults = queryData;
                        appstate.queryName = 'Assets';
                        appstate.querydescription = JSON.parse('{"queryName":"Assets","criteria":[{"name":"Geographic Definition","value":"Regions"},{"name":"Geographic Filter","value":"CENTRAL REGION, SOUTHEAST REGION"},{"name":"Asset Filter","value":"Bridge Assets"}]}');
                        that.realactivate();
                    }
                );
            },
*/
            activate: function () {
                if(!appstate.queryName){
                    app.showMessage(config.noResultsMessage.message, config.noResultsMessage.title).then(function (dialogResult) {
                        router.navigate('queryconfig');
                    });
                    return;
                }
                var reportdef = reportdefs[appstate.queryName];
                this.pivotdefs = pivotdefs[appstate.queryName];
                var tabs = [];
                var that = this;
                $.each(reportdef.tabs, function (index, tabname) {
                    var tabChoices = [];
                    $.each(that.pivotdefs[tabname], function (k, v) {
                        tabChoices.push({name: k})
                    });
                    tabs.push({name: tabname, choices: tabChoices, selectedpivot: ko.observable()});
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
                    var sourcedata = appstate.queryResults[dataKey];
                    var columndefs = tabledef.columnDefs[dataKey];
                    var labels = {};
                    $.each(columndefs, function (index, columndef) {
                        labels[columndef.data] = columndef.title;
                    });
                    var targetdata = [];
                    $.each(sourcedata, function (index, sourcerow) {
                        var targetrow = {};
                        $.each(labels, function (k, v) {
                            targetrow[v] = sourcerow[k];
                        });
                        targetdata.push(targetrow);
                    });
                    var selectedpivot = Object.keys(pivotdef)[index];
                    var pivotconfig = pivotdef[selectedpivot];
                    pivotconfig = pivotconfig[Object.keys(pivotconfig)[0]]
                    pivotconfig.renderers = that.renderers;
                    pivotconfig.derivedAttributes = that.derivedAttributes;
                    that.rawdata.push(targetdata);
                    $("#table_" + index).append('<div id="tableholder_' + index + '"></div>');
                    $("#tableholder_" + index).pivotUI(targetdata, pivotconfig);
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
            }

        };


    });