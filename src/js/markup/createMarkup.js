function createMarkup(data, markupName) {
  const markup = {
    popularCards: '',
    dateCards: '',
    categoryCards: '',
    inputsCards: '',
    categoriesForDesktop: '',
    categoriesFull: '',
    weather: '',
    pagination: '',
  };

  const IMAGES_URL = 'https://www.nytimes.com/';

  let markupArr = [];
  let imageUrl;

  if (markupName === 'popularCards') {
    data.sort((a, b) => {
      const firstDate = new Date(a.published_date);
      const lastDate = new Date(b.published_date);
      return lastDate - firstDate;
    });

    markupArr = data.flatMap(el => {
      if (el.media.length !== 0) {
        imageUrl = el.media[0]['media-metadata'][2].url;
      } else {
        imageUrl =
          'https://t4.ftcdn.net/jpg/00/38/13/73/240_F_38137330_gUbR3ZXBc5J5g4pRkaC8TYZQA62OZhx5.jpg';
      }
      return `
      <li class="news__item" data-id="${el.id}">
        <div class="news__image-box">
          <img class="news__image" src="${imageUrl}" alt="" />
            <div class="div">
              <button class="news__favorite-btn " data-value="4" type="button">Add to favorite</button>
              <svg class="favorite-btn__icon-add" width="16" height="14" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.66659 1C2.82592 1 1.33325 2.47733 1.33325 4.3C1.33325 5.77133 1.91659 9.26333 7.65858 12.7933C7.76144 12.8559 7.87952 12.889 7.99992 12.889C8.12032 12.889 8.2384 12.8559 8.34125 12.7933C14.0833 9.26333 14.6666 5.77133 14.6666 4.3C14.6666 2.47733 13.1739 1 11.3333 1C9.49258 1 7.99992 3 7.99992 3C7.99992 3 6.50725 1 4.66659 1Z" stroke="#4440F7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="news__image-heading">${el.section}</h3>
        </div>
        <h2 class="news__title">${el.title}</h2>
        <p class="news__text">${el.abstract}</p>
        <div class="news__lower-box">
          <p class="news__date">${el.published_date}</p>
          <a class="news__readmore-link" target="_blank"
          rel="noopener noreferrer" href="${el.url}">Read more</a>
        </div>
      </li>
      `;
    });
  }

  if (markupName === 'dateCards') {
    let date;
    let normalDate;

    markupArr = data.flatMap(el => {
      if (el.multimedia.length !== 0) {
        imageUrl = IMAGES_URL + el.multimedia[0].url;
      } else {
        imageUrl =
          'https://t4.ftcdn.net/jpg/00/38/13/73/240_F_38137330_gUbR3ZXBc5J5g4pRkaC8TYZQA62OZhx5.jpg';
      }

      date = new Date(el.pub_date);
      normalDate = date.toISOString().split('T')[0];

      return `
      <li class="news__item" data-id="${el._id}">
        <div class="news__image-box">
          <img class="news__image" src="${imageUrl}" alt="" />
            <div class="div">
              <button class="news__favorite-btn " data-value="4" type="button">Add to favorite</button>
              <svg class="favorite-btn__icon-add" width="16" height="14" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.66659 1C2.82592 1 1.33325 2.47733 1.33325 4.3C1.33325 5.77133 1.91659 9.26333 7.65858 12.7933C7.76144 12.8559 7.87952 12.889 7.99992 12.889C8.12032 12.889 8.2384 12.8559 8.34125 12.7933C14.0833 9.26333 14.6666 5.77133 14.6666 4.3C14.6666 2.47733 13.1739 1 11.3333 1C9.49258 1 7.99992 3 7.99992 3C7.99992 3 6.50725 1 4.66659 1Z" stroke="#4440F7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="news__image-heading">${el.section_name}</h3>
        </div>
        <h2 class="news__title">${el.abstract}</h2>
        <p class="news__text">${el.lead_paragraph}</p>
        <div class="news__lower-box">
          <p class="news__date">${normalDate}</p>
          <a class="news__readmore-link" target="_blank"
          rel="noopener noreferrer" href="${el.web_url}">Read more</a>
        </div>
      </li>
      `;
    });
  }

  if (markupName === 'categoryCards') {
    let date;
    let normalDate;

    markupArr = data.flatMap(el => {
      if (el.multimedia) {
        if (el.multimedia.length >= 3) {
          imageUrl = el.multimedia[2].url;
        } else {
          imageUrl =
            'https://t4.ftcdn.net/jpg/00/38/13/73/240_F_38137330_gUbR3ZXBc5J5g4pRkaC8TYZQA62OZhx5.jpg';
        }
      } else {
        imageUrl =
          'https://t4.ftcdn.net/jpg/00/38/13/73/240_F_38137330_gUbR3ZXBc5J5g4pRkaC8TYZQA62OZhx5.jpg';
      }

      date = new Date(el.published_date);
      normalDate = date.toISOString().split('T')[0];

      return `
      <li class="news__item" data-id="${el.slug_name}">
        <div class="news__image-box">
          <img class="news__image" src="${imageUrl}" alt="" />
            <div class="div">
              <button class="news__favorite-btn " data-value="4" type="button">Add to favorite</button>
              <svg class="favorite-btn__icon-add" width="16" height="14" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.66659 1C2.82592 1 1.33325 2.47733 1.33325 4.3C1.33325 5.77133 1.91659 9.26333 7.65858 12.7933C7.76144 12.8559 7.87952 12.889 7.99992 12.889C8.12032 12.889 8.2384 12.8559 8.34125 12.7933C14.0833 9.26333 14.6666 5.77133 14.6666 4.3C14.6666 2.47733 13.1739 1 11.3333 1C9.49258 1 7.99992 3 7.99992 3C7.99992 3 6.50725 1 4.66659 1Z" stroke="#4440F7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="news__image-heading">${el.section}</h3>
        </div>
        <h2 class="news__title">${el.title}</h2>
        <p class="news__text">${el.abstract}</p>
        <div class="news__lower-box">
          <p class="news__date">${normalDate}</p>
          <a class="news__readmore-link" target="_blank"
          rel="noopener noreferrer" href="${el.url}">Read more</a>
        </div>
      </li>
      `;
    });
  }

  if (markupName === 'inputsCards') {
    let date;
    let normalDate;

    markupArr = data.flatMap(el => {
      if (el.multimedia.length !== 0) {
        imageUrl = IMAGES_URL + el.multimedia[0].url;
      } else {
        imageUrl =
          'https://t4.ftcdn.net/jpg/00/38/13/73/240_F_38137330_gUbR3ZXBc5J5g4pRkaC8TYZQA62OZhx5.jpg';
      }

      date = new Date(el.pub_date);
      normalDate = date.toISOString().split('T')[0];

      return `
      <li class="news__item" data-id="${el._id}">
        <div class="news__image-box">
          <img class="news__image" src="${imageUrl}" alt="" />
            <div class="div">
              <button class="news__favorite-btn " data-value="4" type="button">Add to favorite</button>
              <svg class="favorite-btn__icon-add" width="16" height="14" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.66659 1C2.82592 1 1.33325 2.47733 1.33325 4.3C1.33325 5.77133 1.91659 9.26333 7.65858 12.7933C7.76144 12.8559 7.87952 12.889 7.99992 12.889C8.12032 12.889 8.2384 12.8559 8.34125 12.7933C14.0833 9.26333 14.6666 5.77133 14.6666 4.3C14.6666 2.47733 13.1739 1 11.3333 1C9.49258 1 7.99992 3 7.99992 3C7.99992 3 6.50725 1 4.66659 1Z" stroke="#4440F7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="news__image-heading">${el.section_name}</h3>
        </div>
        <h2 class="news__title">${el.abstract}</h2>
        <p class="news__text">${el.lead_paragraph}</p>
        <div class="news__lower-box">
          <p class="news__date">${normalDate}</p>
          <a class="news__readmore-link" target="_blank"
          rel="noopener noreferrer" href="${el.web_url}">Read more</a>
        </div>
      </li>
      `;
    });
  }

  if (markupName === 'categoriesForDesktop') {
    markupArr = data.map((el, idx) => {
      if (idx >= 7 || idx === 0) {
        return;
      } else {
        return `<li class="categories-link-desktop" data-search=${el.section}><button class="btn-desktop">${el.display_name}</button></li>`;
      }
    });
  }

  if (markupName === 'categoriesFull') {
    markupArr = data.flatMap((el, idx) => {
      return `<li class="categories-menu-link" data-search=${el.section}><button class="btn-menu">${el.display_name}</button></li>`;
    });
  }

  if (markupName === 'weather') {
    markupArr = data.flatMap(el => {
      return `
        <div class="weather__info info">
          <p class="info__temp">${Math.floor(data.main.temp)}°</p>
          <div class="info-wrapper">
            <p class="info__situation">${data.weather[0].main}</p>
            <div class="info-wrapper-items">
              <svg class="info-wrapper__svg" width="18" height="18">
                <use class="geo" href="./images/icons.svg#icon-geo"></use>
              </svg>
              <p class="info__geo">${data.name}</p>
            </div>
          </div>
        </div>
        <img
          src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"
          alt="image of sun"
          width="128"
          class="weather-img"
        />
        <p class="weather__date-week">
          ${localDate.dayOfWeek}
        </p>
        <p class="weather__date-date">
          ${localDate.dateUser}
          ${localDate.dateMonth}
          ${localDate.dateYear}
        </p>
        <a class="weather__link" href="https://weather.com/weather/tenday/l/35a741555bbfc8bc576be864b0b64af6d1b2ad1328d2ee729f0de0ae00098e85">
          weather for week
        </a>`;
    });
  }

  if (markupName === 'pagination') {
    // createMarkup(8, "pagination")
    for (let i = 1; i <= data; i += 1) {
      markupArr.push(`<li class="pagination-item">${i}</li>`);
    }
  }

  markup[markupName] = markupArr.join('');
  return markup[markupName];
}

export { createMarkup };
