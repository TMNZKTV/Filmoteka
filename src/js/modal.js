import refs from "./refs"
import getMarkupModal from './modal-markup'
import apiService from './apiService'
const {modal, closeModal,overlay, galleryRef} = refs


closeModal.addEventListener('click', toggleModal)
document.addEventListener('keydown', closeModalESC)
galleryRef.addEventListener('click', getCardMove)

function toggleModal(event) {
    overlay.classList.toggle('is-hidden')
}

function closeModalESC(event) {
    if (event.code === 'Escape') {
        toggleModal()
    }
}

function getCardMove(event) {
    event.preventDefault();
    const currentFilm = event.target
    // blockFilm.innerHTML=''

console.dir(currentFilm);    
    const filmID=currentFilm.dataset.id

    toggleModal()
    apiService.fetchID(filmID).then(array=>getMarkupModal(array))
}