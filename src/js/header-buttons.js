import refs from './refs';
import { markupLibrery, markupHome } from './librery';

const {
  homeButton,
  homeButtonText,
  libraryButton,
  libraryButtonText,
  libraryButtons,
  searchForm,
  headerBack,
} = refs;

homeButton.addEventListener('click', toggleLibraryButtonsOFF);
libraryButton.addEventListener('click', toggleLibraryButtonsON);

function toggleLibraryButtonsON(event) {
  libraryButtons.classList.remove('is-hidden');
  libraryButtonText.classList.add('current');
  searchForm.classList.add('is-hidden');
  homeButtonText.classList.remove('current');
  headerBack.classList.add('library');
  headerBack.classList.remove('home');
  markupLibrery(event);
}
function toggleLibraryButtonsOFF(event) {
  libraryButtons.classList.add('is-hidden');
  libraryButtonText.classList.remove('current');
  searchForm.classList.remove('is-hidden');
  homeButtonText.classList.add('current');
  headerBack.classList.add('home');
  headerBack.classList.remove('library');
  markupHome(event);
}
