import { handleReadMoreBtnClick } from '../read/add-to-read';
import { addHaveReadStylesForCard } from '../read/haveReadOnHome';

const newsListEl = document.querySelector('.news__list');

function addRemoveHandler(event) {
  if (event.target.classList.contains('news__readmore-link')) {
    handleReadMoreBtnClick(event);
    addHaveReadStylesForCard(event);
  }
  if (event.target.nodeName !== 'DIV') {
    return;
  } else if (event.target.firstElementChild.textContent === 'Add to favorite') {
    event.target.classList.remove('div');
    event.target.classList.add('div-remove');
    event.target.firstElementChild.textContent = 'Remove from favorite';
    event.target.firstElementChild.classList.remove('news__favorite-btn');
    event.target.firstElementChild.classList.add('btn-width');
    event.target.lastElementChild.classList.remove('favorite-btn__icon-add');
    event.target.lastElementChild.classList.add('favorite-btn__icon-remove');
  } else if (
    event.target.firstElementChild.textContent === 'Remove from favorite'
  ) {
    event.target.firstElementChild.textContent = 'Add to favorite';
    event.target.lastElementChild.classList.remove('favorite-btn__icon-remove');
    event.target.lastElementChild.classList.add('favorite-btn__icon-add');
    event.target.firstElementChild.classList.add('news__favorite-btn');
    event.target.firstElementChild.classList.remove('btn-width');
    event.target.classList.remove('div-remove');
    event.target.classList.add('div');
  }
}

newsListEl.addEventListener('click', addRemoveHandler);
newsListEl.addEventListener('click', addRemoveHandler);
