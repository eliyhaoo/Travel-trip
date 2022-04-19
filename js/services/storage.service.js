export const storageService = {
    loadFromStorage,
    saveToStorage
} 

function loadFromStorage(){
    return JSON.parse(localStorage.getItem('locationsDB')) 
}

function saveToStorage(value){
   localStorage.setItem('locationsDB',(JSON.stringify(value))) 
}