import { Mychart } from '../ChartJS/Mychart';
import { DOMUtils } from '../DOMUtils/DOMUtils';

export class AddEvents {
  // track
  static data;
  static dataElements = {};
  static lastDayClickedIndex;

  static async displayDataOnClick() {
    let daysOnTheSide = document.querySelectorAll('.days');

    daysOnTheSide[0].addEventListener('click', async () => {
      await this.itemsAnimation();
      this.displayDataForCurrentDay();
    });

    for (let index = 1; index < daysOnTheSide.length; index++) {
      daysOnTheSide[index].addEventListener('click', async () => {
        await this.itemsAnimation();
        this.displayDataForecast(index);
      });
    }
  }

  static itemsAnimation() {
    return new Promise((resolve) => {
      const chart = document.getElementById('weather-chart');
      const weatherData = document.getElementById('weather-data-showed');

      chart.style.opacity = '0';
      weatherData.style.opacity = '0';

      setTimeout(() => {
        chart.style.opacity = '1';
        weatherData.style.opacity = '1';

        resolve();
      }, 800);
    });
  }

  static displayDataForCurrentDay() {
    const currentDay = this.data.current;
    const largeIcon = document.querySelector('.weather-data-showed').querySelector('.icon');
    const chart = document.getElementById('myChart');
    largeIcon.src = `${currentDay.condition.icon}`;

    for (const key in this.dataElements) {
      const title = this.dataElements[key].querySelector('.title').lastChild;
      const smallIcon = this.dataElements[key].querySelector('.title').querySelector('.data-icons');
      const weatherDataSmallBox = this.dataElements[key].lastChild;

      if (key === 'weather-temp') {
        weatherDataSmallBox.innerHTML = `${currentDay.temp_c}°C`;
      } else if (key === 'weather-condition') {
        weatherDataSmallBox.innerHTML = `${currentDay.condition.text}`;
      } else if (key === 'weather-wind') {
        weatherDataSmallBox.innerHTML = `${currentDay.wind_kph} kph`;
      } else if (key === 'weather-precip') {
        weatherDataSmallBox.innerHTML = `${currentDay.precip_mm} mm`;
      } else if (key === 'weather-humidity') {
        weatherDataSmallBox.innerHTML = `${currentDay.humidity} %`;
      } else if (key === 'weather-visibility') {
        weatherDataSmallBox.innerHTML = `${currentDay.vis_km} km`;
      } else if (key === 'weather-uv') {
        weatherDataSmallBox.innerHTML = `${currentDay.uv}`;
      } else if (key === 'weather-feelslike') {
        weatherDataSmallBox.innerHTML = `${currentDay.feelslike_c}°C`;
        title.textContent = 'Feels like';
        smallIcon.innerHTML = DOMUtils.feelslikeIcon;
      } else if (key === 'weather-pressure') {
        weatherDataSmallBox.innerHTML = `${currentDay.pressure_mb} mb`;
        title.textContent = 'Pressure';
        smallIcon.innerHTML = DOMUtils.pressureIcon;
      } else if (key === 'weather-cloud') {
        weatherDataSmallBox.innerHTML = `${currentDay.cloud} %`;
        title.textContent = 'Cloud';
        smallIcon.innerHTML = DOMUtils.cloudIcon;
      } else if (key === 'weather-gust') {
        weatherDataSmallBox.innerHTML = `${currentDay.gust_kph} kph`;
        title.textContent = 'Gust';
        smallIcon.innerHTML = DOMUtils.gustIcon;
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
      const title = this.dataElements[key].querySelector('.title').lastChild;
      const smallIcon = this.dataElements[key].querySelector('.title').querySelector('.data-icons');
      const weatherDataSmallBox = this.dataElements[key].lastChild;

      if (key === 'weather-temp') {
        weatherDataSmallBox.innerHTML = `${forecastDay.maxtemp_c}°C - <span class='min-temp'>${forecastDay.mintemp_c}°C</span>`;
      } else if (key === 'weather-condition') {
        weatherDataSmallBox.innerHTML = `${forecastDay.condition.text}`;
      } else if (key === 'weather-wind') {
        weatherDataSmallBox.innerHTML = `${forecastDay.maxwind_kph} kph`;
      } else if (key === 'weather-precip') {
        weatherDataSmallBox.innerHTML = `${forecastDay.totalprecip_mm} mm`;
      } else if (key === 'weather-humidity') {
        weatherDataSmallBox.innerHTML = `${forecastDay.avghumidity} %`;
      } else if (key === 'weather-visibility') {
        weatherDataSmallBox.innerHTML = `${forecastDay.avgvis_km} km`;
      } else if (key === 'weather-uv') {
        weatherDataSmallBox.innerHTML = `${forecastDay.uv}`;
      } else if (key === 'weather-feelslike') {
        title.textContent = 'Chance of rain';
        smallIcon.innerHTML = DOMUtils.chanceRainIcon;
        weatherDataSmallBox.innerHTML = `${forecastDay.daily_chance_of_rain} %`;
      } else if (key === 'weather-pressure') {
        title.textContent = 'Sunrise';
        smallIcon.innerHTML = DOMUtils.sunriseIcon;
        weatherDataSmallBox.innerHTML = `${this.data.forecast.forecastday[index - 1].astro.sunrise}`;
      } else if (key === 'weather-cloud') {
        title.textContent = 'Chance of snow';
        smallIcon.innerHTML = DOMUtils.chanceSnowIcon;
        weatherDataSmallBox.innerHTML = `${forecastDay.daily_chance_of_snow} %`;
      } else if (key === 'weather-gust') {
        title.textContent = 'Sunset';
        smallIcon.innerHTML = DOMUtils.sunsetIcon;
        weatherDataSmallBox.innerHTML = `${this.data.forecast.forecastday[index - 1].astro.sunset}`;
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
      const title = this.dataElements[key].querySelector('.title').lastChild;
      const smallIcon = this.dataElements[key].querySelector('.title').querySelector('.data-icons');
      const weatherDataSmallBox = this.dataElements[key].lastChild;

      if (key === 'weather-temp') {
        weatherDataSmallBox.innerHTML = `${hourForecast.temp_c}°C`;
      } else if (key === 'weather-condition') {
        weatherDataSmallBox.innerHTML = `${hourForecast.condition.text}`;
      } else if (key === 'weather-wind') {
        weatherDataSmallBox.innerHTML = `${hourForecast.wind_kph} kph`;
      } else if (key === 'weather-precip') {
        weatherDataSmallBox.innerHTML = `${hourForecast.precip_mm} mm`;
      } else if (key === 'weather-humidity') {
        weatherDataSmallBox.innerHTML = `${hourForecast.humidity} %`;
      } else if (key === 'weather-visibility') {
        weatherDataSmallBox.innerHTML = `${hourForecast.vis_km} km`;
      } else if (key === 'weather-uv') {
        weatherDataSmallBox.innerHTML = `${hourForecast.uv}`;
      } else if (key === 'weather-feelslike') {
        weatherDataSmallBox.innerHTML = `${hourForecast.feelslike_c}°C`;
        title.textContent = 'Feels like';
        smallIcon.innerHTML = DOMUtils.feelslikeIcon;
      } else if (key === 'weather-pressure') {
        weatherDataSmallBox.innerHTML = `${hourForecast.pressure_mb} mb`;
        title.textContent = 'Pressure';
        smallIcon.innerHTML = DOMUtils.pressureIcon;
      } else if (key === 'weather-cloud') {
        weatherDataSmallBox.innerHTML = `${hourForecast.cloud} %`;
        title.textContent = 'Cloud';
        smallIcon.innerHTML = DOMUtils.cloudIcon;
      } else if (key === 'weather-gust') {
        weatherDataSmallBox.innerHTML = `${hourForecast.gust_kph} kph`;
        title.textContent = 'Gust';
        smallIcon.innerHTML = DOMUtils.gustIcon;
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
