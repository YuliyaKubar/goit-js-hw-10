import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(event) {
  event.preventDefault();
  const searchValue = inputEl.value.trim();
  if (searchValue == '') {
    return;
  }

  fetchCountries(searchValue)
    .then(countries => {
      onInputCheck(countries);
    })
    .catch(() => {
      Notify.failure('Oops, there is no country with that name');
    });
}

function markupCountriesList(countries) {
  return countries
    .map(({ name, flags }) => {
      return `
        <li class="country-item">
        <img class="country-flag" src="${flags.svg}"  alt="${flags.alt}">
        <h2 class="country-title">${name.official}</h2>
        </li>
        `;
    })
    .join('');
}

function markupCountriesInfo(countries) {
  return countries
    .map(({ name, flags, capital, population, languages }) => {
      return `
    <div class = "country-heading">
        <img class = "country-flag" src="${flag.svg}" alt= "${flag.alt}">
        <h1 class= "country-title">${name.official}</h1>
    </div>
    <div class="country-list">
        <p class="country-text">Capital: ${capital}</p>
        <p class="country-text">Population: ${population}</p>   
        <p class="country-text">Languages: ${Object.values(languages).join(
          ', '
        )}</p>
        </div>
      `;
    })
    .join();
}

function onInputCheck(countries) {
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countries.length >= 2 && countries.length <= 10) {
    countryListEl.insertAdjacentHTML(
      'beforeend',
      markupCountriesList(countries)
    );
  } else if (countries.length === 1) {
    countryInfoEl.insertAdjacentHTML(
      'beforeend',
      markupCountriesInfo(countries)
    );
  }
}
