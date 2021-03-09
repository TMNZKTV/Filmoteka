import axios from 'axios';

const fetchMovies = {
  searchQuery: '',
  apiKey: 'e1648943ec3f00b3b8db827b73df4be9',
  page: 1,
  maxPage: 'number',

  fetchID(id) {
    return axios(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`,
    )
      .then(({ data }) => data)
      .catch(err => console.log(err));
  },

  async fetchGenres() {
    return axios(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}`,
    )
      .then(({ data }) => data)
      .catch(err => console.log(err));
  },

  fetchMovies() {
    return axios(
      `https://api.themoviedb.org/3/search/movie?query=${this.query}&api_key=${this.apiKey}&page=${this.page}`,
    )
      .then(({ data }) => data)
      .catch(err => console.log(err));
  },

  fetchPopularMovies() {
    return axios(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${this.apiKey}&page=${this.page}`,
    )
      .then(({ data }) => data)
      .catch(err => console.log(err));
  },

  resetPage() {
    this.page = 1;
  },

  setMaxPage(value) {
    this.maxPage = value;
  },

  get query() {
    return this.searchQuery;
  },
  set query(value) {
    this.searchQuery = value;
  },
};

export default fetchMovies;
