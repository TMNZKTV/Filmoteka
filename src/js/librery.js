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
import getMarkupGallery from './gallery-markup.js';
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
  ifNotEmptyLS();
  if (watched !== null) {
    console.log(watched);
    if (watched !== []) {
      console.log(watched);
      showWatched();
      showLibrery();
    }
  } else {
    console.log(watched);
    galleryRef.innerHTML = '<li>Вы ничего не добавили!</li>';
  }
}

function markupHome(event) {
  event.preventDefault();
  inputSearch.textContent = '';
  galleryRef.innerHTML = '';
  apiService
    .fetchPopularMovies()
    .then(({ results }) => getMarkupGallery(results));
}

function showLibrery() {
  btnWatched.addEventListener('click', showWatched);
  btnQueue.addEventListener('click', showQueue);
}

function showWatched() {
  changeColorBtn(btnWatched, btnQueue);

  galleryRef.innerHTML = '';
  idWatched.forEach(id => {
    apiService.fetchID(id).then(array => getMarkupGallery([array]));
  });
}

function showQueue() {
  changeColorBtn(btnQueue, btnWatched);
  if (watched !== null) {
    galleryRef.innerHTML = '';
    idQueue.forEach(id => {
      apiService.fetchID(id).then(array => getMarkupGallery([array]));
    });
  } else {
    galleryRef.innerHTML = '<li>Вы ничего не добавили!</li>';
  }
}

function changeColorBtn(add, remove) {
  add.style.backgroundColor = '#ff6b08';
  add.style.borderColor = 'transparent';
  remove.style.backgroundColor = 'transparent';
  remove.style.borderColor = '#ffffff';
}

export { markupLibrery, markupHome, showWatched, showQueue };
