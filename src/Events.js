/* eslint-disable */

export class AddEvents {
  // track
  static data;
  static dataElements = {};

  static displayDataOnClick() {
    let daysOnTheSide = document.querySelectorAll('.days');

    daysOnTheSide[0].addEventListener('click', () => {
      this.displayDataForCurrentDay();
    });
    for (let index = 1; index < daysOnTheSide.length; index++) {
      daysOnTheSide[index].addEventListener('click', () => {
        this.displayDataForecast(index);
      });
    }
  }

  static displayDataForCurrentDay() {
    // edit + show
  }

  static displayDataForecast(index) {
    const forecastDay = this.data.forecast.forecastday[index - 1].day;
    const largeIcon = document.querySelector('.weather-data-showed').querySelector('.icon');
    largeIcon.src = `${forecastDay.condition.icon}`;

    for (const key in this.dataElements) {
      if (key === 'weather-temp') {
        this.dataElements[key].lastChild.innerHTML = `${forecastDay.maxtemp_c}C - <span class='min-temp'>${forecastDay.mintemp_c}C</span>`;
      } else if (key === 'weather-condition') {
        this.dataElements[key].lastChild.innerHTML = `${forecastDay.condition.text}`;
      } else if (key === 'weather-wind') {
        this.dataElements[key].lastChild.innerHTML = `${forecastDay.maxwind_kph} kph`;
      } else if (key === 'weather-precip') {
        this.dataElements[key].lastChild.innerHTML = `${forecastDay.totalprecip_mm} mm`;
      } else if (key === 'weather-humidity') {
        this.dataElements[key].lastChild.innerHTML = `${forecastDay.avghumidity} %`;
      } else if (key === 'weather-visibility') {
        this.dataElements[key].lastChild.innerHTML = `${forecastDay.avgvis_km} km`;
      } else if (key === 'weather-uv') {
        this.dataElements[key].lastChild.innerHTML = `${forecastDay.uv}`;
      } else if (key === 'weather-feelslike' || key === 'weather-pressure' || key === 'weather-cloud' || key === 'weather-gust') {
        this.dataElements[key].style.display = 'none';
      }
    }
  }
}
