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
                    'Total Centerline Miles by Geographic Area, NHS Class, and Pavement Condition': {
                        rows: ["Geographic Area", "NHS Class"],
                        cols: ["Pavement Condition"],
                        rendererName: "Table",
                        aggregatorName: "Sum",
                        vals: ["Centerline Miles"]
                    },
                    'Total Lane Miles by Geographic Area, NHS Class, and Pavement Condition': {
                        rows: ["Geographic Area", "NHS Class"],
                        cols: ["Pavement Condition"],
                        rendererName: "Table",
                        aggregatorName: "Sum",
                        vals: ["Lane Miles"]
                    },
                },
                'Bridges': {
                    'Number of Bridges by Geographic Area, NHS Class, and Deck Condition': {
                        rows: ["Geographic Area", "NHS Class"],
                        cols: ["Deck Condition"],
                        rendererName: "Table",
                        aggregatorName: "Count",
                        vals: []
                    },
                    'Number of Bridges by Geographic Area, NHS Class, and Bridge Status': {
                        rows: ["Jurisdiction", "NHS Class"],
                        cols: ["Status"],
                        rendererName: "Table",
                        aggregatorName: "Count",
                        vals: []
                    },
                    'Sum of Deck Area by Geographic Area, NHS Class, and Bridge Status': {
                        rows: ["Geographic Area", "NHS Class"],
                        cols: ["Status"],
                        rendererName: "Table",
                        aggregatorName: "Sum",
                        vals: ["Deck Area"]
                    },
                }
            },

            'Conditions of Specified Road / CDS': {
                'Roads': {
                    'Total Lane Miles by NHS Class, and Pavement Condition': {
                        rows: ["Geographic Area", "NHS Class"],
                        cols: ["Pavement Condition"],
                        rendererName: "Table",
                        aggregatorName: "Sum",
                        vals: ["Lane Miles"]
                    },
                    'Total Centerline Miles by NHS Class, and Pavement Condition': {
                        rows: ["Geographic Area", "NHS Class"],
                        cols: ["Pavement Condition"],
                        rendererName: "Table",
                        aggregatorName: "Sum",
                        vals: ["Centerline Miles"]
                    },
                },
                'Bridges': {
                    'Number of Bridges by NHS Class and Status': {
                        rows: ["NHS Class"],
                        cols: ["Status"],
                        rendererName: "Table",
                        aggregatorName: "Count",
                        vals: []
                    },
                    'Number of Bridges by NHS Class and Deck Condition': {
                        rows: ["NHS Class"],
                        cols: ["Deck Condition"],
                        rendererName: "Table",
                        aggregatorName: "Count",
                        vals: []
                    },
                    'Sum of Deck Area by NHS Class and Deck Condition': {
                        rows: ["NHS Class"],
                        cols: ["Deck Condition"],
                        rendererName: "Table",
                        aggregatorName: "Sum",
                        vals: ["Deck Area"]
                    },
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
                    'Average Weighted Score by Geographic Area and Mitigation Present': {
                        rows: ["Geographic Area"],
                        cols: ["Mitigation Present"],
                        rendererName: "Table",
                        aggregatorName: "Average",
                        vals: ["Weighted Score"]
                    },
                }
            },
        };
    });
