
var tamis = tamis || {};

tamis.Map = (function () {

    /* Constants */

    var queries =
    {
        "Assets": {
            "BridgeFeatureResults":[
                {key: 'NHS Class', type: 'Bridges', startColor: 'darkblue', endColor: 'lightblue', default: true},
                {key: 'Number of Lanes', type: 'Bridges', startColor: 'lightblue', endColor: 'darkblue', default: false},
                {key: 'AADT Summary', type: 'Bridges', startColor: 'lightblue', endColor: 'darkblue', default: false},
            ],
            "RouteFeatureResults": [
                {key: 'NHS Class', type: 'Roads', startColor: 'darkblue', endColor: 'lightblue', default: true},
                {key: 'Number of Lanes', type: 'Roads', startColor: 'lightblue', endColor: 'darkblue', default: false},
                {key: 'AADT Summary', type: 'Roads', startColor: 'lightblue', endColor: 'darkblue', default: false},
            ]
        },
        "Asset Conditions": {
            "BridgeFeatureResults":[
                {key: 'Status', type: 'Bridges', default: true,
                    colors: [{key: "Structurally Deficient", color: "red"},{key: "Functionally Obsolete", color: "yellow"},{key: "Not Deficient", color: "green"}]
                },
                {key: 'Deck Summary', type: 'Bridges', default: false,
                    colors: [{key: "Good", color: "green"},{key: "Fair", color: "yellow"},{key: "Poor", color: "red"},{key: "Poor", color: "red"},{key: "N/A", color: "#D3D3D3"}]
                },
                {key: 'Super Structure Summary', type: 'Bridges', default: false,
                    colors: [{key: "Good", color: "green"},{key: "Fair", color: "yellow"},{key: "Poor", color: "red"},{key: "Poor", color: "red"},{key: "N/A", color: "#D3D3D3"}]
                },
                {key: 'Sub Structure Summary', type: 'Bridges', default: false,
                    colors: [{key: "Good", color: "green"},{key: "Fair", color: "yellow"},{key: "Poor", color: "red"},{key: "Poor", color: "red"},{key: "N/A", color: "#D3D3D3"}]
                },
                {key: 'AADT Summary', type: 'Bridges', startColor: 'lightblue', endColor: 'darkblue', default: false},
                {key: 'NHS Class', type: 'Bridges', startColor: 'darkblue', endColor: 'lightblue', default: false},
            ],
            "RouteFeatureResults": [
                {key: 'PSR Summary', type: 'Roads', default: true,
                    colors: [{key: "Very Good", color: "green"}, {key: "Good", color: "#9ACD32"},{key: "Fair", color: "yellow"},{key: "Mediocre", color: "#FF8C00"},{key: "Poor", color: "red"}]
                },
                {key: 'Roughness Summary', type: 'Roads', default: false,
                    colors: [{key: "Very Good", color: "green"}, {key: "Good", color: "#9ACD32"},{key: "Fair", color: "yellow"},{key: "Mediocre", color: "#FF8C00"},{key: "Poor", color: "red"}]
                },
                {key: 'Rut Summary', type: 'Roads', default: false,
                    colors: [{key: "Very Good", color: "green"}, {key: "Good", color: "#9ACD32"},{key: "Fair", color: "yellow"},{key: "Mediocre", color: "#FF8C00"},{key: "Poor", color: "red"}]
                },
                {key: 'AADT Summary', type: 'Roads', startColor: 'lightblue', endColor: 'darkblue', default: false},
                {key: 'NHS Class', type: 'Roads', startColor: 'darkblue', endColor: 'lightblue', default: false},
            ]
        },
        "Conditions of Specified Road / CDS": {
            "BridgeFeatureResults":[
                {key: 'Status', type: 'Bridges', default: true,
                    colors: [{key: "Structurally Deficient", color: "red"},{key: "Functionally Obsolete", color: "yellow"},{key: "Not Deficient", color: "green"}]
                },
                {key: 'Deck Summary', type: 'Bridges', default: false,
                    colors: [{key: "Good", color: "green"},{key: "Fair", color: "yellow"},{key: "Poor", color: "red"},{key: "Poor", color: "red"},{key: "N/A", color: "#D3D3D3"}]
                },
                {key: 'Super Structure Summary', type: 'Bridges', default: false,
                    colors: [{key: "Good", color: "green"},{key: "Fair", color: "yellow"},{key: "Poor", color: "red"},{key: "Poor", color: "red"},{key: "N/A", color: "#D3D3D3"}]
                },
                {key: 'Sub Structure Summary', type: 'Bridges', default: false,
                    colors: [{key: "Good", color: "green"},{key: "Fair", color: "yellow"},{key: "Poor", color: "red"},{key: "Poor", color: "red"},{key: "N/A", color: "#D3D3D3"}]
                },
                {key: 'AADT Summary', type: 'Bridges', startColor: 'lightblue', endColor: 'darkblue', default: false},
                {key: 'NHS Class', type: 'Bridges', startColor: 'darkblue', endColor: 'lightblue', default: false},
            ],
            "RouteFeatureResults": [
                {key: 'PSR Summary', type: 'Roads', default: true,
                    colors: [{key: "Very Good", color: "green"}, {key: "Good", color: "#9ACD32"},{key: "Fair", color: "yellow"},{key: "Mediocre", color: "#FF8C00"},{key: "Poor", color: "red"}]
                },
                {key: 'Roughness Summary', type: 'Roads', default: false,
                    colors: [{key: "Very Good", color: "green"}, {key: "Good", color: "#9ACD32"},{key: "Fair", color: "yellow"},{key: "Mediocre", color: "#FF8C00"},{key: "Poor", color: "red"}]
                },
                {key: 'Rut Summary', type: 'Roads', default: false,
                    colors: [{key: "Very Good", color: "green"}, {key: "Good", color: "#9ACD32"},{key: "Fair", color: "yellow"},{key: "Mediocre", color: "#FF8C00"},{key: "Poor", color: "red"}]
                },
                {key: 'AADT Summary', type: 'Roads', startColor: 'lightblue', endColor: 'darkblue', default: false},
                {key: 'NHS Class', type: 'Roads', startColor: 'darkblue', endColor: 'lightblue', default: false},
            ]
        },
        "Unstable Slopes": {
            "UnstableSlopeFeatureResults":[
                {key: 'Risk Score', type: 'Slopes', startColor: 'yellow', endColor: 'red', default: false},
                {key: 'Hazard Score', type: 'Slopes', startColor: 'yellow', endColor: 'red', default: false},
                {key: 'Total Score', type: 'Slopes', startColor: 'yellow', endColor: 'red', default: true},
                {key: 'Weighted Total', type: 'Slopes', startColor: 'yellow', endColor: 'red', default: false},
                {key: 'Mitigation Present', type: 'Slopes', default: false,
                    colors: [{key: "True", color: "green"},{key: "False", color: "red"}]
                },
                {key: 'AADT Summary', type: 'Slopes', startColor: 'lightblue', endColor: 'darkblue', default: false},
            ],
            "RouteFeatureResults": [
                {key: 'AADT Summary', type: 'Roads', startColor: 'lightblue', endColor: 'darkblue', default: true},
            ]
        },
        "Crash Analysis": {
            "CrashFeatureResults":[
                {key: 'Crash Class', type: 'Crashes', default: true,
                    colors: [{key: "Minor", color: "yellow"},{key: "Major", color: "#FF8C00"},{key: "Fatal", color: "red"}]
                },
            ],
            "ProjectFeatureResults": [

                {key: 'Total Crash Summary', type: 'Projects', default: true,
                    colors: [{key: "0", color: "green"},{key: "1-5", color: "yellow"},{key: "6+", color: "red"}]
                },
                {key: 'Major and Fatal Crash Summary', type: 'Projects', default: false,
                    colors: [{key: "0", color: "green"},{key: "1-2", color: "yellow"},{key: "3+", color: "red"}]
                },
                {key: 'Fatal Crash Summary', type: 'Projects', default: false,
                    colors: [{key: "0", color: "green"},{key: ">0", color: "red"}]
                },
                {key: 'Total Crashes per VMT Summary', type: 'Projects', default: false,
                    colors: [{key: "0", color: "green"},{key: "0-0.001", color: "yellow"},{key: ">0.001", color: "red"}]
                },
                {key: 'Major and Fatal Crashes per VMT Summary', type: 'Projects', default: false,
                    colors: [{key: "0", color: "green"},{key: "0-0.0005", color: "yellow"},{key: ">0.0005", color: "red"}]
                },
                {key: 'Fatal Crashes per VMT Summary', type: 'Projects', default: false,
                    colors: [{key: "0", color: "green"},{key: ">0", color: "red"}]
                },
            ]
        }
    };

    var GEOMETRY_TYPE_POINT = 'esriGeometryPoint';
    var GEOMETRY_TYPE_POLYLINE = 'esriGeometryPolyline';
    var GEOMETRY_TYPE_POLYGON = 'esriGeometryPolygon';

    var geometryKey = "Geometry";

    /* Variables */

    var map;
    var mapId = 'map';

    // Symbols
    var markerSymbol;
    var polylineSymbol;
    var polygonSymbol;
    var legendDijit;

    var layers;

    /* Initialization */
    dojo.require("esri.toolbars.draw");
    dojo.require("esri.geometry");
    dojo.require("esri.geometry.jsonUtils");
    dojo.require("esri.layers.FeatureLayer");
    dojo.require("esri.layers.graphics");
    dojo.require("esri.map");
    dojo.require("esri.dijit.Legend");
    dojo.require("esri.dijit.Scalebar");
    dojo.require("esri.toolbars.draw");
    dojo.require("esri.tasks.query");

    function initializeMap() {
        map = new esri.Map(mapId, {
            basemap: "streets",
            showInfoWindowOnClick: true
        });
        $(document).ready(jQueryReady);
    }

    function jQueryReady() {
        parent.$("body").off("loaddata");
        parent.$("body").on("loaddata", function (e) {
            tamis.Map.labels = e.labels;
            tamis.Map.queryName = e.queryName;
            tamis.Map.layers = e.layers;
            setScalebar();
            initializeLegend();
            prepareFeatures();
        });

        parent.$("body").on("rowselect", function (e) {
            rowSelect(e.rowData);
        });
    }

    function prepareFeatures(){
        var layers = tamis.Map.layers;
        var queryName = tamis.Map.queryName;
        var querydef = tamis.Map.queries[queryName];
        var layerLegend = [];
        var layerList = [];
        var featureGraphics = [];
        var typeToLayerMap = {};
        $.each(Object.keys(layers), function (index, layerName) {
            var fields = querydef[layerName];
            var layer = layers[layerName];
            var features = layer.features;

            if(layerName != 'geography'){
                for(var i = 0; i < fields.length; i++){
                    var field = fields[i];
                    var values = getFeatureValues(features, field.key);
                    if(values.length > 0){
                        var symbol = getSymbol(layerName, "#708090");
                        var valueRenderer = new esri.renderer.UniqueValueRenderer(symbol, field.key);
                        valueRenderer.defaultLabel = 'No Data';
                        if(typeof(field.colors) != 'undefined'){
                            var colors = field.colors;
                            for(var j = 0; j < colors.length; j++){
                                var color = field.colors[j];
                                var symbol = getSymbol(layerName, color.color);
                                valueRenderer.addValue(color.key, symbol);
                            }

                        }else{
                            var colors = getColorRamp((values.length > 1 ? values.length: 2), field.startColor, field.endColor);
                            for(var j = 0; j < values.length; j++){
                                var value = values[j];
                                var symbol = getSymbol(layerName, colors[j]);
                                valueRenderer.addValue(value, symbol);
                            }
                        }
                        var geometryType = getGeometryType(layerName);
                        var layer = initializeFeatureCollectionLayer(layerName + '_' + field.key, valueRenderer.toJson(), geometryType);
                        layer.setVisibility(field.default);
                        featureGraphics = featureGraphics.concat(loadGeometryForLayer(layer, features));
                        layerLegend.push({layer: layer, title: field.type + ': ' + field.key});
                        layerList.push(layer);
                        if(typeof(typeToLayerMap[field.type]) == 'undefined'){
                            typeToLayerMap[field.type] = [];
                        }
                        typeToLayerMap[field.type].push(layer);
                    }else{
                        console.log('No values found for field ' + field.key);
                    }
                }
            }else{
                polygonSymbol = new esri.symbol.SimpleFillSymbol(
                    esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                    new esri.symbol.SimpleLineSymbol(
                        esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                        new dojo.Color([160, 32, 240]),
                        2
                    ),
                    new dojo.Color([100, 100, 100, 0.10])
                );

                var layer = initializeFeatureCollectionLayer('geography', new esri.renderer.SimpleRenderer(polygonSymbol).toJson(), GEOMETRY_TYPE_POLYGON);
                loadGeometryForLayer(layer, features)
            }
        });

        tamis.Map.typeToLayerMap = typeToLayerMap;

        legendDijit.refresh(layerLegend);
        buildLayerList();
        map.setExtent(esri.graphicsExtent(featureGraphics))

        tamis.Map.layerInfos = layerLegend;
        fixZindex();
    }

    function fixZindex(){

        var layerIds = map.graphicsLayerIds.slice();
        $.each(layerIds, function (index, graphicsLayerId) {
            var layer = map.getLayer(graphicsLayerId);
            var index;
            if(layer.geometryType == GEOMETRY_TYPE_POLYGON){
                index = 0;
            } else if(layer.geometryType == GEOMETRY_TYPE_POLYLINE){
                index = 1;
            } else if(layer.geometryType == GEOMETRY_TYPE_POINT){
                index = 99999;
            }
            map.reorderLayer(layer, index);
        })

    }

    function loadGeometryForLayer (layer, features) {
        // Using the layer's renderer.
        var isRendererDefined = true;

        layer.clear();
        layer.suspend();
        var geometryType = layer.geometryType;
        var graphics = [];
        for (var i = 0; i < features.length; i++) {
            var featureResult = features[i];
            var geom = featureResult.geometry;
            var newGraphic = createGraphic(geom, geometryType, featureResult, isRendererDefined, i);
            if(newGraphic.geometry.type == 'polyline' && geometryType.toLowerCase().indexOf('point') > -1){
                var point = newGraphic.geometry.getExtent().getCenter();
                newGraphic.geometry = point;
            }
            newGraphic.visible = true;
            graphics.push(newGraphic);
        }

        layer.applyEdits(graphics);
        layer.resume();
        layer.redraw();
        return graphics;
    }

    function getSymbol(layerName, color){
        var symbol;
        if(layerName == 'RouteFeatureResults' || layerName == 'ProjectFeatureResults'){
            symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color(color), 5);
        }else{
            symbol = new esri.symbol.SimpleMarkerSymbol();
            symbol.style = esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE;
            symbol.setSize(12);
            symbol.setColor(new dojo.Color(color));
        }
        return symbol;
    }

    function getGeometryType(layerName){
        if(layerName == 'RouteFeatureResults' || layerName == 'ProjectFeatureResults'){
            return GEOMETRY_TYPE_POLYLINE;
        }else{
            return GEOMETRY_TYPE_POINT;
        }
    }

    function getColorRamp(numberOfItems, startColor, endColor){
        var rainbow = new Rainbow();
        rainbow.setNumberRange(1, numberOfItems);
        rainbow.setSpectrum(startColor, endColor);
        var colors = [];
        for (var i = 1; i <= numberOfItems; i++) {
            var hexColour = rainbow.colourAt(i);
            colors.push('#' + hexColour);
        }
        return colors;
    }

    function getFeatureValues(features, fieldName){
        var values = {};
        $.each(features, function (index, feature) {
            if(typeof(feature[fieldName]) != 'undefined'){
                var value = feature[fieldName];
                if(value != null && value.toString().length > 0){
                    values[value] = null;
                }
            }
        });
        return Object.keys(values).sort();
    }

    function initializeFeatureCollectionLayer(layerName, layerRenderer, geometryType) {

        // We'll add the features later.
        var features = [];

        var layerDefinition = {
            "geometryType": geometryType,
            "objectIdField": "ObjectID",
            "drawingInfo": {
                "renderer": layerRenderer
            },
            "fields": [
                {
                    "name": "ObjectID",
                    "alias": "ObjectID",
                    "type": "esriFieldTypeOID"
                }
            ]
        };
        //create a feature collection
        var featureCollection = {
            "layerDefinition": layerDefinition,
            "featureSet": {
                "features": features,
                "geometryType": geometryType
            }
        };

        //create a feature layer based on the feature collection
        //var infoTemplate = new esri.InfoTemplate("Attributes", "${*}");

        var infoTemplate = new esri.InfoTemplate();
        infoTemplate.setTitle("Feature Attributes");
        infoTemplate.setContent(getTextContent);

        var featureLayer = new esri.layers.FeatureLayer(featureCollection, {
            id: layerName,
            infoTemplate: infoTemplate
        });
        featureLayer.htmlPopupType = esri.layers.FeatureLayer.POPUP_HTML_TEXT;

        map.addLayer(featureLayer);
        return featureLayer;
    }

    function getTextContent(graphic){
        var fieldLabels = tamis.Map.labels[graphic.attributes.dataKey];
        if(!fieldLabels && graphic.getLayer().id == 'geography'){
            return graphic.attributes.attributes[Object.keys(graphic.attributes.attributes)[0]];
        }
        var infoElements = [];
        for(var i = 0; i < fieldLabels.length; i++){
            var fieldLabel = fieldLabels[i];
            if(graphic.attributes[fieldLabel.title]){
                infoElements.push(fieldLabel.title + ": " + graphic.attributes[fieldLabel.title]);
            }
        }
        return infoElements.join('<br/>');
    }

    function buildLayerList() {
        var typeToLayerMap = tamis.Map.typeToLayerMap;
        var items = [];
        $.each(Object.keys(typeToLayerMap), function (index, type) {

            var optionString = '';


            $.each(typeToLayerMap[type], function (index, layer) {
                var label = layer._titleForLegend;
                optionString += "<option value='" + layer.id + "' " + (layer.visible ? "selected" : "") + " >" + label + "</option>";
            })

            var typeVisible = false;
            $.each(typeToLayerMap[type], function (index, layer) {
                var label = layer._titleForLegend;
                if (layer.visible) {
                    typeVisible = true;
                    var item = "<input type='checkbox' class='list_item' onclick='tamis.Map.updateLayerVisibility(this)'" +
                        (layer.visible ? "checked=checked" : "") + "' id='" + layer.id + "'' /><label for='" + layer.id + "'>" + label + "</label>";
                    if (optionString.length > 0) {
                        item += "<br /><select onchange='tamis.Map.updateRenderer(this);'>" + optionString + "</select>​";
                    }
                    item += '<br />';
                    items.push(item);
                }
            })

            if(!typeVisible){
                var layer = typeToLayerMap[type][0];
                var label = layer._titleForLegend;
                var item = "<input type='checkbox' class='list_item' onclick='tamis.Map.updateLayerVisibility(this)'" +
                    (layer.visible ? "checked=checked" : "") + "' id='" + layer.id + "'' /><label for='" + layer.id + "'>" + label + "</label>";
                if (optionString.length > 0) {
                    item += "<br /><select onchange='tamis.Map.updateRenderer(this);'>" + optionString + "</select>​";
                }
                item += '<br />';
                items.push(item);
            }


        })

        var layerList = document.getElementById("layer_list");
        layerList.innerHTML = items.join(' ');
    }

    function updateRenderer(selector) {
        var layerId = $(selector).find('option:selected').val();
        var typeToLayerMap = tamis.Map.typeToLayerMap;
        var selectedType;
        $.each(Object.keys(typeToLayerMap), function (index, type) {
            $.each(typeToLayerMap[type], function (index, layer) {
                if(layer.id == layerId){
                    selectedType = type;
                    return false;
                }
            })
        })

        $.each(typeToLayerMap[selectedType], function (index, layer) {
            if(layer.id == layerId){
                layer.setVisibility(true);
            }else{
                layer.setVisibility(false);
            }
        })

        buildLayerList();
        updateLegend();

    }

    function updateLayerVisibility(checkbox) {
        map.getLayer(checkbox.id).setVisibility(checkbox.checked);
        updateLegend();
    }

    function updateLegend(){
        var layerInfos = [];
        $.each(tamis.Map.layerInfos, function (index, layerInfo) {
            if(layerInfo.layer.visible == true){
                layerInfos.push(layerInfo);
            }
        })
        legendDijit.refresh(layerInfos);
        fixZindex();
    }

    // The legend will automatically update when a layer of a supported type is added.
    function initializeLegend() {
        legendDijit = new esri.dijit.Legend({
            map: map
        }, "legendDiv");
    }

    /**
     * Create a map graphic from the provided geometry and attributes.
     * @param geom The geometry object in Esri Json format.
     * @param geometryType The geometry type (point, polyline, polygon).
     * @param featureResult The original feature result object containing attributes.
     * @param isRendererDefined Whether renderer is already defined for the layer.
     * @param id The unique id for the feature.
     */
    function createGraphic(geom, geometryType, featureResult, isRendererDefined, id) {
        var esriGeom = esri.geometry.fromJson(geom);
        esriGeom.setSpatialReference(map.spatialReference);

        var simpleSymbol = null;
        if (!isRendererDefined) { //if no renderer, then use default simple ones
            switch (geometryType) {
                case GEOMETRY_TYPE_POINT:
                    simpleSymbol = markerSymbol;
                    break;
                case GEOMETRY_TYPE_POLYLINE:
                    simpleSymbol = polylineSymbol;
                    break;
                case GEOMETRY_TYPE_POLYGON:
                    simpleSymbol = polygonSymbol;
                    break;
                default:
                    break;
            }
        }

        var graphic = null;
        // Define the graphic's attributes here. Unique id seems to be necessary for the feature.
        var attributes = JSON.parse(JSON.stringify(featureResult, attributeReplacer));
        attributes["ObjectID"] = id;
        if (simpleSymbol) {
            graphic = new esri.Graphic(esriGeom, simpleSymbol, attributes);
        } else {
            graphic = new esri.Graphic(esriGeom);
            graphic.setAttributes(attributes);
        }

        return graphic;
    }

    /**
     * Skip the geometry when defining attributes.
     */
    function attributeReplacer(key, value) {
        if (key == geometryKey) {
            return undefined;
        }
        return value;
    }

    function setScalebar() {
        var scalebar = new esri.dijit.Scalebar({
            map: map,
            scalebarUnit: 'english'
        });
    }

    function rowSelect(rowData) {
        $(map.graphicsLayerIds).each(function (index, layerId) {
            var featureLayer = map.getLayer(layerId);
            $(featureLayer.graphics).each(function (index, feature) {
                if(feature.attributes.id == rowData.id){

                    if(feature.geometry.type == 'polyline'){
                        var point = feature.geometry.getExtent().getCenter();
                        map.centerAt(point);
                        map.infoWindow.setFeatures([feature]);
                        map.infoWindow.show(feature.geometry.getExtent().getCenter());
                    }else{
                        var point = feature.geometry;
                        map.centerAt(point);
                        map.infoWindow.setFeatures([feature]);
                        map.infoWindow.show(point);
                    }
                    return false;
                }
            });
        });
    }

    function Rainbow()
    {
        "use strict";
        var gradients = null;
        var minNum = 0;
        var maxNum = 100;
        var colours = ['ff0000', 'ffff00', '00ff00', '0000ff'];
        setColours(colours);

        function setColours (spectrum)
        {
            if (spectrum.length < 2) {
                throw new Error('Rainbow must have two or more colours.');
            } else {
                var increment = (maxNum - minNum)/(spectrum.length - 1);
                var firstGradient = new ColourGradient();
                firstGradient.setGradient(spectrum[0], spectrum[1]);
                firstGradient.setNumberRange(minNum, minNum + increment);
                gradients = [ firstGradient ];

                for (var i = 1; i < spectrum.length - 1; i++) {
                    var colourGradient = new ColourGradient();
                    colourGradient.setGradient(spectrum[i], spectrum[i + 1]);
                    colourGradient.setNumberRange(minNum + increment * i, minNum + increment * (i + 1));
                    gradients[i] = colourGradient;
                }

                colours = spectrum;
            }
        }

        this.setSpectrum = function ()
        {
            setColours(arguments);
            return this;
        }

        this.setSpectrumByArray = function (array)
        {
            setColours(array);
            return this;
        }

        this.colourAt = function (number)
        {
            if (isNaN(number)) {
                throw new TypeError(number + ' is not a number');
            } else if (gradients.length === 1) {
                return gradients[0].colourAt(number);
            } else {
                var segment = (maxNum - minNum)/(gradients.length);
                var index = Math.min(Math.floor((Math.max(number, minNum) - minNum)/segment), gradients.length - 1);
                return gradients[index].colourAt(number);
            }
        }

        this.colorAt = this.colourAt;

        this.setNumberRange = function (minNumber, maxNumber)
        {
            if (maxNumber > minNumber) {
                minNum = minNumber;
                maxNum = maxNumber;
                setColours(colours);
            } else {
                throw new RangeError('maxNumber (' + maxNumber + ') is not greater than minNumber (' + minNumber + ')');
            }
            return this;
        }
    }

    function ColourGradient()
    {
        "use strict";
        var startColour = 'ff0000';
        var endColour = '0000ff';
        var minNum = 0;
        var maxNum = 100;

        this.setGradient = function (colourStart, colourEnd)
        {
            startColour = getHexColour(colourStart);
            endColour = getHexColour(colourEnd);
        }

        this.setNumberRange = function (minNumber, maxNumber)
        {
            if (maxNumber > minNumber) {
                minNum = minNumber;
                maxNum = maxNumber;
            } else {
                throw new RangeError('maxNumber (' + maxNumber + ') is not greater than minNumber (' + minNumber + ')');
            }
        }

        this.colourAt = function (number)
        {
            return calcHex(number, startColour.substring(0,2), endColour.substring(0,2))
                + calcHex(number, startColour.substring(2,4), endColour.substring(2,4))
                + calcHex(number, startColour.substring(4,6), endColour.substring(4,6));
        }

        function calcHex(number, channelStart_Base16, channelEnd_Base16)
        {
            var num = number;
            if (num < minNum) {
                num = minNum;
            }
            if (num > maxNum) {
                num = maxNum;
            }
            var numRange = maxNum - minNum;
            var cStart_Base10 = parseInt(channelStart_Base16, 16);
            var cEnd_Base10 = parseInt(channelEnd_Base16, 16);
            var cPerUnit = (cEnd_Base10 - cStart_Base10)/numRange;
            var c_Base10 = Math.round(cPerUnit * (num - minNum) + cStart_Base10);
            return formatHex(c_Base10.toString(16));
        }

        function formatHex(hex)
        {
            if (hex.length === 1) {
                return '0' + hex;
            } else {
                return hex;
            }
        }

        function isHexColour(string)
        {
            var regex = /^#?[0-9a-fA-F]{6}$/i;
            return regex.test(string);
        }

        function getHexColour(string)
        {
            if (isHexColour(string)) {
                return string.substring(string.length - 6, string.length);
            } else {
                var name = string.toLowerCase();
                if (colourNames.hasOwnProperty(name)) {
                    return colourNames[name];
                }
                throw new Error(string + ' is not a valid colour.');
            }
        }

        // Extended list of CSS colornames s taken from
        // http://www.w3.org/TR/css3-color/#svg-color
        var colourNames = {
            aliceblue: "F0F8FF",
            antiquewhite: "FAEBD7",
            aqua: "00FFFF",
            aquamarine: "7FFFD4",
            azure: "F0FFFF",
            beige: "F5F5DC",
            bisque: "FFE4C4",
            black: "000000",
            blanchedalmond: "FFEBCD",
            blue: "0000FF",
            blueviolet: "8A2BE2",
            brown: "A52A2A",
            burlywood: "DEB887",
            cadetblue: "5F9EA0",
            chartreuse: "7FFF00",
            chocolate: "D2691E",
            coral: "FF7F50",
            cornflowerblue: "6495ED",
            cornsilk: "FFF8DC",
            crimson: "DC143C",
            cyan: "00FFFF",
            darkblue: "00008B",
            darkcyan: "008B8B",
            darkgoldenrod: "B8860B",
            darkgray: "A9A9A9",
            darkgreen: "006400",
            darkgrey: "A9A9A9",
            darkkhaki: "BDB76B",
            darkmagenta: "8B008B",
            darkolivegreen: "556B2F",
            darkorange: "FF8C00",
            darkorchid: "9932CC",
            darkred: "8B0000",
            darksalmon: "E9967A",
            darkseagreen: "8FBC8F",
            darkslateblue: "483D8B",
            darkslategray: "2F4F4F",
            darkslategrey: "2F4F4F",
            darkturquoise: "00CED1",
            darkviolet: "9400D3",
            deeppink: "FF1493",
            deepskyblue: "00BFFF",
            dimgray: "696969",
            dimgrey: "696969",
            dodgerblue: "1E90FF",
            firebrick: "B22222",
            floralwhite: "FFFAF0",
            forestgreen: "228B22",
            fuchsia: "FF00FF",
            gainsboro: "DCDCDC",
            ghostwhite: "F8F8FF",
            gold: "FFD700",
            goldenrod: "DAA520",
            gray: "808080",
            green: "008000",
            greenyellow: "ADFF2F",
            grey: "808080",
            honeydew: "F0FFF0",
            hotpink: "FF69B4",
            indianred: "CD5C5C",
            indigo: "4B0082",
            ivory: "FFFFF0",
            khaki: "F0E68C",
            lavender: "E6E6FA",
            lavenderblush: "FFF0F5",
            lawngreen: "7CFC00",
            lemonchiffon: "FFFACD",
            lightblue: "ADD8E6",
            lightcoral: "F08080",
            lightcyan: "E0FFFF",
            lightgoldenrodyellow: "FAFAD2",
            lightgray: "D3D3D3",
            lightgreen: "90EE90",
            lightgrey: "D3D3D3",
            lightpink: "FFB6C1",
            lightsalmon: "FFA07A",
            lightseagreen: "20B2AA",
            lightskyblue: "87CEFA",
            lightslategray: "778899",
            lightslategrey: "778899",
            lightsteelblue: "B0C4DE",
            lightyellow: "FFFFE0",
            lime: "00FF00",
            limegreen: "32CD32",
            linen: "FAF0E6",
            magenta: "FF00FF",
            maroon: "800000",
            mediumaquamarine: "66CDAA",
            mediumblue: "0000CD",
            mediumorchid: "BA55D3",
            mediumpurple: "9370DB",
            mediumseagreen: "3CB371",
            mediumslateblue: "7B68EE",
            mediumspringgreen: "00FA9A",
            mediumturquoise: "48D1CC",
            mediumvioletred: "C71585",
            midnightblue: "191970",
            mintcream: "F5FFFA",
            mistyrose: "FFE4E1",
            moccasin: "FFE4B5",
            navajowhite: "FFDEAD",
            navy: "000080",
            oldlace: "FDF5E6",
            olive: "808000",
            olivedrab: "6B8E23",
            orange: "FFA500",
            orangered: "FF4500",
            orchid: "DA70D6",
            palegoldenrod: "EEE8AA",
            palegreen: "98FB98",
            paleturquoise: "AFEEEE",
            palevioletred: "DB7093",
            papayawhip: "FFEFD5",
            peachpuff: "FFDAB9",
            peru: "CD853F",
            pink: "FFC0CB",
            plum: "DDA0DD",
            powderblue: "B0E0E6",
            purple: "800080",
            red: "FF0000",
            rosybrown: "BC8F8F",
            royalblue: "4169E1",
            saddlebrown: "8B4513",
            salmon: "FA8072",
            sandybrown: "F4A460",
            seagreen: "2E8B57",
            seashell: "FFF5EE",
            sienna: "A0522D",
            silver: "C0C0C0",
            skyblue: "87CEEB",
            slateblue: "6A5ACD",
            slategray: "708090",
            slategrey: "708090",
            snow: "FFFAFA",
            springgreen: "00FF7F",
            steelblue: "4682B4",
            tan: "D2B48C",
            teal: "008080",
            thistle: "D8BFD8",
            tomato: "FF6347",
            turquoise: "40E0D0",
            violet: "EE82EE",
            wheat: "F5DEB3",
            white: "FFFFFF",
            whitesmoke: "F5F5F5",
            yellow: "FFFF00",
            yellowgreen: "9ACD32"
        }
    }

    return {

        queries: queries,
        initializeMap: initializeMap,
        updateLayerVisibility: updateLayerVisibility,
        updateRenderer: updateRenderer,
        Rainbow: Rainbow
    }

}());
