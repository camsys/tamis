define(
    function () {
        return {
            'Assets': {
                type: 'bar',
                headers: ['Jurisdiction', 'NHS Class', 'Miles', 'Lane Miles'],
                fields: ['Jurisdiction', 'NHSClass', 'Length', 'LaneMiles'],
                levels: ['Jurisdiction', 'NHSClass'],
                sums: ['Length', 'LaneMiles'],
                averages: [],
                tabs: ['Roads', 'Bridges'],
                dataKeys: ['RouteFeatureResults', 'BridgeFeatureResults'],
                graphMetrics: [
                    {name: "Miles", value: "Length"},
                    {name: 'Lane Miles', value: "LaneMiles"},
                ],
                levelOrders: [
                    {name: "By Jurisdiction, then by NHS Class", value: ['Jurisdiction', 'NHSClass']},
                    {name: "By NHS Class, then by Jurisdiction", value: ['NHSClass', 'Jurisdiction']}
                ]
            },
            'Asset Conditions': {
                type: 'bar',
                bins: [{name: "Pavement Condition", value:'PavementCond'}],
                headers: ['Jurisdiction', 'NHS Class', 'Condition', 'Miles', 'Lane Miles'],
                fields: ['Jurisdiction', 'NHSClass', 'Length', 'LaneMiles', 'condition'],
                levels: ['Jurisdiction', 'NHSClass', 'condition'],
                //levels: ['NHSClass', 'Jurisdiction', 'condition'],
                sums: ['Length', 'LaneMiles'],
                averages: [],
                tabs: ['Roads', 'Bridges'],
                dataKeys: ['RouteFeatureResults', 'BridgeFeatureResults'],
                graphMetrics: [
                    {name: "Miles", value: "Length"},
                    {name: 'Lane Miles', value: "LaneMiles"},
                ],
                levelOrders: [
                    {name: "By Jurisdiction, then by NHS Class", value: ['Jurisdiction', 'NHSClass', 'condition']},
                    {name: "By NHS Class, then by Jurisdiction", value: ['NHSClass', 'Jurisdiction', 'condition']}
                ]
            },
            'Conditions of Specified Road / CDS': {
                type: 'bar',
                bins: [{name: "Condition", value: "condition"}],
                headers: ['Miles', 'Lane Miles'],
                fields: ['Length', 'LaneMiles'],
                levels: ['RouteName'],
                sums: ['Length', 'LaneMiles'],
                averages: [],
                tabs: ['Roads', 'Bridges'],
                dataKeys: ['RouteFeatureResults', 'BridgeFeatureResults'],
                graphMetrics: [
                    {name: "Miles", value: "Length"},
                    {name: 'Lane Miles', value: "LaneMiles"},
                ]
            },
            'Unstable Slopes': {
                type: 'bar',
                headers: ['Jurisdiction', 'Risk Score'],
                fields: ['Jurisdiction', 'riskbucket'],
                levels: ['Jurisdiction', 'riskbucket'],
                sums: ['count'],
                averages: [],
                tabs: ['Unstable Slopes'],
                dataKeys: ['UnstableSlopeFeatureResults'],
                graphMetrics: [
                    {name: "Count", value: "count"}
                ],
                levelOrders: [

                ]
            },

        };
    });
