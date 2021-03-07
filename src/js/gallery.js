import itemsTemplate from '../templates/movieGallery.hbs';
import refs from './refs';

const { galleryRef } = refs;

function getMarkupGallery(requestedMovies) {
  const markup = itemsTemplate(requestedMovies);
  galleryRef.insertAdjacentHTML('beforeend', markup);
}

export default getMarkupGallery;
