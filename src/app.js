/* eslint-disable */

import './styles.css';
import { FetchAndReturnData } from './API/Fetch';
import { Init } from './Initialize/Init';
import { DOMUtils } from './DOMUtils/DOMUtils';

const logoContainer = document.getElementById('logo');
const location = document.getElementById('location-input');
const searchBtn = document.getElementById('search-button');

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

    Init.firstRendering(data);
  } else {
    // error page
  }
}

function searchBoxAnimation() {
  const searchBox = document.querySelector('.search-container');
  const showBox = document.getElementById('day-weather-results');
  const resultsContainerDiv = document.getElementById('results-container');
  document.body.style.overflow = 'unset';
  resultsContainerDiv.style.opacity = '1';
  searchBox.style.transition = '1s';
  searchBox.style.marginTop = '1rem';
  showBox.style.opacity = '1';
}
// const loader = document.querySelector('.loader');
// showBox.style.display = 'block';
// loader.style.display = 'block';
// setTimeout(() => {
//   loader.style.display = 'none';
// }, 1000);
