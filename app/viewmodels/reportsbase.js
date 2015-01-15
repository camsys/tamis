define(['plugins/http', 'durandal/app', 'knockout'],
    function (http, app, ko) {
        return {
            processTree: function (records, depth, levels, sums, averages) {
                var field = levels[depth];
                var keys = {};
                $.each(records, function (key, rec) {
                    key = rec[field];
                    keys[key] = key;
                });
                var aggs = [];
                var keys = Object.keys(keys);
                keys.sort();

                $.each(keys, function (index, key) {
                    var node = [];
                    node.level = field;
                    node.text = key;
                    node.children = [];
                    $.each(records, function (index, rec) {
                        if (rec[field] == key) {
                            $.each(sums, function (index, sum) {
                                if (!node[sum]) {
                                    node[sum] = 0;
                                }
                                node[sum] = node[sum] + rec[sum];
                            });
                            $.each(averages, function (index, average) {
                                if (!node[average]) {
                                    node[average] = 0;
                                }
                                if (rec[average]) {
                                    node[average] = node[average] + rec[average];
                                }
                            });
                            node.children.push(rec);
                        }
                    });
                    aggs.push(node);
                });
                $.each(aggs, function (index, agg) {
                    for (var fieldName in agg) {
                        if (averages.indexOf(fieldName) > -1) {
                            agg[fieldName] = agg[fieldName] / agg.children.length;
                        }
                    }
                });

                var that = this;
                $.each(aggs, function (index, agg) {
                    if (levels.length > depth + 1) {
                        agg.children = that.processTree(agg.children, depth + 1, levels, sums, averages);
                        $.each(agg.children, function (index, child) {
                            child.parent = agg;
                        });
                    }
                });

                return aggs;

            },


            buildTree: function(featureData, reportdef){
                //get distinct values for each level
                var levelKeys = {};
                for (var i = 0; i < featureData.length; i++) {
                    var row = featureData[i];
                    for (var j = 0; j < reportdef.levels.length; j++) {
                        var level = reportdef.levels[j];
                        if (typeof(levelKeys[level]) == 'undefined') {
                            levelKeys[level] = {};
                        }
                        var levelValues = levelKeys[level];
                        var rowValue = row[level];
                        levelValues[rowValue] = true;
                    }
                }


                this.binsums = {};
                var that = this;
                if(reportdef.bins){
                    $.each(featureData, function (index, feature) {
                        $.each(reportdef.sums, function (index, sum) {
                            if (typeof(feature[sum]) !== 'undefined'){
                                $.each(reportdef.bins, function (index, bin) {
                                    if (typeof(feature[bin.value]) !== 'undefined'){
                                        feature[sum + '|' + bin.name + '|' + feature[bin.value]] = feature[sum];
                                        that.binsums[sum + '|' + bin.name + '|' + feature[bin.value]] = null;
                                    }
                                });
                            }
                        });
                    });
                }

                var originalSums = reportdef.sums;
                reportdef.sums = reportdef.sums.concat(Object.keys(that.binsums));

                //now make the hieararchy
                var root = {};
                root.children = [];
                this.buildReferenceTree(featureData, reportdef, levelKeys, root, 0);

                for (var i = 0; i < featureData.length; i++) {
                    var row = featureData[i];
                    this.writeRowValuesToLeaf(featureData, reportdef, root.children, row, 0);
                }

                reportdef.sums = originalSums;
                if(reportdef.dataKey == 'ProjectFeatureResults'){
                    return root;
                }
                return root.children;
            },

            buildReferenceTree: function (data, reportdef, levelKeys, parentNode, depth) {
                var levels = reportdef.levels
                var thisLevelValues = Object.getOwnPropertyNames(levelKeys[levels[depth]]);
                thisLevelValues.sort();
                for (var i = 0; i < thisLevelValues.length; i++) {
                    var child = {};
                    child.text = thisLevelValues[i];
                    child.children = [];
                    child.parent = parentNode;
                    child.depth = depth;
                    child.level = levels[depth];
                    parentNode.children.push(child);
                    if (depth + 1 < levels.length) {
                        this.buildReferenceTree(data, reportdef, levelKeys, child, depth + 1);
                    }
                }
            },

            writeRowValuesToLeaf: function (data, reportdef, tree, row, depth) {
                var level = reportdef.levels[depth];
                var levelValue = row[level];
                for (var i = 0; i < tree.length; i++) {
                    var child = tree[i];
                    if (child.text == levelValue) {
                        if (!child.children.length > 0) {
                            for (var j = 0; j < reportdef.sums.length; j++) {
                                var sum = reportdef.sums[j];
                                if (typeof(child[sum]) == 'undefined') {
                                    child[sum] = 0;
                                }else{
                                    var num = Number(child[sum]).toFixed(2);
                                    if(num % 1 === 0){
                                       num = Number(child[sum]).toFixed(0);
                                    }
                                    child[sum] = num;
                                }
                                this.addValue(child, sum, row);
                            }
                        } else {
                            this.writeRowValuesToLeaf(data, reportdef, child.children, row, depth + 1);
                        }
                    }
                }
            },

            addValue: function (child, sum, row) {
                if (typeof(row[sum]) == 'undefined') {
                    return;
                }
                if (typeof(child[sum]) == 'undefined') {
                    child[sum] = 0;
                }
                child[sum] = Number(child[sum]) + Number(row[sum]);
                child[sum] = Number(child[sum]).toFixed(2);
                if (child.parent != null) {
                    this.addValue(child.parent, sum, row);
                }
            }
        }
    });
