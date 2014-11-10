define(['plugins/http', 'durandal/app', 'knockout', 'jstree', 'bootstrap', 'jquery-ui', '../config/config', '../services/dataservice'],
    function (http, app, ko, jstree, bootstrap, jqueryui, config, dataservice) {

        return {
            useAssetFilter: ko.observable(),
            assetFilters: ko.observableArray([]),
            assetTreeNodes: ko.observableArray([]),

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
                        var bridges = {};
                        var roads = {};
                        roads['types'] = response.FilterList;
                        bridges['types'] = response.FilterList;
                        that.assetTree['Road Assets'] = roads;
                        that.assetTree['Bridge Assets'] = bridges;
                    })
                ).then(function () {

                        var sorter = function compare(a,b) {
                            if (a.text < b.text)
                                return -1;
                            if (a.text > b.text)
                                return 1;
                            return 0;
                        }

                        var assetTreeNodes = [];
                        $(Object.getOwnPropertyNames(that.assetTree)).each(function () {
                            var assetTypeName = this;
                            var assetTreeNode = that.assetTree[this];
                            assetTreeNode.children = [];
                            assetTreeNode.text = assetTypeName;
                            assetTreeNode.a_attr = {'selectionId': assetTypeName},
                            assetTreeNode.selectionId = assetTypeName,
                            assetTreeNode.state = { 'opened': false, 'selected': false };
                            that.assetTreeNode = assetTreeNode;
                            $(assetTreeNode.types).each(function (index, childElement) {
                                var child = {};
                                child.text = childElement.Name;
                                child.a_attr = {'selectionId': childElement.Value},
                                child.state = { 'opened': false, 'selected': false };
                                child.parentId = that.assetTreeNode.selectionId;
                                child.selectionId = childElement.Value;
                                that.assetTreeNode.children.push(child);
                            });
                            assetTreeNode.children = assetTreeNode.children.sort(sorter);
                            assetTreeNodes.push(assetTreeNode);
                        });
                        that.assetTreeNodes(assetTreeNodes);
                    });
            },

            bindingComplete: function () {
                var that = this;

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
            }
        };
    });