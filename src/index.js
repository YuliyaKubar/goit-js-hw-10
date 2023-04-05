import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
import { markupCountriesList } from './markupCountriesList';
import { markupCountriesInfo } from './markupCountriesInfo';
import { onInputCheck } from './onInputCheck';
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
// const countryListEl = document.querySelector('.country-list');
// const countryInfoEl = document.querySelector('.country-info');

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
