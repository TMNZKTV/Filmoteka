import refs from "./refs"
import getMarkupModal from './modal-markup'
import apiService from './apiService'
const {closeModal,openModal,overlay} = refs


closeModal.addEventListener('click', toggleModal)
openModal.addEventListener('click', getCardMove)


function toggleModal() {
    overlay.classList.toggle('is-hidden')
}

function getCardMove(event) {
    event.preventDefault();
    const query = 'Tom & Jerry'

    toggleModal()
    apiService.queryMoves(query).then(array=>getMarkupModal(array))
}