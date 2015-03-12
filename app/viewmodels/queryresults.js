define(['plugins/http', 'durandal/app', 'knockout', 'jquery-ui', 'datatables', '../config/appstate', 'plugins/router', '../definitions/tabledefs', '../config/config', './querydescription', '../services/dataservice'],
    function (http, app, ko, jqueryui, datatables, appstate, router, tabledefs, config, querydescription, dataservice) {

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
                            table.columnDefs = tabledef.columnDefs[dataKey];
                            table.id = index;
                            $(table.data).each(function (index, row) {
                                row.id = (((1+Math.random())*0x10000)|0).toString(16).substring(1);
                                $.each(Object.keys(row), function (k, v){
                                    var value = row[v];
                                    if(typeof(value) == 'string'){
                                        if(value.indexOf(',') > -1){
                                            return true;
                                        }
                                        if(value.indexOf('>') > -1){
                                            return true;
                                        }
                                        if(value.indexOf('-') > -1){
                                            return true;
                                        }
                                        if(value.indexOf('+') > -1){
                                            return true;
                                        }
                                        if(value.indexOf('') > -1){
                                            return true;
                                        }
                                    }
                                    var number = parseFloat(value);
                                    if(!isNaN(number)){
                                        row[v] = parseFloat(number.toFixed(4));
                                    }
                                });
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
                $('#mapiframe').load(function() {
                    var parentEvent = jQuery.Event( "loaddata" );
                    parentEvent.labels = {};
                    $.each(appstate.queryResults, function (dataKey, dataSet) {
                        var rowMap = {};
                        $.each(dataSet, function (index, row) {
                            rowMap[row.ObjectId] = row;
                        });

                        var columnDefs = tabledefs[appstate.queryName].columnDefs[dataKey];
                        if(!columnDefs){
                            return;
                        }
                        parentEvent.labels[dataKey] = columnDefs;

                        var layer = appstate.layerMap[dataKey];
                        if(layer){
                            $.each(layer.features, function (index, feature) {
                                if(rowMap[feature.attributes.OBJECTID]){
                                    var row = rowMap[feature.attributes.OBJECTID];
                                    $.each(columnDefs, function (index, columnDef) {
                                        feature[columnDef.title] = row[columnDef.data];
                                    });
                                    $.each(Object.keys(row), function (index, attr) {
                                        feature[attr] = row[attr];
                                    });
                                    if(typeof(feature.aadtbin) != 'undefined'){
                                        feature['AADT Summary'] = feature.aadtbin;
                                    }
                                    if(typeof(feature.riskbucket) != 'undefined'){
                                        feature['Risk Score'] = feature.riskbucket;
                                    }
                                    if(typeof(feature.totalscorebucket) != 'undefined'){
                                        feature['Total Score'] = feature.totalscorebucket;
                                    }
                                    if(typeof(feature.hazardscorebin) != 'undefined'){
                                        feature['Hazard Score'] = feature.hazardscorebin;
                                    }
                                    if(typeof(feature.weightedtotalbin) != 'undefined'){
                                        feature['Weighted Total'] = feature.weightedtotalbin;
                                    }
                                    if(typeof(feature.RoughnessSummary) != 'undefined'){
                                        feature['Roughness Summary'] = feature.RoughnessSummary;
                                    }
                                    feature.id = row.id;
                                    feature.dataKey = dataKey;
                                }
                            });
                        }else{
                            delete appstate.layerMap[dataKey];
                        }
                    });
                    parentEvent.layers = appstate.layerMap;
                    parentEvent.queryName = appstate.queryName
                    parentEvent.tableDefs = tabledefs;
                    $( "body" ).trigger( parentEvent );
                });
                var that = this;
                $(this.configuredTables()).each(function (index, table) {

                    var dataTable = $('#' + table.id + '_table').dataTable({
                        "aoColumnDefs": [
                            { "sWidth": "10%", "aTargets": [ -1 ] }
                        ],
                        "data": table.data,
                        "columns": table.columnDefs,
                        "drawCallback": function( settings ) {
                            that.fixFooterHeight();
                        }
                    });

                    $(dataTable).on('click', 'tr', function () {
                        if ($(this).hasClass('selected')) {
                            $(this).removeClass('selected');
                        }
                        else {
                            dataTable.$('tr.selected').removeClass('selected');
                            $(this).addClass('selected');
                            var rowData = dataTable.fnGetData( this );
                            if(rowData){
                                var parentEvent = jQuery.Event( "rowselect" );
                                parentEvent.rowData = rowData;
                                $( "body" ).trigger( parentEvent );
                            }
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
                this.fixFooterHeight();
            },

            fixFooterHeight: function() {
                var footerTop = $('#mapheight').height() + $('header').height();
                $("#stickyfooter").css('top', footerTop + 'px');
            },

            canDeactivate: function () {
                $("#stickyfooter").css('top', '');
                return true;
            },
        };
    });