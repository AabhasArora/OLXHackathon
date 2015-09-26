google.maps.event.addDomListener(window, 'load', initMap);
var map;
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
    });
    markAdLocation(lat, long);
};

function markAdLocation(lat, long) {
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
        var marker = new google.maps.Marker({
            position: latLong
        });
        marker.setMap(map);
        var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
            '<div id="bodyContent">'+
            '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
            'sandstone rock formation in the southern part of the '+
            'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
            'south west of the nearest large town, Alice Springs; 450&#160;km '+
            '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
            'features of the Uluru - Kata Tjuta National Park. Uluru is '+
            'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
            'Aboriginal people of the area. It has many springs, waterholes, '+
            'rock caves and ancient paintings. Uluru is listed as a World '+
            'Heritage Site.</p>'+
            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
            'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
            '(last visited June 22, 2009).</p>'+
            '</div>'+
            '</div>';
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        marker.addListener("click", function () {
            infowindow.content = 'Custom content';
            infowindow.open(map, marker);
        });
        marker.addListener("mouseover", function () {
            infowindow.content = 'Custom content';
            infowindow.open(map, marker);
        });
        marker.addListener("mouseout", function () {
            infowindow.close();
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