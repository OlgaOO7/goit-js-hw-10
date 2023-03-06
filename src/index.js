import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfoContainer: document.querySelector('.country-info'),
};

refs.searchBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  // console.log(evt.target.value);
  const countryName = evt.target.value.trim();
  console.log(countryName);

  if (countryName === "") {
    refs.countryList.innerHTML = '';
    refs.countryInfoContainer.innerHTML = '';
    return;
  };
  fetchCountries(countryName).then(data => {
    if (data.length === 1){
      return renderCountryCardInfo(data);
    } else if (data.length >= 2 && data.length <= 10) {
      return renderCountriesList(data);
    } else if (data.length > 10) {
      return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      refs.countryList.innerHTML = '';
      refs.countryInfoContainer.innerHTML = '';
    }
  })
  .catch(error => console.log(error));
}

function renderCountriesList(data) {
  const markup = data.map(({ name, flags }) => {
    return `
    <li class="country-list__item">
      <img src="${flags.svg}" alt="${name.official} width="20" height="12" /><p>${name.official}</p>
    </li>`
  }).join('');
  refs.countryList.innerHTML = markup;
};

function renderCountryCardInfo(data) {
  const countryMarkup = data.map(({ name, capital, flags, population, languages }) => {
    return `
    <li class="country-list_item country-info">
      <h2 class="country-header"><img src="${flags.svg}" alt="${name.official} width="30" height="18" />${name.official}</h2>
      <div class="infro-wrapper">
        <span><br><b>Capital</b>: ${capital}</span>
        <span><br><b>Population</b>: ${population}</span>
        <span><br><b>Languages</b>: ${Object.values(languages).join('')}</span>
      </div>
    </li>`
  }).join('');
  refs.countryList.innerHTML = countryMarkup;
  }
