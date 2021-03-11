import refs from '../js/refs';
import apiService from './apiService.js';
import getMarkupGallery from './gallery-markup.js';
// libraries
import debounce from 'lodash.debounce';
import { notifyInfo, notifyError } from './notifications.js';

setTimeout(initialFetch, 0);

refs.inputSearch.addEventListener('input', debounce(onInputSearch, 500));
refs.toNextPageBtn.addEventListener('click', onNextPage);
refs.toPrevPageBtn.addEventListener('click', onPrevPage);
refs.paginationList.addEventListener('click', onPageClick);

async function getGenres() {
  const newArrayFilm = await apiService
    .fetchPopularMovies()
    .then(({ results }) => results);
  const arrayGenres = await apiService
    .fetchGenres()
    .then(({ genres }) => genres);
  return { newArrayFilm, arrayGenres };
}

function getPopularFilmMarkup() {
  getGenres().then(({ newArrayFilm, arrayGenres }) => {
    newArrayFilm.forEach(filmObj => {
      const { genre_ids } = filmObj;
      const { release_date } = filmObj;
      arrayGenres.forEach(({ name, id }) => {
        if (genre_ids.includes(id)) {
          if (genre_ids.length > 2) {
            genre_ids.splice(2, genre_ids.length - 1, 'Other');
          }
          genre_ids.splice(genre_ids.indexOf(id), 1, name);
        }
        const newDate = release_date.slice(0, 4);
        filmObj.date = newDate;
        filmObj.genre_names = genre_ids.join(', ');
      });
    });
    getMarkupGallery(newArrayFilm);
  });
}

function getRequestedFilmMarkup() {
  apiService.fetchMovies().then(({ results }) => {
    getGenres().then(({ arrayGenres }) => {
      results.forEach(filmObj => {
        const { genre_ids } = filmObj;
        const { release_date } = filmObj;

        arrayGenres.forEach(({ name, id }) => {
          if (genre_ids.includes(id)) {
            if (genre_ids.length > 2) {
              genre_ids.splice(2, genre_ids.length - 1, 'Other');
            }
            genre_ids.splice(genre_ids.indexOf(id), 1, name);
          }
          const newDate = release_date.slice(0, 4);
          filmObj.date = newDate;
          filmObj.genre_names = genre_ids.join(', ');
        });
      });
      getMarkupGallery(results);
    });
  });
}

function initialFetch() {
  cleanMarkup();
  cleanPagesMarkup();
  apiService.fetchPopularMovies().then(({ page, total_pages }) => {
    getPopularFilmMarkup();
    numberMarkup(page, total_pages);
    highlightCurrentPage();
  });
}

function fetchByKeyWords() {
  cleanMarkup();
  cleanPagesMarkup();
  apiService.fetchMovies().then(({ results, page, total_pages }) => {
    if (results.length === 0) {
      notifyError('Try another word', 'No movies found for this request');
    }
    getRequestedFilmMarkup();
    numberMarkup(page, total_pages);
    highlightCurrentPage();
  });
}

function onInputSearch(event) {
  const movieToFind = event.target.value;
  apiService.query = movieToFind;
  if (apiService.query === '') {
    apiService.resetPage();
    cleanMarkup();
    initialFetch();
    return;
  }
  apiService.resetPage();
  fetchByKeyWords();
}

function onPageClick(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  if (window.screen.width < 767) {
      if (event.target.dataset.action === 'showNextPages') {
      apiService.page += 3;
      makePopularOrKeyWordFetch();
      return;
    }
    if (event.target.dataset.action === 'showPrevPages') {
      console.log();
      apiService.page -= 3;
      makePopularOrKeyWordFetch();
      return;
    }
    const currentPage = event.target;
    apiService.page = currentPage.innerHTML;
    makePopularOrKeyWordFetch();
    return;
  }
  if (event.target.dataset.action === 'showNextPages') {
    apiService.page += 6;
    makePopularOrKeyWordFetch();
    return;
  }
  if (event.target.dataset.action === 'showPrevPages') {
    console.log();
    apiService.page -= 5;
    makePopularOrKeyWordFetch();
    return;
  }
  const currentPage = event.target;
  apiService.page = currentPage.innerHTML;
  makePopularOrKeyWordFetch();
}

