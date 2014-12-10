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
                                return false;
                            }
                        });
                    } else {
                        that.routeName(null);
                    }
                });
                var that = this;
                that.routes(appstate.filterValues.routes);
            }
        };
    });