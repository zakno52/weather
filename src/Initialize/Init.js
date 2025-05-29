import { DOMUtils } from '../DOMUtils/DOMUtils';
import { AddEvents } from '../addEvents/Events';
import { Mychart } from '../ChartJS/Mychart';

// eslint-disable-next-line import/prefer-default-export
export class Init {
  static firstRendering(data) {
    const locationSearchedDiv = document.getElementById('location-searched');
    const sideDaysWeatherDiv = document.getElementById('side-day-weather');
    const weatherResultsDiv = document.getElementById('weather-data-showed');

    locationSearchedDiv.innerHTML = '';
    const country = DOMUtils.createElement('div', 'country', `${data.location.country}`);
    const region = DOMUtils.createElement('div', 'region', `Region: ${data.location.region}`);
    const time = DOMUtils.createElement('div', 'date-time', `${data.location.localtime}`);
    locationSearchedDiv.append(country, region, time);

    const currentTempDiv = DOMUtils.createElement('div', 'temp', `${data.current.temp_c}°C`);
    const currentTempIcon = DOMUtils.createElement('img', 'icon', '');
    currentTempIcon.src = data.current.condition.icon;
    sideDaysWeatherDiv.innerHTML = '';
    const dayWeather = DOMUtils.createElement('div', 'days current-day', `<p>Current:</p>`);
    dayWeather.append(currentTempDiv, currentTempIcon);
    sideDaysWeatherDiv.append(dayWeather);

    // forcast days
    for (let index = 0; index < data.forecast.forecastday.length; index++) {
      let forecastDate;
      switch (index) {
        case 0:
          forecastDate = 'Today';
          break;

        case 1:
          forecastDate = 'Tomorrow';
          break;
        default:
          forecastDate = data.forecast.forecastday[index].date.slice(5, 10);
      }
      const maxTempDiv = DOMUtils.createElement('div', 'temp', `${data.forecast.forecastday[index].day.maxtemp_c}°C`);
      const minTempDiv = DOMUtils.createElement('div', 'temp', `${data.forecast.forecastday[index].day.mintemp_c}°C`);
      const dayTempIcon = DOMUtils.createElement('img', 'icon', '');
      dayTempIcon.src = data.forecast.forecastday[index].day.condition.icon;
      const forecastDay = DOMUtils.createElement('div', 'days', `<p>${forecastDate}</p>`);
      forecastDay.append(maxTempDiv, dayTempIcon, minTempDiv);
      sideDaysWeatherDiv.append(forecastDay);
    }

    // Clear previous results
    weatherResultsDiv.innerHTML = '';
    weatherResultsDiv.append(currentTempIcon.cloneNode(true));
    // Results data
    // Results data with classes
    const weatherFields = [
      { label: 'Temperature', value: data.current.temp_c, unit: '°C', class: 'weather-temp', icon: DOMUtils.tempIcon },
      { label: 'Precipitation', value: data.current.precip_mm, unit: 'mm', class: 'weather-precip', icon: DOMUtils.precIcon },
      { label: 'UV', value: data.current.uv, unit: '', class: 'weather-uv', icon: DOMUtils.uvIcon },
      { label: 'Humidity', value: data.current.humidity, unit: '%', class: 'weather-humidity', icon: DOMUtils.humidIcon },
      { label: 'Wind', value: data.current.wind_kph, unit: 'kph', class: 'weather-wind', icon: DOMUtils.windIcon },
      { label: 'Visibility', value: data.current.vis_km, unit: 'km', class: 'weather-visibility', icon: DOMUtils.visibleIcon },
      { label: 'Condition', value: data.current.condition.text, unit: '', class: 'weather-condition', icon: DOMUtils.conditionIcon },
      { label: 'Pressure', value: data.current.pressure_mb, unit: 'mb', class: 'weather-pressure', icon: DOMUtils.pressureIcon },
      { label: 'Feels Like', value: data.current.feelslike_c, unit: '°C', class: 'weather-feelslike', icon: DOMUtils.feelslikeIcon },
      { label: 'Cloud', value: data.current.cloud, unit: '%', class: 'weather-cloud', icon: DOMUtils.cloudIcon },
      { label: 'Gust', value: data.current.gust_kph, unit: 'kph', class: 'weather-gust', icon: DOMUtils.gustIcon },
    ];

    weatherFields.forEach((field) => {
      const weatherData = DOMUtils.createElement(
        'div',
        `data-items ${field.class}`,
        `<div class="title"><span class="data-icons">${field.icon}</span>${field.label}:</div> <div class='weather-data'>${field.value} ${field.unit}</div>`
      );

      // pass the elements so i can edit them, naming each element by class name for easy access
      AddEvents.dataElements[field.class] = weatherData;
      weatherResultsDiv.appendChild(weatherData);
    });

    // add events to each side day div and pass data so i can show it accordinly
    AddEvents.data = data;
    AddEvents.displayDataOnClick();
    Mychart.data = data;
  }
}
