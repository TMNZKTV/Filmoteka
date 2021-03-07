import { getCardMove, toggleModal } from './modal';

let idWatched = [];
let idQueue = [];

function getId() {
  const btnAddWatched = document.querySelector('[data-action="add-watched"]');
  const btnAddQueue = document.querySelector('[data-action="add-queue"]');

  btnAddWatched.addEventListener('click', addWatchedLS);
  btnAddQueue.addEventListener('click', addQueueLS);
  addCurrentStatus(btnAddWatched, btnAddQueue);
}

function addWatchedLS(event) {
  const currentId = event.target.dataset.id;
  event.target.disabled = true;
  idWatched.push(currentId);
  localStorage.setItem('addWatchedFilm', JSON.stringify(idWatched));
}

function addQueueLS(event) {
  const currentId = event.target.dataset.id;
  event.target.disabled = true;
  idQueue.push(currentId);
  localStorage.setItem('addQueueFilm', JSON.stringify(idQueue));
}

const watched = JSON.parse(localStorage.getItem('addWatchedFilm'));
const queue = JSON.parse(localStorage.getItem('addQueueFilm'));

function ifNotEmptyLS() {
  if (watched !== null) {
    idWatched = watched;
  }

  if (queue !== null) {
    idQueue = queue;
  }
}

function addCurrentStatus(btnAddWatched, btnAddQueue) {
  ifNotEmptyLS();

  idWatched.forEach(id => {
    if (id === btnAddWatched.dataset.id) {
      btnAddWatched.disabled = true;
    }
  });

  idQueue.forEach(id => {
    if (id === btnAddQueue.dataset.id) {
      btnAddQueue.disabled = true;
    }
  });
}

export { getId, addCurrentStatus, ifNotEmptyLS, idWatched, idQueue, watched, queue };
