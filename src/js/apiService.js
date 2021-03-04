const fetchMoves = {
apiKey: 'e1648943ec3f00b3b8db827b73df4be9',

  queryMoves(search) {
  
    const url =`https://api.themoviedb.org/3/trending/movie/day?api_key=${this.apiKey}`
  return fetch(url) 
      .then(response => response.json())
      .catch(err => console.log(err))  
  }
}


export default fetchMoves