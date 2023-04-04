export function onInputCheck(countries) {
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
