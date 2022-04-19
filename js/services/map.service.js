
export const mapService = {
    initMap,
    addMarker,
    panTo
}


var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap);
            gMap.addListener("click", (e) => onClickedLocation(e.latLng, gMap))
        })
}

function onClickedLocation(latLng,map){
    const locationName = prompt("Enter a name");
  const marker = placeMarkerAndPanTo(latLng, locationName, map)
  //later remember to keep the markers in an array or to simply delete all
}


function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}

function placeMarkerAndPanTo(latLng, locationName, map = gMap) {
    const marker = new google.maps.Marker({
      position: latLng,
      map,
      title: locationName,
    });
    map.panTo(latLng);
    return marker
   
  }



function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyBSoxTSEWQdkQb1RPRlz8B4k7ilSPJxVmY'; //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}