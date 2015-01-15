define(['plugins/http', 'durandal/app', 'knockout', 'jstree', '../config/appstate'],
    function (http, app, ko, jstree, appstate) {

        return {
            useCategoryFilter: ko.observable(),
            categoryFilters: ko.observableArray([]),
            categoryTreeNodes: ko.observableArray([]),
            filterValues: {},
            filterMap: {},
            queryReady: ko.observable(),

            resetObservables: function () {
                this.useCategoryFilter(null);
                this.categoryFilters([]);
            },

            activate: function () {

                if(this.categoryTreeNodes().length > 0){
                    this.resetObservables();
                    return;
                }

                this.categoryTree = {};

                var that = this;
                that.filterValues.WorkCategory = appstate.filterValues.WorkCategory;
                that.categorySelections = [];
                $(that.filterValues.WorkCategory).each(function (index, filterValue) {
                    if(filterValue.Name){
                        var node = {text: filterValue.Name, value: 'category_' + filterValue.Value};
                        that.categorySelections.push(node);
                        that.filterMap[node.value] = filterValue;
                    }
                });

                var sorter = function compare(a,b) {
                    a = a.text.split(':')[0];
                    b = b.text.split(':')[0];
                    if (a < b)
                        return -1;
                    if (a > b)
                        return 1;
                    return 0;
                }

                that.categorySelections.sort(sorter);

                that.categoryTree['All Work Categories'] = that.categorySelections;

                var categoryTreeNodes = [];
                $(Object.getOwnPropertyNames(that.categoryTree)).each(function () {
                    var categoryTypeName = this;
                    var categoryTreeNode = {};
                    categoryTreeNode.children = [];
                    categoryTreeNode.text = categoryTypeName;
                    categoryTreeNode.a_attr = {'selectionId': categoryTypeName},
                        categoryTreeNode.selectionId = categoryTypeName,
                        categoryTreeNode.state = { 'opened': true, 'selected': false };
                    that.categoryTreeNode = categoryTreeNode;
                    $(that.categoryTree[this]).each(function (index, childElement) {
                        var child = {};
                        child.text = childElement.text;
                        child.a_attr = {'selectionId': childElement.value},
                            child.state = { 'opened': true, 'selected': false };
                        child.parentId = that.categoryTreeNode.selectionId;
                        child.selectionId = childElement.value;
                        that.categoryTreeNode.children.push(child);
                    });
                    categoryTreeNode.children = categoryTreeNode.children.sort(sorter);
                    categoryTreeNodes.push(categoryTreeNode);
                });
                that.categoryTreeNodes(categoryTreeNodes);
            },

            bindingComplete: function(){
                var that = this;
                $("#categoryTree").jstree("destroy");
                $('#categoryTree').jstree({'plugins': ["checkbox"], 'core': {
                    'data': that.categoryTreeNodes()
                }}).on('changed.jstree', function (e, data) {
                    that.updateCategorySelection(e, data)
                });

                this.useCategoryFilter.subscribe(function (newValue) {
                    var oldValue = that.useCategoryFilter();
                    if (oldValue) {
                        $("#categoryTree").jstree("uncheck_all", true);
                    }
                }, null, "beforeChange");

                var handler = function () {

                    var queryReady = "false";
                    var useCategoryFilter = that.useCategoryFilter();
                    var categoryFilters = that.categoryFilters();

                    if(useCategoryFilter){
                        if(useCategoryFilter == "false" || categoryFilters.length > 0){
                            queryReady = "true";
                        }
                    }
                    that.queryReady(queryReady);
                };

                this.useCategoryFilter.subscribe(handler);
            },

            updateCategorySelection: function (e, data) {
                this.values = $("#categoryTree").jstree("get_checked", {full: true}, true);
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
                    this.categoryFilters(this.filteredValues);
                    if(this.filteredValues.length > 0){
                        this.queryReady("true");
                    }
                } else {
                    this.categoryFilters([]);
                    this.queryReady("false");
                }
            },


            getQueryParams: function() {

                var selectedCategories = $.map(this.categoryFilters(), function (filter) {
                    return filter.text;
                });

                var projectsParameter = {
                    "Name": "Projects",
                    "Selected": true,
                    "AreaParameter": null,
                    "FilterParameters": []
                };

                var crashesParameter = {
                    "Name": "Crashes",
                    "Selected": true,
                    "FilterParameters": []
                };

                if(selectedCategories.length > 0){
                    var categoryParameter = {
                        "Type": "PrimWorkCategory",
                        "Description": "",
                        "Filters": []
                    }
                    for(var i = 0; i < selectedCategories.length; i++){
                        var selectedCategory = selectedCategories[i];
                        categoryParameter.Filters.push({"Value": selectedCategory})
                    }
                    projectsParameter.FilterParameters.push(categoryParameter);
                    crashesParameter.FilterParameters.push(categoryParameter);
                }

                var displayParameters = [];
                displayParameters.push(projectsParameter);
                displayParameters.push(crashesParameter);

                return displayParameters;
            }

        };
    });