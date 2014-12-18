define(['plugins/http', 'durandal/app', 'knockout', 'jstree', 'bootstrap', 'jquery-ui', '../config/config', '../config/appstate'],
    function (http, app, ko, jstree, bootstrap, jqueryui, config, appstate) {

        return {
            routes: ko.observableArray([]),
            selectedRoute: ko.observable(),
            routeName: ko.observable(),
            cdsList: ko.observableArray([]),
            selectedCds: ko.observable(),

            resetObservables: function () {
                this.selectedRoute(null);
                this.cdsList([]);
                this.selectedCds(null);
                $('#selectRoute').val('');
            },

            activate: function () {

                var that = this;
                this.selectedRoute.subscribe(function (newValue) {
                    if (newValue) {
                        $(that.routes()).each(function (index, route) {
                            if (route.Id == newValue) {
                                that.routeName(route.Name);
                                var cdsList = route.Id.split(",");
                                cdsList.sort(function (a, b) {
                                    return a - b
                                });
                                that.cdsList(cdsList);
                                if(cdsList.length == 1){
                                    that.selectedCds(cdsList[0]);
                                }
                                return false;
                            }
                        });
                    } else {
                        that.routeName(null);
                    }
                });
                var that = this;
                that.routes(appstate.filterValues.routes);

            },

            bindingComplete: function () {

                var that = this;

                jQuery.fn.filterByText = function(textbox) {
                    return this.each(function() {

                        var select = this;
                        var options = [];
                        $(that.routes()).each(function() {
                            options.push({value: this.Id, text: this.Name});
                        });
                        $(textbox).bind('change keyup', function() {

                            var search = $(this).val().trim();
                            var regex = new RegExp(search,"gi");

                            $.each(options, function(i) {
                                var option = options[i];
                                if(option.text.match(regex) !== null) {
                                    that.selectedRoute(option.value);
                                    return false;
                                }
                            });
                        });
                    });
                };

                $('#selectRoute').filterByText($('#selectRouteFilter'), false);
            }
        };
    });