define(['durandal/system', 'plugins/http', 'durandal/app', 'knockout', 'bootstrap', 'jquery-ui', './reportsbase', 'highcharts', '../config/appstate', '../definitions/chartdefs', 'plugins/router', '../config/config', './querydescription'],
    function (system, http, app, ko, bootstrap, jqueryui, reportsbase, highcharts, appstate, chartdefs, router, config, querydescription) {

        return{
            chartTabs: ko.observableArray([]),
            activeTabIndex: ko.observable(0),
            querydescription: querydescription,

           a/*ctivate: function () {
                var that = this;
                return $.get("assets/json/appstate_q4.json",
                    function (queryData) {
                        var fields = Object.keys(queryData);
                        $.each(fields, function (index, field) {
                            appstate[field] = queryData[field]
                        });

                        that.realactivate();
                    }
                );
            },

            real*/activate: function () {
                this.activeTabIndex(0);
                this.chartTabs([]);
                var data = appstate.queryResults;
                var queryName = appstate.queryName;
                if (data && queryName) {
                    this.chartsRawData = data;
                    this.chartdef = $.extend(true, {}, chartdefs[queryName]); //make a local copy of the report def since we'll be modifying it
                    var that = this;
                    $(Object.keys(that.chartdef)).each(function (index, tabname) {
                        var tabdef = that.chartdef[tabname];
                        var graphMetrics = tabdef.graphMetrics;
                        if(tabdef.bins && appstate.queryName != "Conditions of Specified Road / CDS" && graphMetrics.length < 4){
                            var limit  = graphMetrics.length;
                            for(var i = 0; i < tabdef.bins.length; i++){
                                for(var j = 0; j < limit; j++){
                                    graphMetrics.push({name: graphMetrics[j].name + " by " + tabdef.bins[i].name, value: tabdef.bins[i].value + '|' + graphMetrics[j].value})
                                }
                            }
                            graphMetrics = graphMetrics.slice(limit, graphMetrics.length);
                            tabdef.graphMetrics = graphMetrics;
                        }
                        var featureData = appstate.queryResults[tabdef.dataKey];
                        if(featureData){
                            var chartTabSet;
                            if(tabname == 'Projects'){
                                chartTabSet = that.prepareProjectsChart(featureData, tabdef, index, tabname);
                            }else{
                                chartTabSet = that.prepareChart(featureData, tabdef, index, tabname);
                            }
                            chartTabSet.featureData = featureData;
                            var selectedOrder = null;
                            if(typeof(chartTabSet.tabdef.levelOrders) != 'undefined'){
                                selectedOrder = chartTabSet.tabdef.levelOrders[0].name;
                            }
                            chartTabSet.selectedOrder = ko.observable(selectedOrder);
                            chartTabSet.selectedMetric = ko.observable(chartTabSet.tabdef.graphMetrics[0].name);
                            that.chartTabs.push(chartTabSet);
                        }

                    });
                    if(this.chartTabs().length == 0){
                        app.showMessage("Not enough data to chart.  Consider broadening your query parameters", "Not enough data")
                            .then(function (dialogResult) {
                                router.navigate('queryresults');
                            });
                        return;
                    }
                } else {
                    app.showMessage(config.noResultsMessage.message, config.noResultsMessage.title).then(function (dialogResult) {
                        router.navigate('queryconfig');
                    });
                    return;
                }
            },

            //DOM is ready, populate the chart divs
            bindingComplete: function () {
                var rootscope = this;
                $.each(this.chartTabs(), function (index, chart) {
                    this.tabindex = index;
                    var that = this;
                    chart.selectedOrder.subscribe(function (newValue) {
                        $.each(that.tabdef.levelOrders, function (index, levelOrder) {
                            if(levelOrder.name == newValue){
                                that.tabdef.levels = levelOrder.value;
                                var updatedChartTabSet = rootscope.prepareChart(that.featureData, that.tabdef, that.tabindex, that.title);
                                var existingChartTabSet = rootscope.chartTabs()[that.tabindex];
                                updatedChartTabSet.selectedOrder = existingChartTabSet.selectedOrder;
                                updatedChartTabSet.selectedMetric = existingChartTabSet.selectedMetric;
                                updatedChartTabSet.selectedOrder(newValue);
                                rootscope.chartTabs()[that.tabindex] = updatedChartTabSet;
                                rootscope.activeTabIndex(that.tabindex);
                                rootscope.chartTabs.valueHasMutated();
                            }
                        });
                        rootscope.renderCharts();
                    });

                    chart.selectedMetric.subscribe(function (newValue) {
                        $.each(that.tabdef.graphMetrics, function (index, graphMetric) {
                            if(graphMetric.value == newValue){
                                var updatedChartTabSet = rootscope.prepareChart(that.featureData, that.tabdef, that.tabindex, that.title);
                                var existingChartTabSet = rootscope.chartTabs()[that.tabindex];
                                updatedChartTabSet.selectedOrder = existingChartTabSet.selectedOrder;
                                updatedChartTabSet.selectedMetric = existingChartTabSet.selectedMetric;
                                updatedChartTabSet.selectedMetric(newValue);
                                rootscope.chartTabs()[that.tabindex] = updatedChartTabSet;
                                rootscope.activeTabIndex(that.tabindex);
                                rootscope.chartTabs.valueHasMutated();
                            }
                        });
                        rootscope.renderCharts();
                    });
                });
                this.renderCharts();
            },

            //selection changed by user, refresh the charts
            refreshCharts: function(){
                var that = this;
                $.each(this.levelOrders(), function (index, levelOrder) {
                    if(levelOrder.name == that.selectedOrder()){
                        that.chartdef.levels = levelOrder.value;
                    }
                });

                var charts = this.prepareCharts(this.chartsRawData, this.chartdef);
                this.charts(charts);
                this.renderCharts();
            },

            renderCharts: function () {
                if(this.chartTabs()[0].title == 'Projects'){
                    return this.renderProjectsCharts();
                }
                var that = this;
                $.each(this.chartTabs(), function (index, chartTab) {

                    var metricValue = this.selectedMetric();

                    if(appstate.queryName == "Conditions of Specified Road / CDS"){
                        metricValue = "condition|" + metricValue;
                    }else{
                        for(var i = 0; i < chartTab.tabdef.graphMetrics.length; i++){
                            if(chartTab.tabdef.graphMetrics[i].name == metricValue){
                                metricValue = chart.tabdef.graphMetrics[i].value
                            }
                        }
                    }

                    //pipe delimiter in metric value indicates we want to display the selected series binned by values
                    var metricElements = metricValue.split('|');
                    var binName = null;
                    var metric;
                    if (metricElements.length > 1) {
                        binName = metricElements[0]
                        metric = metricElements[1];
                    } else {
                        metric = metricValue;
                    }
                    var axisTitle = this.selectedMetric();

                    var chartElements = chartTab.charts;

                    var that = this;

                    $.each(chartElements, function (index, chartElement) {

                        var topleveltitle = that.tabdef.headers[that.tabdef.fields.indexOf(that.tabdef.levels[1])]

                        that.chartElement = chartElement;
                        that.categories = [];

                        $.each(chartElement.datapoints, function (index, datapoint) {
                            //get rid of any NaNs
                            if (!$.isNumeric(datapoint[metric])) {
                                datapoint[metric] = 0;
                            }
                            that.categories.push(datapoint.name);
                        });

                        var seriesArray = [];
                        that.binSeries = {};

                        if (binName) {
                            var fields = Object.keys(chartElement.datapoints[0]);
                            $.each(fields, function (index, field) {
                                if (field.indexOf('|') > -1 && field.indexOf(metric) > -1) {
                                    that.binSeries[field] = null;
                                }
                            });
                        }

                        if (Object.keys(that.binSeries).length < 1) {
                            var series = {};
                            series.name = that.tabdef.headers[that.tabdef.fields.indexOf(metric)];
                            series.data = $.map(chartElement.datapoints, function (datapoint) {
                                return Number(datapoint[metric]);
                            });
                            seriesArray.push(series);
                        } else {
                            $.each(Object.keys(that.binSeries), function (index, bin) {
                                var series = {};
                                series.name = bin.split('|')[2];
                                series.data = $.map(chartElement.datapoints, function (datapoint) {
                                    return Number(datapoint[bin]);
                                });
                                seriesArray.push(series);
                            });

                            $.each(that.tabdef.bins, function (index, bin) {
                                if (binName == bin.value) {
                                    topleveltitle = topleveltitle + ' and ' + bin.name;
                                }
                            });
                        }

                        if(axisTitle.indexOf('|') > -1){
                            var axisTitles = axisTitle.split('|');
                            axisTitle = that.tabdef.headers[that.tabdef.fields.indexOf(axisTitles[1])];
                            axisTitle = axisTitle + ' by ' + that.tabdef.headers[that.tabdef.fields.indexOf(axisTitles[0])];
                        }


                        if (that.tabdef.fields.indexOf(axisTitle) > -1) {
                            axisTitle = that.tabdef.headers[that.tabdef.fields.indexOf(axisTitle)];
                        }

                        that.axisTitle = axisTitle;
                        that.chartTitle = axisTitle + ' of ' + that.title
                        + ' By ' + topleveltitle
                        + ' For ' + chartElement.text;

                        if (appstate.queryName == "Conditions of Specified Road / CDS") {
                            if (metric == 'LaneMiles') {
                                that.chartTitle = 'Lane Miles by PSR Summary For ' + chartElement.text;
                            } else if (metric == 'count') {
                                that.chartTitle = 'Count by Status For ' + chartElement.text;
                            } else {
                                that.chartTitle = 'Centerline Miles by PSR Summary For ' + chartElement.text;
                            }

                            if (metric == 'count') {
                                var conditions = ["Structurally Deficient", "Functionally Obsolete", "Not Deficient", "N/A"];
                                var colors = ["red", "yellow", "green", "grey"];

                                var sorter = function compare(a, b) {
                                    a = conditions.indexOf(a.name);
                                    b = conditions.indexOf(b.name);
                                    if (a < b)
                                        return -1;
                                    if (a > b)
                                        return 1;
                                    return 0;
                                }

                                seriesArray.sort(sorter);

                                for (var i = 0; i < seriesArray.length; i++) {
                                    seriesArray[i].color = colors[conditions.indexOf(seriesArray[i].name)];
                                }
                            }else{
                                var conditions = ["Poor", "Mediocre", "Fair", "Good", "Very Good", "N/A", "No Data"];
                                var colors = ["red", "orange", "yellow", "yellowgreen", "green", "grey", "lightgrey"];

                                var sorter = function compare(a, b) {
                                    a = conditions.indexOf(a.name);
                                    b = conditions.indexOf(b.name);
                                    if (a < b)
                                        return -1;
                                    if (a > b)
                                        return 1;
                                    return 0;
                                }

                                seriesArray.sort(sorter);

                                for (var i = 0; i < seriesArray.length; i++) {
                                    seriesArray[i].color = colors[conditions.indexOf(seriesArray[i].name)];
                                }
                            }

                            seriesArray.sort(sorter);

                            for (var i = 0; i < seriesArray.length; i++) {
                                seriesArray[i].color = colors[conditions.indexOf(seriesArray[i].name)];
                            }
                        }

                        if (appstate.queryName == "Asset Conditions") {
                            if (metric == 'LaneMiles') {
                                that.chartTitle = 'Lane Miles by PSR Summary For ' + chartElement.text;
                            } else if (metric == 'count') {
                                that.chartTitle = 'Count by Status For ' + chartElement.text;
                            } else {
                                that.chartTitle = 'Centerline Miles by PSR Summary For ' + chartElement.text;
                            }

                            if (metric == 'count') {
                                var conditions = ["Structurally Deficient", "Functionally Obsolete", "Not Deficient", "N/A", "No Data"];
                                var colors = ["red", "yellow", "green", "grey", "lightgrey"];

                                var sorter = function compare(a, b) {
                                    a = conditions.indexOf(a.name);
                                    b = conditions.indexOf(b.name);
                                    if (a < b)
                                        return -1;
                                    if (a > b)
                                        return 1;
                                    return 0;
                                }

                                seriesArray.sort(sorter);

                                for (var i = 0; i < seriesArray.length; i++) {
                                    seriesArray[i].color = colors[conditions.indexOf(seriesArray[i].name)];
                                }
                            }else{
                                var conditions = ["Poor", "Mediocre", "Fair", "Good", "Very Good", "N/A", "No Data"];
                                var colors = ["red", "orange", "yellow", "yellowgreen", "green", "grey", "lightgrey"];

                                var sorter = function compare(a, b) {
                                    a = conditions.indexOf(a.name);
                                    b = conditions.indexOf(b.name);
                                    if (a < b)
                                        return -1;
                                    if (a > b)
                                        return 1;
                                    return 0;
                                }

                                seriesArray.sort(sorter);

                                for (var i = 0; i < seriesArray.length; i++) {
                                    seriesArray[i].color = colors[conditions.indexOf(seriesArray[i].name)];
                                }
                            }


                        }

                        if (appstate.queryName == "Unstable Slopes") {
                            that.chartTitle = 'Count by Weighted Score Summary of Unstable Slopes by Geographic Area and Mitigation Present (True/False) For ' + chartElement.text;

                            var conditions = ["0-0.2", "0.2-0.6", "0.6-1.0"];
                            var colors = ["yellow", "orange", "red"];

                            var sorter = function compare(a, b) {
                                a = conditions.indexOf(a.name);
                                b = conditions.indexOf(b.name);
                                if (a < b)
                                    return -1;
                                if (a > b)
                                    return 1;
                                return 0;
                            }

                            seriesArray.sort(sorter);

                            for (var i = 0; i < seriesArray.length; i++) {
                                seriesArray[i].color = colors[conditions.indexOf(seriesArray[i].name)];
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
                            plotOptions: {
                                column: {
                                    pointPadding: 0.2,
                                    borderWidth: 0
                                }
                            },
                            series: seriesArray,
                        };
                        chartConfig.legend = {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'middle',
                            borderWidth: 0
                        };

                        $("#chart_" + chartElement.id).highcharts(chartConfig);
                    });
                });
            },

            prepareChart: function (featureData, tabdef, index, tabname) {
                var tree = reportsbase.buildTree(featureData, tabdef);  //create the tree based on the levels defined in request
                var chartTabPanel = {};
                chartTabPanel.tabdef = tabdef;
                chartTabPanel.id = index;
                chartTabPanel.title = tabname;
                chartTabPanel.charts = [];
                var outerIndex = index;
                if (chartTabPanel.tabdef.levels.length > 1) {

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
                    var topLevel = chartTabPanel.tabdef.levels.shift();
                    tree = reportsbase.buildTree(featureData, chartTabPanel.tabdef);
                    var summaryChart = {};
                    summaryChart.level = topLevel;
                    var topleveltitle = chartTabPanel.tabdef.headers[chartTabPanel.tabdef.fields.indexOf(topLevel)];
                    topleveltitle = /s$/.test(topleveltitle) ? topleveltitle + "es" : topleveltitle + 's';
                    summaryChart.text = "All Selected " + topleveltitle;
                    summaryChart.id = outerIndex + "_" + chartTabPanel.length;
                    summaryChart.datapoints = []

                    $.each(tree, function (index, child) {
                        child.name = child.text;
                        summaryChart.datapoints.push(child);
                    });

                    chartTabPanel.charts.unshift(summaryChart);
                    chartTabPanel.tabdef.levels.unshift(topLevel);  //put the level back in so the column offsets are correct
                } else {
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
                return chartTabPanel;
            },

            prepareProjectsChart: function (featureData, tabdef, index, tabname) {
                var tree = reportsbase.buildTree(featureData, tabdef);  //create the tree based on the levels defined in request
                var chartTabPanel = {};
                chartTabPanel.tabdef = tabdef;
                chartTabPanel.id = index;
                chartTabPanel.title = tabname;
                chartTabPanel.charts = [];
                var outerIndex = index;

                var chart = {};
                chart.level = tabdef.levels[0];
                chart.text = "All Selected Areas";

                $.each(tabdef.sums, function (index, sum) {
                    chart[sum] = tree[sum];
                });

                chart.id = outerIndex + "_" + index;
                chartTabPanel.charts.push(chart);

                $.each(tree.children, function (index, child) {
                    chart = {};
                    chart.level = tabdef.levels[0];
                    chart.text = child.text;
                    chart.id = outerIndex + "_" + (index + 1);
                    $.each(tabdef.sums, function (index, sum) {
                        chart[sum] = child[sum];
                    });
                    chartTabPanel.charts.push(chart);
                });

                return chartTabPanel;
            },

            renderProjectsCharts: function () {

                $.each(this.chartTabs(), function (index, chartTab) {

                    var axisTitle = this.selectedMetric();
                    var chartElements = chartTab.charts;
                    var that = this;

                    $.each(chartElements, function (index, chartElement) {

                        var topleveltitle = that.tabdef.headers[that.tabdef.fields.indexOf(that.tabdef.levels[1])];

                        that.chartElement = chartElement;

                        var seriesArray = [];

                        $.each(that.tabdef.sums, function (index, sum) {
                            var series = {};
                            series.name = that.tabdef.headers[that.tabdef.fields.indexOf(sum)];
                            series.data = [parseInt(that.chartElement[sum])];
                            seriesArray.push(series);
                        });

                        var colors = ["yellow", "orange", "red"];
                        for (var i = 0; i < seriesArray.length; i++) {
                            seriesArray[i].color = colors[i];
                        }

                        that.axisTitle = axisTitle;
                        that.chartTitle = "Number of Crashes On Projects by Severity "
                        + ' For ' + chartElement.text;

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
                                categories: [
                                    "Crashes by Severity"
                                ]
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: that.axisTitle
                                }
                            },
                            plotOptions: {
                                column: {
                                    pointPadding: 0.2,
                                    borderWidth: 0
                                }
                            },
                            series: seriesArray,

                        };
                        chartConfig.legend = {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'middle',
                            borderWidth: 0
                        };
                        $("#chart_" + chartElement.id).highcharts(chartConfig);
                    });
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

            getSelectedMetricTitle: function () {
                var metricValue = this.selectedMetric();
                var metricName;
                $.each(this.graphMetrics(), function (index, metric) {
                    if (metric.value == metricValue) {
                        metricName = metric.name;
                        return false;
                    }
                });
                return metricName;
            },

            getLabelForMetric: function (metric) {
                var label;
                var that = this;
                $.each(this.chartdef.fields, function (index, field) {
                    if (field == metric) {
                        label = that.chartdef.headers[index];
                        return false;
                    }
                });
                return label;
            }

        };


    });