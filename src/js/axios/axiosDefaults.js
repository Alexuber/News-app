import axios from 'axios';

export const KEYS = {
  WEATHER: 'f3ada08f24524eaebe0dab7657f9578c',
  NEWS: 'zqSBDCWWfsUqmPN3a0NlmObTljUQwqkT',
  NEWS_2: 'I88PRBGPysQPobg19OG21QsF1dTuRU9q',
};

const axiosWeather = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
  params: {
    appid: KEYS.WEATHER,
    units: 'metric',
  },
});

// ------------------------ Пример запроса за погодой по ширине и долготе, ниже по названию города:

// axiosWeather.get('', {
//   params: {
//     lat: 44.34,
//     lon: 10.99,
//   },
// });

// axiosWeather.get('', {
//   params: {
//     q: 'Amsterdam',
//   },
// });

function randomKey() {
  const random = Math.random();

  if (random > 5) {
    return KEYS.NEWS;
  } else {
    return KEYS.NEWS_2;
  }
}

const axiosNews = axios.create({
  baseURL: 'https://api.nytimes.com/svc/',
  params: {
    'api-key': randomKey(),
  },
});

// ------------------------ Возможно код для поиска IP пользователя

// fetch('https://ipapi.co/json/')
//   .then(d => d.json())
//   .then(d => (document.querySelector('#ip').innerHTML = d.ip));
// <div id="ip"></div>;

// Запрос за городом по ИП
// http://ipwho.is/[IP address]

export { axiosWeather, axiosNews };
