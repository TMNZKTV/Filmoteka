import refs from '../js/refs';
import apiService from './apiService.js';
import getMarkupGallery from './gallery-markup.js';
// libraries
import debounce from 'lodash.debounce';
import { notifyInfo } from './notifications.js';

setTimeout(initialFetch, 0);

refs.inputSearch.addEventListener('input', debounce(onInputSearch, 500));
refs.toNextPageBtn.addEventListener('click', onNextPage);
refs.toPrevPageBtn.addEventListener('click', onPrevPage);
refs.paginationList.addEventListener('click', onPageClick);

function initialFetch() {
  cleanMarkup();
  cleanPagesMarkup();
  refs.homePagination.classList.remove('is-hidden');
  const arrayGenres = apiService.fetchGenres();

  apiService.fetchPopularMovies().then(({ results, page, total_pages }) => {
    const newArrayFilm = results.map(objFilm => {
      const genresFilm = objFilm.genre_ids;
      arrayGenres.then(({ genres }) => {
        genres.forEach(genre => {
          if (genresFilm.includes(genre.id)) {
            genresFilm.splice(genresFilm.indexOf(genre.id), 1, {
              id: genre.id,
              name: genre.name,
            });
          }
        });
      });
      const newDate = objFilm.release_date.slice(0, 4);
      objFilm.release_date = newDate;
      return objFilm;
    });

    getMarkupGallery(newArrayFilm, refs.galleryRef);
    apiService.page = page;
    apiService.setMaxPage(total_pages);
    let listToShow = '';
    function numberMarkup() {
      let listItems = [];
      const hiddenPrevPages =
        '<li class="pagination__item"><button type="button" data-action="showPrevPages">...</button></li>';
      const hiddenNextPages =
        '<li class="pagination__item"><button type="button" data-action="showNextPages">...</button></li>';
      if (total_pages - page < 6) {
        for (let i = total_pages; i > total_pages - 6; i -= 1) {
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
    }
    numberMarkup();
    refs.paginationList.insertAdjacentHTML('beforeend', listToShow);
    highlightCurrentPage();
  });
}

function fetchByKeyWords() {
  cleanMarkup();
  cleanPagesMarkup();

  apiService.fetchMovies().then(({ results, page, total_pages }) => {
    getMarkupGallery(results, refs.galleryRef);
    apiService.page = page;
    apiService.setMaxPage(total_pages);

    if (results.length === 0) {
      notifyInfo('Try another word', 'No movies found for this request');
    }

    let listToShow = '';
    function numberMarkup() {
      if (total_pages <= 1) {
        refs.homePagination.classList.add('is-hidden');
        return;
      }
      refs.homePagination.classList.remove('is-hidden');
      let listItems = [];
      const hiddenPrevPages =
        '<li class="pagination__item"><button type="button" data-action="showPrevPages">...</button></li>';
      const hiddenNextPages =
        '<li class="pagination__item"><button type="button" data-action="showNextPages">...</button></li>';
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
      if (page > 2 && total_pages > 6) {
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
    }

    numberMarkup();
    refs.paginationList.insertAdjacentHTML('beforeend', listToShow);
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

function highlightCurrentPage() {
  const paginationListArray = refs.paginationList.children;
  paginationListArray.forEach(item => {
    if (+item.textContent === apiService.page) {
      item.classList.add('current');
    }
  });
}
