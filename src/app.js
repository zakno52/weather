/* eslint-disable */

import './styles.css';
import { FetchAndReturnData } from './API/Fetch';
import { Init } from './Initialize/Init';
import { DOMUtils } from './DOMUtils/DOMUtils';

const logoContainer = document.getElementById('logo');
const location = document.getElementById('location-input');
const searchBtn = document.getElementById('search-button');
const searchBox = document.querySelector('.search-container');
const showBox = document.getElementById('day-weather-results');
const loader = document.querySelector('.loader');

logoContainer.innerHTML = DOMUtils.logo;

searchBtn.addEventListener('click', () => start());
location.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    start();
  }
});

async function start() {
  const data = await FetchAndReturnData.fetchData(location.value);
  console.log(data);
  if (data) {
    searchBoxAnimation();
    setTimeout(() => {
      Init.firstRendering(data);
    }, 3000);
  } else {
    // error page
  }
}

function searchBoxAnimation() {
  const resultsContainerDiv = document.getElementById('results-container');

  resultsContainerDiv.style.opacity = '1';
  searchBox.style.marginTop = '1rem';
  // showBox.style.display = 'block';
  loader.style.display = 'block';
  setTimeout(() => {
    loader.style.display = 'none';
  }, 1000);
  showBox.style.opacity = '1';
  document.body.style.overflow = '';
}
