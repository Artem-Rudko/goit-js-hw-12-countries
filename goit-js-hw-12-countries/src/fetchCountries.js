const BASE_URL= 'https://restcountries.eu/rest/v2';

function fetchCountries(query) {
    return fetch (`${BASE_URL}/name/${query}`)
    .then(response => {
    //   console.log(response);
      return response.json()});
  };

export default {fetchCountries}