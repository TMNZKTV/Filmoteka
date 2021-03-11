import refs from './refs';
import { idWatched, idQueue } from './checkNotEmptyLS';
import { changeColorBtn } from './librery';
import apiService from './apiService';
import { getGenres } from './fetchService';
import getMarkupLibrery from './librery-markup';
import { notifyInfo } from './notifications.js';

const {
  galleryLibrery,
  watchedPagination,
  watchedPaginationList,
  queuePagination,
  queuePaginationList,
  btnWatched,
  btnQueue,
  toPrevPageBtnWatched,
  toNextPageBtnWatched,
  toPrevPageBtnQueue,
  toNextPageBtnQueue
} = refs;

watchedPaginationList.addEventListener('click', onWatchedPaginationList);
queuePaginationList.addEventListener('click', onQueuePaginationList);

let queuePage = 1;
let watchedPage = 1;

function showWatched() {
  queuePagination.classList.add('is-hidden');
  changeColorBtn(btnWatched, btnQueue);
  galleryLibrery.innerHTML = '';
  if (idWatched.length > 0) {
    if (idWatched.length > 19) {
      watchedPagination.classList.remove('is-hidden');
      watchedPage = 1;
      getListByPage(watchedPage, idWatched).forEach(id => markupListByPage(id));
      toNextPageBtnWatched.addEventListener('click', onNextPageWatched);
      toPrevPageBtnWatched.addEventListener('click', onPrevPageWatched);
      const totalPages = Math.ceil(idWatched.length / 20);
      numberMarkup(watchedPage, totalPages, watchedPaginationList);
      highlightCurrentPage(watchedPaginationList.children, watchedPage);
      
    } else {
      watchedPagination.classList.add('is-hidden');
      idWatched.forEach(id => markupListByPage(id));
    }
  } else {
    watchedPagination.classList.add('is-hidden');
    galleryLibrery.innerHTML = `<div class="library-notification"><p class="library-notification__text">Your list of added movies is empty</p></div>`;
  }
}

function showQueue() {
  changeColorBtn(btnQueue, btnWatched);
  galleryLibrery.innerHTML = '';
  watchedPagination.classList.add('is-hidden');

  if (idQueue.length > 0) {
    if (idQueue.length > 19) {
      queuePagination.classList.remove('is-hidden');
      getListByPage(queuePage, idQueue).forEach(id => markupListByPage(id));
      toNextPageBtnQueue.addEventListener('click', onNextPageQueue);
      toPrevPageBtnQueue.addEventListener('click', onPrevPageQueue);
      const totalPages = Math.ceil(idQueue.length / 20);
      numberMarkup(queuePage, totalPages, queuePaginationList);
      console.log(queuePage)
      highlightCurrentPage(queuePaginationList.children, queuePage);
    } else {
      queuePagination.classList.add('is-hidden');
      idQueue.forEach(id => markupListByPage(id));
    }
  } else {
    queuePagination.classList.add('is-hidden');
     galleryLibrery.innerHTML = `<div class="library-notification"><p class="library-notification__text">Your list of added movies is empty</p></div>`;
  }
}

// function markupListByPage(id) {
//   apiService.fetchID(id).then(array => {
//     const newArray = [array];
//     newArray.forEach(({ genres, release_date }) => {
//       if (genres.length > 2) {
//         genres.splice(2, genres.length - 1, { name: 'Other' });
//       }
//       if (release_date.length > 4) {
//         release_date.slice(0, 4);
//       }
//       console.log(release_date);
//     });
//     console.log(newArray);
//     getMarkupLibrery(newArray);
//   });
// }

//функция, в которую приходит номер страницы и массив из локал-стореджа
// результат функции - масиив длинной 20 (одна страница)

