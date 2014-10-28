define(['plugins/http', 'durandal/app', 'knockout', 'jquery-ui', 'datatables', '../config/appstate', 'plugins/router', '../definitions/tabledefs', '../config/config', './querydescription', 'dojo', 'esri', 'map'],
    function (http, app, ko, jqueryui, datatables, appstate, router, tabledefs, config, querydescription, dojo, esri, map) {

        return {

            querydescription: querydescription,
            displayName: 'Query Results',
            configuredTables: ko.observableArray([]),

            activate: function () {
                var data = appstate.queryResults;
                var queryName = appstate.queryName;
                var configuredTables = [];
                if (data && queryName) {
                    var tabledef = tabledefs[queryName];
                    $(tabledef.tabs).each(function (index, tabname) {
                        var dataKey = tabledef.dataKeys[index];
                        if (data[dataKey] && data[dataKey].length > 0) {
                            var table = {};
                            table.title = tabname;
                            table.data = data[dataKey];
                            table.columnDefs = tabledefs[dataKey];
                            table.id = index;
                            configuredTables.push(table);
                        }
                    });
                }
                if (configuredTables.length < 1) {
                    app.showMessage(config.noResultsMessage.message, config.noResultsMessage.title).then(function (dialogResult) {
                        router.navigate('queryconfig');
                    });
                    return;
                }
                this.configuredTables(configuredTables);

            },

            bindingComplete: function () {

                $(this.configuredTables()).each(function (index, table) {

                    $('#' + table.id + '_table').dataTable({
                        "aoColumnDefs": [
                            { "sWidth": "10%", "aTargets": [ -1 ] }
                        ],
                        "data": table.data,
                        "columns": table.columnDefs
                    });
                });

                $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                    var table = $.fn.dataTable.fnTables(true);
                    if (table.length > 0) {
                        $(table).dataTable().fnAdjustColumnSizing();
                    }
                });
            },

            compositionComplete: function () {
                $('a[data-toggle="tab"]:first').trigger("shown.bs.tab");

                dojo.require("esri.map");
                dojo.require("esri.geometry.jsonUtils");
                dojo.require("esri.utils");
                dojo.require("esri.layers.FeatureLayer");
                dojo.require("esri.layers.graphics");
                dojo.require("esri.dijit.BasemapGallery");
                dojo.require("esri.dijit.Legend");
                dojo.require("esri.toolbars.draw");
                dojo.require("esri.toolbars.edit");
                dojo.require("esri.tasks.PrintTask");
                dojo.require("esri.tasks.query");
                dojo.require("esri.tasks.geometry");
                dojo.require("esri.tasks.identify");
                dojo.require("esri.dijit.Scalebar");
                dojo.require("dojo.io.script");

                dojo.addOnLoad(function() {
                    tamis.Map.initializeMap();
                });

            },

            showWarning: function (message) {
                $("#div-dialog-warning-message").html(message)
                $("#div-dialog-warning").dialog({
                    buttons: {
                        "Ok": function () {
                            $(this).dialog("close");
                        }
                    },
                    dialogClass: "error",
                    modal: true,
                    resizable: false,
                    title: 'Error'
                });
            },
        };
    });