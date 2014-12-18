define(
    function () {
        return {
            BridgeFeatureResults: [
                { title: 'Bridge Name', data: 'BridgeName'},
                { title: 'CDS', data: 'RouteId'},
                { title: 'Route Name', data: 'RouteName'},
                { title: 'NHS Class', data: 'NHSClass'},
                { title: 'Lanes', data: 'NumberOfLanes'},
                { title: 'Jurisdiction', data: 'Jurisdiction'},
                { title: 'Status', data: 'Status'},
                { title: 'Deck Condition', data: 'DeckCond'},
                { title: 'Centerline Miles', data: 'Length', format: '0,000.0000'},
                { title: 'Lane Miles', data: 'LaneMiles', format: '0,000.0000'},
                { title: 'Deck Area', data: 'deckarea', format: '0,000.0000'},
            ],

            RouteFeatureResults: [
                { title: 'CDS', data: 'RouteId'},
                { title: 'Route Name', data: 'RouteName'},
                { title: 'NHS Class', data: 'NHSClass'},
                { title: 'Lanes', data: 'NumberOfLanes'},
                { title: 'Jurisdiction', data: 'Jurisdiction'},
                { title: 'Pavement Condition', data: 'PavementCond'},
                { title: 'Centerline Miles', data: 'Length', format: '0,000.0000'},
                { title: 'Lane Miles', data: 'LaneMiles', format: '0,000.0000'},
                { title: 'Mitigation Present', data: 'MitigationPresent'},
                { title: 'Risk Score', data: 'RiskScore'},
                { title: 'Total Score', data: 'TotalScore'},
                { title: 'AADT', data: 'aadt', format: '0,000.0000'},
            ],

            UnstableSlopeFeatureResults: [
                { title: 'CDS', data: 'RouteId'},
                { title: 'Route Name', data: 'RouteName'},
                { title: 'NHS Class', data: 'NHSClass'},
                { title: 'Lanes', data: 'NumberOfLanes'},
                { title: 'Jurisdiction', data: 'Jurisdiction'},
                { title: 'Pavement Condition', data: 'PavementCond'},
                { title: 'Centerline Miles', data: 'Length', format: '0,000.0000'},
                { title: 'Lane Miles', data: 'LaneMiles', format: '0,000.0000'},
                { title: 'Mitigation Present', data: 'MitigationPresent'},
                { title: 'Risk Score', data: 'RiskScore'},
                { title: 'Total Score', data: 'TotalScore'},
                { title: 'AADT', data: 'aadt', format: '0,000.0000'},
                { title: 'Weighted Total', data: 'WeightedTotal'},
            ]
        };
    });
