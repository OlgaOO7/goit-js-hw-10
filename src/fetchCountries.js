import Notiflix from 'notiflix';

export function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}?fields=capital,population,languages,name,flags`).then(response => {
    if (!response.ok) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      throw new Error(response.statusText);
    }
    return response.json();
  }).catch(error => console.log(error));
};
