const apiKey = 'e1648943ec3f00b3b8db827b73df4be9';
const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;

fetch(url)
  .then(response => response.json())
  .then(({ results }) => console.log(results))
  .catch(err => console.log(err));
