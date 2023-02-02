import { alreadyRead } from './add-to-read';

const jsonFromLocalStorage =
  alreadyRead.getJsonFromLocalStorage('alreadyReadNews');
const news = alreadyRead.dataFromLocalStorage(jsonFromLocalStorage);
const accordionEl = document.querySelector('.accordion');

checkDataFromLocalStorage();

function checkDataFromLocalStorage() {
  if (news !== null) {
    renderAccordionBody(news);
  }
}

function renderAccordionBody(arrOfNews) {
  const markup = arrOfNews
    .map(
      item => `<div class="accordion__item">
  <div class="accordion__header">${item.date}</div>
  <div class="accordion__body">
    <ul class="news__list accordion__list">
    ${renderAccordionItems(item.news)}
    </ul>
  </div>
</div>`
    )
    .join('');
  accordionEl.innerHTML = markup;
}

function renderAccordionItems(arr) {
  const markup = arr
    .map(item => {
      let wayToUrl;
      let dateAPI;
      let urlLive;

      if (item.hasOwnProperty('url')) {
        urlLive = item.url;
      } else {
        urlLive = item.web_url;
      }

      if (item.hasOwnProperty('pub_date')) {
        dateAPI = item.pub_date;
      } else {
        dateAPI = item.published_date;
      }

      if (item.hasOwnProperty('multimedia') && item.hasOwnProperty('kicker')) {
        wayToUrl = `${item.multimedia[3].url}`;
      } else if (item.hasOwnProperty('multimedia')) {
        wayToUrl = `https://static01.nyt.com/${item.multimedia[3].url}`;
        dateAPI = item.pub_date;
      } else if (item.hasOwnProperty('media')) {
        wayToUrl = item.media[0]['media-metadata'][2].url;
        dateAPI = item.published_date;
      }

      const date = new Date(dateAPI);
      const normalDate = date.toISOString().split('T')[0];

      const markup = `<li class="news__item accordion__news accordion__read">
        <div class="news__image-box">
          <img
            class="news__image"
            src="${wayToUrl}"
            alt=""
          />
          <div class="div">
            <button
              class="news__favorite-btn"
              data-value="4"
              type="button"
            >
              Add to favorite
            </button>
            <svg class="favorite-btn__icon-add" width="16" height="14" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.66659 1C2.82592 1 1.33325 2.47733 1.33325 4.3C1.33325 5.77133 1.91659 9.26333 7.65858 12.7933C7.76144 12.8559 7.87952 12.889 7.99992 12.889C8.12032 12.889 8.2384 12.8559 8.34125 12.7933C14.0833 9.26333 14.6666 5.77133 14.6666 4.3C14.6666 2.47733 13.1739 1 11.3333 1C9.49258 1 7.99992 3 7.99992 3C7.99992 3 6.50725 1 4.66659 1Z" stroke="#4440F7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
          </div>
          <h3 class="news__image-heading">${
            item.section || item.section_name
          }</h3>
        </div>
        <h2 class="news__title">${item.title || item.abstract}
        </h2>
        <p class="news__text">${item.abstract}
        </p>
        <div class="news__lower-box">
          <p class="news__date">${normalDate}</p>
          <a class="news__readmore-link" href="${urlLive}">Read more</a>
        </div>
      </li>`;
      return markup;
    })
    .join('');
  return markup;
}
