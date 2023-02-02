const labelEl = document.querySelector('.label');
const btnSearch = document.querySelector('.btn-search-mob');

const clickOnBtnSearch = event => {
  //   event.stopPropagination();
  btnSearch.classList.add('js-active');
  labelEl.classList.add('js-isactive');
};

btnSearch.addEventListener('click', clickOnBtnSearch);
