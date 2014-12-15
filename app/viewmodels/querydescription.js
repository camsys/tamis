define(['durandal/system', 'plugins/http', 'durandal/app', 'knockout', '../config/appstate', 'plugins/router'],
    function (system, http, app, ko, appstate, router) {
        return{
            querydescription: ko.observable(),
            querystring: ko.observable(),
            printable: false,
            bindingComplete: function () {
                this.printable = router.activeItem().printable;
                this.querydescription(appstate.querydescription);
                var querystring = 'Selected query: ' + appstate.querydescription.queryName;
                for(var i = 0; i < appstate.querydescription.criteria.length; i++){
                    querystring = querystring + ', ' + appstate.querydescription.criteria[i].name + ': ' + appstate.querydescription.criteria[i].value;
                }
                this.querystring(querystring);
            }
        };
    });