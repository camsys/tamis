define(
    function () {
        return {

            regionQueryUrl: 'http://swdev42.camsys.com/arcgis/rest/services/AKDOT/TAMIS/MapServer/exts/RouteEventOverlaySOE/GetGeogAreaValues?AreaType=Region&f=pjson',
            districtQueryUrl: 'http://swdev42.camsys.com/arcgis/rest/services/AKDOT/TAMIS/MapServer/exts/RouteEventOverlaySOE/GetGeogAreaValues?AreaType=HouseDistrict&f=pjson',
            functionalClassQueryUrl: 'http://swdev42.camsys.com/arcgis/rest/services/AKDOT/TAMIS/MapServer/exts/RouteEventOverlaySOE/GetFilterValues?FilterType=NHSBoolean&f=pjson',
            routesQueryUrl: 'http://swdev42.camsys.com/arcgis/rest/services/AKDOT/TAMIS/MapServer/exts/RouteEventOverlaySOE/QueryRoutes?RouteFilter=&f=json',
            pavementQueryUrl: 'http://swdev42.camsys.com/arcgis/rest/services/AKDOT/TAMIS/MapServer/exts/RouteEventOverlaySOE/GetFilterValues?FilterType=PSRSummary&f=json',
            deckQueryUrl: 'http://swdev42.camsys.com/arcgis/rest/services/AKDOT/TAMIS/MapServer/exts/RouteEventOverlaySOE/GetFilterValues?FilterType=DeckCondition&f=json',
            bridgeStatusQueryUrl: 'http://swdev42.camsys.com/arcgis/rest/services/AKDOT/TAMIS/MapServer/exts/RouteEventOverlaySOE/GetFilterValues?FilterType=BridgeStatus&f=json',
            runQueryUrl: '/tamisPilotQA/web/Query.aspx/RunQuery',

            bridgeFeaturesUrl: "http://swdev14.camsys.com/arcgis2/rest/services/AKDOT/TAMIS/MapServer/2/query",
            roadFeaturesUrl: "http://swdev14.camsys.com/arcgis2/rest/services/AKDOT/TAMIS/MapServer/1/query",

            bridgeFeaturesUrlWithCondition: "http://swdev14.camsys.com/arcgis2/rest/services/AKDOT/TAMIS/MapServer/4/query",
            roadFeaturesUrlWithCondition: "http://swdev14.camsys.com/arcgis2/rest/services/AKDOT/TAMIS/MapServer/3/query",

            slopesQueryUrl: 'http://swdev14.camsys.com/arcgis2/rest/services/AKDOT/TAMIS/MapServer/7/query',

            regionPolyQueryUrl: 'http://swdev14.camsys.com/arcgis2/rest/services/AKDOT/TAMIS/MapServer/5/query',
            districtPolyQueryUrl: 'http://swdev14.camsys.com/arcgis2/rest/services/AKDOT/TAMIS/MapServer/6/query',

            noResultsMessage:{title: "Whoops!", message: "No data is available for display yet, run a query first."}

        };
    });
