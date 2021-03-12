import * as basicLightbox from 'basiclightbox';
import style from 'basiclightbox/dist/basicLightbox.min.css';
import listTeam from '../json/info-team.json';
import tplTeam from '../templates/team.hbs';

const modalTeam = document.querySelector('.modal-team');
const team = tplTeam(listTeam);

modalTeam.addEventListener('click', showModal);

function showModal(event) {
  event.preventDefault();
  const instance = basicLightbox.create(team, {
    closable: false,
  });

  instance.show();

  document.body.style.overflow = 'hidden';

  if (!instance.visible()) {
    document.body.style.overflow = 'auto';
  }

  document.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
      instance.close();
      console.log(instance.visible());
      if (!instance.visible()) {
        document.body.style.overflow = 'auto';
      }
    }
  });

  const btnClose = document.querySelector('[data-close-team]');
  btnClose.addEventListener('click', event => {
    event.preventDefault();
    instance.close();
    console.log(instance.visible());
    if (instance.visible()) {
      document.body.style.overflow = 'auto';
    }
  });
}
