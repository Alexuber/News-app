const newsListElements = document.querySelector('.news__list');

let arrayOfFavoriteNews = [];

if (localStorage.getItem('news-added-to-favorite')) {
  JSON.parse(localStorage.getItem('news-added-to-favorite')).map(item => {
    arrayOfFavoriteNews.push(item);
  });
}

function addRemoveToLocalStore(event) {
  if (event.target.nodeName !== 'DIV') {
    return;
  }
  arrayOfFavoriteNews.push({
    image: event.target.parentNode.firstElementChild.src,
    title: event.target.parentNode.parentNode.children[1].textContent,
    text: event.target.parentNode.parentNode.children[2].textContent,
    href: event.target.parentNode.parentNode.lastElementChild.lastElementChild
      .href,
    date: event.target.parentNode.parentNode.lastElementChild.firstElementChild
      .textContent,
    id: event.target.parentNode.parentNode.dataset.id,
    h3: event.target.parentNode.lastElementChild.textContent,
  });
  localStorage.setItem(
    'news-added-to-favorite',
    JSON.stringify(arrayOfFavoriteNews)
  );

  if (event.target.classList.contains('div')) {
    const arrayWithremovedNew = JSON.parse(
      localStorage.getItem('news-added-to-favorite')
    ).filter(item => item.id !== event.target.parentNode.parentNode.dataset.id);
    localStorage.removeItem('news-added-to-favorite');
    localStorage.setItem(
      'news-added-to-favorite',
      JSON.stringify(arrayWithremovedNew)
    );
    arrayOfFavoriteNews = arrayWithremovedNew;
  }
}

newsListElements.addEventListener('click', addRemoveToLocalStore);
