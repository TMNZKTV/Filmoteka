import refs from './refs';
import getMarkupModal from './modal-markup';
import apiService from './apiService';
import { getId } from './addLocalStrg';

const { modal, closeModal, overlay, galleryRef, galleryLibrery } = refs;
galleryLibrery.addEventListener('click', getCardMove);
galleryRef.addEventListener('click', getCardMove);
overlay.addEventListener('click', closeModalOUT);

function toggleModal() {
  overlay.classList.toggle('is-hidden');
  if (overlay.classList.contains('is-hidden')) {
    document.body.style.overflow = 'auto';
  }
}

function closeModalESC(event) {
  if (event.code === 'Escape') {
    if (!overlay.classList.contains('is-hidden')) {
      toggleModal();
    }
    document.removeEventListener('keydown', closeModalESC);
  }
}

function closeModalOUT(event) {
  if (event.target.className === 'overlay') {
    toggleModal();
  }
}

function getCardMove(event) {
  event.preventDefault();
  document.body.style.overflow = 'hidden';

  const currentFilm = event.target;

  if (currentFilm.nodeName !== 'IMG') {
    return;
  }
  modal.innerHTML = '';

  const filmID = currentFilm.dataset.id;

  toggleModal();

  apiService
    .fetchID(filmID)
    .then(array => getMarkupModal([array]))
    .then(() => {
      const closeModal = document.querySelector('[data-close]');
      closeModal.addEventListener('click', toggleModal);
      getId();

      document.addEventListener('keydown', closeModalESC);
    });
}

export { getCardMove, toggleModal };
