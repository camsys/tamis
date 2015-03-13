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
                        {name: "By NHS Class, then by Geographic Area", value: ['NHSClass', 'Jurisdiction']},
                    ]
                }
            },
            'Asset Conditions': {
                Roads: {
                    type: 'bar',
                    bins: [{name: "Roughness Summary", value:'Roughness Summary'}],
                    headers: ['Geographic Area', 'NHS Class', 'Roughness Summary', 'Length', 'Lane Miles'],
                    fields: ['Jurisdiction', 'NHSClass', 'Roughness Summary', 'Length', 'LaneMiles'],
                    levels: ['Jurisdiction', 'NHSClass', 'Roughness Summary'],
                    sums: ['Length', 'LaneMiles'],
                    averages: [],
                    dataKey: 'RouteFeatureResults',
                    graphMetrics: [
                        {name: "Miles", value: "Length"},
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
                    headers: ['Jurisdiction', 'NHS Class', 'Minimum Condition Summary', 'Count'],
                    fields: ['Jurisdiction', 'NHSClass', 'Minimum Condition Summary', 'count'],
                    levels: ['Jurisdiction', 'NHSClass', 'Minimum Condition Summary'],
                    sums: ['count'],
                    averages: [],
                    dataKey: 'BridgeFeatureResults',
                    graphMetrics: [
                        {name: "Count", value: "count"},
                    ],
                    levelOrders: [
                        {name: "By Geographic Area, then by NHS Class", value: ['Jurisdiction', 'NHSClass', 'Minimum Condition Summary']},
                        {name: "By NHS Class, then by Geographic Area", value: ['NHSClass', 'Jurisdiction', 'Minimum Condition Summary']}
                    ]
                }
            },
            'Conditions of Specified Road / CDS': {
                Roads: {
                    type: 'bar',
                    bins: [{name: "Roughness Summary", value:'RoughnessSummary'}],
                    headers: ['NHS Class', 'Roughness Summary', 'Miles', 'Lane Miles'],
                    fields: ['NHSClass', 'Roughness Summary', 'Length', 'LaneMiles'],
                    levels: ['NHSClass', 'Roughness Summary'],
                    sums: ['Length', 'LaneMiles'],
                    averages: [],
                    dataKey: 'RouteFeatureResults',
                    graphMetrics: [
                        {name: "Miles", value: "Length"},
                        {name: 'Lane Miles', value: "LaneMiles"},
                    ],
                    levelOrders: [
                        {name: "By NHS Class", value: ['NHSClass', 'Roughness Summary']}
                    ]
                },
                Bridges: {
                    type: 'bar',
                    bins: [{name: "Minimum Condition Summary", value:'Minimum Condition Summary'}],
                    headers: ['NHS Class', 'Status', 'Count', 'Deck Area'],
                    fields: ['NHSClass', 'Minimum Condition Summary', 'count', 'DeckArea'],
                    levels: ['NHSClass', 'Minimum Condition Summary'],
                    sums: ['count', 'DeckArea'],
                    averages: [],
                    dataKey: 'BridgeFeatureResults',
                    graphMetrics: [
                        {name: "Count", value: "count"},
                        {name: 'Deck Area', value: "DeckArea"},
                    ],
                    levelOrders: [
                        {name: "By Minimum Condition Summary", value: ['NHSClass', 'Minimum Condition Summary']}
                    ]
                }
            },
            'Unstable Slopes': {
                'Unstable Slopes': {
                    type: 'bar',
                    headers: ['Geographic Area', 'Total Score Summary', 'Count'],
                    fields: ['Jurisdiction', 'totalscorebucket', 'count'],
                    levels: ['Jurisdiction', 'totalscorebucket'],
                    sums: ['count'],
                    averages: [],
                    tabs: ['Unstable Slopes'],
                    dataKey: 'UnstableSlopeFeatureResults',
                    graphMetrics: [
                        {name: "Count", value: "count"}
                    ],
                    levelOrders: [
                        {name: "By Geographic Area", value: ['Jurisdiction', 'totalscorebucket']}
                    ]
                }
            },
            'Project Crash Analysis': {
                'Projects': {
                    type: 'bar',
                    headers: ['Geographic Area', 'Projects', 'Lane Miles', 'VMT', 'Crashes', 'PDO Crashes','Minor Crashes', 'Major Crashes', 'Fatal Crashes'],
                    fields: ['Jurisdiction', 'count', 'LaneMiles', 'VMT', 'totalcrashes', 'PDOCrashes','MinorCrashes', 'MajorCrashes', 'FatalCrashes'],
                    levels: ['Jurisdiction'],
                    sums: ['count', 'LaneMiles', 'VMT', 'totalcrashes','PDOCrashes', 'MinorCrashes', 'MajorCrashes', 'FatalCrashes'],
                    averages: [],
                    tabs: ['Project Crash Analysis'],
                    dataKey: 'ProjectFeatureResults',
                    graphMetrics: [
                        {name: "Count", value: "count"}
                    ],
                    levelOrders: [
                        {name: "By Region", value: ['Jurisdiction']}
                    ]
                }
            },
        };
    });
