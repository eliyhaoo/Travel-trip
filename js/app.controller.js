export const appController = {
  getLocsForDisplay,
};

import { locService } from "./services/loc.service.js";
import { mapService } from "./services/map.service.js";

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.renderLocations = renderLocations;
window.onGo = onGo;
window.onDelete = onDelete;
window.onMyLocation =onMyLocation;
window.onSearch=onSearch;

// renderLocations([{ name: 'rrrr', lat: '40', lng: '30' id:11}])

function onInit() {
  mapService
    .initMap()
    .then(() => {})
    .catch(() => console.log("Error: cannot init map"));
  getLocsForDisplay();
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function onSearch(ev){
    ev.preventDefault()
    const term = document.querySelector('input[name=search]').value
    mapService.getCoordsFromApi(term)
    .then(mapService.panTo)
}

function onAddMarker() {
  console.log("Adding a marker");
  mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function getLocsForDisplay() {
  locService.getLocs().then((locs) => {
    console.log("getting display", locs);
    if (!locs || !locs.length) return;
    renderLocations(locs);
  });
}

function onMyLocation() {
  getPosition()
    .then((pos) => {
        mapService.panTo(pos.coords.latitude,pos.coords.longitude)
    })
    .catch((err) => {
      console.log("err!!!", err);
    });
}

function onPanTo() {
  mapService.panTo(35.6895, 139.6917);
}

function renderLocations(locs) {
  let elContainer = document.querySelector(".saved-locations-container");
  let strHTML = "";
  locs.forEach((location) => {
    strHTML += `<li>${location.name} x:${location.lat}  y:${location.lng}
        <button onclick="onGo('${location.id}')" >go!</button>  <button onclick="onDelete('${location.id}')">delete</button></li>`;
  });
  elContainer.innerHTML = strHTML;
}

function onGo(id) {
  const { lat, lng } = locService.getCoords(id);
  mapService.panTo(lat, lng);
}
function onDelete(id) {
  locService.deleteLoc(id);
  getLocsForDisplay();
}
