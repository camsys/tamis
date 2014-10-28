
var tamis = tamis || {};

tamis.Map = (function () {

    /* Constants */

    var GEOMETRY_TYPE_POINT = 'point';
    var GEOMETRY_TYPE_POLYLINE = 'polyline';
    var GEOMETRY_TYPE_POLYGON = 'polygon';

    var bridgeResultsLayerName = "Bridge Results";
    var routeResultsLayerName = "Route Results";

    /* Variables */

    var map;
    var mapId = 'map';
    var markerSymbol;
    var redPolylineSymbol;
    var polylineSymbol;
    var polygonSymbol;
    var pointGraphic;
    var legendDijit;

    /* Initialization */

    dojo.require("esri.geometry");
    dojo.require("esri.geometry.jsonUtils");
    dojo.require("esri.layers.FeatureLayer");
    dojo.require("esri.layers.graphics");
    dojo.require("esri.map");
    dojo.require("esri.dijit.Legend");
    dojo.require("esri.dijit.Scalebar");
    dojo.require("esri.toolbars.draw");

    function initializeMap() {

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
        dojo.connect(map, "onLoad", function() {
            setScalebar();
        });
        initializeSymbols();
        initializeLegend();
        initializeLayers();

        //For base map selection
        //loadBaseMapList();
        callRunQueryService();
    }

    function initializeSymbols() {
        markerSymbol = new esri.symbol.SimpleMarkerSymbol();

        polylineSymbol = new esri.symbol.SimpleLineSymbol(
            esri.symbol.SimpleLineSymbol.STYLE_SOLID,
            new dojo.Color([0,0,255]),
            5
        );

        redPolylineSymbol = new esri.symbol.SimpleLineSymbol(
            esri.symbol.SimpleLineSymbol.STYLE_SOLID,
            new dojo.Color([255,0,0]),
            5
        );

        polygonSymbol = new esri.symbol.SimpleFillSymbol(
            esri.symbol.SimpleFillSymbol.STYLE_SOLID,
            new esri.symbol.SimpleLineSymbol(
                esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                new dojo.Color([0,0,255]),
                5
            ),
            new dojo.Color([100,100,100,0.25])
        );
    }

    function initializeLayers() {
        var bridgeResultsLayer = initializeFeatureCollectionLayer(bridgeResultsLayerName, polylineSymbol);
        var routeResultsLayer = initializeFeatureCollectionLayer(routeResultsLayerName, redPolylineSymbol);

        // Not sure which property sets the layer title in the legend, so using this.
        legendDijit.refresh([
            {layer: bridgeResultsLayer, title: bridgeResultsLayerName},
            {layer: routeResultsLayer, title: routeResultsLayerName}
        ]);
    }

    function initializeFeatureCollectionLayer(layerName, symbol) {

        // We'll add the features later.
        var features = [];

        var layerDefinition = {
            "geometryType": "esriGeometryPolyline",
            "objectIdField": "ObjectID",
            "drawingInfo": {
                "renderer": {
                    "type": "simple",
                    "symbol": symbol
                }
            },
            "fields": [{
                "name": "ObjectID",
                "alias": "ObjectID",
                "type": "esriFieldTypeOID"
            }]
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
        featureLayer = new esri.layers.FeatureLayer(featureCollection, {
            id: layerName,
            infoTemplate: infoTemplate
        });
        featureLayer.htmlPopupType = esri.layers.FeatureLayer.POPUP_HTML_TEXT

        map.addLayer(featureLayer);
        return featureLayer;
    }

    // The legend will automatically update when a layer of a supported type is added.
    function initializeLegend() {
        legendDijit = new esri.dijit.Legend({
            map: map
        }, "legendDiv");
        legendDijit.startup();
    }

    function loadBaseMapList() {
        var basemapsData = [
            {
                Id: 1,

                Type: 'ESRI',

                Url: 'http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer',

                Name: 'Streets',

                DefaultFlag: true
            },
            {
                Id: 2,

                Type: 'ESRI',

                Url: 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer',

                Name: 'Topographic',

                DefaultFlag: false
            },
            {
                Id: 3,

                Type: 'OpenStreetMap',

                Url: null,

                Name: 'OpenStreetMap',

                DefaultFlag: false
            }
        ];
        var basemaps = [];
        for (var i = 0; i < basemapsData.length; i++) {
            var baseMapRecord = basemapsData[i];
            var layerIndex = baseMapRecord.Id;
            var layerType = baseMapRecord.Type;
            var layerUrl = baseMapRecord.Url;
            var layerName = baseMapRecord.Name;
            if (baseMapRecord.Name === 'OpenStreetMap') {
                map.addLayer(new esri.layers.OpenStreetMapLayer());
            } else if (baseMapRecord.Url.length > 0) {
                map.addLayer(new esri.layers.ArcGISTiledMapServiceLayer(layerUrl));
            }
            /*if (layerType != 'ESRI') { //add non-ESRI basemaps
             basemaps.push(new esri.dijit.Basemap({
             layers: [new esri.dijit.BasemapLayer({
             url: layerUrl
             })],
             id: layerType + '_' + layerIndex,
             title: layerName
             }));
             }*/
        }

        var mapPanel = document.getElementById('mapPanel');
        if (mapPanel) {
            mapPanel.baseMapGallery = new esri.dijit.BasemapGallery({
                showArcGISBasemaps: true,
                basemaps: basemaps,
                map: map
            });
        }
    }

    function callRunQueryService() {
        var runQueryServiceUrl = 'web/Query.aspx/RunQuery';
        // These would come from the user selection.
        var sampleRequestParams =
            {"Query":{"DisplayParameters":[{"Name":"Jurisdictions","Selected":true,"AreaParameter":{"Type":"HouseDistrict","Description":"Assembly District","Areas":[{"Value":"20","Name":"DOWNTOWN ANCHORAGE"}],"MaxValues":40,"Selected":true},"FilterParameters":[]},{"Name":"Roads","Selected":true,"AreaParameter":null,"FilterParameters":[{"Type":"FunctionalClass","Description":"Class","Filters":[{"Value":"1","Name":"INTERSTATE"}],"MaxValues":7,"Selected":true}]},{"Name":"Bridges","Selected":true,"AreaParameter":null,"FilterParameters":[{"Type":"FunctionalClass","Description":"Class","Filters":[],"MaxValues":0,"Selected":true}]}],"Selection":1}}
            ;

        var data = "serializedQueryParameters" + "=" + JSON.stringify(sampleRequestParams);
        $.ajax({
            type: 'POST',
            url: runQueryServiceUrl,
            data: data,
            success: runQuerySuccess,
            error: runQueryError,
            async: false
        });
    }

    function runQuerySuccess(serializedResponse) {
        var responseObject = jQuery.parseJSON(serializedResponse);
        loadGeometry(responseObject.BridgeFeatureResults, bridgeResultsLayerName);
        loadGeometry(responseObject.RouteFeatureResults, routeResultsLayerName);
    }

    function runQueryError(jqXHR, textStatus, errorThrown) {
        var message = "A web service error occurred of type \'" + textStatus + "\'.";
        alert(message);
    }

    function loadGeometry(featureResults, layerName) {
        var layer = map.getLayer(layerName);
        // Using the layer's renderer.
        var isRendererDefined = true;

        layer.clear();
        layer.suspend();

        var features = [];
        var geometryType = GEOMETRY_TYPE_POLYLINE;
        var geomList = convertFeatureResultGeometriesToEsriJsonFormat(featureResults);
        for (var i = 0; i < geomList.length; i++) {
            var newFeat = geomList[i];
            var newGraphic = createGraphic(newFeat, geometryType, isRendererDefined, i);
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

    function createGraphic(geom, geometryType, isRendererDefined, id) {
        var esriGeom = esri.geometry.fromJson(geom);
        esriGeom.setSpatialReference(map.spatialReference);

        var simpleSymbol = null;
        if (!isRendererDefined) { //if no renderer, then use default simple ones
            switch(geometryType) {
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
        // Can add in other attributes here.
        var attributes = {
            "ObjectID": id
        };
        if (simpleSymbol) {
            graphic =  new esri.Graphic(esriGeom, simpleSymbol, attributes);
        } else {
            graphic = new esri.Graphic(esriGeom);
            graphic.setAttributes(attributes);
        }

        return graphic;
    }

    function convertFeatureResultGeometriesToEsriJsonFormat(featureResultsArray) {
        var geomList = [];
        for (var i = 0; i < featureResultsArray.length; i++) {
            var featureResult = featureResultsArray[i];
            geomList.push(convertKeyValuePairArrayToObject(featureResult.Geometry));
        }
        return geomList;
    }

    function convertKeyValuePairArrayToObject(keyValuePairArray) {
        var newObject = {};
        if (keyValuePairArray instanceof Array) {
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

    return {
        initializeMap: initializeMap
    }

} ());












