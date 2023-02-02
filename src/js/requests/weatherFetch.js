import axios from 'axios';
import { KEYS } from '../axios/axiosDefaults';
import {
  rain,
  clearDay,
  clearNight,
  fog,
  storm,
  partlyCloudDay,
  partlyCloudDayRain,
  partlyCloudSnow,
  partlyCloudNigtht,
  partlyCloudNigthtRain,
} from './weather-svg';

let svgWeather = '';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
class Weather {
  constructor() {
    this.options = {
      baseURL: BASE_URL,
      params: {
        lat: null,
        lon: null,
        appid: KEYS.WEATHER,
        units: 'metric',
      },
    };
    this.IP_API_URL = 'https://ipapi.co/json/';
    this.userTime = null;
  }

  async getWeather() {
    const response = await axios.get(`${this.options.baseURL}`, this.options);
    return response.data;
  }
  async checkUserGeo() {
    const response = await axios(`${this.IP_API_URL}`);
    return response.data;
  }
  checkNavPermissions() {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      alert('Your browser not support geolocation api');
    }
  }
  renderWeatherMarkup(data) {
    const weatherBlockEl = document.querySelector('.weather');
    const localDate = this.dateFormatter(this.userTime);
    switch (data.weather[0].icon) {
      case '01d':
        svgWeather = clearDay;
        break;

      case '01n':
        svgWeather = clearNight;
        break;

      case '02d':
        svgWeather = partlyCloudDay;
        break;

      case '02n':
        svgWeather = partlyCloudNigtht;
        break;

      case '03d':
        svgWeather = partlyCloudDay;
        break;

      case '03n':
        svgWeather = partlyCloudNigtht;
        break;

      case '04d':
        svgWeather = partlyCloudDay;
        break;

      case '04n':
        svgWeather = partlyCloudNigtht;
        break;

      case '09d':
        svgWeather = rain;
        break;

      case '09n':
        svgWeather = rain;
        break;

      case '10d':
        svgWeather = partlyCloudDayRain;
        break;

      case '10n':
        svgWeather = partlyCloudNigthtRain;
        break;

      case '11d':
        svgWeather = storm;
        break;

      case '11n':
        svgWeather = storm;
        break;

      case '13d':
        svgWeather = partlyCloudSnow;
        break;

      case '13n':
        svgWeather = partlyCloudSnow;
        break;

      case '50d':
        svgWeather = fog;
        break;

      case '50n':
        svgWeather = fog;
        break;

      default:
    }
    const markup = `
    <div class="weather__info info">
  <p class="info__temp">${Math.floor(data.main.temp)}°</p>
  <div class="info-wrapper">
    <p class="info__situation">${data.weather[0].main}</p>
    <div class="info-wrapper-items">
    <svg class= "info-wrapper__svg" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.5 1.6875C11.0394 1.6904 8.68032 2.66918 6.94038 4.40912C5.20044 6.14906 4.22166 8.5081 4.21876 10.9688C4.21581 12.9796 4.87265 14.9359 6.08851 16.5375C6.08851 16.5375 6.34163 16.8708 6.38298 16.9189L13.5 25.3125L20.6204 16.9147C20.6575 16.8699 20.9115 16.5375 20.9115 16.5375L20.9124 16.535C22.1276 14.934 22.7841 12.9787 22.7813 10.9688C22.7784 8.5081 21.7996 6.14906 20.0596 4.40912C18.3197 2.66918 15.9607 1.6904 13.5 1.6875ZM13.5 14.3438C12.8325 14.3438 12.18 14.1458 11.625 13.775C11.0699 13.4041 10.6374 12.877 10.3819 12.2603C10.1265 11.6436 10.0596 10.965 10.1899 10.3103C10.3201 9.65563 10.6415 9.05427 11.1135 8.58226C11.5855 8.11026 12.1869 7.78882 12.8416 7.6586C13.4963 7.52837 14.1749 7.59521 14.7916 7.85066C15.4083 8.1061 15.9354 8.53868 16.3062 9.0937C16.6771 9.64872 16.875 10.3012 16.875 10.9688C16.8739 11.8635 16.518 12.7213 15.8853 13.354C15.2526 13.9867 14.3948 14.3426 13.5 14.3438Z" fill="white"/>
</svg>
      <p class="info__geo">${data.name}</p>
    </div>
  </div>
</div>
<svg class="weather-img" ${svgWeather}
</svg>
<p class="weather__date-week">
  ${localDate.dayOfWeek}
</p>
<p class="weather__date-date">
  ${localDate.dateUser} ${localDate.dateMonth} ${localDate.dateYear}
</p>
<a class="weather__link" href="https://sinoptik.ua/" target="_blank">weather for week</a>`;
    weatherBlockEl.innerHTML = markup;
  }
  dateFormatter(date) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const month = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Nov',
      'Dec',
    ];
    const userDate = new Date(date);

    const weatherDate = {
      dayOfWeek: days[userDate.getDay()],
      dateUser: userDate.getDate(),
      dateYear: userDate.getFullYear(),
      dateMonth: month[userDate.getMonth()],
    };

    return weatherDate;
  }
}

const weather = new Weather();

addEventListener('DOMContentLoaded', weather.checkNavPermissions);

function onSuccess(position) {
  const { latitude, longitude } = position.coords;

  weather.userTime = position.timestamp;
  weather.options.params.lat = latitude;
  weather.options.params.lon = longitude;

  weather
    .getWeather()
    .then(response => {
      weather.renderWeatherMarkup(response);
    })
    .catch(e => console.log(e));
}

async function onError(error) {
  const userGeo = await weather
    .checkUserGeo()
    .then(response => {
      const { latitude, longitude } = response;

      weather.userTime = Date.now();

      weather.options.params.lat = latitude;
      weather.options.params.lon = longitude;
    })
    .catch(e => console.log(e));

  weather
    .getWeather()
    .then(response => {
      weather.renderWeatherMarkup(response);
    })
    .catch(e => console.log(e));
}
