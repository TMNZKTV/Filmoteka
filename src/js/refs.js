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
  libraryButtons: document.querySelector('.library__buttons'),
  searchForm: document.querySelector('.input__field'),
  btnWatched: document.querySelector('[data-action="watched"]'),
  btnQueue: document.querySelector('[data-action="queue"]'),
  toPrevPageBtn: document.querySelector(
    '.js-pagination .pagination__arrow-left',
  ),
  toNextPageBtn: document.querySelector(
    '.js-pagination .pagination__arrow-right',
  ),
  toPrevPageBtnLibrery: document.querySelector('.library-pagination__arrow-left'),
  toNextPageBtnLibrery: document.querySelector(
    '.library-pagination__arrow-right',
  ),
  paginationList: document.querySelector('.js-pagination .pagination__list'),

  homePagination: document.querySelector('.js-pagination'),
  libraryPaginationList: document.querySelector('.library-pagination__list'),
  libraryPagination: document.querySelector('.library-pagination'),
  headerBack: document.querySelector('.page__header'),
  // genresList: document.querySelector('.js-genres__list'),
};

export default refs;
