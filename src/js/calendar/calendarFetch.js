import { Notify } from 'notiflix';
import { getDate, setDate, addEventListenerToChangeDate } from './calendar';
import { getNews } from '../requests/newsFetch';
import { renderMarkup } from '../markup/renderMarkup';
import { createMarkup } from '../markup/createMarkup';
import { init } from '../pagination/pagination';
import { showNoNewsSection } from '../requests/emptyFetch';
import { addFetchedToLocalStorage } from '../read/fromFetchToLocalStorage';
import { haveRead } from '../read/haveReadOnHome';
import { checkBtnId } from '../favorit/checkBtnId';

const refs = {
  newsList: document.querySelector('.news__list'),
};

addEventListenerToChangeDate(e => {
  let size;
  const date = getDate('yyyymmdd');
  const chooseDate = new Date(getDate('yyyy-mm-dd'));
  const dateNow = Date.now();

  if (dateNow <= chooseDate.getTime()) {
    Notify.warning('You can`t see into the future, it`s a pity!');

    return;
  } else {
    getNews('articles', {
      begin_date: date,
      end_date: date,
    })
      .then(resp => {
        refs.newsList.innerHTML = '';
        renderMarkup(
          refs.newsList,
          createMarkup(resp.data.response.docs, 'dateCards')
        );
        checkBtnId();
        size = Math.ceil(resp.data.response.meta.hits / 10);
        if (size > 99) {
          size = 99;
        }
        init(size);

        showNoNewsSection(resp.data.response.docs);

        window.localStorage.setItem(
          'lastFetchType',
          JSON.stringify({
            type: 'date',
            value: date,
          })
        );
        return resp.data.response.docs;
      })
      .then(resp => {
        addFetchedToLocalStorage(resp);
        haveRead.checkFetchedNewsByID(resp);
      });
  }
});
