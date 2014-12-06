define(['plugins/http', 'durandal/app', 'knockout', 'jstree', 'bootstrap', 'jquery-ui', '../config/config', '../services/dataservice'],
    function (http, app, ko, jstree, bootstrap, jqueryui, config, dataservice) {

        return {
            useAssetFilter: ko.observable(),
            assetFilters: ko.observableArray([]),
            assetTreeNodes: ko.observableArray([]),
            filterValues: {},
            filterMap: {},

            resetObservables: function () {
                this.useAssetFilter(null);
                this.assetFilters([]);
            },

            activate: function () {

                if(this.assetTreeNodes().length > 0){
                    this.resetObservables();
                    return;
                }

                this.areaTree = {};
                this.assetTree = {};

                var that = this;

                //returning a promise, rendering pauses until promise completes
                return $.when(
                    dataservice.getAssets(function (response) {
                        $(response.FilterList).each(function (index, filterValue) {
                            filterValue.type = 'NHSClass'
                        });
                        that.filterValues.nhsclass = response.FilterList;
                    }),
                    dataservice.getPavement(function (response) {
                        $(response.FilterList).each(function (index, filterValue) {
                            filterValue.type = 'PavementCondition'
                        });
                        that.filterValues.pavement = response.FilterList;
                    }),
                    dataservice.getDeck(function (response) {
                        $(response.FilterList).each(function (index, filterValue) {
                            filterValue.type = 'DeckCondition'
                        });
                        that.filterValues.deck = response.FilterList;

                    }),
                    dataservice.getBridgeStatus(function (response) {
                        $(response.FilterList).each(function (index, filterValue) {
                            filterValue.type = 'BridgeStatus'
                        });
                        that.filterValues.bridge = response.FilterList;
                    })
                ).then(function () {

                    });
            },

            buildAssetTree: function (selectedQuery){
                var that = this;
                that.bridgeSelections = [];
                that.roadSelections = [];
                $(that.filterValues.nhsclass).each(function (index, filterValue) {
                    if(filterValue.Name){
                        var node = {text: 'Class: ' + filterValue.Name, value: 'nhsclass_' + filterValue.Value};
                        that.bridgeSelections.push(node);
                        that.roadSelections.push(node);
                        that.filterMap[node.value] = filterValue;
                    }
                });

                if(selectedQuery == "Asset Conditions"){
                    $(that.filterValues.pavement).each(function (index, filterValue) {
                        if(filterValue.Name){
                            var node = {text: 'Pavement Condition: ' + filterValue.Name, value: 'pavement_' + filterValue.Value};
                            that.roadSelections.push(node);
                            that.filterMap[node.value] = filterValue;
                        }
                    });

                    $(that.filterValues.deck).each(function (index, filterValue) {
                        if(filterValue.Name){
                            var node = {text: 'Deck Condition: ' + filterValue.Name, value: 'deck_' + filterValue.Value}
                            that.bridgeSelections.push(node);
                            that.filterMap[node.value] = filterValue;
                        }
                    });

                    $(that.filterValues.bridge).each(function (index, filterValue) {
                        if(filterValue.Name){
                            var node ={text: 'Bridge Status: ' + filterValue.Name, value: 'bridge_' + filterValue.Value}
                            that.bridgeSelections.push(node);
                            that.filterMap[node.value] = filterValue;
                        }
                    });
                }

                var sorter = function compare(a,b) {
                    if (a.text < b.text)
                        return -1;
                    if (a.text > b.text)
                        return 1;
                    return 0;
                }

                that.bridgeSelections.sort(sorter);
                that.roadSelections.sort(sorter);

                that.assetTree['Road Assets'] = that.roadSelections;
                that.assetTree['Bridge Assets'] = that.bridgeSelections;

                var assetTreeNodes = [];
                $(Object.getOwnPropertyNames(that.assetTree)).each(function () {
                    var assetTypeName = this;
                    var assetTreeNode = {};
                    assetTreeNode.children = [];
                    assetTreeNode.text = assetTypeName;
                    assetTreeNode.a_attr = {'selectionId': assetTypeName},
                        assetTreeNode.selectionId = assetTypeName,
                        assetTreeNode.state = { 'opened': false, 'selected': false };
                    that.assetTreeNode = assetTreeNode;
                    $(that.assetTree[this]).each(function (index, childElement) {
                        var child = {};
                        child.text = childElement.text;
                        child.a_attr = {'selectionId': childElement.value},
                            child.state = { 'opened': false, 'selected': false };
                        child.parentId = that.assetTreeNode.selectionId;
                        child.selectionId = childElement.value;
                        that.assetTreeNode.children.push(child);
                    });
                    assetTreeNode.children = assetTreeNode.children.sort(sorter);
                    assetTreeNodes.push(assetTreeNode);
                });
                that.assetTreeNodes(assetTreeNodes);

                $("#assetTree").jstree("destroy");
                $('#assetTree').jstree({'plugins': ["checkbox"], 'core': {
                    'data': that.assetTreeNodes()
                }}).on('changed.jstree', function (e, data) {
                    that.updateAssetSelection(e, data)
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

            getQueryParams: function() {
                var that = this;
                var useAssetFilter = this.useAssetFilter();
                if(useAssetFilter == null){
                    return [];
                }
                var assetFilters = this.assetFilters();
                var bridgeParameter = null;
                var roadParameter = null;

                if (useAssetFilter == "true") {
                    $(assetFilters).each(function (index, node) {
                        if (node.original.parentId) {
                            var filterType = that.filterMap[node.original.selectionId].type;
                            if (node.original.parentId.indexOf('Road') > -1) {
                                if(roadParameter == null){
                                    roadParameter = {"Name": "Roads", "Selected": true, "FilterParameters": []};
                                }
                                var matchingFilterParameter = null;
                                for(var i = 0; i < roadParameter.FilterParameters.length; i++){
                                    if(roadParameter.FilterParameters[i].Type == filterType){
                                        matchingFilterParameter = roadParameter.FilterParameters[i];
                                    }
                                }
                                if(matchingFilterParameter == null){
                                    matchingFilterParameter =  {"Type": filterType, "Filters": []};
                                    roadParameter.FilterParameters.push(matchingFilterParameter);
                                }
                                matchingFilterParameter.Filters.push(that.filterMap[node.original.selectionId])
                            } else {
                                if(bridgeParameter == null){
                                    bridgeParameter = {"Name": "Bridges", "Selected": true, "FilterParameters": []};
                                }
                                var matchingFilterParameter = null;
                                for(var i = 0; i < bridgeParameter.FilterParameters.length; i++){
                                    if(bridgeParameter.FilterParameters[i].Type == filterType){
                                        matchingFilterParameter = bridgeParameter.FilterParameters[i];
                                    }
                                }
                                if(matchingFilterParameter == null){
                                    matchingFilterParameter =  {"Type": filterType, "Filters": []};
                                    bridgeParameter.FilterParameters.push(matchingFilterParameter);
                                }
                                matchingFilterParameter.Filters.push(that.filterMap[node.original.selectionId]);
                            }
                        } else {
                            if (node.text.indexOf('Road') > -1) {
                                roadParameter = {"Name": "Roads", "Selected": true, "FilterParameters": []};
                            }
                            if (node.text.indexOf('Bridge') > -1) {
                                bridgeParameter = {"Name": "Bridges", "Selected": true, "FilterParameters": []};
                            }
                        }
                    });
                } else if (useAssetFilter == "false") {
                    roadParameter = {"Name": "Roads", "Selected": true, "FilterParameters": []};
                    bridgeParameter = {"Name": "Bridges", "Selected": true, "FilterParameters": []};
                }
                var displayParameters = [];
                if(roadParameter){displayParameters.push(roadParameter)};
                if(bridgeParameter){displayParameters.push(bridgeParameter)};
                return displayParameters;
            }

        };
    });