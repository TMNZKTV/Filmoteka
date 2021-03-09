import itemsTemplate from '../templates/movieGallery.hbs';
import refs from './refs';

function getMarkupGallery(requestedMovies, element) {
  const markup = itemsTemplate(requestedMovies);
  element.insertAdjacentHTML('beforeend', markup);
}

export default getMarkupGallery;
