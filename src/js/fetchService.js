import refs from '../js/refs';
import apiService from './apiService.js';
import getMarkupGallery from '../templating/gallery.js'
import debounce from "lodash.debounce";


// function initialFetch() {
//   apiService.fetchPopularMovies().then(getMarkupGallery);
// }
// setTimeout(initialFetch, 0);

function initialFetch() {
  apiService.fetchMovies().then(getMarkupGallery);
}
setTimeout(initialFetch, 0);

refs.inputSearch.addEventListener('input', debounce((onInputSearch), 500));

function onInputSearch(event) {
  const movieToFind = event.target.value;
  apiService.query = movieToFind;
  const cleanMarkup = () => refs.galleryRef.innerHTML = '';

  cleanMarkup();
  // apiService.fetchMovies().then(({ results }) => getMarkupGallery(results));
  apiService.fetchMovies().then(getMarkupGallery);

  if(apiService.query === '') {
    cleanMarkup();
  } 
}

