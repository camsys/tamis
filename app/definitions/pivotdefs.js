define(
    function () {
        return {
            'Assets': {
                'Roads': {
                    'Total Centerline Miles by Jurisdiction and NHS Class': {
                        rows: ["NHS Class"],
                        cols: ["Jurisdiction"],
                        rendererName: "Table",
                        aggregatorName: "Sum",
                        vals: ["Centerline Miles"]
                    },
                    'Total Lane Miles by Jurisdiction and NHS Class': {
                        rows: ["NHS Class"],
                        cols: ["Jurisdiction"],
                        rendererName: "Table",
                        aggregatorName: "Sum",
                        vals: ["Lane Miles"]
                    },
                },
                'Bridges': {
                    'Number of Bridges by Jurisdiction and NHS Class': {
                        rows: ["NHS Class"],
                        cols: ["Jurisdiction"],
                        rendererName: "Table",
                        aggregatorName: "Count Unique Values",
                        vals: ["Bridge Name"]
                    },
                    'Total Centerline Miles by Jurisdiction and NHS Class': {
                        rows: ["NHS Class"],
                        cols: ["Jurisdiction"],
                        rendererName: "Table",
                        aggregatorName: "Sum",
                        vals: ["Centerline Miles"]
                    },
                    'Average Lane Count by Jurisdiction and NHS Class': {
                        rows: ["NHS Class"],
                        cols: ["Jurisdiction"],
                        rendererName: "Table",
                        aggregatorName: "Average",
                        vals: ["Centerline Miles"]
                    },
                }
            },
            'Asset Conditions': {
                'Roads': {
                    'Total Centerline Miles by Jurisdiction, NHS Class, and Pavement Condition': {
                        rows: ["Jurisdiction", "NHS Class"],
                        cols: ["Pavement Condition"],
                        rendererName: "Table",
                        aggregatorName: "Sum",
                        vals: ["Centerline Miles"]
                    },
                    'Total Lane Miles by Jurisdiction, NHS Class, and Pavement Condition': {
                        rows: ["Jurisdiction", "NHS Class"],
                        cols: ["Pavement Condition"],
                        rendererName: "Table",
                        aggregatorName: "Sum",
                        vals: ["Lane Miles"]
                    },
                },
                'Bridges': {
                    'Number of Bridges by Jurisdiction, NHS Class, and Deck Condition': {
                        rows: ["Jurisdiction", "NHS Class"],
                        cols: ["Deck Condition"],
                        rendererName: "Table",
                        aggregatorName: "Count Unique Values",
                        vals: ["Bridge Name"]
                    },
                    'Number of Bridges by Jurisdiction, NHS Class, and Bridge Status': {
                        rows: ["Jurisdiction", "NHS Class"],
                        cols: ["Status"],
                        rendererName: "Table",
                        aggregatorName: "Count Unique Values",
                        vals: ["Bridge Name"]
                    },
                    'Sum of Deck Area by Jurisdiction, NHS Class, and Bridge Status': {
                        rows: ["Jurisdiction", "NHS Class"],
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
                        rows: ["Jurisdiction", "NHS Class"],
                        cols: ["Pavement Condition"],
                        rendererName: "Table",
                        aggregatorName: "Sum",
                        vals: ["Lane Miles"]
                    },
                    'Total Centerline Miles by NHS Class, and Pavement Condition': {
                        rows: ["Jurisdiction", "NHS Class"],
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
                        aggregatorName: "Count Unique Values",
                        vals: ["Bridge Name"]
                    },
                    'Number of Bridges by NHS Class and Deck Condition': {
                        rows: ["NHS Class"],
                        cols: ["Deck Condition"],
                        rendererName: "Table",
                        aggregatorName: "Count Unique Values",
                        vals: ["Bridge Name"]
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
                    'Count of Unstable Slopes by Jurisdiction': {
                        rows: ["Jurisdiction"],
                        cols: [],
                        rendererName: "Table",
                        aggregatorName: "Count",
                        vals: []
                    },
                    'Average Total Score by Jurisdiction and Mitigation Present': {
                        rows: ["Jurisdiction"],
                        cols: ["Mitigation Present"],
                        rendererName: "Table",
                        aggregatorName: "Average",
                        vals: ["Total Score"]
                    },
                    'Average Weighted Score by Jurisdiction': {
                        rows: ["Jurisdiction"],
                        cols: [],
                        rendererName: "Table",
                        aggregatorName: "Average",
                        vals: ["Weighted Total"]
                    },
                }
            },
        };
    });
