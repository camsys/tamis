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

            isNumeric: function( obj ) {
                return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
            },

            applySortableLabels: function(feature){
                if(typeof(feature.Status) != 'undefined'){
                    var status = feature.Status;
                    if(status == 'Structurally Deficient'){
                        feature.Status = '1 Structurally Deficient';
                    } else if(status == 'Functionally Obsolete'){
                        feature.Status = '2 Functionally Obsolete';
                    } else if(status == 'Not Deficient'){
                        feature.Status = '3 Not Deficient';
                    }
                }

                if(typeof(feature.PSRSummary) != 'undefined'){
                    var condition = feature.condition;
                    if(condition == 'Poor'){
                        feature.condition = '1 Poor';
                    } else if(condition == 'Mediocre'){
                        feature.condition = '2 Mediocre';
                    } else if(condition == 'Fair'){
                        feature.condition = '3 Fair';
                    } else if(condition == 'Good'){
                        feature.condition = '4 Good';
                    } else if(condition == 'Very Good'){
                        feature.condition = '5 Very Good';
                    }
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

                if(typeof(feature['PSRSummary']) != 'undefined'){
                    if(feature['PSRSummary'].toString().length < 1) {
                        feature['PSRSummary'] = "No Data"
                    }
                    feature.condition = feature['PSRSummary'];
                }

                if(typeof(feature['Status']) != 'undefined'){
                    if(feature['Status'].toString().length < 1) {
                        feature['Status'] = "No Data"
                    }
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
                    var HazardScore = feature['HazardScore'];
                    if(HazardScore < 200){
                        HazardScore = "0-199";
                    }else if(HazardScore < 400){
                        HazardScore = "200-399";
                    }else  if(HazardScore > 400){
                        HazardScore = "400+";
                    }
                    feature.hazardscorebin = HazardScore;
                }

                if(typeof(feature['AADT']) != 'undefined'){
                    var aadt = feature['AADT'];
                    if(aadt < 20000){
                        aadt = "0 to 19,999";
                    }else if(aadt < 40000){
                        aadt = "20,000 to 39,999";
                    }else if(aadt > 40000){
                        aadt = "40,000 +";
                    }
                    feature.aadtbin = aadt;
                }


                if(typeof(feature['DeckCond']) != 'undefined'){
                    var DeckCond = feature['DeckCond'];
                    if(DeckCond < 5){
                        DeckCond = "Poor";
                    }else if(DeckCond < 7){
                        DeckCond = "Fair";
                    }else if(DeckCond < 10){
                        DeckCond = "Good";
                    }else if(DeckCond == "N"){
                        DeckCond = "N/A";
                    }else{
                        DeckCond = "No Data";
                    }
                    feature.deckbin = DeckCond;
                }

                if(typeof(feature['SubStructure']) != 'undefined'){
                    var SubStructure = feature['SubStructure'];
                    if(SubStructure < 5){
                        SubStructure = "Poor";
                    }else if(SubStructure < 7){
                        SubStructure = "Fair";
                    }else if(SubStructure < 10){
                        SubStructure = "Good";
                    }else if(SubStructure == "N"){
                        SubStructure = "N/A";
                    }else{
                        SubStructure = "No Data";
                    }
                    feature.substructurebin = SubStructure;
                }

                if(typeof(feature['SuperStructure']) != 'undefined'){
                    var SuperStructure = feature['SuperStructure'];
                    if(SuperStructure < 5){
                        SuperStructure = "Poor";
                    }else if(SuperStructure < 7){
                        SuperStructure = "Fair";
                    }else if(SuperStructure < 10){
                        SuperStructure = "Good";
                    }else{
                        SuperStructure = "No Data";
                    }
                    feature.superstructurebin = SuperStructure;
                }

                if(typeof(feature['MinorCrashes']) != 'undefined'){
                    var MinorCrashes = parseInt(feature['MinorCrashes']);
                    var MajorCrashes = parseInt(feature['MajorCrashes']);
                    var FatalCrashes = parseInt(feature['FatalCrashes']);

                    var TotalCrashes = MinorCrashes + MajorCrashes + FatalCrashes;
                    feature.totalcrashes= TotalCrashes;
                    if(TotalCrashes > 0 && TotalCrashes < 3){
                        TotalCrashes = "1-2";
                    }else if(TotalCrashes > 2){
                        TotalCrashes = "3+";
                    }
                    feature['Total Crash Summary'] = TotalCrashes;

                    TotalCrashes = MajorCrashes + FatalCrashes;
                    if(TotalCrashes > 1){
                        TotalCrashes = "2+";
                    }
                    feature['Major and Fatal Crash Summary'] = TotalCrashes;

                    TotalCrashes = FatalCrashes;
                    if(TotalCrashes > 1){
                        TotalCrashes = "1+";
                    }
                    feature['Fatal Crash Summary'] = TotalCrashes;

                    TotalCrashes = MinorCrashes + MajorCrashes + FatalCrashes;
                    var VMT = feature['VMT'];
                    var crashesPerVmt = TotalCrashes / VMT;
                    if(crashesPerVmt > 0 && crashesPerVmt <= 0.0005){
                        crashesPerVmt = "0-0.0005";
                    }else if(TotalCrashes > 0.0005){
                        crashesPerVmt = "0.0005+";
                    }
                    feature['Total Crashes per VMT Summary'] = crashesPerVmt;

                    TotalCrashes = MajorCrashes + FatalCrashes;
                    var VMT = feature['VMT'];
                    var crashesPerVmt = TotalCrashes / VMT;
                    if(crashesPerVmt > 0 && crashesPerVmt <= 0.0002){
                        crashesPerVmt = "0-0.0002";
                    }else if(TotalCrashes > 0.0002){
                        crashesPerVmt = "0.0002+";
                    }
                    feature['Major and Fatal Crashes per VMT Summary'] = crashesPerVmt;

                    TotalCrashes = FatalCrashes;
                    var VMT = feature['VMT'];
                    var crashesPerVmt = TotalCrashes / VMT;
                    if(crashesPerVmt > 0){
                        crashesPerVmt = "> 0";
                    }
                    feature['Fatal Crashes per VMT Summary'] = crashesPerVmt;
                }

                feature.count = 1;

                return feature;
            }
        };
    });
