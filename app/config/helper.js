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
                if(typeof(feature['Deck Summary'] ) != 'undefined'){
                    var deckSummary = feature['Deck Summary']
                    if(deckSummary == 'Good (7 to 9)'){
                        deckSummary = '3 Good (7 to 9)'
                    }
                    if(deckSummary == 'Fair (5 to 6)'){
                        deckSummary = '2 Fair (5 to 6)'
                    }
                    if(deckSummary == 'Poor (0 to 4)'){
                        deckSummary = '1 Poor (0 to 4)'
                    }
                    feature['Deck Summary'] = deckSummary;
                }


                if(typeof(feature['Sub Structure Summary'] ) != 'undefined'){
                    var deckSummary = feature['Sub Structure Summary']
                    if(deckSummary == 'Good (7 to 9)'){
                        deckSummary = '3 Good (7 to 9)'
                    }
                    if(deckSummary == 'Fair (5 to 6)'){
                        deckSummary = '2 Fair (5 to 6)'
                    }
                    if(deckSummary == 'Poor (0 to 4)'){
                        deckSummary = '1 Poor (0 to 4)'
                    }
                    feature['Sub Structure Summary'] = deckSummary;
                }


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
                    var PSRSummary = feature.PSRSummary;
                    if(PSRSummary == 'Very Good (>= 4.0)'){
                        PSRSummary = '5 Very Good (>= 4.0)'
                    }
                    if(PSRSummary == 'Good (>= 3.5 to < 4.0)'){
                        PSRSummary = '4 Good (>= 3.5 to < 4.0)'
                    }
                    if(PSRSummary == 'Fair (>= 3.0 to < 3.5)'){
                        PSRSummary = '3 Fair (>= 3.0 to < 3.5)'
                    }
                    if(PSRSummary == 'Mediocre (>=2.6 to < 3.0)'){
                        PSRSummary = '2 Mediocre (>=2.6 to < 3.0)'
                    }
                    if(PSRSummary == 'Poor (< 2.6)'){
                        PSRSummary = '1 Poor (< 2.6)'
                    }
                    feature.PSRSummary = PSRSummary;
                }

                if(typeof(feature.RUTSummary) != 'undefined'){

                    var RUTSummary = feature.RUTSummary;
                    if(RUTSummary == 'Very Good (0 to 0.2)'){
                        RUTSummary = '5 Very Good (0 to 0.2)'
                    }
                    if(RUTSummary == 'Good (0.2 to 0.33)'){
                        RUTSummary = '4 Good (0.2 to 0.33)'
                    }
                    if(RUTSummary == 'Fair (0.33 to 0.5)'){
                        RUTSummary = '3 Fair (0.33 to 0.5)'
                    }
                    if(RUTSummary == 'Mediocre (0.5 to 0.75)'){
                        RUTSummary = '2 Mediocre (0.5 to 0.75)'
                    }
                    if(RUTSummary == 'Poor (> 0.75)'){
                        RUTSummary = '1 Poor (> 0.75)'
                    }
                    feature.RUTSummary = RUTSummary;
                }

                if(typeof(feature['Roughness Summary']) != 'undefined'){
                    var RoughnessSummary = feature['Roughness Summary'];
                    if(RoughnessSummary == 'Very Good (< 60)'){
                        RoughnessSummary = '5 Very Good (< 60)'
                    }
                    if(RoughnessSummary == 'Good (60 to 94)'){
                        RoughnessSummary = '4 Good (60 to 94)'
                    }
                    if(RoughnessSummary == 'Fair (95 to 119)'){
                        RoughnessSummary = '3 Fair (95 to 119)'
                    }
                    if(RoughnessSummary == 'Mediocre (120 to 170)'){
                        RoughnessSummary = '2 Mediocre (120 to 170)'
                    }
                    if(RoughnessSummary == 'Poor (> 170)'){
                        RoughnessSummary = '1 Poor (> 170)'
                    }
                    feature['Roughness Summary'] = RoughnessSummary;
                }

                if(typeof(feature.deckbin) != 'undefined'){
                    var deckbin = feature.deckbin;
                    if(deckbin == 'Poor (0 to 4)'){
                        feature.deckbin = '1 Poor (0 to 4)';
                    } else if(deckbin == 'Fair (5 to 6)'){
                        feature.deckbin = '2 Fair (5 to 6)';
                    } else if(deckbin == 'Good (7 to 9)'){
                        feature.deckbin = '3 Good (7 to 9)';
                    }
                }

                if(typeof(feature.substructurebin) != 'undefined'){
                    var substructurebin = feature.substructurebin;
                    if(substructurebin == 'Poor (0 to 4)'){
                        feature.substructurebin = '1 Poor (0 to 4)';
                    } else if(substructurebin == 'Fair (5 to 6)'){
                        feature.substructurebin = '2 Fair (5 to 6)';
                    } else if(substructurebin == 'Good (7 to 9)'){
                        feature.substructurebin = '3 Good (7 to 9)';
                    }
                }

                if(typeof(feature.superstructurebin) != 'undefined'){
                    var superstructurebin = feature.superstructurebin;
                    if(superstructurebin == 'Poor (0 to 4)'){
                        feature.superstructurebin = '1 Poor (0 to 4)';
                    } else if(superstructurebin == 'Fair (5 to 6)'){
                        feature.superstructurebin = '2 Fair (5 to 6)';
                    } else if(superstructurebin == 'Good (7 to 9)'){
                        feature.superstructurebin = '3 Good (7 to 9)';
                    }
                }

                if(typeof(feature['Minimum Condition Summary']) != 'undefined'){
                    var mincondsummary = feature['Minimum Condition Summary'];
                    if(mincondsummary == 'Poor (0 to 4)'){
                        feature['Minimum Condition Summary'] = '1 Poor (0 to 4)';
                    } else if(mincondsummary == 'Fair (5 to 6)'){
                        feature['Minimum Condition Summary'] = '2 Fair (5 to 6)';
                    } else if(mincondsummary == 'Good (7 to 9)'){
                        feature['Minimum Condition Summary'] = '3 Good (7 to 9)';
                    }else{
                        feature['Minimum Condition Summary'] = 'No Data';
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
                    feature.PSRSummary = feature['PSRSummary'];
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
                    if(risk < 75){
                        risk = "0-74";
                    }else if(risk < 150){
                        risk = "75-149";
                    }else if(risk > 150){
                        risk = "150+";
                    }
                    feature.riskbucket = risk;
                }

                if(typeof(feature['WeightedTotal']) != 'undefined'){
                    var risk = feature['WeightedTotal'];
                    if(risk <= 0.2){
                        risk = "0-0.2";
                    }else if(risk <= 0.6){
                        risk = "0.2-0.6";
                    }else if(risk <= 1){
                        risk = "0.6-1.0";
                    }
                    feature.weightedtotalbin = risk;
                }

                if(typeof(feature['TotalScore']) != 'undefined'){
                    var risk = feature['TotalScore'];
                    if(risk < 225){
                        risk = "0 to 224";
                    }else if(risk < 450){
                        risk = "225 to 449";
                    }else if(risk > 449){
                        risk = "450+";
                    }
                    feature.totalscorebucket = risk;
                }

                if(typeof(feature['HazardScore']) != 'undefined'){
                    var HazardScore = feature['HazardScore'];
                    if(HazardScore < 150){
                        HazardScore = "0 to 149";
                    }else if(HazardScore < 300){
                        HazardScore = "150 to 299";
                    }else if(HazardScore > 299){
                        HazardScore = "300+";
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

                    if(isNaN(MinorCrashes))
                        MinorCrashes = 0;
                    if(isNaN(MajorCrashes))
                        MajorCrashes = 0;
                    if(isNaN(FatalCrashes))
                        FatalCrashes = 0;

                    var length = feature['Length'];
                    var aadt = feature['AADT'];
                    var VMT = length * aadt * 365;
                    feature.VMT = VMT;

                    var TotalCrashes = MinorCrashes + MajorCrashes + FatalCrashes;
                    feature.totalcrashes= TotalCrashes;
                    if(TotalCrashes > 0 && TotalCrashes < 6){
                        TotalCrashes = "1-5";
                    }else if(TotalCrashes >= 6){
                        TotalCrashes = "6+";
                    }
                    feature['Total Crash Summary'] = TotalCrashes;

                    TotalCrashes = MajorCrashes + FatalCrashes;
                    if(TotalCrashes == 0){
                        TotalCrashes = "0 major or fatal crashes";
                    }else if(MajorCrashes == 1 ){
                        TotalCrashes = "1 major crash";
                    }else if(FatalCrashes > 0 || MajorCrashes > 1 ){
                        TotalCrashes = "2+ major crashes or 1+ fatal crashes";
                    }
                    feature['Major and Fatal Crash Summary'] = TotalCrashes;

                    var multiplier = VMT / 100000000;
                    var majorAndFatalCrashesPerMillionVMT = (MajorCrashes + FatalCrashes) / multiplier;
                    if(VMT == 0){
                        feature['Major and Fatal Crashes per 100M VMT'] = '0';
                    }else if(majorAndFatalCrashesPerMillionVMT == 0){
                        feature['Major and Fatal Crashes per 100M VMT'] = '0';
                    }else if(majorAndFatalCrashesPerMillionVMT <= 5){
                        feature['Major and Fatal Crashes per 100M VMT'] = '> 0 and <= 5';
                    }else if(majorAndFatalCrashesPerMillionVMT == 0){
                        feature['Major and Fatal Crashes per 100M VMT'] = '> 5';
                    }else{
                        feature['Major and Fatal Crashes per 100M VMT'] = '0';
                    }


                    TotalCrashes = FatalCrashes;
                    if(TotalCrashes > 0){
                        TotalCrashes = ">0";
                    }
                    feature['Fatal Crash Summary'] = TotalCrashes;

                    TotalCrashes = MinorCrashes + MajorCrashes + FatalCrashes;

                    feature['VMT'] = VMT;
                    var crashesPerVmt = TotalCrashes / multiplier;
                    if(crashesPerVmt > 0 && crashesPerVmt <= 0.001){
                        crashesPerVmt = "0-0.001";
                    }else if(TotalCrashes > 0.001){
                        crashesPerVmt = "> 0.001";
                    }else{
                        crashesPerVmt = "0-0.001";
                    }
                    feature['Total Crashes per 100M VMT Summary'] = crashesPerVmt;

                    TotalCrashes = MajorCrashes + FatalCrashes;

                    var crashesPerVmt = TotalCrashes / multiplier;
                    if(crashesPerVmt > 0 && crashesPerVmt <= 0.0005){
                        crashesPerVmt = "> 0 and <= 0.0005";
                    }else if(TotalCrashes > 0.0005){
                        crashesPerVmt = "> 0.0005";
                    }else{
                        crashesPerVmt = "0";
                    }
                    feature['Major and Fatal Crashes per 100M VMT Summary'] = crashesPerVmt;

                    TotalCrashes = FatalCrashes;
                    var VMT = feature['VMT'];
                    var crashesPerVmt = TotalCrashes / multiplier;
                    if(crashesPerVmt > 0){
                        crashesPerVmt = "> 0";
                    }
                    feature['Fatal Crashes per 100M VMT Summary'] = crashesPerVmt;
                }

                if(typeof(feature.PSRSummary) != 'undefined'){
                    var PSRSummary = feature.PSRSummary;
                    if(PSRSummary == 'Very Good'){
                        PSRSummary = 'Very Good (>= 4.0)'
                    }
                    if(PSRSummary == 'Good'){
                        PSRSummary = 'Good (>= 3.5 to < 4.0)'
                    }
                    if(PSRSummary == 'Fair'){
                        PSRSummary = 'Fair (>= 3.0 to < 3.5)'
                    }
                    if(PSRSummary == 'Mediocre'){
                        PSRSummary = 'Mediocre (>= 2.6 to < 3.0)'
                    }
                    if(PSRSummary == 'Poor'){
                        PSRSummary = 'Poor (< 2.6)'
                    }
                    feature.PSRSummary = PSRSummary;
                    feature['PSR Summary'] = PSRSummary;
                }

                if(typeof(feature['RoughnessSummary']) != 'undefined'){
                    var RoughnessSummary = feature['RoughnessSummary'];
                    if(RoughnessSummary == 'Very Good'){
                        RoughnessSummary = 'Very Good (< 60)'
                    } else if(RoughnessSummary == 'Good'){
                        RoughnessSummary = 'Good (60 to 94)'
                    } else if(RoughnessSummary == 'Fair'){
                        RoughnessSummary = 'Fair (95 to 119)'
                    }else if(RoughnessSummary == 'Mediocre'){
                        RoughnessSummary = 'Mediocre (120 to 170)'
                    }else if(RoughnessSummary == 'Poor'){
                        RoughnessSummary = 'Poor (> 170)'
                    }else{
                        RoughnessSummary = 'No Data'
                    }
                    feature['Roughness Summary'] = RoughnessSummary;
                }
                if(typeof(feature.RUTSummary) != 'undefined'){
                    var RUTSummary = feature.RUTSummary;
                    if(RUTSummary == 'Very Good'){
                        RUTSummary = 'Very Good (0 to 0.2)'
                    }
                    if(RUTSummary == 'Good'){
                        RUTSummary = 'Good (0.2 to 0.33)'
                    }
                    if(RUTSummary == 'Fair'){
                        RUTSummary = 'Fair (0.33 to 0.5)'
                    }
                    if(RUTSummary == 'Mediocre'){
                        RUTSummary = 'Mediocre (0.5 to 0.75)'
                    }
                    if(RUTSummary == 'Poor'){
                        RUTSummary = 'Poor (> 0.75)'
                    }
                    feature.RUTSummary = RUTSummary;
                    feature['Rut Summary'] = RUTSummary;
                }

                if(typeof(feature.deckbin) != 'undefined'){
                    var deckbin = feature.deckbin;
                    if(deckbin == 'Good'){
                        deckbin = 'Good (7 to 9)'
                    }
                    if(deckbin == 'Fair'){
                        deckbin = 'Fair (5 to 6)'
                    }
                    if(deckbin == 'Poor'){
                        deckbin = 'Poor (0 to 4)'
                    }
                    feature.deckbin = deckbin;
                    feature['Deck Summary'] = deckbin;
                }

                if(typeof(feature.substructurebin) != 'undefined'){
                    var substructurebin = feature.substructurebin;
                    if(substructurebin == 'Good'){
                        substructurebin = 'Good (7 to 9)'
                    }
                    if(substructurebin == 'Fair'){
                        substructurebin = 'Fair (5 to 6)'
                    }
                    if(substructurebin == 'Poor'){
                        substructurebin = 'Poor (0 to 4)'
                    }
                    feature.substructurebin = substructurebin;
                    feature['Sub Structure Summary'] = substructurebin;
                }

                if(typeof(feature.superstructurebin) != 'undefined'){
                    var superstructurebin = feature.superstructurebin;
                    if(superstructurebin == 'Good'){
                        superstructurebin = 'Good (7 to 9)'
                    }
                    if(superstructurebin == 'Fair'){
                        superstructurebin = 'Fair (5 to 6)'
                    }
                    if(superstructurebin == 'Poor'){
                        superstructurebin = 'Poor (0 to 4)'
                    }
                    feature.superstructurebin = superstructurebin;
                    feature['Super Structure Summary'] = superstructurebin;
                }

                if(typeof(feature.superstructurebin) != 'undefined'){
                    var mincond = null;

                    var superstructurebin = feature.SuperStructure;
                    var substructurebin = feature.SubStructure;
                    var deckbin = feature.DeckCond;

                    if(substructurebin && substructurebin == 'N'){
                        mincond = 'N'
                    }else if(substructurebin && substructurebin == 'N'){
                        mincond = 'N'
                    }else if(deckbin && deckbin == 'N'){
                        mincond = 'N'
                    }else{
                        if(superstructurebin && !isNaN(superstructurebin)){
                            mincond = superstructurebin;
                        }else if(substructurebin && !isNaN(substructurebin) && substructurebin < superstructurebin){
                            mincond = substructurebin;
                        }else if(deckbin && !isNaN(deckbin) && deckbin < substructurebin){
                            mincond = deckbin;
                        }
                    }
                    var mincondsummary = null;
                    if(mincond != null && !isNaN(mincond)){
                        if(mincond < 5){
                            mincondsummary = 'Poor (0 to 4)';
                        }else if(mincond < 7){
                            mincondsummary = 'Fair (5 to 6)';
                        }else{
                            mincondsummary = 'Good (7 to 9)';
                        }
                    }else if(mincond == 'N'){
                        mincond = 'N/A'
                    }
                    if(mincondsummary == null){
                        mincondsummary = 'No Data'
                    }
                    feature.minimumconditionsummary = mincondsummary;
                    feature.minimumcondition = mincond;
                    feature['Minimum Condition'] = mincond;
                    feature['Minimum Condition Summary'] = mincondsummary;
                }

                feature.count = 1;

                return feature;
            }
        };
    });
