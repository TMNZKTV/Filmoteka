import cardTpl from '../templates/libreryGallery.hbs';
import refs from './refs';

const { galleryLibrery } = refs;

function getMarkupLibrery(requestedMovies) {
  const markup = cardTpl(requestedMovies);
  galleryLibrery.insertAdjacentHTML('beforeend', markup);
}

export default getMarkupLibrery;
