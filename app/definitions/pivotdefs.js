define(
    function () {
        return {
            'Assets': {
                'Roads': {
                    'Total Centerline Miles by Geographic Area and NHS Class': {
                        rows: ["Geographic Area"],
                        cols: ["NHS Class"],
                        rendererName: "Table",
                        aggregatorName: "Sum",
                        vals: ["Centerline Miles"]
                    },
                    'Average Lane Count by Geographic Area and NHS Class': {
                        rows: ["Geographic Area"],
                        cols: ["NHS Class"],
                        rendererName: "Table",
                        aggregatorName: "Average",
                        vals: ["Lanes"]
                    },
                    'Total Centerline Miles by AADT Summary, Geographic Area, and NHS Class': {
                        rows: ["Geographic Area", "NHS Class"],
                        cols: ["AADT Summary"],
                        rendererName: "Table",
                        aggregatorName: "Sum",
                        vals: ["Centerline Miles"]
                    },
                },
                'Bridges': {
                    'Number of Bridges by Geographic Area and NHS Class': {
                        rows: ["Geographic Area"],
                        cols: ["NHS Class"],
                        rendererName: "Table",
                        aggregatorName: "Count",
                        vals: []
                    },
                    'Total Centerline Miles by Geographic Area and NHS Class': {
                        rows: ["Geographic Area"],
                        cols: ["NHS Class"],
                        rendererName: "Table",
                        aggregatorName: "Sum",
                        vals: ["Centerline Miles"]
                    },
                    'Average Lane Count by Geographic Area and NHS Class': {
                        rows: ["Geographic Area"],
                        cols: ["NHS Class"],
                        rendererName: "Table",
                        aggregatorName: "Average",
                        vals: ["Lanes"]
                    },
                }
            },
            'Asset Conditions': {
                'Roads': {
                    'Total Centerline Miles by Geographic Area, NHS Class, and Roughness Summary': {
                        rows: ["Geographic Area", "NHS Class"],
                        cols: ["Roughness Summary"],
                        rendererName: "Table",
                        aggregatorName: "Sum",
                        vals: ["Centerline Miles"]
                    },
                    'Total Lane Miles by Geographic Area, NHS Class, and Roughness Summary': {
                        rows: ["Geographic Area", "NHS Class"],
                        cols: ["Roughness Summary"],
                        rendererName: "Table",
                        aggregatorName: "Sum",
                        vals: ["Lane Miles"]
                    },
                },
                'Bridges': {
                    'Number of Bridges by Geographic Area, NHS Class, and Deck Summary': {
                        rows: ["Geographic Area", "NHS Class"],
                        cols: ["Deck Summary"],
                        rendererName: "Table",
                        aggregatorName: "Count",
                        vals: []
                    },
                    'Number of Bridges by Geographic Area, NHS Class, and Minimum Condition Summary': {
                        rows: ["Jurisdiction", "NHS Class"],
                        cols: ["Minimum Condition Summary"],
                        rendererName: "Table",
                        aggregatorName: "Count",
                        vals: []
                    },
                    'Sum of Deck Area by Geographic Area, NHS Class, and Deck Condition': {
                        rows: ["Geographic Area", "NHS Class"],
                        cols: ["Deck Condition"],
                        rendererName: "Table",
                        aggregatorName: "Sum",
                        vals: ["Deck Area"]
                    },
                }
            },

            'Conditions of Specified Road / CDS': {
                'Roads': {
                    'Total Lane Miles by Roughness Summary and AADT Summary': {
                        rows: ["Roughness Summary"],
                        cols: ["AADT Summary"],
                        rendererName: "Table",
                        aggregatorName: "Sum",
                        vals: ["Lane Miles"]
                    },
                    'Total Centerline Miles by Roughness Summary and AADT Summary': {
                        rows: ["Roughness Summary"],
                        cols: ["AADT Summary"],
                        rendererName: "Table",
                        aggregatorName: "Sum",
                        vals: ["Centerline Miles"]
                    },
                },
                'Bridges': {
                    'Number of Bridges by Minimum Condition Summary and AADT Summary': {
                        rows: ["Minimum Condition Summary"],
                        cols: ["AADT Summary"],
                        rendererName: "Table",
                        aggregatorName: "Count",
                        vals: []
                    },
                    'Bridge Deck Area by Deck Summary and AADT Summary': {
                        rows: ["Deck Summary"],
                        cols: ["AADT Summary"],
                        rendererName: "Table",
                        aggregatorName: "Sum",
                        vals: ["Deck Area"]
                    }
                }
            },


            'Unstable Slopes': {
                'Unstable Slopes': {
                    'Count of Unstable Slopes by Geographic Area': {
                        rows: ["Geographic Area"],
                        cols: [],
                        rendererName: "Table",
                        aggregatorName: "Count",
                        vals: []
                    },
                    'Average Total Score by Geographic Area and Mitigation Present': {
                        rows: ["Geographic Area"],
                        cols: ["Mitigation Present"],
                        rendererName: "Table",
                        aggregatorName: "Average",
                        vals: ["Total Score"]
                    },
                }
            },

        'Project Crash Analysis': {
                'Projects': {
                    'Major and Fatal Crash Summary by Geographic area': {
                        rows: ["Geographic Area"],
                        cols: ["Major and Fatal Crash Summary"],
                        rendererName: "Table",
                        aggregatorName: "Count",
                        vals: []
                    },
                    'Major and Fatal Crashes per 100M VMT by Geographic area': {
                        rows: ["Geographic Area"],
                        cols: ["Major and Fatal Crashes per 100M VMT"],
                        rendererName: "Table",
                        aggregatorName: "Count",
                        vals: []
                    },
                }
            }
        }
    });
