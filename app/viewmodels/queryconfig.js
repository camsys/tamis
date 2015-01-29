define(['plugins/http', 'durandal/app', 'knockout', 'jstree', 'bootstrap', 'jquery-ui',
        '../config/config', '../config/appstate', 'plugins/router', '../definitions/tabledefs', './categoryselector',
        './geoselector', './assetselector', './routeselector', './slopeselector',  '../services/dataservice', '../config/helper'],
    function (http, app, ko, jstree, bootstrap, jqueryui,
              config, appstate, router, tabledefs, categoryselector, geoselector,
              assetselector, routeselector, slopeselector, dataservice, helper) {

        return {
            geoselector: geoselector,
            assetselector: assetselector,
            routeselector: routeselector,
            slopeselector: slopeselector,
            categoryselector: categoryselector,
            displayName: 'Query Configuration',
            queries: [
                {name: "Assets", value: "Assets", id: 1},
                {name: "Asset Conditions", value: "Asset Conditions", id: 2},
                {name: "Conditions of Specified Road / CDS", value: "Conditions of Specified Road / CDS", id: 3},
                {name: "Crash Analysis", value: "Crash Analysis", id: 4},
                {name: "Unstable Slopes", value: "Unstable Slopes", id: 5},
            ],
            selectedQuery: ko.observable(),
            queryComplete: false,
            queryId: null,

            resetObservables: function () {
                this.selectedQuery(null);
                this.geoselector.selectedGeographicType(null);
                this.geoselector.useGeographicFilter(null);
                this.geoselector.geoFilters([]);
                this.assetselector.useAssetFilter(null);
                this.assetselector.assetFilters([]);
                this.routeselector.resetObservables();
                this.slopeselector.resetObservables();
            },


            activate: function () {
                if (this.assetselector.assetTreeNodes().length > 0) {
                    this.resetObservables();
                }

                if(typeof(appstate.filterValues) == 'undefined'){
                    return $.when(dataservice.getReferenceData(function (response) {
                        appstate.filterValues = response;
                    }));
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

                if (!this.selectedQuerySub) {
                    this.selectedQuerySub = this.selectedQuery.subscribe(function (newValue) {
                        that.geoselector.selectedGeographicType(null);
                        that.geoselector.useGeographicFilter(null);
                        that.geoselector.geoFilters([]);
                        that.assetselector.useAssetFilter(null);
                        that.assetselector.assetFilters([]);
                        that.assetselector.buildAssetTree(newValue);
                        that.routeselector.resetObservables();
                        that.slopeselector.resetObservables();
                        if(that.categoryselector.queryReady()){
                            that.categoryselector.queryReady("false");
                        }
                        if(that.slopeselector.queryReady()){
                            that.slopeselector.queryReady("false");
                        }
                    });
                }
            },

            executeQuery: function () {

                var that = this;

                var query = $.parseJSON('{"Query":{"DisplayParameters":[],"Selection":1}}');
                query.Query.DisplayParameters = [];

                for(var i = 0; i < this.queries.length; i++){
                    if(this.queries[i].name == this.selectedQuery()){
                        query.Query.Selection = this.queries[i].id;
                    }
                }
                this.queryId = query.Query.Selection;

                var geoParams = this.geoselector.getQueryParams();
                query.Query.DisplayParameters = query.Query.DisplayParameters.concat(geoParams);

                if(this.selectedQuery() == 'Unstable Slopes'){
                    var assetParams = this.slopeselector.getQueryParams();
                    query.Query.DisplayParameters = query.Query.DisplayParameters.concat(assetParams);
                }else{
                    var assetParams = this.assetselector.getQueryParams();
                    query.Query.DisplayParameters = query.Query.DisplayParameters.concat(assetParams);
                }

                if(this.selectedQuery() == 'Crash Analysis'){
                    var categoryParams = this.categoryselector.getQueryParams();
                    query.Query.DisplayParameters = query.Query.DisplayParameters.concat(categoryParams);
                }

                if(this.routeselector.selectedCds()){
                    var cds = this.routeselector.selectedCds();
                    query = $.parseJSON('{"Query":{"DisplayParameters":[{"Name":"Jurisdictions","Selected":true,"RouteParameters":[{"Id":""}]},{"Name":"Roads","Selected":true,"AreaParameter":null,"FilterParameters":[{"Type":"NHSBoolean","Description":"Class","Filters":[],"MaxValues":0,"Selected":true}],"RouteParameters":[{"Id":""}]},{"Name":"Bridges","Selected":true,"AreaParameter":null,"FilterParameters":[{"Type":"NHSBoolean","Description":"Class","Filters":[],"MaxValues":0,"Selected":true}],"RouteParameters":[{"Id":""}]}],"Selection":3}}');
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

                if(this.queryId != 3){
                    $.each(appstate.queryResults, function (k, v) {
                        layerMap[k] = null;
                    });
                    layerMap.geography = null;

                    dataservice.getGeoPolygons(this.geoselector.getQueryParams(), that.createCallback(layerMap, 'geography', that));
                }

                this.hasResults = false;
                $.each(appstate.queryResults, function (k, v) {
                    var results = v;
                    var objectIds = [];
                    $(results).each(function (index, row) {
                        objectIds.push(row.ObjectId);
                    });
                    if(objectIds.length > 0){
                        that.hasResults = true;
                        dataservice.getFeatures(that.selectedQuery(), k, objectIds.join(), that.createCallback(layerMap, k, that));
                    }
                });
            },

            createCallback: function(layerMap, k, that) {
                return function (data) {

                    layerMap[k] = JSON.parse(data);

                    var allLayersReady = true;
                    $.each(appstate.queryResults, function (k, v) {
                        var layer = layerMap[k];
                        if(!layer && appstate.queryResults[k].length > 0){
                            allLayersReady = false;
                        }
                    });

                    if(typeof(layerMap.geography) != 'undefined' && layerMap.geography == null){
                        allLayersReady = false;
                    }

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

                        $.each(appstate.queryResults[this], function (index, feature) {
                            helper.processFeature(feature);
                        });

                        hasResults = true;
                    }else{
                        delete appstate.queryResults[this];
                        delete appstate.layerMap[this];
                    }
                })
                if (hasResults == false) {
                    app.showMessage(config.emptyResultsMessage.message, config.emptyResultsMessage.title);
                } else {
                    console.log(JSON.stringify(appstate));
                    router.navigate('queryresults');
                }
            },

            createQueryDescription: function () {
                var queryDescription = {};
                queryDescription.queryName = this.selectedQuery();
                queryDescription.criteria = [];
                if(this.geoselector.selectedGeographicTypeDisplay()){
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
                }

                if(this.assetselector.useAssetFilter()){
                    queryDescription.criteria.push({
                        name: "Asset Filter",
                        value: this.assetselector.useAssetFilter() == 'false' ? "None" :
                            $.map(this.assetselector.assetFilters(), function (filter) {
                                return filter.text;
                            }).join(", ")
                    });
                }

                if(this.routeselector.routeName()){
                    queryDescription.criteria.push({
                        name: "Route Name",
                        value: this.routeselector.routeName()
                    });

                    queryDescription.criteria.push({
                        name: "CDS",
                        value: this.routeselector.selectedCds()
                    });
                }

                if(this.slopeselector.aadtFilter()){
                    queryDescription.criteria.push({
                        name: "AADT Filter",
                        value: this.slopeselector.aadtFilter()
                    });
                }

                if(this.slopeselector.scoreFilter()){
                    queryDescription.criteria.push({
                        name: "Hazard Score Filter",
                        value: this.slopeselector.scoreFilter()
                    });
                }

                if(this.slopeselector.mitigationNotPresentFilter() && this.slopeselector.mitigationNotPresentFilter() == 'true'){
                    queryDescription.criteria.push({
                        name: "Showing only slopes where mitigation NOT present",
                        value: ''
                    });
                }

                if(this.categoryselector.categoryFilters().length > 0){
                    $.each(this.categoryselector.categoryFilters(), function (k, v) {
                        queryDescription.criteria.push({
                            name: "Category Filter",
                            value: v.text
                        });
                    });
                }

                return queryDescription;
            }
        };
    });