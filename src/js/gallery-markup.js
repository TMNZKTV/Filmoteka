import itemsTemplate from '../templates/movieGallery.hbs'
import refs from "./refs";
const {galleryRef} = refs;

function getMarkupGallery () {
    const markup = itemsTemplate();
    galleryRef.insertAdjacentHTML('beforeend', markup);
   
}

getMarkupGallery();

export default getMarkupGallery;

