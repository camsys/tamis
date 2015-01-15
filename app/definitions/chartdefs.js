define(
    function () {
        return {
            'Assets': {
                Roads: {
                    type: 'bar',
                    headers: ['Geographic Area', 'NHS Class', 'Centerline Miles', 'Lane Miles'],
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
                    headers: ['Geographic Area', 'NHS Class', 'Centerline Miles', 'Lane Miles', 'Count'],
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
                        {name: "By NHS Class, then by Geographic Area", value: ['NHSClass', 'Jurisdiction']}
                    ]
                }
            },
            'Asset Conditions': {
                Roads: {
                    type: 'bar',
                    bins: [{name: "PSR Summary", value:'PSRSummary'}],
                    headers: ['Geographic Area', 'NHS Class', 'Miles', 'Lane Miles', 'PSR Summary', 'Count'],
                    fields: ['Jurisdiction', 'NHSClass', 'Length', 'LaneMiles', 'PSRSummary', 'count'],
                    levels: ['Jurisdiction', 'NHSClass', 'condition'],
                    sums: ['Length', 'LaneMiles'],
                    averages: [],
                    dataKey: 'RouteFeatureResults',
                    graphMetrics: [
                        {name: "Centerline Miles", value: "Length"},
                        {name: 'Lane Miles', value: "LaneMiles"},
                    ],
                    levelOrders: [
                        {name: "By Geographic Area, then by NHS Class", value: ['Jurisdiction', 'NHSClass', 'condition']},
                        {name: "By NHS Class, then by Geographic Area", value: ['NHSClass', 'Jurisdiction', 'condition']}
                    ]
                },
                Bridges: {
                    type: 'bar',
                    bins: [{name: "Status", value:'Status'}],
                    headers: ['Geographic Area', 'NHS Class', 'Miles', 'Lane Miles', 'Deck Condition', 'Count'],
                    fields: ['Jurisdiction', 'NHSClass', 'Length', 'LaneMiles', 'DeckCond', 'count'],
                    levels: ['Jurisdiction', 'NHSClass', 'condition'],
                    sums: ['count'],
                    averages: [],
                    dataKey: 'BridgeFeatureResults',
                    graphMetrics: [
                        {name: "Count", value: "countx"},
                    ],
                    levelOrders: [
                        {name: "By Geographic Area, then by NHS Class", value: ['Jurisdiction', 'NHSClass', 'DeckCond']},
                        {name: "By NHS Class, then by Geographic Area", value: ['NHSClass', 'Jurisdiction', 'DeckCond']}
                    ]
                }
            },
            'Conditions of Specified Road / CDS': {
                Roads: {
                    type: 'bar',
                    bins: [{name: "PSR Summary", value: "condition"}],
                    headers: ['Miles', 'Lane Miles'],
                    fields: ['Length', 'LaneMiles'],
                    levels: ['RouteName'],
                    sums: ['Length', 'LaneMiles'],
                    averages: [],
                    dataKey: 'RouteFeatureResults',
                    graphMetrics: [
                        {name: "Centerline Miles by PSR Summary", value: "Length"},
                        {name: 'Lane Miles by PSR Summary', value: "LaneMiles"},
                    ],
                    levelOrders: [
                        {name: "By Specified Road / CDS", value: []},
                    ]
                },
                Bridges: {
                    type: 'bar',
                    bins: [{name: "Status", value: "Status"}],
                    headers: ['Miles', 'Lane Miles', 'Count'],
                    fields: ['Length', 'LaneMiles', 'count'],
                    levels: ['RouteName'],
                    sums: ['count'],
                    averages: [],
                    dataKey: 'BridgeFeatureResults',
                    graphMetrics: [
                        {name: "Count by Status", value: "count"},
                    ],
                    levelOrders: [
                        {name: "By Specified Road / CDS", value: []},
                    ]
                }
            },
            'Unstable Slopes': {
                'Unstable Slopes': {
                    type: 'bar',
                    bins: [{name: "Weighted Score Summary", value:'weightedtotalbin'}],
                    headers: ['Geographic Area', 'Risk Summary', 'Count', 'Hazard Summary', 'Total Summary', 'Weighted Total', 'Mitigation Present'],
                    fields: ['Jurisdiction', 'riskbucket', 'count', 'hazardscorebin', 'totalscorebucket', 'weightedtotalbin', 'MitigationPresent'],
                    levels: ['Jurisdiction', 'MitigationPresent'],
                    sums: ['count'],
                    averages: [],
                    tabs: ['Unstable Slopes'],
                    dataKey: 'UnstableSlopeFeatureResults',
                    graphMetrics: [
                        {name: "Count", value: "count"}
                    ],
                    levelOrders: [
                        {name: "By Geographic Area and Mitigation Present", value: ['Jurisdiction', 'weightedtotalbin']},
                    ]
                }
            },

            'Crash Analysis': {
                'Projects': {
                    type: 'bar',
                    headers: ['Geographic Area','Minor Crashes','Major Crashes','Fatal Crashes'],
                    fields: ['Jurisdiction','MinorCrashes','MajorCrashes','FatalCrashes'],
                    levels: ['Jurisdiction'],
                    sums: ['MinorCrashes','MajorCrashes','FatalCrashes'],
                    averages: [],
                    tabs: ['Projects'],
                    dataKey: 'ProjectFeatureResults',
                    graphMetrics: [
                        {name: "Number of Crashes", value: "Number of Crashes"}
                    ],
                    levelOrders: [
                        {name: "By Geographic Area", value: ['Jurisdiction']},
                    ]
                }
            }

        };
    });
