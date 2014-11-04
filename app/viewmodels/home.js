define(['durandal/system', 'plugins/http', 'durandal/app', 'knockout', 'bootstrap', 'jquery-ui', '../config/appstate', './customModal', 'cookie', 'validator', 'plugins/router'],
    function (system, http, app, ko, bootstrap, jqueryui, appstate, customModal, cookie, validator, router) {


        return{

            hasCookie: ko.observable(false),
            username: ko.observable(),

            activate: function () {

                var appCookie = $.cookie('name');
                if(appCookie){
                    this.hasCookie(true);
                    appstate.username = appCookie;
                    this.username(appstate.username);
                }
            },


            bindingComplete: function () {
                if(!this.hasCookie()){
                    $('#top-menu a').click(function(e) {
                        e.preventDefault();
                    });
                }
            },

            showLoginModal: function () {
                customModal.show().then(function (response) {
                    $('#top-menu a').off('click');
                    router.navigate('queryconfig');
                });
            }

        };


    });