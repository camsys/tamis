define(
    function () {
        return {
            'Assets': {
                tabs: ['Roads', 'Bridges'],
                dataKeys: ['RouteFeatureResults', 'BridgeFeatureResults'],
                columnDefs: {
                    BridgeFeatureResults: [
                        { title: 'Bridge Name', data: 'BridgeName'},
                        { title: 'CDS', data: 'RouteId'},
                        { title: 'Route Name', data: 'RouteName'},
                        { title: 'NHS Class', data: 'NHSClass'},
                        { title: 'Lanes', data: 'NumberOfLanes'},
                        { title: 'Jurisdiction', data: 'Jurisdiction'},
                        { title: 'Begin Mile', data: 'FromMP', format: '0,000.0000'},
                        { title: 'End Mile', data: 'ToMP', format: '0,000.0000'},
                        { title: 'Length', data: 'Length', format: '0,000.0000'}
                    ],

                    RouteFeatureResults: [
                        { title: 'CDS', data: 'RouteId'},
                        { title: 'Route Name', data: 'RouteName'},
                        { title: 'NHS Class', data: 'NHSClass'},
                        { title: 'Lanes', data: 'NumberOfLanes'},
                        { title: 'Jurisdiction', data: 'Jurisdiction'},
                        { title: 'Begin Mile', data: 'FromMP', format: '0,000.0000'},
                        { title: 'End Mile', data: 'ToMP', format: '0,000.0000'},
                        { title: 'Length', data: 'Length', format: '0,000.0000'}
                    ]
                }
            },

            'Asset Conditions': {
                tabs: ['Roads', 'Bridges'],
                dataKeys: ['RouteFeatureResults', 'BridgeFeatureResults'],
                columnDefs: {
                    BridgeFeatureResults: [
                        { title: 'Bridge Name', data: 'BridgeName'},
                        { title: 'Route Name', data: 'RouteName'},
                        { title: 'CDS', data: 'RouteId'},
                        { title: 'Route Name', data: 'RouteName'},
                        { title: 'NHS Class', data: 'NHSClass'},
                        { title: 'Lane Miles', data: 'LaneMiles'},
                        { title: 'Jurisdiction', data: 'Jurisdiction'},
                        { title: 'Structure Length', data: 'StructureLength'},
                        { title: 'Status', data: 'Status'},
                        { title: 'Deck Condition', data: 'DeckCond'},
                        { title: 'Deck Width', data: 'DeckWidth'},
                        { title: 'Structure Length', data: 'StructureLength'},
                        { title: 'Sub Structure', data: 'SubStructure'},
                        { title: 'Super Structure', data: 'SuperStructure'},
                        { title: 'End Mile', data: 'ToMP', format: '0,000.0000'},
                        { title: 'Length', data: 'Length', format: '0,000.0000'}
                    ],
                    RouteFeatureResults: [
                        { title: 'CDS', data: 'RouteId'},
                        { title: 'Route Name', data: 'RouteName'},
                        { title: 'NHS Class', data: 'NHSClass'},
                        { title: 'Lanes', data: 'NumberOfLanes'},
                        { title: 'Jurisdiction', data: 'Jurisdiction'},
                        { title: 'Pavement Condition', data: 'PavementCond'},
                        { title: 'Begin Mile', data: 'FromMP', format: '0,000.0000'},
                        { title: 'End Mile', data: 'ToMP', format: '0,000.0000'},
                        { title: 'Length', data: 'Length', format: '0,000.0000'}
                    ]
                }
            },

            'Conditions of Specified Road / CDS': {
                tabs: ['Roads', 'Bridges'],
                dataKeys: ['RouteFeatureResults', 'BridgeFeatureResults'],
                columnDefs: {
                    BridgeFeatureResults: [
                        { title: 'Bridge Name', data: 'BridgeName'},
                        { title: 'CDS', data: 'RouteId'},
                        { title: 'Route Name', data: 'RouteName'},
                        { title: 'NHS Class', data: 'NHSClass'},
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
                        { title: 'Length', data: 'Length', format: '0,000.0000'}
                    ],

                    RouteFeatureResults: [
                        { title: 'CDS', data: 'RouteId'},
                        { title: 'Route Name', data: 'RouteName'},
                        { title: 'NHS Class', data: 'NHSClass'},
                        { title: 'Lanes', data: 'NumberOfLanes'},
                        { title: 'Pavement Condition', data: 'PavementCond'},
                        { title: 'Begin Mile', data: 'FromMP', format: '0,000.0000'},
                        { title: 'End Mile', data: 'ToMP', format: '0,000.0000'},
                        { title: 'Length', data: 'Length', format: '0,000.0000'}
                    ]
                }
            },

            'Unstable Slopes': {
                tabs: ['Roads', 'Unstable Slopes'],
                dataKeys: ['RouteFeatureResults', 'UnstableSlopeFeatureResults'],
                columnDefs: {
                RouteFeatureResults: [
                        { title: 'CDS', data: 'RouteId'},
                        { title: 'Route Name', data: 'RouteName'},
                        { title: 'NHS Class', data: 'NHSClass'},
                        { title: 'Lanes', data: 'NumberOfLanes'},
                        { title: 'Jurisdiction', data: 'Jurisdiction'},
                        { title: 'Begin Mile', data: 'FromMP', format: '0,000.0000'},
                        { title: 'End Mile', data: 'ToMP', format: '0,000.0000'},
                        { title: 'Length', data: 'Length', format: '0,000.0000'}
                    ],

                    UnstableSlopeFeatureResults: [
                        { title: 'CDS', data: 'RouteId'},
                        { title: 'Route Name', data: 'RouteName'},
                        { title: 'Length', data: 'Length', format: '0,000.0000'},
                        { title: 'Jurisdiction', data: 'Jurisdiction'},
                        { title: 'AADT', data: 'AADT'},
                        { title: 'Hazard Score', data: 'HazardScore'},
                        { title: 'Mitigation Present', data: 'MitigationPresent'},
                        { title: 'Risk Score', data: 'RiskScore'},
                        { title: 'Total Score', data: 'TotalScore'},
                        { title: 'Weighted Total', data: 'WeightedTotal'},
                        { title: 'Begin Mile', data: 'FromMP', format: '0,000.0000'},
                        { title: 'End Mile', data: 'ToMP', format: '0,000.0000'},
                    ]
                }
            },
        };
    });
