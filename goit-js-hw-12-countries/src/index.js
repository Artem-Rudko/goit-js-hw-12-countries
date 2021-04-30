import './styles.css';
import countryCardTmpl from './templates/country-card.hbs';
import countryListTmpl from './templates/country-list.hbs';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core'
import API from "./fetchCountries.js";

const refs = {
  inputQueryRef: document.querySelector('.input-form'),
  countryCardRef: document.querySelector('.js-card-container'),
}

const debounce = require('lodash.debounce');
refs.inputQueryRef.addEventListener('input', debounce(inputCountryNameHandler, 500))

function inputCountryNameHandler(event) {
  event.preventDefault();

  if (refs.inputQueryRef.value.length>1) {
    const searchQuery = refs.inputQueryRef.value;
    API.fetchCountries(`${searchQuery}`).then(renderCountryCard).catch(error).finally(() => {refs.inputQueryRef.value = ''})
  }
};

function renderCountryCard(country) {
  console.log(country);
  let  markup = '';
  if (country.length >=2 && country.length <= 10) {
    markup = countryListTmpl(country);
    error({
      delay: 3000,
      text: 'Too many matches found. Please enter a more specific query!',
    });
  } 
  if (country.length === 1) {
    markup = countryCardTmpl(...country);
  };
  refs.countryCardRef.innerHTML = markup;
}