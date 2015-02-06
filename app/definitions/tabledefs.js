define(
    function () {
        return {
            'Assets': {
                tabs: ['Roads', 'Bridges'],
                dataKeys: ['RouteFeatureResults', 'BridgeFeatureResults'],
                columnDefs: {
                    BridgeFeatureResults: [
                        { title: 'Geographic Area', data: 'Jurisdiction'},
                        { title: 'NHS Class', data: 'NHSClass'},
                        { title: 'Bridge Name', data: 'BridgeName'},
                        { title: 'CDS', data: 'RouteId'},
                        { title: 'Route Name', data: 'RouteName'},
                        { title: 'Begin Mile', data: 'FromMP'},
                        { title: 'End Mile', data: 'ToMP'},
                        { title: 'Number of Lanes', data: 'NumberOfLanes'},
                        { title: 'Centerline Miles', data: 'Length'},
                        { title: 'Lane Miles', data: 'LaneMiles'},
                        { title: 'AADT', data: 'AADT'},
                    ],

                    RouteFeatureResults: [
                        { title: 'Geographic Area', data: 'Jurisdiction'},
                        { title: 'NHS Class', data: 'NHSClass'},
                        { title: 'CDS', data: 'RouteId'},
                        { title: 'Route Name', data: 'RouteName'},
                        { title: 'Begin Mile', data: 'FromMP'},
                        { title: 'End Mile', data: 'ToMP'},
                        { title: 'Number of Lanes', data: 'NumberOfLanes'},
                        { title: 'Centerline Miles', data: 'Length'},
                        { title: 'Lane Miles', data: 'LaneMiles'},
                        { title: 'AADT', data: 'AADT'},
                    ]
                }
            },

            'Asset Conditions': {
                tabs: ['Roads', 'Bridges'],
                dataKeys: ['RouteFeatureResults', 'BridgeFeatureResults'],
                columnDefs: {
                    BridgeFeatureResults: [
                        { title: 'Geographic Area', data: 'Jurisdiction'},
                        { title: 'NHS Class', data: 'NHSClass'},
                        { title: 'Bridge Name', data: 'BridgeName'},
                        { title: 'CDS', data: 'RouteId'},
                        { title: 'Route Name', data: 'RouteName'},
                        { title: 'Begin Mile', data: 'FromMP'},
                        { title: 'End Mile', data: 'ToMP'},
                        { title: 'Number of Lanes', data: 'NumberOfLanes'},
                        { title: 'Centerline Miles', data: 'Length'},
                        { title: 'Lane Miles', data: 'LaneMiles'},
                        { title: 'AADT', data: 'AADT'},
                        { title: 'Deck Area', data: 'deckarea'},
                        { title: 'Status', data: 'Status'},
                        { title: 'Deck Condition', data: 'DeckCond'},
                        { title: 'Super Structure Condition', data: 'SuperStructure'},
                        { title: 'Sub Structure Condition', data: 'SubStructure'},
                    ],
                    RouteFeatureResults: [
                        { title: 'Geographic Area', data: 'Jurisdiction'},
                        { title: 'NHS Class', data: 'NHSClass'},
                        { title: 'CDS', data: 'RouteId'},
                        { title: 'Route Name', data: 'RouteName'},
                        { title: 'Begin Mile', data: 'FromMP'},
                        { title: 'End Mile', data: 'ToMP'},
                        { title: 'Number of Lanes', data: 'NumberOfLanes'},
                        { title: 'Centerline Miles', data: 'Length'},
                        { title: 'Lane Miles', data: 'LaneMiles'},
                        { title: 'AADT', data: 'AADT'},
                        { title: 'PSR', data: 'PSR'},
                        { title: 'Mean IRI', data: 'MeanIRI'},
                        { title: 'Rut Depth', data: 'FullRUT'}
                    ]
                }
            },

            'Conditions of Specified Road / CDS': {
                tabs: ['Roads', 'Bridges'],
                dataKeys: ['RouteFeatureResults', 'BridgeFeatureResults'],
                columnDefs: {
                    BridgeFeatureResults: [
                        { title: 'NHS Class', data: 'NHSClass'},
                        { title: 'Bridge Name', data: 'BridgeName'},
                        { title: 'CDS', data: 'RouteId'},
                        { title: 'Route Name', data: 'RouteName'},
                        { title: 'Begin Mile', data: 'FromMP'},
                        { title: 'End Mile', data: 'ToMP'},
                        { title: 'Number of Lanes', data: 'NumberOfLanes'},
                        { title: 'Centerline Miles', data: 'Length'},
                        { title: 'Lane Miles', data: 'LaneMiles'},
                        { title: 'AADT', data: 'AADT'},
                        { title: 'Deck Area', data: 'deckarea'},
                        { title: 'Status', data: 'Status'},
                        { title: 'Deck Condition', data: 'DeckCond'},
                        { title: 'Super Structure Condition', data: 'SuperStructure'},
                        { title: 'Sub Structure Condition', data: 'SubStructure'},
                    ],

                    RouteFeatureResults: [
                        { title: 'NHS Class', data: 'NHSClass'},
                        { title: 'CDS', data: 'RouteId'},
                        { title: 'Route Name', data: 'RouteName'},
                        { title: 'Begin Mile', data: 'FromMP'},
                        { title: 'End Mile', data: 'ToMP'},
                        { title: 'Number of Lanes', data: 'NumberOfLanes'},
                        { title: 'Centerline Miles', data: 'Length'},
                        { title: 'Lane Miles', data: 'LaneMiles'},
                        { title: 'AADT', data: 'AADT'},
                        { title: 'PSR', data: 'PSR'},
                        { title: 'Mean IRI', data: 'MeanIRI'},
                        { title: 'Rut Depth', data: 'FullRUT'}

                    ]
                }
            },

            'Unstable Slopes': {
                tabs: ['Unstable Slopes', 'Roads'],
                dataKeys: ['UnstableSlopeFeatureResults', 'RouteFeatureResults'],
                columnDefs: {

                    UnstableSlopeFeatureResults: [
                        { title: 'Geographic Area', data: 'Jurisdiction'},
                        { title: 'CDS', data: 'RouteId'},
                        { title: 'Route Name', data: 'RouteName'},
                        { title: 'Mile Point', data: 'FromMP'},
                        { title: 'Mitigation Present', data: 'MitigationPresent'},
                        { title: 'Risk Score', data: 'RiskScore'},
                        { title: 'Hazard Score', data: 'HazardScore'},
                        { title: 'Total Score', data: 'TotalScore'},
                        { title: 'Weighted Total', data: 'WeightedTotal'},
                        { title: 'AADT', data: 'AADT'},
                    ],

                    RouteFeatureResults: [
                        { title: 'CDS', data: 'RouteId'},
                        { title: 'Route Name', data: 'RouteName'},
                        { title: 'NHS Class', data: 'NHSClass'},
                        { title: 'Lanes', data: 'NumberOfLanes'},
                        { title: 'Geographic Area', data: 'Jurisdiction'},
                        { title: 'Begin Mile', data: 'FromMP'},
                        { title: 'End Mile', data: 'ToMP'},
                        { title: 'Centerline Miles', data: 'Length'},
                        { title: 'AADT', data: 'AADT'},
                    ]
                }
            },

            'Crash Analysis': {
                tabs: ['Projects'],
                dataKeys: ['ProjectFeatureResults'],
                columnDefs: {
                    ProjectFeatureResults: [
                        { title: 'Geographic Area', data: 'Jurisdiction'},
                        { title: 'Need ID', data: 'NeedId'},
                        { title: 'Program', data: 'Program'},
                        { title: 'Primary Work Category', data: 'PrimWorkCategory'},
                        { title: 'CDS', data: 'RouteId'},
                        { title: 'Road Name', data: 'RouteName'},
                        { title: 'Begin Mile', data: 'FromMP'},
                        { title: 'End Mile', data: 'ToMP'},
                        { title: 'Number Of Lanes', data: 'NumberOfLanes'},
                        { title: 'AADT', data: 'AADT'},
                        { title: 'VMT', data: 'VMT'},
                        { title: 'Number of Minor Crashes', data: 'MinorCrashes'},
                        { title: 'Number of Major Crashes', data: 'MajorCrashes'},
                        { title: 'Number of Fatal Crashes', data: 'FatalCrashes'},
                    ],
                    CrashFeatureResults: [
                        { title: 'Crash Class', data: 'CrashClass'},
                    ]
                }
            },
        };
    });
