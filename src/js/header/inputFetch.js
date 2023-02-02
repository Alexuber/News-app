import { createMarkup } from '../markup/createMarkup';
import { renderMarkup } from '../markup/renderMarkup';
import { showNoNewsSection } from '../requests/emptyFetch';
import { getNews } from '../requests/newsFetch';
import { addFetchedToLocalStorage } from '../read/fromFetchToLocalStorage';
import { haveRead } from '../read/haveReadOnHome';
import { init } from '../pagination/pagination';
import { checkBtnId } from '../favorit/checkBtnId';

const refs = {
  form: document.querySelector('.header-form'),
  input: document.querySelector('.header-input'),
  newsList: document.querySelector('.news__list'),
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();

  let size;

  if (refs.input.value.trim() === '') {
    return;
  }

  const oprions = {
    q: refs.input.value.trim(),
    sort: 'newest',
  };

  getNews('articles', oprions).then(resp => {
    refs.newsList.innerHTML = '';
    renderMarkup(
      refs.newsList,
      createMarkup(resp.data.response.docs, 'inputsCards')
    );

    showNoNewsSection(resp.data.response.docs);

    window.localStorage.setItem(
      'lastFetchType',
      JSON.stringify({
        type: 'input',
        value: refs.input.value,
      })
    );

    refs.input.value = '';
    getNews('articles', oprions)
      .then(resp => {
        refs.newsList.innerHTML = '';
        renderMarkup(
          refs.newsList,
          createMarkup(resp.data.response.docs, 'inputsCards')
        );

        showNoNewsSection(resp.data.response.docs);
        checkBtnId();
        size = Math.ceil(resp.data.response.meta.hits / 10);
        if (size > 99) {
          size = 99;
        }

        window.localStorage.setItem(
          'lastFetchType',
          JSON.stringify({
            type: 'input',
            value: refs.input.value,
          })
        );
        if (resp.data.response.meta.hits !== 0) {
          init(size);
        }
        refs.input.value = '';
        return resp.data.response.docs;
      })
      .then(results => {
        addFetchedToLocalStorage(results);
        haveRead.checkFetchedNewsByID(results);
      });
  });
});
