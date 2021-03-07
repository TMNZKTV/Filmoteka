import refs from './refs';

const homeButton = document.querySelector('[data-action="home"]');
const libraryButton = document.querySelector('[data-action="library"]');
const libraryButtons = document.querySelector('.library__buttons');
const searchForm = document.querySelector('.input__field');

homeButton.addEventListener('click', toggleLibraryButtonsOFF);
libraryButton.addEventListener('click', toggleLibraryButtonsON);

function toggleLibraryButtonsON() {
  libraryButtons.classList.remove('is-hidden');
  libraryButton.classList.add('current');
  searchForm.classList.add('is-hidden');
  homeButton.classList.remove('current');
}
function toggleLibraryButtonsOFF() {
  libraryButtons.classList.add('is-hidden');
  libraryButton.classList.remove('current');
  searchForm.classList.remove('is-hidden');
  homeButton.classList.add('current');
}
