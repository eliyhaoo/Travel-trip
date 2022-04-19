
import { storageService } from './storage.service.js'

export const locService = {
    getLocs,
    deleteLoc,
    addLocation,
    getCoords
}

let locs 
// let locs = [
//     { id:77, name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
//     { id:88, name: 'Neveragain', lat: 32.047201, lng: 34.832581},
//     { id:99, name: 'home', lat: 32.047201, lng: 34.832581}]

// locs = storageService.loadFromStorage()

function deleteLoc(id){
    locs= locs.filter(loc => loc.id != id);
    storageService.saveToStorage(locs)
}

function getLocs() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                locs = (storageService.loadFromStorage()) ? storageService.loadFromStorage() : []
                resolve(locs);
            }, 2000)
        });
}

function addLocation(name,lat,lng){
   locs.push({
        id: _makeId(),
        name,
        lat,
        lng,
        createdAt: new Date(),
    })
    storageService.saveToStorage(locs)
   
}

function getCoords(id){
   const location = locs.find(loc=> loc.id === id)
   console.log('location',location);
   const {lat,lng} = location
   return {lat,lng}
}

function _makeId(length = 3) {
    var txt = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}


