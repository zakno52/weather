/* eslint-disable */

import './styles.css';
import { DOMUtils } from './DOMUtils';

const logoContainer = document.getElementById('logo');
const location = document.getElementById('location-input');
const searchBtn = document.getElementById('search-button');
const locationSearchedDiv = document.getElementById('location-searched');
const sideDaysWeatherDiv = document.getElementById('side-day-weather');
const weatherResultsDiv = document.getElementById('weather-data-showed');

logoContainer.innerHTML = DOMUtils.logo;

searchBtn.addEventListener('click', () => fetchData());
location.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    fetchData();
  }
});

async function fetchData() {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=f1f9fb8473e64e31b6a135518252205&q=${location.value}&days=7&aqi=no&alerts=no`
    );
    // http://api.weatherapi.com/v1/forecast.json?key=f1f9fb8473e64e31b6a135518252205&q=${location.value}&days=1&aqi=no&alerts=no
    //http://api.weatherapi.com/v1/current.json?key=f1f9fb8473e64e31b6a135518252205&q=${location.value}&aqi=no
    const data = await response.json();
    console.log(data);

    renderData(data);
  } catch (error) {
    console.error(error);
  }
}

function renderData(data) {
  locationSearchedDiv.innerHTML = '';
  const country = DOMUtils.createElement('div', 'country', `${data.location.country}`);
  const region = DOMUtils.createElement('div', 'region', `${data.location.region}`);
  const time = DOMUtils.createElement('div', 'time', `${data.location.localtime}`);
  locationSearchedDiv.append(country, region, time);

  const currentTempDiv = DOMUtils.createElement('div', 'temp', `${data.current.temp_c} C`);
  const currentTempIcon = DOMUtils.createElement('img', 'icon', '');
  currentTempIcon.src = data.current.condition.icon;
  sideDaysWeatherDiv.innerHTML = '';
  const dayWeather = DOMUtils.createElement('div', 'days', `<p>Current:</p>`);
  dayWeather.append(currentTempDiv, currentTempIcon);
  sideDaysWeatherDiv.append(dayWeather);

  //forcast days
  for (let index = 0; index < data.forecast.forecastday.length; index++) {
    let dateofday = data.forecast.forecastday[index].date;
    const maxTempDiv = DOMUtils.createElement('div', 'temp', `${data.forecast.forecastday[index].day.maxtemp_c} C`);
    const minTempDiv = DOMUtils.createElement('div', 'temp', `${data.forecast.forecastday[index].day.mintemp_c} C`);
    const dayTempIcon = DOMUtils.createElement('img', 'icon', '');
    dayTempIcon.src = data.forecast.forecastday[index].day.condition.icon;
    const fcdayone = DOMUtils.createElement('div', 'days', `<p>${dateofday.slice(5, 10)}</p>`);
    fcdayone.append(maxTempDiv, dayTempIcon, minTempDiv);
    sideDaysWeatherDiv.append(fcdayone);
  }

  // Clear previous results
  weatherResultsDiv.innerHTML = '';
  weatherResultsDiv.appendChild(currentTempIcon.cloneNode(true));
  // Results data
  // Results data with classes
  const weatherFields = [
    { label: 'Temperature', value: data.current.temp_c, unit: '°C', class: 'weather-temp', icon: DOMUtils.tempIcon },
    { label: 'Feels Like', value: data.current.feelslike_c, unit: '°C', class: 'weather-feelslike', icon: DOMUtils.feelslikeIcon },
    { label: 'Condition', value: data.current.condition.text, unit: '', class: 'weather-condition', icon: DOMUtils.conditionIcon },
    { label: 'Wind', value: data.current.wind_kph, unit: 'kph', class: 'weather-wind', icon: DOMUtils.windIcon },
    { label: 'Pressure', value: data.current.pressure_mb, unit: 'mb', class: 'weather-pressure', icon: DOMUtils.pressureIcon },
    { label: 'Precipitation', value: data.current.precip_mm, unit: 'mm', class: 'weather-precip', icon: DOMUtils.precIcon },
    { label: 'Humidity', value: data.current.humidity, unit: '%', class: 'weather-humidity', icon: DOMUtils.humidIcon },
    { label: 'Cloud', value: data.current.cloud, unit: '%', class: 'weather-cloud', icon: DOMUtils.cloudIcon },
    { label: 'Visibility', value: data.current.vis_km, unit: 'km', class: 'weather-visibility', icon: DOMUtils.visibleIcon },
    { label: 'UV', value: data.current.uv, unit: '', class: 'weather-uv', icon: DOMUtils.uvIcon },
    { label: 'Gust', value: data.current.gust_kph, unit: 'kph', class: 'weather-gust', icon: DOMUtils.gustIcon },
  ];

  weatherFields.forEach((field) => {
    const fieldDiv = DOMUtils.createElement(
      'div',
      `data-items ${field.class}`,
      `<div class="title"><span class="data-icons">${field.icon}</span>${field.label}:</div> ${field.value} ${field.unit}`
    );
    weatherResultsDiv.appendChild(fieldDiv);
  });
}
