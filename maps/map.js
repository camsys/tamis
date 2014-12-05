
var tamis = tamis || {};

tamis.Map = (function () {

    /* Constants */

    var GEOMETRY_TYPE_POINT = 'point';
    var GEOMETRY_TYPE_POLYLINE = 'polyline';
    var GEOMETRY_TYPE_POLYGON = 'polygon';

    var bridgeResultsLayerName = "BridgeFeatureResults";
    var routeResultsLayerName = "RouteFeatureResults";

    var geometryKey = "Geometry";

    /* Variables */

    var map;
    var mapId = 'map';

    // Symbols
    var markerSymbol;
    var redPolylineSymbol;
    var pinkPolylineSymbol;
    var orchidPolylineSymbol;
    var purple1PolylineSymbol;
    var seagreen1PolylineSymbol;
    var cobaltgreenPolylineSymbol;
    var yellow1PolylineSymbol;
    var polylineSymbol;
    var polygonSymbol;

    var functionalClassRenderer;
    var pavementConditionRenderer;
    var deckConditionRenderer;
    var bridgeStatusRenderer;

    var pointGraphic;
    var legendDijit;
    var labels;

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
        parent.$("body").on("loaddata", function (e) {
            tamis.Map.labels = e.labels;
            setScalebar();
            initializeSymbols();
            initializeRenderers();
            initializeLegend();
            initializeLayers(e.queryName);
            loadData(e.layers);
        });

        parent.$("body").on("rowselect", function (e) {
            rowSelect(e.rowData);
        });
    }

    function initializeSymbols() {
        markerSymbol = new esri.symbol.SimpleMarkerSymbol();

        polylineSymbol = new esri.symbol.SimpleLineSymbol(
            esri.symbol.SimpleLineSymbol.STYLE_SOLID,
            new dojo.Color([0, 0, 255]),
            5
        );

        redPolylineSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 5);
        pinkPolylineSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 192, 203]), 5);
        orchidPolylineSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([218, 112, 214]), 5);
        purple1PolylineSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([155, 48, 255]), 5);
        seagreen1PolylineSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([84, 255, 159]), 5);
        cobaltgreenPolylineSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([61, 145, 640]), 5);
        yellow1PolylineSymbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 255, 0]), 5);

        polygonSymbol = new esri.symbol.SimpleFillSymbol(
            esri.symbol.SimpleFillSymbol.STYLE_SOLID,
            new esri.symbol.SimpleLineSymbol(
                esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                new dojo.Color([0, 0, 255]),
                5
            ),
            new dojo.Color([100, 100, 100, 0.25])
        );
    }

    function initializeRenderers() {
        functionalClassRenderer = new esri.renderer.UniqueValueRenderer(polylineSymbol, "NHS Flag");
        functionalClassRenderer.addValue("NHS", redPolylineSymbol);
        functionalClassRenderer.addValue("NOT NHS", pinkPolylineSymbol);

        pavementConditionRenderer = new esri.renderer.UniqueValueRenderer(polylineSymbol, "Pavement Condition");
        pavementConditionRenderer.addValue("Good", seagreen1PolylineSymbol);
        pavementConditionRenderer.addValue("Fair", yellow1PolylineSymbol);
        pavementConditionRenderer.addValue("Poor", redPolylineSymbol);
        pavementConditionRenderer.addValue("NA", purple1PolylineSymbol);

        bridgeStatusRenderer = new esri.renderer.UniqueValueRenderer(polylineSymbol, "Bridge Status");
        bridgeStatusRenderer.addValue("Not Deficient", seagreen1PolylineSymbol);
        bridgeStatusRenderer.addValue("Structurally Deficient", yellow1PolylineSymbol);
        bridgeStatusRenderer.addValue("Functionally Obsolete", redPolylineSymbol);

    }

    function initializeLayers(queryName) {
        var bridgeRenderer;
        var routeRenderer;
        if(queryName == 'Assets'){
            bridgeRenderer = functionalClassRenderer;
            routeRenderer = functionalClassRenderer;
        }else{
            bridgeRenderer = pavementConditionRenderer;
            routeRenderer = bridgeStatusRenderer;
        }
        var bridgeResultsLayer = initializeFeatureCollectionLayer(bridgeResultsLayerName, bridgeRenderer);

        var routeResultsLayer = initializeFeatureCollectionLayer(routeResultsLayerName, routeRenderer);

        // Not sure which property sets the layer title in the legend, so using this.
        legendDijit.refresh([
            {layer: bridgeResultsLayer, title: "Bridges"},
            {layer: routeResultsLayer, title: "Roads"}
        ]);
        buildLayerList([ bridgeResultsLayer, routeResultsLayer ]);
    }

    function initializeFeatureCollectionLayer(layerName, layerRenderer) {

        // We'll add the features later.
        var features = [];

        var layerDefinition = {
            "geometryType": "esriGeometryPolyline",
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
                "geometryType": "esriGeometryPolyline"
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
        var infoElements = [];
        for(var i = 0; i < fieldLabels.length; i++){
            var fieldLabel = fieldLabels[i];
            if(graphic.attributes[fieldLabel.title]){
                infoElements.push(fieldLabel.title + ": " + graphic.attributes[fieldLabel.title]);
            }
        }
        return infoElements.join('<br/>');
    }

    function buildLayerList(layers) {
        var visible = [];
        var items = [];
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            var label;
            if(layer.id == bridgeResultsLayerName){
                label = 'Bridges';
            } else if (layer.id = routeResultsLayerName){
                label = 'Roads';
            }
            visible.push(layer.id);
            items.push("<input type='checkbox' class='list_item' onclick='tamis.Map.updateLayerVisibility(this)'" +
            (layer.visible ? "checked=checked" : "") + "' id='" + layer.id + "'' /><label for='" + layer.id + "'>" + label + "</label><br />");
        }
        var layerList = document.getElementById("layer_list");
        layerList.innerHTML = items.join(' ');
    }

    function updateLayerVisibility(checkbox) {
        map.getLayer(checkbox.id).setVisibility(checkbox.checked);
    }

    // The legend will automatically update when a layer of a supported type is added.
    function initializeLegend() {
        legendDijit = new esri.dijit.Legend({
            map: map
        }, "legendDiv");
        legendDijit.startup();
    }

    function loadData(layers) {
        var features = [];
        $.each(layers, function (layerName, layerData) {
            features = features.concat(loadGeometry(layerData, layerName));
        });
        map.setExtent(esri.graphicsExtent(features))
    }

    function loadGeometry(featureResults, layerName) {
        var layer = map.getLayer(layerName);
        // Using the layer's renderer.
        var isRendererDefined = true;

        layer.clear();
        layer.suspend();

        var features = [];
        var geometryType = GEOMETRY_TYPE_POLYLINE;
        for (var i = 0; i < featureResults.features.length; i++) {
            var featureResult = featureResults.features[i];
            var geom = featureResult.geometry;
            var newGraphic = createGraphic(geom, geometryType, featureResult, isRendererDefined, i);
            newGraphic.visible = true;
            features.push(newGraphic);
        }

        layer.applyEdits(features);
        layer.resume();
        layer.redraw();
        return features;
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
        //attributes["NHS_NAME"] = attributes["NHS Flag"];//test
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

                    var point = feature.geometry.getExtent().getCenter();
                    map.centerAt(point);
                    map.infoWindow.setFeatures([feature]);
                    map.infoWindow.show(feature.geometry.getExtent().getCenter());

                    return false;
                }
            });
        });
    }

    return {
        initializeMap: initializeMap,
        updateLayerVisibility: updateLayerVisibility
    }

}());






