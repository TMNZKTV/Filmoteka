import refs from './refs';
import getMarkupGallery from './gallery-markup';
import { getPopularFilmMarkup } from './fetchService';
import apiService from './apiService';
import { showWatched, showQueue } from './showLibrery';

const {
  homepageSection,
  librerySection,
  galleryRef,
  inputSearch,
  btnWatched,
  btnQueue,
} = refs;

function markupLibrery(event) {
  changeIsHidden(event, homepageSection, librerySection);

  showWatched();

  btnWatched.addEventListener('click', showWatched);
  btnQueue.addEventListener('click', showQueue);
}

function markupHome(event) {
  changeIsHidden(event, librerySection, homepageSection);

  getPopularFilmMarkup();
}

function changeIsHidden(event, add, remove) {
  event.preventDefault();
  inputSearch.textContent = '';
  galleryRef.innerHTML = '';
  add.classList.add('is-hidden');
  remove.classList.remove('is-hidden');
}

function changeColorBtn(add, remove) {
  add.style.backgroundColor = '#ff6b08';
  add.style.borderColor = 'transparent';
  remove.style.backgroundColor = 'transparent';
  remove.style.borderColor = '#ffffff';
}

export { markupLibrery, markupHome, changeColorBtn };
