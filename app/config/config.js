define(
    function () {
        return {

            regionQueryUrl: 'http://swdev42.camsys.com/arcgis/rest/services/AKDOT/TAMIS/MapServer/exts/RouteEventOverlaySOE/GetGeogAreaValues?AreaType=Region&f=pjson',
            districtQueryUrl: 'http://swdev42.camsys.com/arcgis/rest/services/AKDOT/TAMIS/MapServer/exts/RouteEventOverlaySOE/GetGeogAreaValues?AreaType=HouseDistrict&f=pjson',
            functionalClassQueryUrl: 'http://swdev42.camsys.com/arcgis/rest/services/AKDOT/TAMIS/MapServer/exts/RouteEventOverlaySOE/GetFilterValues?FilterType=NHSBoolean&f=pjson',
            routesQueryUrl: 'http://swdev42.camsys.com/arcgis/rest/services/AKDOT/TAMIS/MapServer/exts/RouteEventOverlaySOE/QueryRoutes?RouteFilter=&f=json',
            pavementQueryUrl: 'http://swdev42.camsys.com/arcgis/rest/services/AKDOT/TAMIS/MapServer/exts/RouteEventOverlaySOE/GetFilterValues?FilterType=PavementCondition&f=json',
            deckQueryUrl: 'http://swdev42.camsys.com/arcgis/rest/services/AKDOT/TAMIS/MapServer/exts/RouteEventOverlaySOE/GetFilterValues?FilterType=DeckCondition&f=json',
            bridgeStatusQueryUrl: 'http://swdev42.camsys.com/arcgis/rest/services/AKDOT/TAMIS/MapServer/exts/RouteEventOverlaySOE/GetFilterValues?FilterType=BridgeStatus&f=json',

            runQueryUrl: '/tamisPilotQA/web/Query.aspx/RunQuery',

            /*bridgeFeaturesUrl: "http://localhost/arcgis/rest/services/AKDOT/TAMIS/MapServer/2/query",
            roadFeaturesUrl: "http://localhost/arcgis/rest/services/AKDOT/TAMIS/MapServer/1/query",*/


            bridgeFeaturesUrl: "http://swdev14.camsys.com/arcgis2/rest/services/AKDOT/TAMIS/MapServer/2/query",
            roadFeaturesUrl: "http://swdev14.camsys.com/arcgis2/rest/services/AKDOT/TAMIS/MapServer/1/query",

            bridgeFeaturesUrlWithCondition: "http://swdev14.camsys.com/arcgis2/rest/services/AKDOT/TAMIS/MapServer/4/query",
            roadFeaturesUrlWithCondition: "http://swdev14.camsys.com/arcgis2/rest/services/AKDOT/TAMIS/MapServer/3/query",

            /*
            bridgeFeaturesUrl: "http://swdev42.camsys.com:6080/arcgis/rest/services/AKDOT/TAMIS/MapServer/2/query",
            regionQueryUrl: "assets/json/regionlist.json",
            districtQueryUrl: "assets/json/district.json",
            functionalClassQueryUrl: "assets/json/class.json",
            runQueryUrl: 'test',
             */

            noResultsMessage:{title: "Whoops!", message: "No data is available for display yet, run a query first."}

        };
    });
