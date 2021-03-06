import refs from './refs';
import markup from '../templates/modalCard.hbs';
const { modal } = refs;

const getMarkupModal = objectMovie => {
  const updateMarkup = markup(objectMovie);

  modal.insertAdjacentHTML('beforeend', updateMarkup);
};

export default getMarkupModal;
