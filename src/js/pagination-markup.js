import paginationTemplate from '../templates/pagination.hbs';
import refs from './refs';

const { galleryRef } = refs;

function getPaginationMarkup(requestedMovies) {
  const markup = paginationTemplate(requestedMovies);
  galleryRef.insertAdjacentHTML('afterend', markup);
}

export default getPaginationMarkup;
