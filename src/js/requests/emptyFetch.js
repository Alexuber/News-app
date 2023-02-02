function showNoNewsSection(data) {
  const refs = {
    noNewsSection: document.querySelector('.no-news'),
    newsSection: document.querySelector('.news'),
    pagination: document.querySelector('#pagination'),
  };

  if (data.length === 0) {
    refs.pagination.classList.add('is-hidden');
    refs.noNewsSection.classList.remove('is-hidden');
    refs.newsSection.classList.add('is-hidden');
  } else {
    refs.noNewsSection.classList.add('is-hidden');
    refs.newsSection.classList.remove('is-hidden');
    refs.pagination.classList.remove('is-hidden');
  }
}

export { showNoNewsSection };
