import { getNews } from './js/requests/newsFetch';
import { createMarkup } from './js/markup/createMarkup';
import { renderMarkup } from './js/markup/renderMarkup';
import { haveRead } from './js/read/haveReadOnHome';
import { checkBtnId } from './js/favorit/checkBtnId';
import './js/header/toggle-theme-dark';
import './js/calendar/calendar';
import './js/calendar/calendarFetch';
import './js/header/burger-menu';
import './js/favorit/favoritButton';
import './js/pagination/pagination';
import './js/favorit/favoriteToLocalStorage';
import './js/requests/weatherFetch';
import './js/categories';
import './js/header/btn-search-mob';
import './js/read/add-to-read';
import './js/pagination/paginationFetch';
import { addFetchedToLocalStorage } from './js/read/fromFetchToLocalStorage';
import './js/header/inputFetch';

const refs = {
  newsList: document.querySelector('.news__list'),
};
getNews('mostPopular')
  .then(resp => {
    const markup = createMarkup(resp.data.results, 'popularCards');
    renderMarkup(refs.newsList, markup);
    checkBtnId();
    return resp.data.results;
  })
  .then(results => {
    addFetchedToLocalStorage(results);
    haveRead.checkFetchedNewsByID(results);
  });
