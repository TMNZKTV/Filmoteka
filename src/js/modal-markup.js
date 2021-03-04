import refs from "./refs";
import markup from '../templates/modalCard.hbs'
const {modal} = refs

const getMarkupModal = (ojectMove) => {
    const updateMarkup = markup(ojectMove.results)
    modal.insertAdjacentHTML('beforeend', updateMarkup)
}

export default getMarkupModal