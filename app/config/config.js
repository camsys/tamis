define(
    function () {
        return {

            regionQueryUrl: 'http://swdev42.camsys.com/arcgis/rest/services/AKDOT/TAMIS/MapServer/exts/RouteEventOverlaySOE/GetGeogAreaValues?AreaType=Region&f=pjson',
            districtQueryUrl: 'http://swdev42.camsys.com/arcgis/rest/services/AKDOT/TAMIS/MapServer/exts/RouteEventOverlaySOE/GetGeogAreaValues?AreaType=HouseDistrict&f=pjson',
            functionalClassQueryUrl: 'http://swdev42.camsys.com/arcgis/rest/services/AKDOT/TAMIS/MapServer/exts/RouteEventOverlaySOE/GetFilterValues?FilterType=NHSBoolean&f=pjson',
            runQueryUrl: '/tamisPilotQA/web/Query.aspx/RunQuery',
            /*

            regionQueryUrl: "assets/json/regionlist.json",
            districtQueryUrl: "assets/json/district.json",
            functionalClassQueryUrl: "assets/json/class.json",
            runQueryUrl: 'test',
             */

            noResultsMessage:{title: "Whoops!", message: "No data is available for display yet, run a query first."}

        };
    });
