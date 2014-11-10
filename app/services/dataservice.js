define(['../config/config'],
    function (config) {
        return {
            getDistricts : function(callback){
                return $.ajax({
                    url: config.districtQueryUrl,
                    jsonpCallback: 'callback1',
                    dataType: "jsonp",
                    success: function (response) {
                        callback(response);
                    }
                })
            },

            getRegions : function(callback){
                return $.ajax({
                    url: config.regionQueryUrl,
                    jsonpCallback: 'callback2',
                    dataType: "jsonp",
                    success: function (response) {
                        callback(response);
                    }
                })
            },

            getAssets : function(callback){
                return $.ajax({
                    url: config.functionalClassQueryUrl,
                    jsonpCallback: 'callback3',
                    dataType: "jsonp",
                    success: function (response) {
                        callback(response);
                    }
                })
            }
        };
    });
