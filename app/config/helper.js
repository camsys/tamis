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
                    if(risk < 100){
                        risk = "0-99";
                    }else if(risk < 200){
                        risk = "100-199";
                    }else if(risk > 200){
                        risk = "200+";
                    }
                    feature.riskbucket = risk;
                }

                if(typeof(feature['WeightedTotal']) != 'undefined'){
                    var risk = feature['WeightedTotal'];
                    if(risk <= 0.3){
                        risk = "0-0.3";
                    }else if(risk <= 0.6){
                        risk = "0.3-0.6";
                    }else if(risk <= 1){
                        risk = "0.6-1.0";
                    }
                    feature.weightedtotalbin = risk;
                }

                if(typeof(feature['TotalScore']) != 'undefined'){
                    var risk = feature['TotalScore'];
                    if(risk < 300){
                        risk = "0 to 299";
                    }else if(risk < 600){
                        risk = "300 to 599";
                    }else if(risk > 600){
                        risk = "600+";
                    }
                    feature.totalscorebucket = risk;
                }

                if(typeof(feature['HazardScore']) != 'undefined'){
                    var aadt = feature['HazardScore'];
                    if(aadt < 200){
                        aadt = "0-199";
                    }else if(risk < 400){
                        aadt = "200-399";
                    }else  if(risk > 400){
                        aadt = "400+";
                    }
                    feature.hazardscorebin = aadt;
                }

                if(typeof(feature['AADT']) != 'undefined'){
                    var aadt = feature['AADT'];
                    if(aadt < 20000){
                        aadt = "0 to 19,999";
                    }else if(risk < 40000){
                        aadt = "20,000 to 39,999";
                    }else if(risk > 40000){
                        aadt = "40,000 +";
                    }
                    feature.aadtbin = aadt;
                }

                feature.count = 1;

                return feature;
            }
        };
    });
