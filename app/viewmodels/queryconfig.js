define(['plugins/http', 'durandal/app', 'knockout', 'jstree', 'bootstrap', 'jquery-ui',
        '../config/config', '../config/appstate', 'plugins/router', '../definitions/tabledefs', './geoselector', './assetselector', './routeselector',  '../services/dataservice'],
    function (http, app, ko, jstree, bootstrap, jqueryui,
              config, appstate, router, tabledefs, geoselector,
              assetselector, routeselector, dataservice) {

        return {
            geoselector: geoselector,
            assetselector: assetselector,
            routeselector: routeselector,
            displayName: 'Query Configuration',
            queries: [
                {name: "Assets", value: "Assets"},
                {name: "Asset Conditions", value: "Asset Conditions"},
                {name: "Conditions for Specified Section of Roadway", value: "Conditions for Specified Section of Roadway"},
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
                this.routeselector.resetObservables();
            },


            activate: function () {

                if (this.assetselector.assetTreeNodes().length > 0) {
                    this.resetObservables();
                    return;
                }

            },

            canDeactivate: function () {
                if (this.selectedQuery() && !this.queryComplete) {
                    var title = 'Confirm';
                    var msg = 'Do you want to leave this page and abandon your changes?';
                    return app.showMessage(msg, title, ['Yes', 'No'])
                        .then(function (selectedOption) {
                            return selectedOption === 'Yes';
                        });
                } else {
                    return true;
                }
                ;
            },

            bindingComplete: function () {

                this.queryComplete = false;
                var that = this;

                $('#assetTree').jstree({
                    'plugins': ["checkbox"], 'core': {
                        'data': that.assetselector.assetTreeNodes()
                    }
                }).on('changed.jstree', function (e, data) {
                    that.updateAssetSelection(e, data)
                });

                this.selectedQuery.subscribe(function (newValue) {
                    that.geoselector.selectedGeographicType(null);
                    that.geoselector.useGeographicFilter(null);
                    that.geoselector.geoFilters([]);
                    that.assetselector.useAssetFilter(null);
                    that.assetselector.assetFilters([]);
                    that.assetselector.buildAssetTree(newValue);
                    that.routeselector.resetObservables();
                });

                this.useAssetFilter.subscribe(function (newValue) {
                    var oldValue = that.useAssetFilter();
                    if (oldValue) {
                        $("#assetTree").jstree("uncheck_all", true);
                    }
                }, null, "beforeChange");
            },

            executeQuery: function () {

                var that = this;

                var selectedGeographicType = this.geoselector.selectedGeographicType();
                var useGeographicFilter = this.geoselector.useGeographicFilter();
                var geoFilters = this.geoselector.geoFilters();

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
                } else if (selectedGeographicType) {
                    //send all the child IDs of whatever Geo Type was selected;
                    geoValuesToSubmit = $.map(this.geoselector.geoTreeNode.children, function (child, index) {
                        return {Value: child.selectionId, Name: child.text};
                    });
                }

                geoParameter.AreaParameter.Areas = geoValuesToSubmit;

                var query = $.parseJSON('{"Query":{"DisplayParameters":[],"Selection":1}}');
                query.Query.DisplayParameters = [];
                query.Query.DisplayParameters.push(geoParameter);

                for(var i = 0; i < this.queries.length; i++){
                    if(this.queries[i].name == this.selectedQuery()){
                        query.Query.Selection = i + 1;
                    }
                }

                var assetParams = this.assetselector.getQueryParams();
                query.Query.DisplayParameters = query.Query.DisplayParameters.concat(assetParams);

                if(this.routeselector.selectedCds()){
                    var cds = this.routeselector.selectedCds();
                    query = $.parseJSON('{"Query":{"DisplayParameters":[{"Name":"Jurisdictions","Selected":true,"RouteParameters":[{"Id":""}]},{"Name":"Roads","Selected":true,"AreaParameter":null,"FilterParameters":[{"Type":"NHSClass","Description":"Class","Filters":[],"MaxValues":0,"Selected":true}],"RouteParameters":[{"Id":""}]},{"Name":"Bridges","Selected":true,"AreaParameter":null,"FilterParameters":[{"Type":"NHSClass","Description":"Class","Filters":[],"MaxValues":0,"Selected":true}],"RouteParameters":[{"Id":""}]}],"Selection":3}}');
                    query.Query.DisplayParameters[0].RouteParameters[0].Id = cds;
                    query.Query.DisplayParameters[1].RouteParameters[0].Id = cds;
                    query.Query.DisplayParameters[2].RouteParameters[0].Id = cds;
                }


                var postBody = {};
                postBody.serializedQueryParameters = JSON.stringify(query);
                appstate.querydescription = this.createQueryDescription();
                appstate.queryName = this.selectedQuery();
                $.ajax({
                    type: "POST",
                    crossDomain: true,
                    url: config.runQueryUrl,
                    data: postBody,
                    beforeSend: function () {
                        $('#modal').show();
                    },
                    error: function () {
                        alert("Error querying server")
                    },
                    success: function (data) {
                        appstate.queryResults = $.parseJSON(data);
                        that.processResults();
                    }
                });
            },

            processResults: function () {
                var layerMap = {};
                var that = this;

                $.each(appstate.queryResults, function (k, v) {
                    layerMap[k] = null;
                });
                $.each(appstate.queryResults, function (k, v) {
                    var results = v;
                    var objectIds = [];
                    $(results).each(function (index, row) {
                        objectIds.push(row.ObjectId);
                    });
                    dataservice.getFeatures(that.selectedQuery(), k, objectIds.join(), that.createCallback(layerMap, k, that));
                });
            },

            createCallback: function(layerMap, k, that) {
                return function (data) {

                    layerMap[k] = JSON.parse(data);

                    var allLayersReady = true;
                    $.each(appstate.queryResults, function (k, v) {
                        var layer = layerMap[k];
                        if(!layer){
                            allLayersReady = false;
                        }
                    });

                    if(allLayersReady){
                        appstate.layerMap = layerMap;
                        $('#modal').hide();
                        that.queryComplete = true;
                        that.validateResponse();
                    }
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

            createQueryDescription: function () {
                var queryDescription = {};
                queryDescription.queryName = this.selectedQuery();
                queryDescription.criteria = [];
                queryDescription.criteria.push({
                    name: "Geographic Definition",
                    value: this.geoselector.selectedGeographicTypeDisplay()
                });
                queryDescription.criteria.push({
                    name: "Geographic Filter",
                    value: this.geoselector.useGeographicFilter() == 'false' ? "None" :
                        $.map(this.geoselector.geoFilters(), function (filter) {
                            return filter.text;
                        }).join(", ")
                });
                queryDescription.criteria.push({
                    name: "Asset Filter",
                    value: this.assetselector.useAssetFilter() == 'false' ? "None" :
                        $.map(this.assetselector.assetFilters(), function (filter) {
                            return filter.text;
                        }).join(", ")
                });
                return queryDescription;
            }
        };
    });