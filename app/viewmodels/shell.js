define(['plugins/router', "durandal/app", 'cookie'], function (router, app, cookie) {
    return {
        router: router,

        activate: function () {
            router.map([
                { route: '', moduleId: 'viewmodels/home', title: "Home", nav: true },
                { route: 'queryconfig', moduleId: 'viewmodels/queryconfig', nav: true, title: "Select" },
                { route: 'queryresults', moduleId: 'viewmodels/queryresults', nav: true, title: "Results" },
                { route: 'charts', moduleId: 'viewmodels/charts', nav: true, title: "Charts" },
                { route: 'reports', moduleId: 'viewmodels/reports', nav: true, title: "Reports" },
                { route: 'explore', moduleId: 'viewmodels/explore', nav: true, title: "Explore" },
                { route: 'querydescription', moduleId: 'viewmodels/querydescription', nav: false},
                /*{durandal:routes}*/
            ]).buildNavigationModel();

            router.guardRoute = function (instance, instruction) {

                var appCookie = $.cookie('name');
                if(instruction.fragment == '' || appCookie){
                    return true;
                }else{
                    return 'viewmodels/home'
                }

            };

            return router.activate();
        },
    };
});