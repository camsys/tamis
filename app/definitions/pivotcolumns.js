define(
    function () {
        return {
            BridgeFeatureResults: [
                { title: 'Bridge Name', data: 'BridgeName'},
                { title: 'CDS', data: 'RouteId'},
                { title: 'Route Name', data: 'RouteName'},
                { title: 'NHS Class', data: 'NHSClass'},
                { title: 'Lanes', data: 'NumberOfLanes'},
                { title: 'Geographic Area', data: 'Jurisdiction'},
                { title: 'Status', data: 'Status'},
                { title: 'Centerline Miles', data: 'Length', format: '0,000.0000'},
                { title: 'Lane Miles', data: 'LaneMiles', format: '0,000.0000'},
                { title: 'Deck Area', data: 'deckarea', format: '0,000.0000'},
                { title: 'AADT', data: 'AADT', format: '0,000.0000'},
                { title: 'AADT Summary', data: 'aadtbin', format: '0,000.0000'},
                { title: 'Super Structure Condition', data: 'SuperStructure'},
                { title: 'Super Structure Summary', data: 'superstructurebin'},
                { title: 'Sub Structure Condition', data: 'SubStructure'},
                { title: 'Sub Structure Summary', data: 'substructurebin'},
                { title: 'Deck Condition', data: 'DeckCond'},
                { title: 'Deck Summary', data: 'deckbin'},
            ],

            RouteFeatureResults: [
                { title: 'CDS', data: 'RouteId'},
                { title: 'Route Name', data: 'RouteName'},
                { title: 'NHS Class', data: 'NHSClass'},
                { title: 'Lanes', data: 'NumberOfLanes'},
                { title: 'Geographic Area', data: 'Jurisdiction'},
                { title: 'PSR Summary', data: 'PSRSummary'},
                { title: 'Centerline Miles', data: 'Length', format: '0,000.0000'},
                { title: 'Lane Miles', data: 'LaneMiles', format: '0,000.0000'},
                { title: 'Mitigation Present', data: 'MitigationPresent'},
                { title: 'Risk Score', data: 'RiskScore'},
                { title: 'Total Score', data: 'TotalScore'},
                { title: 'AADT', data: 'AADT', format: '0,000.0000'},
                { title: 'AADT Summary', data: 'aadtbin', format: '0,000.0000'},
            ],

            UnstableSlopeFeatureResults: [
                { title: 'Route Name', data: 'RouteName'},
                { title: 'NHS Class', data: 'NHSClass'},
                { title: 'Lanes', data: 'NumberOfLanes'},
                { title: 'Geographic Area', data: 'Jurisdiction'},
                { title: 'PSR Summary', data: 'PSRSummary'},
                { title: 'Mitigation Present', data: 'MitigationPresent'},
                { title: 'Risk Score', data: 'RiskScore'},
                { title: 'Risk Summary', data: 'riskbucket'},
                { title: 'Hazard Score', data: 'HazardScore'},
                { title: 'Hazard Summary', data: 'hazardscorebin'},
                { title: 'Total Score', data: 'TotalScore'},
                { title: 'Total Summary', data: 'totalscorebucket'},
                { title: 'Weighted Score', data: 'WeightedTotal'},
                { title: 'Weighted Summary', data: 'weightedtotalbin'},
            ]
        };
    });
