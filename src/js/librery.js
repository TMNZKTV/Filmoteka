import refs from './refs';
import {
  getId,
  addCurrentStatus,
  ifNotEmptyLS,
  idWatched,
  idQueue,
  watched,
  queue,
} from './addLocalStrg';
import getMarkupGallery from './gallery.js';
import apiService from './apiService';

const {
  galleryRef,
  inputSearch,
  homeButton,
  libraryButton,
  btnWatched,
  btnQueue,
} = refs;
ifNotEmptyLS();

function markupLibrery(event) {
  event.preventDefault();
  inputSearch.textContent = '';
  galleryRef.innerHTML = '';
  showLibrery();
}

function showLibrery() {
  btnWatched.addEventListener('click', showWatched);
  btnQueue.addEventListener('click', showQueue);
}

function showWatched() {
  idWatched.forEach(id => {
    galleryRef.innerHTML = '';
    apiService.fetchID(id).then(array => getMarkupGallery([array]));
  });
}

function showQueue() {
  idQueue.forEach(id => {
    galleryRef.innerHTML = '';
    apiService.fetchID(id).then(array => getMarkupGallery([array]));
  });
}

export { markupLibrery };
