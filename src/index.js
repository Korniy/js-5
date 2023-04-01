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

  const inputValue = inputEl.value.trim();

  if (inputValue !== '') {
    fetchCountries(inputValue)
      .then(data => {
        if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else {
          createCountries(data);
        }
      })
      .catch(error =>
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
  }
}

function createCountries(countries) {
  createCountriesListMarcup(countries);
  if (countries.length === 1) {
    createCountryInfoMarcup(countries[0]);
  }
}

function createCountriesListMarcup(countries) {
  const marcup = countries
    .map(({ name, flags }) => {
      return `<li class='country-list__item'>
                <img class='country-list__img' alt='' src=${flags.svg} width='50'>
                <p class='country-list__text'>${name.official}</p>
              </li>`;
    })
    .join('');

  listEl.insertAdjacentHTML('beforeend', marcup);
}

function createCountryInfoMarcup(countries) {
  const { capital, population, languages } = countries;

  const marcupInfo = `<ul class=''country-info__list>
                        <li class='country-info__item'><p class='country-info__text'><span class='country-info__desc'>Capital: </span>${capital}</p></li>
                        <li class='country-info__item'><p class='country-info__text'><span class='country-info__desc'>Population: </span>${population}</p></li>
                        <li class='country-info__item'><p class='country-info__text'><span class='country-info__desc'>Languages: </span>${Object.values(
                          languages
                        )}</p></li>
                      </ul>`;

  divEl.insertAdjacentHTML('beforeend', marcupInfo);
}

function resetInput() {
  listEl.innerHTML = '';
  divEl.innerHTML = '';
}
