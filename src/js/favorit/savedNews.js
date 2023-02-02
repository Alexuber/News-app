const favoretiNewsEl = document.querySelector('.favorite-list');
import noNewsFoto from '../../images/no-news/no-news-tab@2x.png'

function createMarkup() {
  if (localStorage.length === 1) {

    return favoretiNewsEl.innerHTML = `<div class="no-news__box"><p class="no-news__text">Nothing to read in this section</p>
  <img class="no-news__image" src="${noNewsFoto}" alt="no-news" width="400px"/></div>`
  }
  if (localStorage.getItem('news-added-to-favorite')) {
    const markup = JSON.parse(localStorage.getItem('news-added-to-favorite'))
      .map(
        item => `
    <li class="news__item-fav" data-id="${item.id}">
    <div class="news__image-box">
    <img class="news__image" src="${item.image}" alt="" />
    <div class="div">
    <button class="btn-width " data-value="4" type="button">Remove from favorite</button>
    <svg class="favorite-btn__icon-remove" width="16" height="14" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.66659 1C2.82592 1 1.33325 2.47733 1.33325 4.3C1.33325 5.77133 1.91659 9.26333 7.65858 12.7933C7.76144 12.8559 7.87952 12.889 7.99992 12.889C8.12032 12.889 8.2384 12.8559 8.34125 12.7933C14.0833 9.26333 14.6666 5.77133 14.6666 4.3C14.6666 2.47733 13.1739 1 11.3333 1C9.49258 1 7.99992 3 7.99992 3C7.99992 3 6.50725 1 4.66659 1Z" stroke="#4440F7" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    </div>
    <h3 class="news__image-heading">${item.h3}</h3>
    </div>
    <h2 class="news__title">${item.title}</h2>
        <p class="news__text">${item.text}</p>
        <div class="news__lower-box">
        <p class="news__date">${item.date}</p>
        <a class="news__readmore-link" target="_blank"
        rel="noopener noreferrer" href="${item.href}">Read more</a>
        </div>
        </li>
        `
      )
      .join('');

    favoretiNewsEl.innerHTML = markup;
  }
}

createMarkup();

function deleteItemMarkup(event) {
  if (event.target.nodeName !== 'DIV') {
    return;
  }

  if (localStorage.getItem('news-added-to-favorite')) {
    const arrayWithremovedNew = JSON.parse(
      localStorage.getItem('news-added-to-favorite')
    ).filter(item => item.id !== event.target.parentNode.parentNode.dataset.id);
    localStorage.removeItem('news-added-to-favorite');
    localStorage.setItem(
      'news-added-to-favorite',
      JSON.stringify(arrayWithremovedNew)
    );
  }

  createMarkup();
}
favoretiNewsEl.addEventListener('click', deleteItemMarkup);
