import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries.js';

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const divEl = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(onInputText, DEBOUNCE_DELAY));

function onInputText() {
  resetInput();

  const name = inputEl.value.trim();

  if (name !== '') {
    fetchCountries(name)
      .then(data => {
        if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else {
          createCountry(data);
        }
      })
      .catch(error =>
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
  }
}

function createCountry(countries) {
  createCountriesListMarcup(countries);
  if (countries.length === 1) {
    createCountriesInfoMarcup(countries[0]);
  }
}

function createCountriesListMarcup(countries) {
  const marcup = countries
    .map(({ name, flags }) => {
      return `<li class='country-list__item'>
      <img class='country-list__img' alt='' src=${flags.svg} width='30'>
    <p class='country-list__text'>${name.official}</p>
    </li>`;
    })
    .join('');
  listEl.insertAdjacentHTML('beforeend', marcup);
}

function createCountriesInfoMarcup(countries) {
  const { capital, population, languages } = countries;

  const marcupInfo = `
 <ul class=''country-info__list>
 <li class='country-info__item'><p><span class='country-info__desc'>Capital: </span>${capital}</p></li>
 <li class='country-info__item'><p><span class='country-info__desc'>Languages: </span>${Object.values(
   languages
 )}</p></li>
 <li class='country-info__item'><p><span class='country-info__desc'>Population: </span></p>${population}</li>
 </ul> 
  `;
  divEl.insertAdjacentHTML('beforeend', marcupInfo);
}

function resetInput() {
  listEl.innerHTML = '';
  divEl.innerHTML = '';
}
