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
refs.paginationList.addEventListener('click', onPageClick);

function initialFetch() {
  cleanMarkup();
  cleanPagesMarkup(); 
  let itemList = [];
  apiService.fetchPopularMovies().then(({ results, page, total_pages }) => {
    getMarkupGallery(results);
    if (total_pages - page < 7) {
      for (let i = total_pages - 1; i > total_pages - 7; i -= 1) {
        const item = `<li class="pagination__item"><button type="button">${i}</button></li>`;
        itemList.unshift(item);
      } 
    } else {
      for (let i = page; i < page + 7 && i < total_pages; i += 1) {
        const item = `<li class="pagination__item"><button type="button">${i}</button></li>`;
        itemList.push(item);
      }
    }
    let listToShow = itemList.join(' ') + `<li class="pagination__item"><button type="button">${total_pages}</button></li>`;
    refs.paginationList.insertAdjacentHTML('beforeend', listToShow);
  })
}

function fetchByKeyWords() {
  cleanMarkup();
  cleanPagesMarkup(); 
  let itemList = [];
  
  apiService.fetchMovies().then(({ results, page, total_pages }) => {
    getMarkupGallery(results);
    if (results.length === 0) {
      notifyInfo('Try another word', 'No images found for this request');
    }
    
    if (total_pages - page < 7) {
      for (let i = total_pages - 1; i > total_pages - 7; i -= 1) {
        const item = `<li class="pagination__item"><button type="button">${i}</button></li>`;
        itemList.unshift(item);
      } 
    } else {
      for (let i = page; i < page + 7 && i < total_pages; i += 1) {
        const item = `<li class="pagination__item"><button type="button">${i}</button></li>`;
        itemList.push(item);
      }
    }

    let listToShow = itemList.join(' ') + `<li class="pagination__item"><button type="button">${total_pages}</button></li>`;
    refs.paginationList.insertAdjacentHTML('beforeend', listToShow);

  });
}

function onInputSearch(event) {
  const movieToFind = event.target.value;
  apiService.query = movieToFind;
  apiService.resetPage();
  fetchByKeyWords();

  if (apiService.query === '') {
    apiService.resetPage();
    cleanMarkup();
    initialFetch();
  }
}

function onPageClick(event) {
  apiService.page = event.target.innerHTML;
  makePopularOrKeyWordFetch();
  // event.target.parentElement.classList.add('--current');
  // let prevPage = event.target.parentElement.classList.add('--current');
  // let nextPage =  prevPage.
  // // if(event.currentTarget.children)

  // console.dir(event.target.parentElement.classList)
  // console.dir(event.currentTarget.children)
}

function onNextPage() {
  apiService.page += 1;
  makePopularOrKeyWordFetch()
}

function onPrevPage() {
  apiService.page -= 1;
  makePopularOrKeyWordFetch()
};

function makePopularOrKeyWordFetch() {
 if (refs.inputSearch.value === '') {
    initialFetch();
  } else {
    fetchByKeyWords();
  }
}

function cleanMarkup() {
  refs.galleryRef.innerHTML = '';
};
function cleanPagesMarkup() {
  refs.paginationList.innerHTML = '';
}

