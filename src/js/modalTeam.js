import * as basicLightbox from 'basiclightbox';
import style from 'basiclightbox/dist/basicLightbox.min.css';
import listTeam from '../json/info-team.json';
import tplTeam from '../templates/team.hbs';

const modalTeam = document.querySelector('.modal-team');
const team = tplTeam(listTeam);

modalTeam.addEventListener('click', showModal);

function showModal(event) {
  event.preventDefault();
  const instance = basicLightbox.create(team);
  instance.show();
  if (instance.visible()) {
    document.body.style.overflow = 'hidden';
  }
  document.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
      instance.close();
      if (!instance.visible()) {
        document.body.style.overflow = 'auto';
      }
    }
  });
  const btnClose = document.querySelector('[data-close-team]');
  btnClose.addEventListener('click', event => {
    event.preventDefault();
    instance.close();
    if (instance.visible()) {
      document.body.style.overflow = 'auto';
    }
  });
}
