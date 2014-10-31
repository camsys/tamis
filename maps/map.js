/* 

 TAMIS Map Demo

 */

var tamis = tamis || {};

tamis.Map = (function () {

    /* Constants */

    var GEOMETRY_TYPE_POINT = 'point';
    var GEOMETRY_TYPE_POLYLINE = 'polyline';
    var GEOMETRY_TYPE_POLYGON = 'polygon';

    var bridgeResultsLayerName = "Bridge Results";
    var routeResultsLayerName = "Route Results";

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

        $(document).ready(jQueryReady);

        var initialExtent = new esri.geometry.Extent({
            xmin: -16728258.6257211,
            ymin: 8629018.76165811,
            xmax: -16630468.4301407,
            ymax: 8690296.38421335,
            spatialReference: { wkid: 3857 }
        });
        map = new esri.Map(mapId, {
            basemap: "streets",
            extent: initialExtent,
            showInfoWindowOnClick: true
        });
        dojo.connect(map, "onLoad", function () {
            setScalebar();
        });
        initializeSymbols();
        initializeRenderers();
        initializeLegend();
        initializeLayers();

        //For base map selection
        //loadBaseMapList();
        //callRunQueryService();
    }

    function jQueryReady() {
        parent.$("body").on("loaddata", function (e) {
            tamis.Map.labels = e.labels;
            loadData(e.queryResults);
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
        functionalClassRenderer = new esri.renderer.UniqueValueRenderer(polylineSymbol, "FunctionalClass");
        functionalClassRenderer.addValue("INTERSTATE", redPolylineSymbol);
        functionalClassRenderer.addValue("PRINCIPAL ARTERIAL - FREEWAY/EXPRESSWAY", pinkPolylineSymbol);
        functionalClassRenderer.addValue("PRINCIPAL ARTERIAL - OTHER", orchidPolylineSymbol);
        functionalClassRenderer.addValue("MINOR ARTERIAL", purple1PolylineSymbol);
        functionalClassRenderer.addValue("MAJOR COLLECTOR", seagreen1PolylineSymbol);
        functionalClassRenderer.addValue("MINOR COLLECTOR", cobaltgreenPolylineSymbol);
        functionalClassRenderer.addValue("LOCAL", yellow1PolylineSymbol);
    }

    function initializeLayers() {
        var bridgeResultsLayer = initializeFeatureCollectionLayer(bridgeResultsLayerName, functionalClassRenderer.toJson());
        var routeResultsRenderer = {
            "type": "simple",
            "symbol": redPolylineSymbol
        };
        var routeResultsLayer = initializeFeatureCollectionLayer(routeResultsLayerName, routeResultsRenderer);

        // Not sure which property sets the layer title in the legend, so using this.
        legendDijit.refresh([
            {layer: bridgeResultsLayer, title: bridgeResultsLayerName},
            {layer: routeResultsLayer, title: routeResultsLayerName}
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
        var infoTemplate = new esri.InfoTemplate("Attributes", "${*}");
        var featureLayer = new esri.layers.FeatureLayer(featureCollection, {
            id: layerName,
            infoTemplate: infoTemplate
        });
        featureLayer.htmlPopupType = esri.layers.FeatureLayer.POPUP_HTML_TEXT

        map.addLayer(featureLayer);
        return featureLayer;
    }

    // Adapted from Esri Sample Code: Dynamically create layer list, although in that case layers are coming from a map service.
    // https://developers.arcgis.com/javascript/jssamples/map_dynamiclayerlist.html
    function buildLayerList(layers) {
        var visible = [];
        var items = [];
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            visible.push(layer.id);
            items.push("<input type='checkbox' class='list_item' onclick='tamis.Map.updateLayerVisibility(this)'" +
                (layer.visible ? "checked=checked" : "") + "' id='" + layer.id + "'' /><label for='" + layer.id + "'>" + layer.id + "</label><br />");
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

    function loadData(responseObject) {
        loadGeometry(responseObject.BridgeFeatureResults, bridgeResultsLayerName);
        loadGeometry(responseObject.RouteFeatureResults, routeResultsLayerName);
    }

    function loadGeometry(featureResults, layerName) {
        var layer = map.getLayer(layerName);
        // Using the layer's renderer.
        var isRendererDefined = true;

        layer.clear();
        layer.suspend();

        var features = [];
        var geometryType = GEOMETRY_TYPE_POLYLINE;
        for (var i = 0; i < featureResults.length; i++) {
            var featureResult = featureResults[i];
            var geom = convertFeatureResultGeometryToEsriJsonFormat(featureResult);
            var newGraphic = createGraphic(geom, geometryType, featureResult, isRendererDefined, i);
            newGraphic.visible = true;
            features.push(newGraphic);
        }

        layer.applyEdits(features);
        layer.resume();
        layer.redraw();
    }

    // This is a simpler way to do this by creating a graphics layer.
    // Disadvantage is that the Esri legend widget doesn't support graphics layers, so would need to write a custom legend widget.
    // So went with feature collection layer.
    function loadGeometryOld(responseObject) {
        // Can initialize earlier.
        var bridgeResultsLayer = new esri.layers.GraphicsLayer({
            id: bridgeResultsLayerName,
            visible: true
        });
        map.addLayer(bridgeResultsLayer);

        var layer = map.getLayer(bridgeResultsLayerName);
        var isRendererDefined = false;

        layer.clear();
        layer.suspend();

        var geometryType = GEOMETRY_TYPE_POLYLINE;
        var geomList = convertFeatureResultGeometriesToEsriJsonFormat(responseObject);
        for (var i = 0; i < geomList.length; i++) {
            var newFeat = geomList[i];
            var newGraphic = createGraphic(newFeat, geometryType, isRendererDefined, i);
            newGraphic.visible = true;
            layer.add(newGraphic);
        }
        layer.resume();
        layer.redraw();
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

    function convertFeatureResultGeometryToEsriJsonFormat(featureResult) {
        return convertKeyValuePairArrayToObject(featureResult.Geometry);
    }

    function convertKeyValuePairArrayToObject(keyValuePairArray) {
        var newObject = {};
        if ($.isArray(keyValuePairArray)) {
            for (var i = 0; i < keyValuePairArray.length; i++) {
                var keyValuePair = keyValuePairArray[i];
                var key = keyValuePair["Key"];
                var value = keyValuePair["Value"];
                if (key) {
                    newObject[key] = value;
                }
            }
        }
        return newObject;
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
                   var attrMap = $.map( Object.getOwnPropertyNames(feature.attributes), function( name, i ) {
                       var label;
                       $.each(tamis.Map.labels, function( k, v ) {
                           $(tamis.Map.labels[k]).each(function (index, columndef) {
                                if(columndef.data == name){
                                    label = columndef.title;
                                    return false;
                                }
                           });
                       });
                       if(label){
                           return label + ": " + feature.attributes[name];
                       }
                    });
                    var point = feature.geometry.getExtent().getCenter();
                    map.centerAt(point);
                    map.infoWindow.setTitle("Feature details");
                    map.infoWindow.setContent(attrMap.join('<br/>'));
                    map.infoWindow.show(point,map.getInfoWindowAnchor(point));
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












