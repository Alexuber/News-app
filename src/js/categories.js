import { getNews } from './requests/newsFetch.js';
import { createMarkup } from './markup/createMarkup.js';
import { renderMarkup } from './markup/renderMarkup.js';
import { addFetchedToLocalStorage } from './read/fromFetchToLocalStorage';
import { haveRead } from './read/haveReadOnHome';
import { all } from 'axios';
import { init } from './pagination/pagination.js';
import { showNoNewsSection } from './requests/emptyFetch.js';
import { checkBtnId } from './favorit/checkBtnId.js';

const showCategories = document.querySelector('.show-more-btn');
const categoriesMenu = document.querySelector('.categories-menu');
const categoriesMenuJs = document.querySelector('.js-others-btn');
const categoriesBtn = document.querySelector('.categories');
const newsListRef = document.querySelector('.news__list');
const bodyClik = document.querySelector('body');

getNews('allCategories').then(resp => {
  renderMarkup(
    categoriesMenu,
    createMarkup(resp.data.results, 'categoriesFull')
  );
  renderMarkup(
    categoriesBtn,
    createMarkup(resp.data.results, 'categoriesForDesktop'),
    'afterbegin'
  );
});

function getCategoriesNews(e) {
  if (
    e.target.classList.contains('btn-menu') ||
    e.target.classList.contains('btn-desktop')
  ) {
    getNews('category', {}, e.target.textContent.toLowerCase())
      .then(resp => {
        newsListRef.innerHTML = '';
        renderMarkup(
          newsListRef,
          createMarkup(resp.data.results, 'categoryCards')
        );

        window.localStorage.setItem(
          'lastFetchType',
          JSON.stringify({
            type: 'category',
            value: e.target.textContent.toLowerCase(),
          })
        );

        checkBtnId();
        return resp.data.results;
      })
      .then(results => {
        addFetchedToLocalStorage(results);
        haveRead.checkFetchedNewsByID(results);
      });
  }
}

function renderActiveBtn(e) {
  const activeBtnLine = document.querySelector('.active-underline');
  const activeBtnColor = document.querySelector('.is-active');
  if (e.target.nodeName !== 'BUTTON') {
    return;
  } else if (e.target.classList.contains('show-more-btn')) {
    e.target.classList.toggle('desktop-btn-active');
    categoriesMenu.classList.toggle('visible');
  } else if (e.target.classList.contains('btn-desktop')) {
    if (activeBtnColor) {
      activeBtnColor.classList.remove('is-active');
    } else if (activeBtnLine) {
      activeBtnLine.classList.remove('active-underline');
    }
    e.target.classList.add('is-active');
    categoriesMenu.classList.remove('visible');
    showCategories.classList.remove('desktop-btn-active');
    categoriesMenuJs.classList.remove('desktop-btn-active');

    getNews(
      'category',
      { limit: 500 },
      e.target.textContent.toLowerCase()
    ).then(resp => {
      init(Math.ceil(resp.data.results.length / 10));
    });

    getNews('category', { limit: 10 }, e.target.textContent.toLowerCase()).then(
      resp => {
        renderMarkup(
          newsListRef,
          createMarkup(resp.data.results, 'categoryCards')
        );

        showNoNewsSection(resp.data.results);

        window.localStorage.setItem(
          'lastFetchType',
          JSON.stringify({
            type: 'category',
            value: e.target.textContent.toLowerCase(),
          })
        );
      }
    );
  } else {
    if (activeBtnLine) {
      activeBtnLine.classList.remove('active-underline');
    } else if (activeBtnColor) {
      activeBtnColor.classList.remove('is-active');
    }
    e.target.classList.add('active-underline');
    categoriesMenu.classList.remove('visible');
    showCategories.classList.remove('desktop-btn-active');
    categoriesMenuJs.classList.remove('desktop-btn-active');

    getNews(
      'category',
      { limit: 500 },
      e.target.textContent.toLowerCase()
    ).then(resp => {
      init(Math.ceil(resp.data.results.length / 10));
    });

    getNews('category', { limit: 10 }, e.target.textContent.toLowerCase()).then(
      resp => {
        renderMarkup(
          newsListRef,
          createMarkup(resp.data.results, 'categoryCards')
        );

        showNoNewsSection(resp.data.results);

        window.localStorage.setItem(
          'lastFetchType',
          JSON.stringify({
            type: 'category',
            value: e.target.textContent.toLowerCase(),
          })
        );
      }
    );
  }
}

categoriesBtn.addEventListener('click', getCategoriesNews);
categoriesBtn.addEventListener('click', renderActiveBtn);
bodyClik.addEventListener('click', e => {
  if (e.target.nodeName !== 'BUTTON') {
    if (categoriesMenu.classList.contains('visible')) {
      categoriesMenu.classList.remove('visible');
      showCategories.classList.remove('desktop-btn-active');
      categoriesMenuJs.classList.remove('desktop-btn-active');
    }
  }
});
