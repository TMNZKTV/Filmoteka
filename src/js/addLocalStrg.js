import { showWatched, showQueue } from './showLibrery';
import { toggleModal } from './modal';
import {
  addCurrentStatus,
  changeStyleCurrent,
  changeStyleNormal,
} from './styleForBtnAdd';
import {
  ifNotEmptyWatched,
  ifNotEmptyQueue,
  idWatched,
  idQueue,
} from './checkNotEmptyLS';

ifNotEmptyWatched();
ifNotEmptyQueue();

function getId() {
  const btnAddWatched = document.querySelector('[data-action="add-watched"]');
  const btnAddQueue = document.querySelector('[data-action="add-queue"]');

  btnAddWatched.addEventListener('click', addWatchedLS);
  btnAddQueue.addEventListener('click', addQueueLS);
  addCurrentStatus(btnAddWatched, btnAddQueue);
}

function addWatchedLS(event) {
  const currentId = event.target.dataset.id;
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
    showWatched();
    toggleModal();
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
    showQueue();
    toggleModal();
    localStorage.setItem('addQueueFilm', JSON.stringify(idQueue));
  }
}

export { getId, idWatched, idQueue };
