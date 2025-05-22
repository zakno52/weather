/* eslint-disable */

import './styles.css';

const location = document.getElementById('location-input');
const searchBtn = document.getElementById('search-button');

searchBtn.addEventListener('click', () => fetchData());
location.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    fetchData();
  }
});

async function fetchData() {
  try {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=f1f9fb8473e64e31b6a135518252205&q=${location.value}&aqi=no`);
    const data = await response.json();
    console.log(data);
    renderData(data);
  } catch (error) {
    console.error(error);
  }
}

function renderData(data) {
  const tempDiv = document.getElementById('temp');
  const tempIcon = document.getElementById('icon');

  tempDiv.innerHTML = data.current.temp_c;
  tempIcon.src = data.current.condition.icon;
}
