const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = [];
let ready = false;
let loadedImages = 0;
let totalImages = 0;

// Unsplash API
let firstLoad = true;
let nbPhotos = 6;
const apiKey = 'sNLrFxuFDzvZpqmyJnIR_mEJesbn5jtgObadNdCX348'
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${nbPhotos}`


// faire un premier run avec 6 photos, puis les suivants avec 30
function run(){
    getPhotos();
    if (firstLoad === true){
        firstLoad = false;
        nbPhotos = 30
        apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${nbPhotos}`
    }
}

// Vérifier que toutes les photos on chargé
function imageLoaded(){
    loadedImages++;
    if (loadedImages === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}


// Créer les éléments Liens et Images, et les ajouter au DOM
function displayPhotos(){
    loadedImages = 0;
    totalImages = photosArray.length;
    // créer kes éléments pour chaque objets de photosArray
    photosArray.forEach((photo) => {
        // créer <a> qui relie au lien Unsplash
        const lien = document.createElement('a');
        // lien.setAttribute('href', photo.links.html); //quand on click sur <a> -> lien html
        // lien.setAttribute('target', '_blank');
        // Créer <img>
        setAttributes(lien, { // méthode BONUS helper
            href: photo.links.html,
            target: '_blank',
        })
        const img = document.createElement('img');
        // img.setAttribute('src',photo.urls.regular); // à partir urls -> regular du fetch
        // img.setAttribute('alt',photo.alt_description);
        // img.setAttribute('title',photo.alt_description);
        // Mettre <img> dans <a> puis <a> dans imageContainer
        setAttributes(img, {// méthode BONUS helper
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        // Listener : quand toutes les photos sont chargées
        img.addEventListener('load', imageLoaded)
        lien.appendChild(img);
        imageContainer.appendChild(lien);
    })
}


// BONUS : Helper pour automatiser les setAttributes sur les DOM
function setAttributes(element,attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


// Obtenir les photos depuis l'API unsplash
async function getPhotos(){
    try{
        const response = await fetch(apiURL)
        photosArray = await response.json();
        displayPhotos();
    } catch (error){
        // Rentrer le catch error ici
    }
}


//Si le scrollin est en bas, charger de nouvelles photos pour infinite scrolling
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready === true){
        ready=false;  //window = parent de document (html) = parent de body
        getPhotos();    
    }
})


// Run
run();

