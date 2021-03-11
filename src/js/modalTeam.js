import * as basicLightbox from 'basiclightbox';
import style from 'basiclightbox/dist/basicLightbox.min.css';
import listTeam from '../json/info-team.json';
import tplTeam from '../templates/team.hbs';

const modalTeam = document.querySelector('.modal-team');
const team = tplTeam(listTeam);

modalTeam.addEventListener('click', showModal);

function showModal(event) {
  event.preventDefault();
  basicLightbox.create(team).show();
}
