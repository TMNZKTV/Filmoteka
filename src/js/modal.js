import refs from './refs';
import getMarkupModal from './modal-markup';
import apiService from './apiService';
const { modal, closeModal, overlay, galleryRef } = refs;

document.addEventListener('keydown', closeModalESC);
galleryRef.addEventListener('click', getCardMove);

function toggleModal() {
  overlay.classList.toggle('is-hidden');
}

function closeModalESC(event) {
  if (event.code === 'Escape') {
    toggleModal();
  }
}

function getCardMove(event) {
  event.preventDefault();

  const currentFilm = event.target;
  modal.innerHTML = '';

  const filmID = currentFilm.dataset.id;

  toggleModal();

  apiService
    .fetchID(filmID)
    .then(array => getMarkupModal([array]))
    .then(() => {
      const closeModal = document.querySelector('[data-close]');
      closeModal.addEventListener('click', toggleModal);
    });
}