function onNextPage() {
  if (apiService.page === apiService.maxPage) {
    notifyInfo('There are no more movies by this request!');
    return;
  }
  apiService.page += 1;
  makePopularOrKeyWordFetch();
}

function onPrevPage() {
  if (apiService.page === 1) {
    return;
  }
  apiService.page -= 1;
  makePopularOrKeyWordFetch();
}

function makePopularOrKeyWordFetch() {
  if (refs.inputSearch.value === '') {
    initialFetch();
  } else {
    fetchByKeyWords();
  }
}

function cleanMarkup() {
  refs.galleryRef.innerHTML = '';
}
function cleanPagesMarkup() {
  refs.paginationList.innerHTML = '';
}

function numberMarkup(page, total_pages) {
  // console.log(window.screen.width)
  apiService.page = page;
  apiService.setMaxPage(total_pages);
  if (total_pages <= 1) {
    refs.homePagination.classList.add('is-hidden');
    return;
  }
  refs.homePagination.classList.remove('is-hidden');

  let listToShow = '';
  let listItems = [];
  const hiddenPrevPages =
    '<li class="pagination__item"><button type="button" data-action="showPrevPages">...</button></li>';
  const hiddenNextPages =
    '<li class="pagination__item"><button type="button" data-action="showNextPages">...</button></li>';
  
  if (window.screen.width < 767) {
    if (total_pages - page < 3) {
    for (let i = total_pages; i > total_pages - 3 && i > 0; i -= 1) {
      const item = `<li class="pagination__item"><button type="button">${i}</button></li>`;
      listItems.unshift(item);
    }
  } else {
    for (let i = page; i < page + 3 && i < total_pages; i += 1) {
      const item = `<li class="pagination__item"><button type="button">${i}</button></li>`;
      listItems.push(item);
    }
  }

  listToShow = listItems.join(' ');
  if (total_pages > 3) {
    listToShow =
      listItems.join(' ') +
      hiddenNextPages +
      `<li class="pagination__item"><button type="button">${total_pages}</button></li>`;
  }
  if (page > 3) {
    listToShow =
      hiddenPrevPages +
      listItems.join(' ') +
      hiddenNextPages;
  }
  if (total_pages > 3 && page > total_pages - 3) {
    listToShow =
      hiddenPrevPages +
      listItems.join(' ');
  }
    refs.paginationList.insertAdjacentHTML('beforeend', listToShow);
    return;
  }
  
  if (total_pages - page < 6) {
    for (let i = total_pages; i > total_pages - 6 && i > 0; i -= 1) {
      const item = `<li class="pagination__item"><button type="button">${i}</button></li>`;
      listItems.unshift(item);
    }
  } else {
    for (let i = page; i < page + 6 && i < total_pages; i += 1) {
      const item = `<li class="pagination__item"><button type="button">${i}</button></li>`;
      listItems.push(item);
    }
  }

  listToShow = listItems.join(' ');
  if (total_pages > 6) {
    listToShow =
      listItems.join(' ') +
      hiddenNextPages +
      `<li class="pagination__item"><button type="button">${total_pages}</button></li>`;
  }
  if (page > 5) {
    listToShow =
      `<li class="pagination__item"><button type="button">1</button></li>` +
      hiddenPrevPages +
      listItems.join(' ') +
      hiddenNextPages +
      `<li class="pagination__item"><button type="button">${total_pages}</button></li>`;
  }
  if (total_pages > 6 && page > total_pages - 6) {
    listToShow =
      `<li class="pagination__item"><button type="button">1</button></li>` +
      hiddenPrevPages +
      listItems.join(' ');
  }
  refs.paginationList.insertAdjacentHTML('beforeend', listToShow);
}

function highlightCurrentPage() {
  const paginationListArray = refs.paginationList.children;
  paginationListArray.forEach(item => {
    if (+item.textContent === apiService.page) {
      item.classList.add('current');
    }
  });
}

export { getPopularFilmMarkup, getGenres };
