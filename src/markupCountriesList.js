export function markupCountriesList(countries) {
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
