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
    Init.firstRendering(data);
  } else {
    // error page
  }
}
