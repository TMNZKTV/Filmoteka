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
  console.log(event.target.dataset.check);
  if (event.target.dataset.check !== 'true') {
    changeStyleCurrent(event.target);
    event.target.dataset.check = 'true';
    idWatched.push(currentId);
    localStorage.setItem('addWatchedFilm', JSON.stringify(idWatched));
  } else {
    changeStyleNormal(event.target);
    event.target.dataset.check = 'false';
    idWatched.forEach((id, i) => {
      if (id === currentId) {
        idWatched.splice(i, 1);
      }
    });
    localStorage.setItem('addWatchedFilm', JSON.stringify(idWatched));
  }
}

function addQueueLS(event) {
  const currentId = event.target.dataset.id;
  if (event.target.dataset.check !== 'true') {
    changeStyleCurrent(event.target);
    event.target.dataset.check = 'true';
    idQueue.push(currentId);
    localStorage.setItem('addQueueFilm', JSON.stringify(idQueue));
  } else {
    changeStyleNormal(event.target);
    event.target.dataset.check = 'false';
    idQueue.forEach((id, i) => {
      if (id === currentId) {
        idQueue.splice(i, 1);
      }
    });
    localStorage.setItem('addQueueFilm', JSON.stringify(idQueue));
  }
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
      changeStyleCurrent(btnAddWatched);
      btnAddWatched.dataset.check = 'true';
    }
  });

  idQueue.forEach(id => {
    if (id === btnAddQueue.dataset.id) {
      changeStyleCurrent(btnAddQueue);
      btnAddQueue.dataset.check = 'true';
    }
  });
}

function changeStyleCurrent(btn) {
  btn.style.backgroundColor = '#ff6b08';
  btn.style.color = '#ffffff';
  btn.style.border = 'none';
}

function changeStyleNormal(btn) {
  btn.style.backgroundColor = '#ffffff';
  btn.style.color = '#000000';
  btn.style.border = '1px solid black';
}

export {
  getId,
  addCurrentStatus,
  ifNotEmptyLS,
  idWatched,
  idQueue,
  watched,
  queue,
};
