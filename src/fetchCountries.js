export default function fetchCountries(name) {
  fetch(
    'https://restcountries.com/v3.1/all?fields=name.official,capital,population,flags.svg,languages'
  )
    .then(response => response.json())
    .then(countries => console.log(countries))
    .catch(error => console.log('error', error));
}
