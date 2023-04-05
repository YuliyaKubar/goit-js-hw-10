export function markupCountriesInfo(countries) {
  return countries
    .map(({ name, flags, capital, population, languages }) => {
      return `
    <div class = "country-heading">
        <img class = "country-flag" src="${flags.svg}" alt= "${flags.alt}">
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
    .join('');
}
