export const locService = {
    getLocs,
    deleteLoc
}

let locs = [
    {id:77, name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    { id:88, name: 'Neveragain', lat: 32.047201, lng: 34.832581},
    { id:99, name: 'home', lat: 32.047201, lng: 34.832581}
]

function deleteLoc(id){
    locs= locs.filter(loc => loc.id != id);
    console.log(locs)
}

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}


