import refs from './refs';

const homeButton = document.querySelector('[data-action="home"]');
const libraryButton = document.querySelector('[data-action="library"]');
const libraryButtons = document.querySelector('.library__buttons');
const searchForm = document.querySelector('.input__field');

homeButton.addEventListener('click', toggleLibraryButtonsOFF);
libraryButton.addEventListener('click', toggleLibraryButtonsON);

function toggleLibraryButtonsON() {
  libraryButtons.classList.remove('is-hidden');
  searchForm.classList.add('is-hidden');
}
function toggleLibraryButtonsOFF() {
  libraryButtons.classList.add('is-hidden');
  searchForm.classList.remove('is-hidden');
}
