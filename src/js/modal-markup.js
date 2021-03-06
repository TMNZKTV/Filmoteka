import refs from "./refs";
import markup from '../templates/modalCard.hbs'
const { modal } = refs;

const getMarkupModal = (objectMovie) => {
modal.insertAdjacentHTML('beforeend', `<div class="modal__block-img"><img class="modal__img" src="https://image.tmdb.org/t/p/w500${objectMovie.backdrop_path}"
        alt="${objectMovie.original_title}">
</div>
<div class="description">
    <h1 class="modal__title">${objectMovie.original_title}</h1>
    <ul class="modal__keys">
        <li class="modal__key">Vote / Votes
            <p class="modal__value"><span class="rating">${objectMovie.vote_average}</span> / ${objectMovie.vote_count}</p>
        </li>
        <li class="modal__key">Popularity
            <p class="modal__value">${objectMovie.popularity}</p>
        </li>
        <li class="modal__key">Original Title
            <p class="modal__value">{{this.original_title}}</p>
        </li>
        <li class="modal__key">Genre
            <p class="modal__value">${objectMovie.popularity}</p>
        </li>
    </ul>
    <h2 class="modal__about">ABOUT</h2>
    <p class="modal__text">${objectMovie.overview}</p>
    <button class="button">add to Watched</button>
    <button class="button">add to queue</button>
</div>`
)    
}

export default getMarkupModal