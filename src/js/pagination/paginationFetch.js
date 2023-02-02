import { getNews } from '../requests/newsFetch';
import { renderMarkup } from '../markup/renderMarkup';
import { createMarkup } from '../markup/createMarkup';
// import { currentPage } from './pagination';

const paginationSection = document.querySelector('#pagination');
const newsListRef = document.querySelector('.news__list');

paginationSection.addEventListener('click', fetchPagination);

function fetchPagination(e) {
  const lastFetch = JSON.parse(localStorage.getItem('lastFetchType'));
  if (lastFetch.type === 'input') {
    const currentPage = document.querySelector('.current').textContent;
    const page = currentPage - 1;

    const oprions = { q: lastFetch.value, page };
    getNews('articles', oprions).then(resp => {
      newsListRef.innerHTML = '';
      renderMarkup(
        newsListRef,
        createMarkup(resp.data.response.docs, 'inputsCards')
      );
    });
  } else if (lastFetch.type === 'category') {
    const currentPage = document.querySelector('.current').textContent;
    const page = currentPage * 10 - 10;

    const oprions = { limit: 10, offset: page };
    getNews('category', oprions, lastFetch.value).then(resp => {
      newsListRef.innerHTML = '';
      renderMarkup(
        newsListRef,
        createMarkup(resp.data.results, 'categoryCards')
      );
    });
  } else if (lastFetch.type === 'date') {
    const currentPage = document.querySelector('.current').textContent;
    const page = currentPage - 1;
    const oprions = {
      begin_date: lastFetch.value,
      end_date: lastFetch.value,
      page,
    };
    getNews('articles', oprions).then(resp => {
      newsListRef.innerHTML = '';
      renderMarkup(
        newsListRef,
        createMarkup(resp.data.response.docs, 'dateCards')
      );
    });
  }
}

// ПО INPUT

// CATEGORY

// getNews('category', {}, e.target.textContent.toLowerCase()).then(resp => {
//       newsListRef.innerHTML = '';
//       renderMarkup(
//         newsListRef,
//         createMarkup(resp.data.results, 'categoryCards')

//  DATE
// getNews('articles', { begin_date: date, end_date: date }).then(resp => {
//   refs.newsList.innerHTML = '';
//   renderMarkup(
//     refs.newsList,
//     createMarkup(resp.data.response.docs, 'inputsCards')
//   );
// });
