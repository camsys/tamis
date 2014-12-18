define(
    function () {
        return {
            validateEmail: function (email) {
                var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                if (!emailReg.test(email) || email.length < 5) {
                    return false;
                } else {
                    return true;
                }
            },

            processFeature: function(feature) {
                if(typeof(feature['Length']) != 'undefined' && typeof(feature['NumberOfLanes']) ){
                    feature.LaneMiles = feature['Length'] * feature['NumberOfLanes']
                } else {
                    feature.LaneMiles = 0;
                }

                if(typeof(feature['StructureLength']) != 'undefined' && typeof(feature['DeckWidth']) != 'undefined'){
                    feature.deckarea = feature['StructureLength'] * feature['DeckWidth'];
                }

                if(typeof(feature['DeckCond']) != 'undefined'){
                    feature.condition = feature['DeckCond'];
                }

                if(typeof(feature['PavementCond']) != 'undefined'){
                    feature.condition = feature['PavementCond'];
                }

                if(typeof(feature['BridgeName']) != 'undefined'){
                    feature.name = feature['BridgeName'];
                }

                if(typeof(feature['BridgeName']) == 'undefined'){
                    feature.name = feature['RouteName'];
                }

                if(typeof(feature['RiskScore']) != 'undefined'){
                    var risk = feature['RiskScore'];
                    if(risk < 81){
                        risk = "0-80";
                    }else if(risk < 161){
                        risk = "081-160";
                    }else if(risk < 241){
                        risk = "161-240";
                    }else if(risk < 3211){
                        risk = "241-320";
                    }else if(risk < 401){
                        risk = "321-400";
                    }
                    feature.riskbucket = risk;
                }

                if(typeof(feature['TotalScore']) != 'undefined'){
                    var risk = feature['TotalScore'];
                    if(risk < 251){
                        risk = "0-250";
                    }else if(risk < 501){
                        risk = "251-500";
                    }else {
                        risk = "500+";
                    }
                    feature.totalscorebucket = risk;
                }

                feature.count = 1;

                return feature;
            }
        };
    });
