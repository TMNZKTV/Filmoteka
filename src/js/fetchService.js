import refs from '../js/refs';
import apiService from './apiService.js';
import getMarkupGallery from './gallery-markup.js'
import getPaginationMarkup from './gallery-markup.js'
// libraries
import debounce from "lodash.debounce";
import { notifyInfo } from './notifications.js'

setTimeout(initialFetch, 0);

refs.inputSearch.addEventListener('input', debounce((onInputSearch), 500));
refs.toNextPageBtn.addEventListener('click', onNextPage);
refs.toPrevPageBtn.addEventListener('click', onPrevPage);

function initialFetch() {
  cleanMarkup();
  apiService.fetchPopularMovies().then(({ results }) => {
    getMarkupGallery(results);
  })
  
}

function onInputSearch(event) {
  const movieToFind = event.target.value;
  apiService.query = movieToFind;
  apiService.resetPage();
  cleanMarkup();
  apiService.fetchMovies().then(({ results, page, total_pages }) => {
    getMarkupGallery(results);
    let itemList = [];
    for (let i = 1; i < total_pages; i += 1) {
      const item = `<li class="pagination__item">${i}</li>`;
      itemList.push(item);
    }
    console.log(itemList.join(' '));

  //   if (itemList.length > 9) {
  //     itemToShow = ...itemList.slice( );
  // itemList = [`<li class="pagination__item">1</li>, <li class="pagination__item">...</li>,  ,<li class="pagination__item">...</li> ,<li class="pagination__item">${total_pages}</li>`];
  //   }
    // const paginationMarkup =
    //   `<li class="pagination__item">1</li>
    //   <li class="pagination__item"></li>
    //   <li class="pagination__item pagination__current-page">${page}</li>
    //   <li class="pagination__item">${total_pages}</li>`;
    
    // refs.paginationList.insertAdjacentHTML('beforeend', itemList.join(' '));
    
    if (results.length === 0) {
      notifyInfo('Try another word', 'No images found for this request');
    }
  });
  
  if (apiService.query === '') {
    apiService.resetPage();
    cleanMarkup();
    initialFetch();
  } 
}

function onNextPage() {
  apiService.page += 1;
  cleanMarkup();

  apiService.fetchMovies().then(({results, page, total_pages}) => { 
    getMarkupGallery(results);
    if (results.length === 0) {
      notifyInfo('Try another word', 'No images found for this request');
    }
  });
}

function onPrevPage() {
  apiService.page -= 1;
  cleanMarkup();

  apiService.fetchMovies().then(({results, page, total_pages}) => { 
    getMarkupGallery(results);
    if (results.length === 0) {
      notifyInfo('Try another word', 'No images found for this request');
    }
  });
}

function cleanMarkup() {
  refs.galleryRef.innerHTML = ''
};