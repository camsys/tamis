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
                    bins: [{name: "Roughness Summary", value:'Roughness Summary'}],
                    headers: ['Geographic Area', 'NHS Class', 'Miles', 'Lane Miles', 'PSR Summary', 'Count'],
                    fields: ['Jurisdiction', 'NHSClass', 'Length', 'LaneMiles', 'Roughness Summary', 'count'],
                    levels: ['Jurisdiction', 'NHSClass', 'Roughness Summary'],
                    sums: ['Length', 'LaneMiles'],
                    averages: [],
                    dataKey: 'RouteFeatureResults',
                    graphMetrics: [
                        {name: "Centerline Miles", value: "Length"},
                        {name: 'Lane Miles', value: "LaneMiles"},
                    ],
                    levelOrders: [
                        {name: "By Geographic Area, then by NHS Class", value: ['Jurisdiction', 'NHSClass', 'Roughness Summary']},
                        {name: "By NHS Class, then by Geographic Area", value: ['NHSClass', 'Jurisdiction', 'Roughness Summary']}
                    ]
                },
                Bridges: {
                    type: 'bar',
                    bins: [{name: "Minimum Condition Summary", value:'Minimum Condition Summary'}],
                    headers: ['Geographic Area', 'NHS Class', 'Miles', 'Lane Miles', 'Deck Condition', 'Count', 'Minimum Condition Summary'],
                    fields: ['Jurisdiction', 'NHSClass', 'Length', 'LaneMiles', 'DeckCond', 'count', 'Minimum Condition Summary'],
                    levels: ['Jurisdiction', 'NHSClass', 'condition'],
                    sums: ['count'],
                    averages: [],
                    dataKey: 'BridgeFeatureResults',
                    graphMetrics: [
                        {name: "Count", value: "count"},
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
                    bins: [{name: "Roughness Summary", value: "RoughnessSummary"}],
                    headers: ['Miles', 'Lane Miles'],
                    fields: ['Length', 'LaneMiles'],
                    levels: ['RouteName'],
                    sums: ['Length', 'LaneMiles'],
                    averages: [],
                    dataKey: 'RouteFeatureResults',
                    graphMetrics: [
                        {name: "Centerline Miles by Roughness Summary", value: "Length"},
                        {name: 'Lane Miles by Roughness Summary', value: "LaneMiles"},
                    ],
                    levelOrders: [
                        {name: "By Specified Road / CDS", value: []},
                    ]
                },
                Bridges: {
                    type: 'bar',
                    bins: [{name: "Minimum Condition Summary", value: "Minimum Condition Summary"}],
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
                    bins: [{name: "Total Score Summary", value:'totalscorebucket'}],
                    headers: ['Geographic Area', 'Risk Summary', 'Count', 'Hazard Summary', 'Total Score Summary', 'Weighted Total', 'Mitigation Present'],
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
                        {name: "By Geographic Area and Mitigation Present", value: ['Jurisdiction', 'totalscorebucket']},
                    ]
                }
            },

            'Project Crash Analysis': {
                'Projects': {
                    type: 'bar',
                    headers: ['Geographic Area','PDO Crashes','Minor Crashes','Major Crashes','Fatal Crashes'],
                    fields: ['Jurisdiction','PDOCrashes','MinorCrashes','MajorCrashes','FatalCrashes'],
                    levels: ['Jurisdiction'],
                    sums: ['PDOCrashes','MinorCrashes','MajorCrashes','FatalCrashes'],
                    averages: [],
                    tabs: ['Projects'],
                    dataKey: 'ProjectFeatureResults',
                    graphMetrics: [
                        {name: "Crashes by Severity", value: "Crashes by Severity"}
                    ],
                    levelOrders: [
                        {name: "By Geographic Area", value: ['Jurisdiction']},
                    ]
                }
            }
        };
    });
