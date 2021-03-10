import refs from './refs';
import { idWatched, idQueue } from './checkNotEmptyLS';
import { changeColorBtn } from './librery';
import apiService from './apiService';
import { getGenres } from './fetchService';
import getMarkupLibrery from './librery-markup';

const {
  galleryLibrery,
  libraryPagination,
  btnWatched,
  btnQueue,
  toPrevPageBtnLibrery,
  toNextPageBtnLibrery,
} = refs;

let page = 1;

function showWatched() {
  changeColorBtn(btnWatched, btnQueue);
  galleryLibrery.innerHTML = '';
  if (idWatched.length > 0) {
    if (idWatched.length > 19) {
      libraryPagination.classList.remove('is-hidden');
      page = 1;
      getListByPage(page, idWatched).forEach(id => markupListByPage(id));

      toNextPageBtnLibrery.addEventListener('click', onNextPageWatched);
      toPrevPageBtnLibrery.addEventListener('click', onPrevPageWatched);
    } else {
      libraryPagination.classList.add('is-hidden');
      idWatched.forEach(id => markupListByPage(id));
    }
  } else {
    libraryPagination.classList.add('is-hidden');
    galleryLibrery.innerHTML = `<li class="modal__keyItem"><p style="color:red;font-size:24px;text-align:center;">Вы ничего не добавили</p></li>`;
  }
}

function showQueue() {
  changeColorBtn(btnQueue, btnWatched);
  galleryLibrery.innerHTML = '';
  if (idQueue.length > 0) {
    if (idQueue.length > 19) {
      libraryPagination.classList.remove('is-hidden');
      getListByPage(page, idQueue).forEach(id => markupListByPage(id));

      // здесь нужны кнопки для queue, иначе срабатывают клики watched

      //   toNextPageBtnLibrery.addEventListener('click', onNextPageQueue);
      //   toPrevPageBtnLibrery.addEventListener('click', onPrevPageQueue);
    } else {
      libraryPagination.classList.add('is-hidden');
      idQueue.forEach(id => markupListByPage(id));
    }
  } else {
    libraryPagination.classList.add('is-hidden');
    galleryLibrery.innerHTML = `<li class="modal__keyItem"><p style="color:red;font-size:24px;text-align:center;">Вы ничего не добавили</p></li>`;
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
      console.log(newArray);
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
  galleryLibrery.innerHTML = '';
  page += 1;
  getListByPage(page, idWatched).forEach(id => markupListByPage(id));
  if (getListByPage(page, idWatched).length < 1) {
    galleryLibrery.innerHTML = `<li class="modal__keyItem"><p style="color:red;font-size:24px;text-align:center;">Вернитесь назад</p></li>`;
  }
}

function onPrevPageWatched() {
  galleryLibrery.innerHTML = '';
  page -= 1;
  getListByPage(page, idWatched).forEach(id => markupListByPage(id));
  if (getListByPage(page, idWatched).length < 1) {
    galleryLibrery.innerHTML = `<li class="modal__keyItem"><p style="color:red;font-size:24px;text-align:center;">Ткните вперед</p></li>`;
  }
}

function onNextPageQueue() {
  galleryLibrery.innerHTML = '';
  page += 1;
  getListByPage(page, idQueue).forEach(id => markupListByPage(id));
  if (getListByPage(page, idQueue).length < 1) {
    galleryLibrery.innerHTML = `<li class="modal__keyItem"><p style="color:red;font-size:24px;text-align:center;">Вернитесь назад</p></li>`;
  }
}

function onPrevPageQueue() {
  galleryLibrery.innerHTML = '';
  page -= 1;
  getListByPage(page, idQueue).forEach(id => markupListByPage(id));
  if (getListByPage(page, idQueue).length < 1) {
    galleryLibrery.innerHTML = `<li class="modal__keyItem"><p style="color:red;font-size:24px;text-align:center;">Ткните вперед</p></li>`;
  }
}

//функция, в которую приходит номер страницы и массив из локал-стореджа
// результат функции - масиив длинной 20 (одна страница)

function getListByPage(pageNumber, fullList) {
  if (pageNumber < 1) return [];

  const itemsPerPage = 20;
  const start = (pageNumber - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return fullList.slice(start, end);
}

export { showWatched, showQueue };
