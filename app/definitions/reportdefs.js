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
                    bins: [{name: "PSR Summary", value:'PSRSummary'}],
                    headers: ['Geographic Area', 'NHS Class', 'PSR Summary', 'Miles', 'Lane Miles'],
                    fields: ['Jurisdiction', 'NHSClass', 'Length', 'LaneMiles', 'PSRSummary'],
                    levels: ['Jurisdiction', 'NHSClass', 'PSRSummary'],
                    sums: ['Length', 'LaneMiles'],
                    averages: [],
                    dataKey: 'RouteFeatureResults',
                    graphMetrics: [
                        {name: "Miles", value: "Length"},
                        {name: 'Lane Miles', value: "LaneMiles"},
                    ],
                    levelOrders: [
                        {name: "By Geographic Area, then by NHS Class", value: ['Jurisdiction', 'NHSClass', 'PSRSummary']},
                        {name: "By NHS Class, then by Geographic Area", value: ['NHSClass', 'Jurisdiction', 'PSRSummary']}
                    ]
                },
                Bridges: {
                    type: 'bar',
                    bins: [{name: "Status", value:'Status'}],
                    headers: ['Jurisdiction', 'NHS Class', 'Status', 'Count'],
                    fields: ['Jurisdiction', 'NHSClass', 'Status', 'count'],
                    levels: ['Jurisdiction', 'NHSClass', 'Status'],
                    sums: ['count'],
                    averages: [],
                    dataKey: 'BridgeFeatureResults',
                    graphMetrics: [
                        {name: "Count", value: "count"},
                    ],
                    levelOrders: [
                        {name: "By Geographic Area, then by NHS Class", value: ['Jurisdiction', 'NHSClass', 'Status']},
                        {name: "By NHS Class, then by Geographic Area", value: ['NHSClass', 'Jurisdiction', 'Status']}
                    ]
                }
            },
            'Conditions of Specified Road / CDS': {
                Roads: {
                    type: 'bar',
                    bins: [{name: "PSR Summary", value:'PSRSummary'}],
                    headers: ['NHS Class', 'PSR Summary', 'Miles', 'Lane Miles'],
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
                    bins: [{name: "Status", value:'Status'}],
                    headers: ['NHS Class', 'Status', 'Count', 'Deck Area'],
                    fields: ['NHSClass', 'Status', 'count', 'DeckArea'],
                    levels: ['NHSClass', 'Status'],
                    sums: ['count', 'DeckArea'],
                    averages: [],
                    dataKey: 'BridgeFeatureResults',
                    graphMetrics: [
                        {name: "Count", value: "count"},
                        {name: 'Deck Area', value: "DeckArea"},
                    ],
                    levelOrders: [
                        {name: "By NHS Class", value: ['NHSClass', 'Status']}
                    ]
                }
            },
            'Unstable Slopes': {
                'Unstable Slopes': {
                    type: 'bar',
                    headers: ['Geographic Area', 'Weighted Total Summary', 'Count'],
                    fields: ['Jurisdiction', 'weightedtotalbin', 'count'],
                    levels: ['Jurisdiction', 'weightedtotalbin'],
                    sums: ['count'],
                    averages: [],
                    tabs: ['Unstable Slopes'],
                    dataKey: 'UnstableSlopeFeatureResults',
                    graphMetrics: [
                        {name: "Count", value: "count"}
                    ],
                    levelOrders: [
                        {name: "By Geographic Area", value: ['Jurisdiction', 'weightedtotalbin']}
                    ]
                }
            },
            'Crash Analysis': {
                'Projects': {
                    type: 'bar',
                    headers: ['Geographic Area', 'Projects', 'Lane Miles', 'VMT', 'Crashes', 'Minor', 'Major', 'Fatal'],
                    fields: ['Jurisdiction', 'count', 'LaneMiles', 'VMT', 'totalcrashes', 'MinorCrashes', 'MajorCrashes', 'FatalCrashes'],
                    levels: ['Jurisdiction'],
                    sums: ['count', 'LaneMiles', 'VMT', 'totalcrashes', 'MinorCrashes', 'MajorCrashes', 'FatalCrashes'],
                    averages: [],
                    tabs: ['Crash Analysis'],
                    dataKey: 'ProjectFeatureResults',
                    levelOrders: [
                        {name: "By Region", value: ['Jurisdiction']}
                    ]
                }
            },
        };
    });
