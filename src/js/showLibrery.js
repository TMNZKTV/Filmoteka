import refs from './refs';
import { idWatched, idQueue } from './checkNotEmptyLS';
import { changeColorBtn } from './librery';
import apiService from './apiService';
import getMarkupGallery from './gallery-markup.js';

const { galleryLibrery, libraryPagination, btnWatched, btnQueue } = refs;

function showWatched() {
  changeColorBtn(btnWatched, btnQueue);
  galleryLibrery.innerHTML = '';
  if (idWatched.length > 0) {
    idWatched.forEach(id => {
      apiService
        .fetchID(id)
        .then(array => getMarkupGallery([array], galleryLibrery));
    });
  } else {
    galleryLibrery.innerHTML = `<li class="modal__keyItem"><p style="color:red;font-size:24px;text-align:center;">Вы ничего не добавили</p></li>`;
  }
  libraryPagination.classList.add('is-hidden');
  if (idWatched.length > 19) {
    libraryPagination.classList.remove('is-hidden');
  }
}

function showQueue() {
  changeColorBtn(btnQueue, btnWatched);
  galleryLibrery.innerHTML = '';
  if (idQueue.length > 0) {
    idQueue.forEach(id => {
      apiService
        .fetchID(id)
        .then(array => getMarkupGallery([array], galleryLibrery));
    });
  } else {
    galleryLibrery.innerHTML = `<li class="modal__keyItem"><p style="color:red;font-size:24px;text-align:center;">Вы ничего не добавили</p></li>`;
  }
  libraryPagination.classList.add('is-hidden');
  if (idQueue.length > 19) {
    libraryPagination.classList.remove('is-hidden');
  }
}

// function perPage(page) {}

export { showWatched, showQueue };
