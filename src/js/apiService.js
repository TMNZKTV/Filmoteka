import axios from 'axios';
        
const fetchMovies = {
    searchQuery: '',
    page: 1,
    apiKey: 'e1648943ec3f00b3b8db827b73df4be9',
    fetchMovies() {
        // const apiKey = 'e1648943ec3f00b3b8db827b73df4be9';
        return axios(`https://api.themoviedb.org/3/search/movie/?query=${this.query}&api_key=${this.apiKey}&page=${this.page}`)
            .then(({ data: { results } }) => results)
        .catch((err) => console.log(err));
    },
    
    fetchPopularMovies() {
        // const apiKey = 'e1648943ec3f00b3b8db827b73df4be9';
        return axios(`https://api.themoviedb.org/3/trending/movie/day?api_key=${this.apiKey}`)
        .then(({ data }) => data)
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