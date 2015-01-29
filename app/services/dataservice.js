define(['../config/config'],
    function (config) {
        return {

            getReferenceData : function(callback){

                this.filterValues = {};

                this.sorter = function compare(a,b) {
                    var aName = a.Name.toLowerCase();
                    var bName = b.Name.toLowerCase();
                    if (aName < bName)
                        return -1;
                    if (aName > bName)
                        return 1;
                    return 0;
                }

                var that = this;

                return $.when(
                    that.getRoutes(function (response) {

                        function hasName(element) {
                            return element.Name.replace(/ /g,'').length > 0;
                        }
                        response.RouteList = response.RouteList.filter(hasName);

                        var routeMap = {};
                        for(var i = 0; i < response.RouteList.length; i++){
                            var routeName = response.RouteList[i].Name.replace(/ /g,'').toLowerCase();
                            if(routeMap[routeName]){
                                routeMap[routeName].Id = routeMap[routeName].Id + ',' + response.RouteList[i].Id;
                            }else{
                                routeMap[routeName] = response.RouteList[i];
                            }
                        }

                        var routeList = [];

                        $(Object.keys(routeMap)).each(function (index, key) {
                            routeList.push(routeMap[key]);
                        });
                        routeList.sort(that.sorter);
                        that.filterValues.routes = routeList
                    }),
                    that.getDistricts(function (response) {
                        response.AreaList.sort(that.sorter);
                        that.filterValues.districts = response.AreaList;
                    }),
                    that.getRegions(function (response) {
                        response.AreaList.sort(that.sorter);
                        that.filterValues.regions = response.AreaList;
                    }),
                    that.getAssets(function (response) {
                        response.FilterList.sort(that.sorter);
                        $(response.FilterList).each(function (index, filterValue) {
                            filterValue.type = 'NHSBoolean'
                        });
                        that.filterValues.NHSClass = response.FilterList;
                    }),
                    that.getPavement(function (response) {
                        //response.FilterList.sort(that.sorter);

                        response = {
                            "FilterList": [
                                {
                                    "Value": "Very Good",
                                    "Name": "Very Good",
                                    "NumericValue": 0,
                                    "ComparisonOperator": null
                                },
                                {
                                    "Value": "Good",
                                    "Name": "Good",
                                    "NumericValue": 0,
                                    "ComparisonOperator": null
                                },
                                {
                                    "Value": "Fair",
                                    "Name": "Fair",
                                    "NumericValue": 0,
                                    "ComparisonOperator": null
                                },
                                {
                                    "Value": "Mediocre",
                                    "Name": "Mediocre",
                                    "NumericValue": 0,
                                    "ComparisonOperator": null
                                },

                                {
                                    "Value": "Poor",
                                    "Name": "Poor",
                                    "NumericValue": 0,
                                    "ComparisonOperator": null
                                }
                            ]
                        };
                        $(response.FilterList).each(function (index, filterValue) {
                            filterValue.type = 'PavementCondition'
                        });
                        that.filterValues.PavementCondition = response.FilterList;
                    }),
                    that.getDeck(function (response) {
                        response.FilterList.sort(that.sorter);
                        $(response.FilterList).each(function (index, filterValue) {
                            filterValue.type = 'DeckCondition'
                        });
                        that.filterValues.DeckCondition = response.FilterList;
                    }),
                    that.getCategory(function (response) {
                        response.FilterList.sort(that.sorter);
                        $(response.FilterList).each(function (index, filterValue) {
                            filterValue.type = 'WorkCategory'
                        });
                        that.filterValues.WorkCategory = response.FilterList;
                    }),
                    that.getBridgeStatus(function (response) {
                        //response.FilterList.sort(that.sorter);

                        response = {
                            "FilterList": [
                            {
                                "Value": "Not Deficient",
                                "Name": "Not Deficient",
                                "NumericValue": 0,
                                "ComparisonOperator": null
                            },
                            {
                                "Value": "Functionally Obsolete",
                                "Name": "Functionally Obsolete",
                                "NumericValue": 0,
                                "ComparisonOperator": null
                            },
                            {
                                "Value": "Structurally Deficient",
                                "Name": "Structurally Deficient",
                                "NumericValue": 0,
                                "ComparisonOperator": null
                            }
                        ]
                        }

                        $(response.FilterList).each(function (index, filterValue) {
                            filterValue.type = 'BridgeStatus'
                        });
                        that.filterValues.BridgeStatus = response.FilterList;
                    })
                ).then(
                    callback(that.filterValues)
                );
            },

            getDistricts : function(callback){
                return $.ajax({
                    url: config.districtQueryUrl,
                    jsonpCallback: 'callback1',
                    dataType: "jsonp",
                    success: function (response) {
                        callback(response);
                    }
                })
            },

            getRegions : function(callback){
                return $.ajax({
                    url: config.regionQueryUrl,
                    jsonpCallback: 'callback2',
                    dataType: "jsonp",
                    success: function (response) {
                        callback(response);
                    }
                })
            },

            getAssets : function(callback){
                return $.ajax({
                    url: config.functionalClassQueryUrl,
                    jsonpCallback: 'callback3',
                    dataType: "jsonp",
                    success: function (response) {
                        callback(response);
                    }
                })
            },

            getRoutes : function(callback){
                return $.ajax({
                    url: config.routesQueryUrl,
                    jsonpCallback: 'callback4',
                    dataType: "jsonp",
                    success: function (response) {
                        callback(response);
                    }
                })
            },

            getPavement : function(callback){
                return $.ajax({
                    url: config.pavementQueryUrl,
                    jsonpCallback: 'callback5',
                    dataType: "jsonp",
                    success: function (response) {
                        callback(response);
                    }
                })
            },

            getDeck : function(callback){
                return $.ajax({
                    url: config.deckQueryUrl,
                    jsonpCallback: 'callback6',
                    dataType: "jsonp",
                    success: function (response) {
                        callback(response);
                    }
                })
            },

            getCategory : function(callback){
                return $.ajax({
                    url: config.categoryQueryUrl,
                    jsonpCallback: 'callback7',
                    dataType: "jsonp",
                    success: function (response) {
                        callback(response);
                    }
                })
            },

            getBridgeStatus : function(callback){
                return $.ajax({
                    url: config.bridgeStatusQueryUrl,
                    jsonpCallback: 'callback8',
                    dataType: "jsonp",
                    success: function (response) {
                        callback(response);
                    }
                })
            },
            getFeatures : function(queryName, key, objectIdString, callback){
                var featureUrl = null;
                if(queryName == 'Assets'){
                    if(key == "RouteFeatureResults"){
                        featureUrl = config.roadFeaturesUrl;
                    } else if(key == "BridgeFeatureResults"){
                        featureUrl = config.bridgeFeaturesUrl;
                    }
                }else if(queryName == 'Unstable Slopes'){
                    if(key == "RouteFeatureResults"){
                        featureUrl = config.roadFeaturesUrl;
                    } else if(key == "UnstableSlopeFeatureResults"){
                        featureUrl = config.slopesQueryUrl;
                    }
                }else if(queryName == 'Crash Analysis'){
                    if(key == "CrashFeatureResults"){
                        featureUrl = config.crashesQueryUrl;
                    } else if(key == "ProjectFeatureResults"){
                        featureUrl = config.projectsQueryUrl;
                    }
                } else {
                    if(key == "RouteFeatureResults"){
                        featureUrl = config.roadFeaturesUrlWithCondition;
                    } else if(key == "BridgeFeatureResults"){
                        featureUrl = config.bridgeFeaturesUrlWithCondition;
                    }
                }

                var postBody = {};
                postBody.objectIds = objectIdString;
                postBody.outFields = 'OBJECTID';
                postBody.f = 'pjson';
                postBody.outSR = 3857;
                $.ajax({
                    type: "POST",
                    crossDomain: true,
                    url: featureUrl,
                    data: postBody,
                    success: function (response) {
                        callback(response);
                    }
                })
            },
            getGeoPolygons : function(geoparam, callback){
                var featureUrl;
                var queryParam;
                var geotype = geoparam[0].AreaParameter.Type;
                if(geotype == 'HouseDistrict'){
                    featureUrl = config.districtPolyQueryUrl;
                    queryParam = 'HOUSE_DISTR_NAME';
                } else {
                    featureUrl = config.regionPolyQueryUrl;
                    queryParam = 'REGION';
                }

                var whereClause = geoparam[0].AreaParameter.Areas.map(function(geovalue){
                    return "'" + geovalue.Name + "'";
                }).join(",");

                whereClause = queryParam + ' in (' + whereClause + ')';

                var postBody = {};
                postBody.where = whereClause;
                postBody.outFields = queryParam;
                postBody.f = 'pjson';
                postBody.outSR = 3857;
                $.ajax({
                    type: "POST",
                    crossDomain: true,
                    url: featureUrl,
                    data: postBody,
                    success: function (response) {
                        callback(response);
                    }
                })
            }
        };
    });
