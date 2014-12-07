define(['durandal/system', 'plugins/http', 'durandal/app', 'knockout', 'bootstrap', 'jquery-ui', './reportsbase', 'highcharts', '../config/appstate', '../definitions/reportdefs', 'plugins/router', '../config/config', './querydescription'],
    function (system, http, app, ko, bootstrap, jqueryui, reportsbase, highcharts, appstate, reportdefs, router, config, querydescription) {

        return{
            querydescription: querydescription,
            chartsRawData: null,
            reportdef: null,
            charts: ko.observableArray([]),
            graphMetrics: ko.observableArray([]),
            selectedMetric: ko.observable(),
            levelOrders: ko.observableArray([]),
            selectedOrder: ko.observable(),

           activate: function () {
                var data = appstate.queryResults;
                var queryName = appstate.queryName;
                if (data && queryName) {
                    this.chartsRawData = data;
                    this.reportdef = $.extend({}, reportdefs[queryName]); //make a local copy of the report def since we'll be modifying it
                    var graphMetrics = this.reportdef.graphMetrics;
                    if(this.reportdef.bins && appstate.queryName != "Conditions for Specified Section of Roadway" && graphMetrics.length < 4){
                        for(var i = 0; i < this.reportdef.bins.length; i++){
                            var limit  = graphMetrics.length;
                            for(var j = 0; j < limit; j++){
                                graphMetrics.push({name: graphMetrics[j].name + " by " + this.reportdef.bins[i].name, value: this.reportdef.bins[i].value + '|' + graphMetrics[j].value})
                            }
                        }
                    }
                    this.graphMetrics(graphMetrics);
                    this.selectedMetric(this.reportdef.graphMetrics[0].value); //set default
                    if(this.reportdef.levelOrders && this.reportdef.levelOrders.length > 0){
                        this.selectedOrder(this.reportdef.levelOrders[0].name); //set default
                        this.levelOrders(this.reportdef.levelOrders);
                    }
                    var that = this;
                    this.selectedMetric.subscribe(function (newValue) {
                        that.refreshCharts();
                    });
                    this.selectedOrder.subscribe(function (newValue) {
                        that.refreshCharts();
                    });
                    this.charts(this.prepareCharts(data, this.reportdef));
                } else {
                    app.showMessage(config.noResultsMessage.message, config.noResultsMessage.title).then(function (dialogResult) {
                        router.navigate('queryconfig');
                    });
                    return;
                }
            },

            //DOM is ready, populate the chart divs
            attached: function () {
                this.renderCharts();
            },

            //selection changed by user, refresh the charts
            refreshCharts: function(){
                var that = this;
                $.each(this.levelOrders(), function (index, levelOrder) {
                    if(levelOrder.name == that.selectedOrder()){
                        that.reportdef.levels = levelOrder.value;
                    }
                });

                var charts = this.prepareCharts(this.chartsRawData, this.reportdef);
                this.charts(charts);
                this.renderCharts();
            },

            renderCharts: function () {
                var charts = this.charts();
                var metricValue = this.selectedMetric();

                if(appstate.queryName == "Conditions for Specified Section of Roadway"){
                    metricValue = "condition|" + metricValue;
                }

                //pipe delimiter in metric value indicates we want to display the selected series binned by values
                var metricElements = metricValue.split('|');
                var binName = null;
                var metric;
                if(metricElements.length > 1){
                    binName = metricElements[0]
                    metric = metricElements[1];
                }else{
                    metric = metricValue;
                }
                var axisTitle = this.getSelectedMetricTitle();

                var rootScope = this;
                $.each(charts, function (index, chartTabPanel) {
                    var that = this;
                    that.chartTabPanel = chartTabPanel;
                    var chartElements = chartTabPanel.charts;
                    $.each(chartElements, function (index, chartElement) {

                        var topleveltitle = that.reportdef.headers[that.reportdef.fields.indexOf(that.reportdef.levels[1])]

                        that.chartElement = chartElement;
                        that.categories = [];

                        $.each(chartElement.datapoints, function (index, datapoint) {
                            //get rid of any NaNs
                            if(!$.isNumeric(datapoint[metric] )){
                                datapoint[metric] = 0;
                            }
                            that.categories.push(datapoint.name);
                        });

                        var seriesArray = [];
                        that.binSeries = {};

                        if(binName){
                            var fields = Object.keys(chartElement.datapoints[0]);
                            $.each(fields, function (index, field) {
                                if(field.indexOf('|') > -1 && field.indexOf(metric) > -1){
                                    that.binSeries[field] = null;
                                }
                            });
                        }

                        if(Object.keys(that.binSeries).length < 1){
                            var series = {};
                            series.name = rootScope.getLabelForMetric(metric);
                            series.data = $.map(chartElement.datapoints, function (datapoint) {
                                return Number(datapoint[metric]);
                            });
                            seriesArray.push(series);
                        }else{
                            $.each(Object.keys(that.binSeries), function (index, bin) {
                                var series = {};
                                series.name = bin.split('|')[2];
                                series.data = $.map(chartElement.datapoints, function (datapoint) {
                                    return Number(datapoint[bin]);
                                });
                                seriesArray.push(series);
                            });

                            $.each(reportdefs[appstate.queryName].bins, function (index, bin) {
                                if(binName == bin.value){
                                    topleveltitle = topleveltitle + ' and ' + bin.name;
                                }
                            });
                        }


                        that.axisTitle = axisTitle;
                        that.chartTitle = axisTitle + ' of ' + that.chartTabPanel.title
                            + ' By ' + topleveltitle
                            + ' For ' + chartElement.text;

                        if(appstate.queryName == "Conditions for Specified Section of Roadway"){
                            if(metric == 'LaneMiles'){
                                that.chartTitle = 'Lane Miles by Condition For ' + chartElement.text;
                            }else{
                                that.chartTitle = 'Miles by Condition For ' + chartElement.text;
                            }

                        }

                        var chartConfig = {
                            chart: {
                                type: 'column'
                            },
                            legend: {
                                enabled: false,
                            },
                            title: {
                                text: that.chartTitle
                            },
                            xAxis: {
                                categories: that.categories
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: that.axisTitle
                                }
                            },
                            tooltip: {
                                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                pointFormat: '<tr><td style="padding:0">{series.name} <b>{point.y:.1f} ' + that.axisTitle + '</b></td></tr>',
                                footerFormat: '</table>',
                                shared: true,
                                useHTML: true
                            },
                            plotOptions: {
                                column: {
                                    pointPadding: 0.2,
                                    borderWidth: 0
                                }
                            },
                            series: seriesArray,
                        };
                        if(seriesArray.length > 1 || appstate.queryName == "Conditions for Specified Section of Roadway"){
                            chartConfig.legend = {
                                layout: 'vertical',
                                    align: 'right',
                                    verticalAlign: 'middle',
                                    borderWidth: 0
                            };
                        }
                        $("#chart_" + chartElement.id).highcharts(chartConfig);
                    });
                });
            },


            prepareCharts: function (data, reportdef) {

                this.validateRequests(data, reportdef);
                var chartTabSet = [];
                //each chartRequest in the array represents a tabbed panel containing a chart for each node in the tree of aggregated data
                $.each(reportdef.tabs, function (index, tab) {
                    var featureData = data[reportdef.dataKeys[index]];
                    if(!featureData) return true;
                    var tree = reportsbase.buildTree(featureData, reportdef);  //create the tree based on the levels defined in request
                    var chartTabPanel = {};
                    chartTabPanel.reportdef = reportdef;
                    chartTabPanel.id = index;
                    chartTabPanel.title = tab
                    chartTabPanel.charts = [];
                    var outerIndex = index;
                    if(chartTabPanel.reportdef.levels.length > 1){

                        $.each(tree, function (index, root) {
                            var chart = {};
                            chart.datapoints = [];
                            chart.level = root.level;
                            chart.text = root.text;
                            $.each(root.children, function (index, child) {
                                child.name = child.text;
                                chart.datapoints.push(child);
                            });
                            chart.id = outerIndex + "_" + index;
                            chartTabPanel.charts.push(chart);
                        });

                        //now add a summary section below that aggregates by the second dimension
                        var topLevel = chartTabPanel.reportdef.levels.shift();
                        tree = reportsbase.buildTree(featureData, chartTabPanel.reportdef);
                        var summaryChart = {};
                        summaryChart.level = topLevel;
                        var topleveltitle = chartTabPanel.reportdef.headers[chartTabPanel.reportdef.fields.indexOf(topLevel)];
                        topleveltitle = /s$/.test(topleveltitle) ? topleveltitle + "es" : topleveltitle + 's';
                        summaryChart.text = "All " + topleveltitle;
                        summaryChart.id = outerIndex + "_" + chartTabPanel.length;
                        summaryChart.datapoints = []

                        $.each(tree, function (index, child) {
                            child.name = child.text;
                            summaryChart.datapoints.push(child);
                        });

                        chartTabPanel.charts.push(summaryChart);
                        chartTabPanel.reportdef.levels.unshift(topLevel);  //put the level back in so the column offsets are correct
                    }else{
                        $.each(tree, function (index, root) {
                            var chart = {};
                            chart.datapoints = [];
                            chart.level = root.level;
                            chart.text = root.text;
                            root.name = root.text;
                            chart.datapoints.push(root);
                            chart.id = outerIndex + "_" + index;
                            chartTabPanel.charts.push(chart);
                        });
                    }
                    chartTabSet.push(chartTabPanel);
                });
                return chartTabSet;
            },


            validateRequests: function (data, reportdef) {
                if (reportdef.levels.length > 2) {
                    reportdef.levels = reportdef.levels.slice(0,2)
                }

                $.each(reportdef.dataKeys, function (index, dataKey) {

                    var featureData = data[dataKey];
                    if(featureData){
                        $.each(featureData, function (index, feature) {
                            if(typeof(feature['Length']) != 'undefined' && typeof(feature['NumberOfLanes']) ){
                                feature.LaneMiles = feature['Length'] * feature['NumberOfLanes']
                            } else {
                                feature.LaneMiles = 0;
                            }
                        });
                    }
                });
            },

            print: function () {
                var printOutput = $('<div></div>');

                $('.nav-tabs li > a').each(function (index, tab) {
                    var tabTitle = $(tab).find('span').text();
                    printOutput.append('<div class="chart-printout">Charts For Tab: ' + tabTitle + '</div>');
                    var chartDivId = tab.href.split('#')[1];
                    $('#' + chartDivId).find('.chart-container').each(function (index, chartContainer) {
                        printOutput.append($(chartContainer).clone());
                    });
                });

                var popupWin = window.open('', '_blank', 'width=800,height=600');
                popupWin.document.open()
                popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printOutput.html() + '</html>');
                popupWin.document.close();
            },

            getSelectedMetricTitle: function(){
                var metricValue = this.selectedMetric();
                var metricName;
                $.each(this.graphMetrics(), function (index, metric) {
                    if(metric.value = metricValue){
                        metricName = metric.name;
                        return false;
                    }
                });
                return metricName;
            },

            getLabelForMetric: function(metric){
                var label;
                var that = this;
                $.each(this.reportdef.fields, function (index, field) {
                    if(field == metric){
                        label = that.reportdef.headers[index];
                        return false;
                    }
                });
                return label;
            }

        };


    });