function getListByPage(pageNumber, fullList) {
  if (pageNumber < 1) return [];

  const itemsPerPage = 20;
  const start = (pageNumber - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return fullList.slice(start, end);
}

function markupListByPage(id) {
  apiService.fetchID(id).then(array => {
    const newArray = [array];
    newArray.forEach(filmObj => {
      const { genres } = filmObj;
      const { release_date } = filmObj;
      const newDate = release_date.slice(0, 4);
      const names = genres.map(genre => genre.name);
      if (names.length > 2) {
        names.splice(2, names.length - 1, 'Other');
      }
      filmObj.date = newDate;
      filmObj.genre_names = names.join(', ');
      getMarkupLibrery(newArray);
    });
  });
}

// function getRequestedFilmMarkup() {
//     apiService.fetchMovies().then(({ results }) => {
//       getGenres().then(({ arrayGenres }) => {
//         results.forEach(filmObj => {
//           const { genre_ids } = filmObj;
//           arrayGenres.forEach(({ name, id }) => {
//             if (genre_ids.includes(id)) {
//               if (genre_ids.length > 2) {
//                 genre_ids.splice(2, genre_ids.length - 1, 'Other');
//               }
//               genre_ids.splice(genre_ids.indexOf(id), 1, name);
//             }
//             filmObj.genre_names = genre_ids.join(', ');
//           });
//         });
//         getMarkupGallery(results);
//       });
//     });
//   }

function onNextPageWatched() {
  if (idWatched.length - watchedPage * 20 < 0 ) {
    return;
  }
  galleryLibrery.innerHTML = '';
  watchedPage += 1;
  getListByPage(watchedPage, idWatched).forEach(id => markupListByPage(id));
  // if (getListByPage(page, idWatched).length < 1) {
  //   galleryLibrery.innerHTML = `<li class="modal__keyItem"><p style="color:red;font-size:24px;text-align:center;">Вернитесь назад</p></li>`;
  // }
}

function onPrevPageWatched() {
  if (watchedPage === 1) {
    return;
  }
  galleryLibrery.innerHTML = '';
  watchedPage -= 1;
  getListByPage(watchedPage, idWatched).forEach(id => markupListByPage(id));
  // if (getListByPage(page, idWatched).length < 1) {
  //   galleryLibrery.innerHTML = `<li class="modal__keyItem"><p style="color:red;font-size:24px;text-align:center;">Ткните вперед</p></li>`;
  // }
}

function onNextPageQueue() {
  if (idQueue.length - queuePage * 20 < 0) {
    return;
  }
  galleryLibrery.innerHTML = '';
  queuePage += 1;
  getListByPage(queuePage, idQueue).forEach(id => markupListByPage(id));
  // if (getListByPage(page, idQueue).length < 1) {
  //   galleryLibrery.innerHTML = `<li class="modal__keyItem"><p style="color:red;font-size:24px;text-align:center;">Вернитесь назад</p></li>`;
  // }
}

function onPrevPageQueue() {
  if (queuePage === 1) {
    return;
  }
  galleryLibrery.innerHTML = '';
  queuePage -= 1;
  getListByPage(queuePage, idQueue).forEach(id => markupListByPage(id));
  // if (getListByPage(page, idQueue).length < 1) {
  //   galleryLibrery.innerHTML = `<li class="modal__keyItem"><p style="color:red;font-size:24px;text-align:center;">Ткните вперед</p></li>`;
  // }
}


function numberMarkup(page, total_pages, numberList) {
  numberList.innerHTML = '';
  let listToShow = '';
  let listItems = [];
  const hiddenPrevPages =
    '<li class="pagination__item"><button type="button" data-action="showPrevPages">...</button></li>';
  const hiddenNextPages =
    '<li class="pagination__item"><button type="button" data-action="showNextPages">...</button></li>';
  
  if (window.screen.width < 767) {if (total_pages - page < 3) {
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
  numberList.insertAdjacentHTML('beforeend', listToShow);
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
  numberList.insertAdjacentHTML('beforeend', listToShow);
}

function onWatchedPaginationList(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  galleryLibrery.innerHTML = '';
  const totalPages = Math.ceil(idWatched.length / 20);
  const currentPage = event.target;
  watchedPage = currentPage.innerHTML;
  if (window.screen.width < 767) {
    if (event.target.dataset.action === 'showNextPages') {
      watchedPage += 3;
      getListByPage(watchedPage, idWatched).forEach(id => markupListByPage(id));
      numberMarkup(watchedPage, totalPages, watchedPaginationList);
      highlightCurrentPage(watchedPaginationList.children, watchedPage);
      return;
    }
    if (event.target.dataset.action === 'showPrevPages') {
      watchedPage -= 3;
      getListByPage(watchedPage, idWatched).forEach(id => markupListByPage(id));
      numberMarkup(watchedPage, totalPages, watchedPaginationList);
      highlightCurrentPage(watchedPaginationList.children, watchedPage);
      return;
  }
  } else {
  if (event.target.dataset.action === 'showNextPages') {
      watchedPage += 6;
      getListByPage(watchedPage, idWatched).forEach(id => markupListByPage(id));
      numberMarkup(watchedPage, totalPages, watchedPaginationList);
      highlightCurrentPage(watchedPaginationList.children, watchedPage);
      return;
    }
    if (event.target.dataset.action === 'showPrevPages') {
      watchedPage -= 5;
      getListByPage(watchedPage, idWatched).forEach(id => markupListByPage(id));
      numberMarkup(watchedPage, totalPages, watchedPaginationList);
      highlightCurrentPage(watchedPaginationList.children, watchedPage);
      return;
  }
  }
  
  getListByPage(watchedPage, idWatched).forEach(id => markupListByPage(id));
  numberMarkup(watchedPage, totalPages, watchedPaginationList);
  highlightCurrentPage(watchedPaginationList.children, watchedPage);
}

function onQueuePaginationList(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  galleryLibrery.innerHTML = '';
  const totalPages = Math.ceil(idWatched.length / 20);
  const currentPage = event.target;
  queuePage = currentPage.innerHTML;
  if (window.screen.width < 767) { 
    if (event.target.dataset.action === 'showNextPages') {
    queuePage += 3;
    getListByPage(queuePage, idQueue).forEach(id => markupListByPage(id));
    numberMarkup(queuePage, totalPages, queuePaginationList);
  highlightCurrentPage(queuePaginationList.children, queuePage);
    return;
  }
  if (event.target.dataset.action === 'showPrevPages') {
    queuePage -= 3;
    getListByPage(queuePage, idQueue).forEach(id => markupListByPage(id));
    numberMarkup(queuePage, totalPages, queuePaginationList);
  highlightCurrentPage(queuePaginationList.children, queuePage);
    return;
  }
  } else {
     if (event.target.dataset.action === 'showNextPages') {
    queuePage += 6;
    getListByPage(queuePage, idQueue).forEach(id => markupListByPage(id));
    numberMarkup(queuePage, totalPages, queuePaginationList);
  highlightCurrentPage(queuePaginationList.children, queuePage);
    return;
  }
  if (event.target.dataset.action === 'showPrevPages') {
    queuePage -= 5;
    getListByPage(queuePage, idQueue).forEach(id => markupListByPage(id));
    numberMarkup(queuePage, totalPages, queuePaginationList);
  highlightCurrentPage(queuePaginationList.children, queuePage);
    return;
  }
  }

  getListByPage(queuePage, idQueue).forEach(id => markupListByPage(id));
  numberMarkup(queuePage, totalPages, queuePaginationList);
  highlightCurrentPage(queuePaginationList.children, queuePage);
}

function highlightCurrentPage(paginationListArray, page) {
  paginationListArray.forEach(item => {
    if (+item.textContent === +page) {
      item.classList.add('current');
    }
  });
}

export { showWatched, showQueue };

