let idWatched = [];
let idQueue = [];

function ifNotEmptyWatched() {
  if (localStorage.getItem('addWatchedFilm') !== null) {
    const watched = JSON.parse(localStorage.getItem('addWatchedFilm'));
    if (watched.length > 0) {
      idWatched = watched;
    }
  }
}

function ifNotEmptyQueue() {
  if (localStorage.getItem('addQueueFilm') !== null) {
    const queue = JSON.parse(localStorage.getItem('addQueueFilm'));
    if (queue.length > 0) {
      idQueue = queue;
    }
  }
}
export { ifNotEmptyWatched, ifNotEmptyQueue, idWatched, idQueue };
