/**
 * Created by Aabhas Arora on 26-09-2015.
 */
var defaultRadialDistance = 5000;

function searchAdvertisements (userLocation, oSearch){
    var adList = [];
    if (oSearch) {
        adList = searchByLatLong(userLocation.getPosition().lat(), userLocation.getPosition().lng(), oSearch);
    }
    return adList;
}

function searchByLatLong (lat, long, filters) {
    var searchPoint = new Point(lat, long),
        currentPoint = new google.maps.LatLng(searchPoint.latitude, searchPoint.longitude);
    var nearByAds = advertisements;
    for(var key in filters) {
        if(key === 'city' && filters[key]){

        }
        else if(key === 'category' && filters[key]){
            nearByAds = nearByAds.filter(function (value) {
                if(value.category === filters[key])
                    return true;
                else
                    return false;
            });
        }
        else if(key === 'radial' && filters[key]){
            var radialDistance = parseInt(filters[key], 10) || defaultRadialDistance;
            nearByAds = nearByAds.filter(function (value) {
                var position = new google.maps.LatLng(value.advertisementCoordinates.latitude, value.advertisementCoordinates.longitude);
                if(google.maps.geometry.spherical.computeDistanceBetween(currentPoint, position) < radialDistance)
                    return true;
                else
                    return false;
            });
        }
    }
    return nearByAds;
};