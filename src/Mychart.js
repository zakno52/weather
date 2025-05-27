/* eslint-disable */

import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export class Mychart {
  static data;
  static chart;

  static createChart(dayIndex) {
    // If a chart already exists, destroy it first
    if (this.chart) {
      this.chart.destroy();
    }

    const todaysWeatherData = () => {
      const days = [];
      const hours = [];
      const icons = [];
      for (let index = 0; index < 24; index++) {
        const thisHourTemp = Mychart.data.forecast.forecastday[dayIndex].hour[index].temp_c;
        const hoursOfDay = Mychart.data.forecast.forecastday[dayIndex].hour[index].time.slice(11);
        const weatherIcon = Mychart.data.forecast.forecastday[dayIndex].hour[index].condition.icon;
        console.log(thisHourTemp);
        days.push(thisHourTemp);
        hours.push(hoursOfDay);
        icons.push(weatherIcon);
      }
      return { days: days, hours: hours, icons: icons };
    };

    const weatherIconsSrc = todaysWeatherData().icons;
    const weatherIcons = weatherIconsSrc.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    const hoverCrosshairPlugin = {
      id: 'hoverCrosshair',
      afterDatasetsDraw(chart, args, options) {
        const {
          ctx,
          tooltip,
          chartArea: { top, bottom, left, right },
          scales: { x, y },
        } = chart;

        if (!tooltip || !tooltip.dataPoints || tooltip.dataPoints.length === 0) return;

        const point = tooltip.dataPoints[0];
        const xPos = x.getPixelForValue(point.dataIndex);
        const yPos = y.getPixelForValue(point.raw);

        // Draw vertical crosshair
        ctx.save();
        ctx.lineWidth = 40;
        ctx.strokeStyle = 'rgba(199, 199, 199, 0.13)';
        ctx.beginPath();
        ctx.moveTo(xPos, top);
        ctx.lineTo(xPos, bottom);
        ctx.stroke();

        ctx.restore();
      },
    };

    const iconPlugin = {
      id: 'weatherIcons',
      afterDatasetsDraw(chart) {
        const {
          ctx,
          data,
          scales: { x, y },
        } = chart;

        data.datasets[0].data.forEach((value, index) => {
          const image = weatherIcons[index];
          const xPos = x.getPixelForValue(index);
          const yPos = y.getPixelForValue(value) - 40;

          if (image.complete) {
            ctx.drawImage(image, xPos - 12, yPos, 24, 24);
          }
        });
      },
    };

    const dayData = {
      labels: todaysWeatherData().hours,
      datasets: [
        {
          data: todaysWeatherData().days,
          fill: false,
          borderColor: 'rgb(24, 187, 224)',
          tension: 0.6,
        },
      ],
    };

    const config = {
      type: 'line',
      data: dayData,
      options: {
        onClick: (event, elements, chart) => {
          const tooltip = chart.tooltip;
          if (!tooltip || !tooltip.dataPoints || tooltip.dataPoints.length === 0) return;

          const point = tooltip.dataPoints[0];
          const index = point.dataIndex;
          const value = point.raw;

          // 👉 Do something with the clicked point
          console.log(`Clicked point at index ${index}, value: ${value}°`);

          // Example: Show a custom popup
          // showPopup({ hour: chart.data.labels[index], temp: value });
        },
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          tooltip: {
            enabled: false, //  Visually disabled
            external: () => {}, // Disable default tooltip
          },
          legend: { display: false },
          title: { display: false },
          datalabels: {
            align: 'top',
            anchor: 'center',
            formatter: (value) => `${value}°`,
            color: 'rgb(75, 192, 192)',
            font: { weight: 'bold' },
          },
          hoverCrosshair: {
            showLabel: false, // Set to true if you want custom label text
          },
        },
        scales: {
          x: { grid: { display: false } },
          y: { display: false, grace: 5 },
        },
      },
      plugins: [ChartDataLabels, iconPlugin, hoverCrosshairPlugin],
    };

    const ctx = document.getElementById('myChart');
    this.chart = new Chart(ctx, config);
    return this.chart;
  }
}
