define(
    function () {
        return {
            'Assets': {
                Roads: {
                    type: 'bar',
                    headers: ['Jurisdiction', 'NHS Class', 'Centerline Miles', 'Lane Miles'],
                    fields: ['Jurisdiction', 'NHSClass', 'Length', 'LaneMiles'],
                    levels: ['Jurisdiction', 'NHSClass'],
                    sums: ['Length', 'LaneMiles'],
                    averages: [],
                    dataKey: 'RouteFeatureResults',
                    graphMetrics: [
                        {name: "Centerline Miles", value: "Length"},
                        {name: 'Lane Miles', value: "LaneMiles"},
                    ],
                    levelOrders: [
                        {name: "By Geographic Area, then by NHS Class", value: ['Jurisdiction', 'NHSClass']},
                        {name: "By NHS Class, then by Geographic Area", value: ['NHSClass', 'Jurisdiction']}
                    ]
                },
                Bridges: {
                    type: 'bar',
                    headers: ['Jurisdiction', 'NHS Class', 'Centerline Miles', 'Lane Miles', 'Count'],
                    fields: ['Jurisdiction', 'NHSClass', 'Length', 'LaneMiles', 'count'],
                    levels: ['Jurisdiction', 'NHSClass'],
                    sums: ['Length', 'LaneMiles', 'count'],
                    averages: [],
                    dataKey: 'BridgeFeatureResults',
                    graphMetrics: [
                        {name: "Centerline Miles", value: "Length"},
                        {name: 'Lane Miles', value: "LaneMiles"},
                        {name: 'Bridge Count', value: "count"},
                    ],
                    levelOrders: [
                        {name: "By Geographic Area, then by NHS Class", value: ['Jurisdiction', 'NHSClass']},
                        {name: "By NHS Class, then by Geographic Area", value: ['NHSClass', 'Jurisdiction']},
                    ]
                }
            },
            'Asset Conditions': {
                Roads: {
                    type: 'bar',
                    bins: [{name: "Pavement Condition", value:'PavementCond'}],
                    headers: ['Jurisdiction', 'NHS Class', 'Pavement Condition', 'Miles', 'Lane Miles'],
                    fields: ['Jurisdiction', 'NHSClass', 'Length', 'LaneMiles', 'condition'],
                    levels: ['Jurisdiction', 'NHSClass', 'condition'],
                    sums: ['Length', 'LaneMiles'],
                    averages: [],
                    dataKey: 'RouteFeatureResults',
                    graphMetrics: [
                        {name: "Miles", value: "Length"},
                        {name: 'Lane Miles', value: "LaneMiles"},
                    ],
                    levelOrders: [
                        {name: "By Jurisdiction, then by NHS Class", value: ['Jurisdiction', 'NHSClass', 'condition']},
                        {name: "By NHS Class, then by Jurisdiction", value: ['NHSClass', 'Jurisdiction', 'condition']}
                    ]
                },
                Bridges: {
                    type: 'bar',
                    bins: [{name: "Deck Condition", value:'DeckCond'}],
                    headers: ['Jurisdiction', 'NHS Class', 'Deck Condition', 'Count'],
                    fields: ['Jurisdiction', 'NHSClass', 'condition', 'count'],
                    levels: ['Jurisdiction', 'NHSClass', 'condition'],
                    sums: ['count'],
                    averages: [],
                    dataKey: 'BridgeFeatureResults',
                    graphMetrics: [
                        {name: "Count", value: "count"},
                    ],
                    levelOrders: [
                        {name: "By Geographic Area, then by NHS Class", value: ['Jurisdiction', 'NHSClass', 'condition']},
                        {name: "By NHS Class, then by Geographic Area", value: ['NHSClass', 'Jurisdiction', 'condition']}
                    ]
                }
            },
            'Conditions of Specified Road / CDS': {
                Roads: {
                    type: 'bar',
                    bins: [{name: "Pavement Condition", value:'PavementCond'}],
                    headers: ['NHS Class', 'Pavement Condition', 'Miles', 'Lane Miles'],
                    fields: ['NHSClass', 'Length', 'LaneMiles', 'condition'],
                    levels: ['NHSClass', 'condition'],
                    sums: ['Length', 'LaneMiles'],
                    averages: [],
                    dataKey: 'RouteFeatureResults',
                    graphMetrics: [
                        {name: "Miles", value: "Length"},
                        {name: 'Lane Miles', value: "LaneMiles"},
                    ],
                    levelOrders: [
                        {name: "By NHS Class", value: ['NHSClass', 'condition']}
                    ]
                },
                Bridges: {
                    type: 'bar',
                    bins: [{name: "Deck Condition", value:'DeckCond'}],
                    headers: ['NHS Class', 'Deck Condition', 'Count'],
                    fields: ['NHSClass', 'condition', 'count'],
                    levels: ['NHSClass', 'condition'],
                    sums: ['count'],
                    averages: [],
                    dataKey: 'BridgeFeatureResults',
                    graphMetrics: [
                        {name: "Count", value: "count"},
                    ],
                    levelOrders: [
                        {name: "By NHS Class", value: ['NHSClass', 'condition']}
                    ]
                }
            },
            'Unstable Slopes': {
                'Unstable Slopes': {
                    type: 'bar',
                    headers: ['Geographic Area', 'Risk Score', 'Count'],
                    fields: ['Jurisdiction', 'riskbucket', 'count'],
                    levels: ['Jurisdiction', 'riskbucket'],
                    sums: ['count'],
                    averages: [],
                    tabs: ['Unstable Slopes'],
                    dataKey: 'UnstableSlopeFeatureResults',
                    graphMetrics: [
                        {name: "Count", value: "count"}
                    ],
                    levelOrders: [
                        {name: "By Geographic Area", value: ['Jurisdiction', 'riskbucket']}
                    ]
                }
            },

        };
    });
