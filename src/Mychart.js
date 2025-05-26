/* eslint-disable */

import Chart from 'chart.js/auto';

export class Mychart {
  static data;
  static dates() {
    const week = [];
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
      week.push(forecastDate);
    }
    return week;
  }

  // Sample data
  static dayData = {
    labels: this.dates(),
    datasets: [
      {
        // label: 'My Dataset',
        data: [30, 50, 80, 40, 60, 20, 90],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.5,
      },
    ],
  };

  // Configuration
  static config = {
    type: 'line',
    data: this.dayData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          display: false,
        },
      },
    },
  };

  // Create the chart
  static myChart = new Chart(document.getElementById('myChart'), this.config);
}
