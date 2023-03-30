import './css/styles.css';
import './fetchCountries.js';
import fetchCountries from './fetchCountries.js';
import debounce from 'lodash.debounce';

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const divEl = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(onInputText, DEBOUNCE_DELAY));

function onInputText(event) {
  fetchCountries();
}
