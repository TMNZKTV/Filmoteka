// import itemsTemplate from '../templates/movieGallery.hbs';
import itemsTemplate from '../templates/image-card.hbs';
import refs from '../js/refs';

const { galleryRef } = refs;

function getMarkupGallery(requestedMovies) {
  const markup = itemsTemplate(requestedMovies);
  galleryRef.insertAdjacentHTML('beforeend', markup);
}

export default getMarkupGallery;

