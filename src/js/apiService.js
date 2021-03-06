import axios from 'axios';
        
const fetchMovies = {
    searchQuery: '',
    page: 1,
    
    fetchMovies() {
        const apiKey = 'e1648943ec3f00b3b8db827b73df4be9';
        return axios(`https://api.themoviedb.org/3/trending/movie/day?query=${this.query}&api_key=${apiKey}&page=${this.page}`)
        .then((data) => data)
        .catch((err) => console.log(err));
    },
    
    resetPage() {
        this.page = 1;
    },

    get query() {
        return this.searchQuery;
    },
    set query(value) {
        this.searchQuery = value;
    },
}

export default fetchMovies;