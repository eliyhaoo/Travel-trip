import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.renderLocations = renderLocations;
window.onGo = onGo
window.onDelete = onDelete


// renderLocations([{ name: 'rrrr', lat: '40', lng: '30' id:11}])

function onInit() {
    mapService.initMap()
        .then(() => {
        })
        .catch(() => console.log('Error: cannot init map'));
        getLocsForDisplay()
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}




function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function getLocsForDisplay() {
    console.log('getting display');
    locService.getLocs()
        .then(renderLocations)
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}
function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}

function renderLocations(locs) {
    let elContainer = document.querySelector('.saved-locations-container')
    let strHTML = ''
    locs.forEach(location => {
        strHTML += `<li>${location.name} x:${location.lat}  y:${location.lng}
        <button onclick="onGo()" >go!</button>  <button onclick="onDelete('${location.id}')">delete</button></li>`
       
    })
    elContainer.innerHTML = strHTML
}

function onGo() {
    console.log(1)
}
function onDelete(id) {
    console.log('deleting..');
    locService.deleteLoc(id)
    locService.getLocs()
        .then(renderLocations)
}