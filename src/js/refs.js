const refs = {
  // closeModal: document.querySelector('.close-modal'),
  homepageSection: document.querySelector('.js-homepage'),
  librerySection: document.querySelector('.js-librery'),
  overlay: document.querySelector('.overlay'),
  modal: document.querySelector('.modal__card'),
  galleryRef: document.querySelector('.js-gallery__home'),
  galleryLibrery: document.querySelector('.js-gallery__librery'),
  inputSearch: document.querySelector('#searchQuery'),
  homeButton: document.querySelector('[data-action="home"]'),
  libraryButton: document.querySelector('[data-action="library"]'),
  homeButtonText: document.querySelector('.menu__home'),
  libraryButtonText: document.querySelector('.menu__library'),
  libraryButtons: document.querySelector('.library__buttons'),
  searchForm: document.querySelector('.input__container'),
  btnWatched: document.querySelector('[data-action="watched"]'),
  btnQueue: document.querySelector('[data-action="queue"]'),
  toPrevPageBtn: document.querySelector(
    '.js-pagination .pagination__arrow-left',
  ),
  toNextPageBtn: document.querySelector(
    '.js-pagination .pagination__arrow-right',
  ),
  toPrevPageBtnWatched: document.querySelector(
    '.watched-pagination .pagination__arrow-left',
  ),
  toNextPageBtnWatched: document.querySelector(
    '.watched-pagination .pagination__arrow-right',
  ),
  toPrevPageBtnQueue: document.querySelector(
    '.queue-pagination .pagination__arrow-left',
  ),
  toNextPageBtnQueue: document.querySelector(
    '.queue-pagination .pagination__arrow-right',
  ),
  paginationList: document.querySelector('.js-pagination .pagination__list'),
  homePagination: document.querySelector('.js-pagination'),
  watchedPaginationList: document.querySelector(
    '.watched-pagination .pagination__list',
  ),
  watchedPagination: document.querySelector('.watched-pagination'),
  queuePaginationList: document.querySelector(
    '.queue-pagination .pagination__list',
  ),
  queuePagination: document.querySelector('.queue-pagination'),
  headerBack: document.querySelector('.page__header'),

  spinner: document.getElementById('spinner-home'),
  spinnerLibrary: document.getElementById('spinner-library'),
};

export default refs;
