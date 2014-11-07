define(
    function () {
        return {
            'Assets': {
                'Roads': {
                    'Total Centerline Miles by Jurisdiction and Class': {
                        rows: ["Class"],
                        cols: ["Jurisdiction"],
                        rendererName: "Table",
                        aggregatorName: "Sum",
                        vals: ["Length"]
                    },
                    'Average Lane Count by Jurisdiction and Class': {
                        rows: ["Class"],
                        cols: ["Jurisdiction"],
                        rendererName: "Table",
                        aggregatorName: "Average",
                        vals: ["Lanes"]
                    }
                },
                'Bridges': {
                    'Number of Bridges by Jurisdiction and Class': {
                        rows: ["Class"],
                        cols: ["Jurisdiction"],
                        rendererName: "Table",
                        aggregatorName: "Count Unique Values",
                        vals: ["Bridge Name"]
                    },
                    'Total Centerline Miles by Jurisdiction and Class': {
                        rows: ["Class"],
                        cols: ["Jurisdiction"],
                        rendererName: "Table",
                        aggregatorName: "Sum",
                        vals: ["Length"]
                    },
                    'Average Lane Count by Jurisdiction and Class': {
                        rows: ["Class"],
                        cols: ["Jurisdiction"],
                        rendererName: "Table",
                        aggregatorName: "Average",
                        vals: ["Lanes"]
                    },
                }
            }
        };
    });
