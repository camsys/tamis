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
                        { title: 'Begin Mile', data: 'FromMP', format: '0,000.0000'},
                        { title: 'End Mile', data: 'ToMP', format: '0,000.0000'},
                        { title: 'Number of Lanes', data: 'NumberOfLanes'},
                        { title: 'Centerline Miles', data: 'Length', format: '0,000.0000'},
                        { title: 'Lane Miles', data: 'LaneMiles', format: '0,000.0000'},
                        { title: 'AADT', data: 'AADT', format: '0,000.0000'},
                    ],

                    RouteFeatureResults: [
                        { title: 'Geographic Area', data: 'Jurisdiction'},
                        { title: 'NHS Class', data: 'NHSClass'},
                        { title: 'CDS', data: 'RouteId'},
                        { title: 'Route Name', data: 'RouteName'},
                        { title: 'Begin Mile', data: 'FromMP', format: '0,000.0000'},
                        { title: 'End Mile', data: 'ToMP', format: '0,000.0000'},
                        { title: 'Number of Lanes', data: 'NumberOfLanes'},
                        { title: 'Centerline Miles', data: 'Length', format: '0,000.0000'},
                        { title: 'Lane Miles', data: 'LaneMiles', format: '0,000.0000'},
                        { title: 'AADT', data: 'AADT', format: '0,000.0000'},
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
                        { title: 'Begin Mile', data: 'FromMP', format: '0,000.0000'},
                        { title: 'End Mile', data: 'ToMP', format: '0,000.0000'},
                        { title: 'Number of Lanes', data: 'NumberOfLanes'},
                        { title: 'Centerline Miles', data: 'Length', format: '0,000.0000'},
                        { title: 'Lane Miles', data: 'LaneMiles'},
                        { title: 'AADT', data: 'AADT', format: '0,000.0000'},
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
                        { title: 'Begin Mile', data: 'FromMP', format: '0,000.0000'},
                        { title: 'End Mile', data: 'ToMP', format: '0,000.0000'},
                        { title: 'Number of Lanes', data: 'NumberOfLanes'},
                        { title: 'Centerline Miles', data: 'Length', format: '0,000.0000'},
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
                        { title: 'CDS', data: 'RouteId'},
                        { title: 'Bridge Name', data: 'BridgeName'},
                        { title: 'Route Name', data: 'RouteName'},
                        { title: 'NHS Class', data: 'NHSClass'},
                        { title: 'Centerline Miles', data: 'Length', format: '0,000.0000'},
                        { title: 'Lane Miles', data: 'LaneMiles'},
                        { title: 'Lanes', data: 'NumberOfLanes'},
                        { title: 'Structure Length', data: 'StructureLength'},
                        { title: 'Status', data: 'Status'},
                        { title: 'Deck Condition', data: 'DeckCond'},
                        { title: 'Deck Width', data: 'DeckWidth'},
                        { title: 'Deck Area', data: 'DeckArea'},
                        { title: 'Structure Length', data: 'StructureLength'},
                        { title: 'Sub Structure', data: 'SubStructure'},
                        { title: 'Super Structure', data: 'SuperStructure'},
                        { title: 'Begin Mile', data: 'FromMP', format: '0,000.0000'},
                        { title: 'End Mile', data: 'ToMP', format: '0,000.0000'},
                        { title: 'AADT', data: 'AADT', format: '0,000.0000'},
                    ],

                    RouteFeatureResults: [
                        { title: 'NHS Class', data: 'NHSClass'},
                        { title: 'CDS', data: 'RouteId'},
                        { title: 'Route Name', data: 'RouteName'},
                        { title: 'Begin Mile', data: 'FromMP', format: '0,000.0000'},
                        { title: 'End Mile', data: 'ToMP', format: '0,000.0000'},
                        { title: 'Number of Lanes', data: 'NumberOfLanes'},
                        { title: 'Centerline Miles', data: 'Length', format: '0,000.0000'},
                        { title: 'Lane Miles', data: 'LaneMiles'},
                        { title: 'AADT', data: 'AADT', format: '0,000.0000'},
                        { title: 'PSR Summary', data: 'PSRSummary'},
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
                        { title: 'AADT', data: 'AADT', format: '0,000.0000'},
                    ],

                    RouteFeatureResults: [
                        { title: 'CDS', data: 'RouteId'},
                        { title: 'Route Name', data: 'RouteName'},
                        { title: 'NHS Class', data: 'NHSClass'},
                        { title: 'Lanes', data: 'NumberOfLanes'},
                        { title: 'Geographic Area', data: 'Jurisdiction'},
                        { title: 'Begin Mile', data: 'FromMP', format: '0,000.0000'},
                        { title: 'End Mile', data: 'ToMP', format: '0,000.0000'},
                        { title: 'Centerline Miles', data: 'Length', format: '0,000.0000'},
                        { title: 'AADT', data: 'AADT', format: '0,000.0000'},
                    ]
                }
            },
        };
    });
