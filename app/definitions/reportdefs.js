define(
    function () {
        return {
            'Assets': {
                type: 'bar',
                headers: ['Jurisdiction', 'NHS Flag', 'Miles', 'Lane Miles'],
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
                    {name: "By Jurisdiction, then by Class", value: ['Jurisdiction', 'NHSClass']},
                    {name: "By NHS Flag, then by Jurisdiction", value: ['NHSClass', 'Jurisdiction']}
                ]
            }
        };
    });
