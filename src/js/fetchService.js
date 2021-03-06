import refs from '../js/refs';
import apiService from './apiService.js';
import getMarkupGallery from '../templating/gallery.js'
import debounce from "lodash.debounce";
import { notifyInfo } from './notifications.js'

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
  apiService.fetchMovies().then((images) => { 
    getMarkupGallery(images);
    if (images.length === 0) {
      notifyInfo('Try another word', 'No images found for this request');
    }
  });
  
  if(apiService.query === '') {
    cleanMarkup();
  } 
}

