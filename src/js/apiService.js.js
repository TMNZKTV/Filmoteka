const apiKey = 'e1648943ec3f00b3b8db827b73df4be9';
const options = {
  headers: {
    Authorization: apiKey,
  },
};
const url = `https://api.themoviedb.org/3/trending/all/day?`;

fetch(url, options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));
