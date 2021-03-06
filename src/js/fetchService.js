import fetchMoves from './apiService.js';
import getMarkupGallery from './gallery-markup.js'

function getGalleryPictures() {
    fetchMoves.queryMoves().then(data => {
      getMarkupGallery(data);
    });
}
