define(['plugins/http', 'durandal/app', 'knockout', 'jquery-ui', 'datatables', '../config/appstate', 'plugins/router', '../definitions/tabledefs', '../config/config', './querydescription'],
    function (http, app, ko, jqueryui, datatables, appstate, router, tabledefs, config, querydescription) {

        return {

            querydescription: querydescription,
            displayName: 'Query Results',
            configuredTables: ko.observableArray([]),

            activate: function () {
                var that = this;
                $.get("assets/json/mapdata.json",
                    function (queryData) {

                        var data = {};
                        data.BridgeFeatureResults = queryData.BridgeFeatureResults;
                        appstate.queryResults = queryData;
                        appstate.queryName = 'Assets';
                        appstate.querydescription = JSON.parse('{"queryName":"Assets","criteria":[{"name":"Geographic Definition","value":"Regions"},{"name":"Geographic Filter","value":"CENTRAL REGION, SOUTHEAST REGION"},{"name":"Asset Filter","value":"Bridge Assets"}]}');

                        that.realactivate();
                    }
                );
            },

            realactivate: function () {
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
                            $(table.data).each(function (index, row) {
                                row.id = (((1+Math.random())*0x10000)|0).toString(16).substring(1);
                            });
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

                var parentEvent = jQuery.Event( "loaddata" );
                parentEvent.queryResults = appstate.queryResults;
                parentEvent.labels = {};

                $('#mapiframe').load(function() {
                    $.each(parentEvent.queryResults, function( k, v ) {
                        var columnDefs = tabledefs[k];
                        parentEvent.labels[k] = columnDefs;
                    });
                    $( "body" ).trigger( parentEvent );
                });

                $(this.configuredTables()).each(function (index, table) {

                    var dataTable = $('#' + table.id + '_table').dataTable({
                        "aoColumnDefs": [
                            { "sWidth": "10%", "aTargets": [ -1 ] }
                        ],
                        "data": table.data,
                        "columns": table.columnDefs
                    });

                    $(dataTable).on('click', 'tr', function () {
                        if ($(this).hasClass('selected')) {
                            $(this).removeClass('selected');
                        }
                        else {
                            dataTable.$('tr.selected').removeClass('selected');
                            $(this).addClass('selected');
                            var rowData = dataTable.fnGetData( this );
                            var parentEvent = jQuery.Event( "rowselect" );
                            parentEvent.rowData = rowData;
                            $( "body" ).trigger( parentEvent );
                        }
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

                var footerTop = $('#mapheight').height() + $('header').height();
                $("#stickyfooter").css('top', footerTop + 'px');

            },

            canDeactivate: function () {
                $("#stickyfooter").css('top', '');
                return true;
            },
        };
    });