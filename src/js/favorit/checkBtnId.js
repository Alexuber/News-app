function checkBtnId() {
  if (localStorage.getItem('news-added-to-favorite')) {
    const btnlistELements = document.querySelectorAll('.news__item');
    btnlistELements.forEach(item => {
      JSON.parse(localStorage.getItem('news-added-to-favorite')).find(elem => {
        if (item.dataset.id === elem.id) {
          item.firstElementChild.children[1].firstElementChild.textContent =
            'Remove from favorite';
          item.firstElementChild.children[1].firstElementChild.classList.remove(
            'news__favorite-btn'
          );
          item.firstElementChild.children[1].firstElementChild.classList.add(
            'btn-width'
          );
          item.firstElementChild.children[1].lastElementChild.classList.remove(
            'favorite-btn__icon-add'
          );
          item.firstElementChild.children[1].lastElementChild.classList.add(
            'favorite-btn__icon-remove'
          );
        }
      });
    });
  }
}
export { checkBtnId };
