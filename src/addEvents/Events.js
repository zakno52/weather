import { Mychart } from '../ChartJS/Mychart';

export class AddEvents {
  // track
  static data;
  static dataElements = {};
  static lastDayClickedIndex;

  static displayDataOnClick() {
    let daysOnTheSide = document.querySelectorAll('.days');
    // track all days and add events based on their index/position

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
    const currentDay = this.data.current;
    const largeIcon = document.querySelector('.weather-data-showed').querySelector('.icon');
    const chart = document.getElementById('myChart');
    largeIcon.src = `${currentDay.condition.icon}`;

    for (const key in this.dataElements) {
      if (key === 'weather-temp') {
        this.dataElements[key].lastChild.innerHTML = `${currentDay.temp_c}°C`;
      } else if (key === 'weather-condition') {
        this.dataElements[key].lastChild.innerHTML = `${currentDay.condition.text}`;
      } else if (key === 'weather-wind') {
        this.dataElements[key].lastChild.innerHTML = `${currentDay.wind_kph} kph`;
      } else if (key === 'weather-precip') {
        this.dataElements[key].lastChild.innerHTML = `${currentDay.precip_mm} mm`;
      } else if (key === 'weather-humidity') {
        this.dataElements[key].lastChild.innerHTML = `${currentDay.humidity} %`;
      } else if (key === 'weather-visibility') {
        this.dataElements[key].lastChild.innerHTML = `${currentDay.vis_km} km`;
      } else if (key === 'weather-uv') {
        this.dataElements[key].lastChild.innerHTML = `${currentDay.uv}`;
      } else if (key === 'weather-feelslike' || key === 'weather-pressure' || key === 'weather-cloud' || key === 'weather-gust') {
        this.dataElements[key].style.display = 'flex';
      }
    }
    chart.style.display = 'none';
    this.changeDayTime('current');
  }

  static displayDataForecast(index) {
    const forecastDay = this.data.forecast.forecastday[index - 1].day;
    const largeIcon = document.querySelector('.weather-data-showed').querySelector('.icon');

    largeIcon.src = `${forecastDay.condition.icon}`;

    for (const key in this.dataElements) {
      if (key === 'weather-temp') {
        this.dataElements[key].lastChild.innerHTML = `${forecastDay.maxtemp_c}°C - <span class='min-temp'>${forecastDay.mintemp_c}°C</span>`;
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
    Mychart.createChart(index - 1);
    this.changeDayTime('forecast', index - 1);
    this.lastDayClickedIndex = index - 1;
  }

  static showHourForecast(hourIndex) {
    const hourForecast = this.data.forecast.forecastday[this.lastDayClickedIndex].hour[hourIndex];
    const largeIcon = document.querySelector('.weather-data-showed').querySelector('.icon');
    largeIcon.src = `${hourForecast.condition.icon}`;

    for (const key in this.dataElements) {
      if (key === 'weather-temp') {
        this.dataElements[key].lastChild.innerHTML = `${hourForecast.temp_c}°C`;
      } else if (key === 'weather-condition') {
        this.dataElements[key].lastChild.innerHTML = `${hourForecast.condition.text}`;
      } else if (key === 'weather-wind') {
        this.dataElements[key].lastChild.innerHTML = `${hourForecast.wind_kph} kph`;
      } else if (key === 'weather-precip') {
        this.dataElements[key].lastChild.innerHTML = `${hourForecast.precip_mm} mm`;
      } else if (key === 'weather-humidity') {
        this.dataElements[key].lastChild.innerHTML = `${hourForecast.humidity} %`;
      } else if (key === 'weather-visibility') {
        this.dataElements[key].lastChild.innerHTML = `${hourForecast.vis_km} km`;
      } else if (key === 'weather-uv') {
        this.dataElements[key].lastChild.innerHTML = `${hourForecast.uv}`;
      } else if (key === 'weather-feelslike') {
        this.dataElements[key].lastChild.innerHTML = `${hourForecast.feelslike_c}°C`;
        this.dataElements[key].style.display = 'flex';
      } else if (key === 'weather-pressure') {
        this.dataElements[key].lastChild.innerHTML = `${hourForecast.pressure_mb} mb`;
        this.dataElements[key].style.display = 'flex';
      } else if (key === 'weather-cloud') {
        this.dataElements[key].lastChild.innerHTML = `${hourForecast.cloud} %`;
        this.dataElements[key].style.display = 'flex';
      } else if (key === 'weather-gust') {
        this.dataElements[key].lastChild.innerHTML = `${hourForecast.gust_kph} kph`;
        this.dataElements[key].style.display = 'flex';
      }
    }
  }

  static changeDayTime(type, index) {
    const dateAndTime = document.querySelector('.date-time');
    switch (type) {
      case 'forecast':
        dateAndTime.innerHTML = this.data.forecast.forecastday[index].date;
        break;
      case 'time':
        dateAndTime.innerHTML = dateAndTime.innerHTML.slice(0, 10) + ' ' + `<span class='time'>${index}</span>`;
        break;
      case 'current':
        dateAndTime.innerHTML = this.data.location.localtime;
        break;
    }
  }
}
