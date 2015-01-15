define(['plugins/http', 'durandal/app', 'knockout', 'jstree', '../config/appstate'],
    function (http, app, ko, jstree, appstate) {

        return {
            useCategoryFilter: ko.observable(),
            categories: ko.observableArray([]),
            selectedCategory: ko.observable(),
            queryReady: ko.observable(),

            resetObservables: function () {
                this.useCategoryFilter(null);
                this.selectedCategory(null);
                this.queryReady(null);
                this.categories([]);
            },

            activate: function () {

                this.values = [];
                var that = this;
                $(appstate.filterValues.WorkCategory).each(function () {
                    if(this.Name){
                        that.values.push(this.Name);
                    }
                });
                this.categories(this.values);
                var handler = function () {

                    var queryReady = "false";
                    var useCategoryFilter = that.useCategoryFilter();
                    var selectedCategory = that.selectedCategory();

                    if(useCategoryFilter){
                        if(useCategoryFilter == "false" || selectedCategory){
                            queryReady = "true";
                        }
                    }
                    that.queryReady(queryReady);
                };

                this.useCategoryFilter.subscribe(handler);
                this.selectedCategory.subscribe(handler);
            },


            getQueryParams: function() {

                var selectedCategory = this.selectedCategory();

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

                if(selectedCategory){
                    var categoryParameter = {
                        "Type": "PrimWorkCategory",
                        "Description": "",
                        "Filters": [
                            {
                                "Value": selectedCategory
                            }
                        ]
                    }
                    projectsParameter.FilterParameters.push(categoryParameter);
                    crashesParameter.FilterParameters.push(categoryParameter);
                }

                var displayParameters = [];
                displayParameters.push(projectsParameter);
                displayParameters.push(crashesParameter);

                return displayParameters;
            }
        }
    });