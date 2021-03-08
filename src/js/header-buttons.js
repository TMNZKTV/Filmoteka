import refs from './refs';
import { markupLibrery, markupHome } from './librery';

const { homeButton, libraryButton, libraryButtons, searchForm, headerBack} = refs;

homeButton.addEventListener('click', toggleLibraryButtonsOFF);
libraryButton.addEventListener('click', toggleLibraryButtonsON);

function toggleLibraryButtonsON(event) {
  libraryButtons.classList.remove('is-hidden');
  libraryButton.classList.add('current');
  searchForm.classList.add('is-hidden');
  homeButton.classList.remove('current');
  headerBack.classList.add('library');
  headerBack.classList.remove('home');
  markupLibrery(event);
}
function toggleLibraryButtonsOFF(event) {
  libraryButtons.classList.add('is-hidden');
  libraryButton.classList.remove('current');
  searchForm.classList.remove('is-hidden');
  homeButton.classList.add('current');
  headerBack.classList.add('home');
  headerBack.classList.remove('library');
  markupHome(event);
}
