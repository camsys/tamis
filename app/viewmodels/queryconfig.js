define(['plugins/http', 'durandal/app', 'knockout', 'jstree', 'bootstrap', 'jquery-ui',
        '../config/config', '../config/appstate', 'plugins/router', '../definitions/tabledefs', './geoselector', './assetselector'],
    function (http, app, ko, jstree, bootstrap, jqueryui,
              config, appstate, router, tabledefs, geoselector, assetselector) {

        return {
            geoselector: geoselector,
            assetselector: assetselector,
            displayName: 'Query Configuration',
            queries: [
                {name: "Assets", value: "Assets"},
            ],
            selectedQuery: ko.observable(),
            queryComplete: false,

            resetObservables: function () {
                this.selectedQuery(null);
                this.geoselector.selectedGeographicType(null);
                this.geoselector.useGeographicFilter(null);
                this.geoselector.geoFilters([]);
                this.assetselector.useAssetFilter(null);
                this.assetselector.assetFilters([]);
            },


            activate: function () {

                if(this.assetselector.assetTreeNodes().length > 0){
                    this.resetObservables();
                    return;
                }

            },

            canDeactivate: function () {
                if(this.selectedQuery() && !this.queryComplete){
                    var title = 'Confirm';
                    var msg = 'Do you want to leave this page and abandon your changes?';
                    return app.showMessage(msg, title, ['Yes', 'No'])
                        .then(function (selectedOption) {
                            return selectedOption === 'Yes';
                        });
                } else {
                    return true;
                };
            },

            bindingComplete: function () {

                this.queryComplete = false;
                var that = this;

                $('#assetTree').jstree({'plugins': ["checkbox"], 'core': {
                    'data': that.assetTreeNodes()
                }}).on('changed.jstree', function (e, data) {
                    that.updateAssetSelection(e, data)
                });

                this.selectedQuery.subscribe(function (newValue) {
                    that.geoselector.selectedGeographicType(null);
                    that.geoselector.useGeographicFilter(null);
                    that.geoselector.geoFilters([]);
                    that.useAssetFilter(null);
                    that.assetFilters([]);
                });

                this.useAssetFilter.subscribe(function (newValue) {
                    var oldValue = that.useAssetFilter();
                    if (oldValue) {
                        $("#assetTree").jstree("uncheck_all", true);
                    }
                }, null, "beforeChange");
            },

            updateAssetSelection: function (e, data) {
                this.values = $("#assetTree").jstree("get_checked", {full: true}, true);
                //if a root node is checked, the child nodes are all included in the values array along with the parent
                if (this.values.length > 0) {
                    this.parentNodeIds = [];
                    this.filteredValues = [];
                    var that = this;
                    $(this.values).each(function (index, node) {
                        if (!node.original.parentId) {
                            that.parentNodeIds.push(node.original.text);
                            that.filteredValues.push(node); //this is a root, it has no parent id
                        }
                    });

                    $(this.values).each(function (index, node) {
                        if (node.original.parentId) {
                            if (that.parentNodeIds.indexOf(node.original.parentId) == -1) {
                                that.filteredValues.push(node); //this is a child, and the root wasn't selected, so include it
                            }
                        }
                    });
                    this.assetFilters(this.filteredValues);
                } else {
                    this.assetFilters([]);
                }
            },

            executeQuery: function () {


                var selectedGeographicType = this.geoselector.selectedGeographicType();
                var useGeographicFilter = this.geoselector.useGeographicFilter();
                var geoFilters = this.geoselector.geoFilters();
                var useAssetFilter = this.assetselector.useAssetFilter();
                var assetFilters = this.assetselector.assetFilters();

                var geoParameter = {};
                geoParameter.Name = 'Jurisdictions';
                geoParameter.Selected = true;
                geoParameter.AreaParameter = {};
                geoParameter.AreaParameter.Type = selectedGeographicType;
                geoParameter.FilterParameters = [];

                //only filter by geography if the user selected to use a filter AND the geo selection is not the 'All' option
                var geoValuesToSubmit = [];
                if (useGeographicFilter == "true" && (geoFilters.length > 1 || geoFilters[0].original.parentId)) {
                    //user selected to filter by geo AND didn't select the 'All' option
                    geoValuesToSubmit = $.map(geoFilters, function (geoFilter, index) {
                        return {Value: geoFilter.original.selectionId, Name: geoFilter.original.text};
                    });
                } else {
                    //send all the child IDs of whatever Geo Type was selected;
                    geoValuesToSubmit = $.map(this.geoselector.geoTreeNode.children, function (child, index) {
                        return {Value: child.selectionId, Name: child.text};
                    });
                }

                geoParameter.AreaParameter.Areas = geoValuesToSubmit;

                var bridgeAssetValuesToSubmit = [];
                var roadAssetValuesToSubmit = [];
                if (useAssetFilter == "true") {
                    var that = this;
                    $(assetFilters).each(function (index, node) {
                        if (node.original.parentId) {
                            var assetFilterNode = {Value: node.original.selectionId, Name: node.original.text};
                            if (node.original.parentId.indexOf('Road') > -1) {
                                roadAssetValuesToSubmit.push(assetFilterNode);  //node is a child of All Roads
                            } else {
                                bridgeAssetValuesToSubmit.push(assetFilterNode);  //node is a child of All Bridges
                            }
                        } else {
                            if (node.text.indexOf('Road') > -1) {
                                //All Roads, include all discrete values
                                roadAssetValuesToSubmit = node.original.types;
                            }
                            if (node.text.indexOf('Bridge') > -1) {
                                //All Bridges, include all discrete values
                                bridgeAssetValuesToSubmit = node.original.types;
                            }
                        }
                    });
                } else {
                    //not using any filter, include all discrete values for all asset types
                    $(this.assetselector.assetTreeNodes()).each(function (index, node) {
                        if (node.text.indexOf('Road') > -1) {
                            roadAssetValuesToSubmit = $.map(node.children, function (child, index) {
                                return {Value: child.selectionId, Name: child.text};
                            });
                        }
                        if (node.text.indexOf('Bridge') > -1) {
                            bridgeAssetValuesToSubmit = $.map(node.children, function (child, index) {
                                return {Value: child.selectionId, Name: child.text};
                            });
                        }
                    });
                }

                var query = $.parseJSON('{"Query":{"DisplayParameters":[],"Selection":1}}');
                query.Query.DisplayParameters = [];
                query.Query.DisplayParameters.push(geoParameter);

                if (bridgeAssetValuesToSubmit.length > 0) {
                    var bridgeParameter = {};
                    bridgeParameter.Name = 'Bridges';
                    bridgeParameter.Selected = true;
                    bridgeParameter.AreaParameter = null;
                    bridgeParameter.FilterParameters = [];
                    bridgeParameter.FilterParameters.push({Type: "NHSBoolean", Description: "Class", Filters: bridgeAssetValuesToSubmit});
                    query.Query.DisplayParameters.push(bridgeParameter);
                }

                if (roadAssetValuesToSubmit.length > 0) {
                    var roadParameter = {};
                    roadParameter.Name = 'Roads';
                    roadParameter.Selected = true;
                    roadParameter.AreaParameter = null;
                    roadParameter.FilterParameters = [];
                    roadParameter.FilterParameters.push({Type: "NHSBoolean", Description: "Class", Filters: roadAssetValuesToSubmit});
                    query.Query.DisplayParameters.push(roadParameter);
                }

                var postBody = {};
                postBody.serializedQueryParameters = JSON.stringify(query);
                var that = this;
                appstate.querydescription = this.createQueryDescription();
                if(config.runQueryUrl ==  'test'){
                    $.get("assets/json/results_big.json",
                        function (queryData) {

                            appstate.queryResults = queryData;
                            appstate.queryName = 'Assets';
                            appstate.querydescription = JSON.parse('{"queryName":"Assets","criteria":[{"name":"Geographic Definition","value":"Regions"},{"name":"Geographic Filter","value":"CENTRAL REGION, SOUTHEAST REGION"},{"name":"Asset Filter","value":"Bridge Assets"}]}');
                            that.queryComplete = true;
                            that.validateResponse();
                        }
                    );
                }else{
                    $.ajax({
                        type: "POST",
                        crossDomain: true,
                        url: config.runQueryUrl,
                        data: postBody,
                        beforeSend: function () {
                            $('#modal').show();
                        },
                        complete: function () {
                            $('#modal').hide();
                        },
                        success: function (data) {
                            appstate.queryName = 'Assets';
                            appstate.queryResults = $.parseJSON(data);
                            that.queryComplete = true;
                            that.validateResponse();
                        },
                        error: function (data) {
                            alert("Error querying server")
                        }

                    });
                }
            },

            validateResponse: function () {
                var tabledef = tabledefs[appstate.queryName];
                var hasResults = false;
                $(tabledef.dataKeys).each(function () {
                    if (appstate.queryResults[this] && appstate.queryResults[this].length > 0) {
                        hasResults = true;
                        return false; //break
                    }
                })
                if (hasResults == false) {
                    app.showMessage(config.noResultsMessage.message, config.noResultsMessage.title);
                } else {
                    router.navigate('queryresults');
                }
            },

            createQueryDescription: function(){
                var queryDescription = {};
                queryDescription.queryName = this.selectedQuery();
                queryDescription.criteria = [];
                queryDescription.criteria.push({name: "Geographic Definition", value: this.geoselector.selectedGeographicTypeDisplay()});
                queryDescription.criteria.push({name: "Geographic Filter",
                    value: this.geoselector.useGeographicFilter() == 'false' ? "None" :
                        $.map(this.geoselector.geoFilters(), function (filter) {
                            return filter.text;
                        }).join(", ")
                });
                queryDescription.criteria.push({name: "Asset Filter",
                    value: this.assetselector.useAssetFilter() == 'false' ? "None" :
                        $.map(this.assetselector.assetFilters(), function (filter) {
                            return filter.text;
                        }).join(", ")
                });
                return queryDescription;
            }
        };
    });