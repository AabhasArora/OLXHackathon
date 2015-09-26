google.maps.event.addDomListener(window, 'load', initMap);
var map, circle, searchedAds = [];
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 14
    });
    findUserLocation();
}

function markUserLocation(lat, long, markerText){
    var latLong = new google.maps.LatLng(lat, long),
        marker = new google.maps.Marker({
            position: latLong,
            draggable: true
        });
    map.setCenter(latLong, 24);
    marker.setMap(map);
    marker.addListener("position_changed", function () {
        var position = this.getPosition();
        console.log(position);
        markAdLocation(position.lat(), position.lng());
    });
    markAdLocation(lat, long);
};

function markAdLocation(lat, long) {
    searchedAds.forEach(function (value) {
       value.setMap(null);
    });
    var latlongForCenter;
    if (circle) circle.setMap(null);
    latlongForCenter = new google.maps.LatLng(lat, long);
    circle = new google.maps.Circle({center:latlongForCenter,
        radius: 5000,
        fillOpacity: 0.35,
        fillColor: "#FF0000",
        map: map});

    var oSearch = {
        searchParam: {
            latLong: {
                latitude: lat,
                longitude: long
            },
            radialDistance: undefined
        },
        serachType:'searchByLatLong'
    }
    var nearbyAds = searchAdvertisements(oSearch);
    if(nearbyAds.length) {
        nearbyAds.forEach(function (objAd) {
            var latLong = new google.maps.LatLng(objAd.advertisementCoordinates.latitude, objAd.advertisementCoordinates.longitude),
                icon = new google.maps.MarkerImage(
                    "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|",
                    new google.maps.Size(40, 40)
                ),
                marker = new google.maps.Marker({
                    position: latLong,
                    icon: icon
                });
            marker.setMap(map);
            var contentString = '<div id="content">'+
                '<div id="siteNotice">'+
                '</div>'+
                '<h1 id="firstHeading" class="firstHeading">'+ objAd.advertisementTitle +'</h1>'+
                '<div id="bodyContent">'+
                '<p>Price = '+ objAd.price +'</p>'+
                '</div>'+
                '</div>';
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            marker.addListener("click", function () {
                //infowindow.content = 'Custom content';
                infowindow.open(map, marker);
            });
            searchedAds.push(marker);
            /*marker.addListener("mouseover", function () {
                infowindow.content = 'Custom content';
                infowindow.open(map, marker);
            });
            marker.addListener("mouseout", function () {
                infowindow.close();
            });*/
        });
    }
}

function findUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
                markUserLocation(position.coords.latitude, position.coords.longitude, '');
            },
            function () {
                markerText = "<p>Please accept geolocation for me to be able to find you. <br>I've put you in Stockholm for now.</p>";
                markUserLocation(59.3325215, 18.0643818, markerText);
            }
        );
    }
    else {
        alert('Geolocation is not supported in your browser');
    }
}