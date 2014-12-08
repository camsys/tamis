define(['plugins/http', 'durandal/app', 'knockout', 'jstree', 'bootstrap', 'jquery-ui', '../config/config', '../services/dataservice'],
    function (http, app, ko, jstree, bootstrap, jqueryui, config, dataservice) {

        return {

            useAadtFilter: ko.observable(),
            aadtFilter: ko.observable(),
            useScoreFilter: ko.observable(),
            scoreFilter: ko.observable(),
            mitigationNotPresentFilter: ko.observable(),
            queryReady: ko.observable(),

            resetObservables: function () {
                this.useAadtFilter(null);
                this.aadtFilter(null);
                this.useScoreFilter(null);
                this.scoreFilter(null);
                this.mitigationNotPresentFilter(null);
                this.queryReady(null);
            },

            activate: function () {
                this.resetObservables();
                var that = this;
                var handler = function () {
                    var queryReady = null;
                    var useAadtFilter = that.useAadtFilter();
                    var aadtFilter = that.aadtFilter();
                    var useScoreFilter = that.useScoreFilter();
                    var scoreFilter = that.scoreFilter();
                    var mitigationNotPresentFilter = that.mitigationNotPresentFilter();

                    if(aadtFilter && !that.isNumeric(aadtFilter)){
                        that.aadtFilter(null);
                    }

                    if(scoreFilter && !that.isNumeric(scoreFilter)){
                        that.scoreFilter(null);
                    }

                    if(useAadtFilter && (useAadtFilter == "false" || aadtFilter )){
                        if(useScoreFilter && (useScoreFilter == "false" || scoreFilter)){
                            if(mitigationNotPresentFilter){
                                queryReady = "true"
                            }
                        }
                    }
                    that.queryReady(queryReady);
                };

                this.useAadtFilter.subscribe(handler);
                this.aadtFilter.subscribe(handler);
                this.useScoreFilter.subscribe(handler);
                this.scoreFilter.subscribe(handler);
                this.mitigationNotPresentFilter.subscribe(handler);
                this.queryReady.subscribe(handler);
            },


            isNumeric: function (input) {
                return (input - 0) == input && (''+input).replace(/^\s+|\s+$/g, "").length > 0;
            },

            getQueryParams: function() {

                var aadtFilter = this.aadtFilter();
                var scoreFilter = this.scoreFilter();
                var mitigationNotPresentFilter = this.mitigationNotPresentFilter();

                var roadParameter = {
                    "Name": "Roads",
                    "Selected": true,
                    "FilterParameters": []
                };

                var slopeParameter = {
                    "Name": "UnstableSlopes",
                    "Selected": true,
                    "FilterParameters": []
                };

                if(aadtFilter){
                    slopeParameter.FilterParameters.push({"Type":"AADT","Filters":[{"NumericValue":aadtFilter,"ComparisonOperator":">="}]});
                }

                if(scoreFilter){
                    slopeParameter.FilterParameters.push({"Type":"TotalScore","Filters":[{"NumericValue":scoreFilter,"ComparisonOperator":">="}]});
                }

                slopeParameter.FilterParameters.push({"Type":"MitigationPresent","Description":"","Filters":[{"Value":"0"}]});
                if(!mitigationNotPresentFilter || mitigationNotPresentFilter == "false"){
                    slopeParameter.FilterParameters[slopeParameter.FilterParameters.length - 1].Filters.push({"Value":"1"});
                }

                var displayParameters = [];
                displayParameters.push(roadParameter);
                displayParameters.push(slopeParameter);

                return displayParameters;
            }

        };
    });