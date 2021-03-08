import { idWatched, idQueue } from './addLocalStrg';

function addCurrentStatus(btnAddWatched, btnAddQueue) {
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

export { addCurrentStatus, changeStyleCurrent, changeStyleNormal };
