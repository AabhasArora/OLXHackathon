/**
 * Created by Aabhas Arora on 26-09-2015.
 */
var defaultRadialDistance = 5000;

function searchAdvertisements (oSearch){
    var adList = [];
    if (oSearch.serachType) {
        switch (oSearch.serachType) {
            case 'searchByLatLong':
                adList = searchByLatLong(oSearch.searchParam);
                break;
            default:
                break;
        }
    }
    return adList;
}

function searchByLatLong (oLatLong) {
    var searchPoint = new Point(oLatLong.latLong.latitude, oLatLong.latLong.longitude),
        currentPoint = new google.maps.LatLng(searchPoint.latitude, searchPoint.longitude);
    var radialDistance = oLatLong.radialDistance || defaultRadialDistance;
    var nearByAds = advertisements.filter(function (value) {
        var position = new google.maps.LatLng(value.advertisementCoordinates.latitude, value.advertisementCoordinates.longitude);
        if(google.maps.geometry.spherical.computeDistanceBetween(currentPoint, position) < radialDistance)
            return true;
        else
            return false;
    });
    return nearByAds;
}