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
                    'Average Lane Count by Jurisdiction and NHS Class': {
                        rows: ["NHS Class"],
                        cols: ["Jurisdiction"],
                        rendererName: "Table",
                        aggregatorName: "Average",
                        vals: ["Lanes"]
                    }
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
            }
        };
    });
