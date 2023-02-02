import { axiosNews } from '../axios/axiosDefaults';
import { Notify } from 'notiflix';

async function getNews(pathName, parameters, category) {
  const path = {
    mostPopular: 'mostpopular/v2//viewed/1.json',
    articles: 'search/v2/articlesearch.json',
    allCategories: 'news/v3/content/section-list.json',
    category: `news/v3/content/all/${category}.json`,
  };
  try {
    const response = await axiosNews.get(path[pathName], {
      params: parameters,
    });
    return response;
  } catch (error) {
    Notify.failure(error);
  }
}

export { getNews };

// Для самых популярных новостей: getNews("mostPopular")
// Для поиска по слову: getNews("articles", {q: your-input-value in string})
// Для получения всех категорий: getNews("allCategories")
// Для поиска по категории: getNews("category", {}, your-category in string)
// Для поиска по датеЖ getNews("articles", {fq: `pub_date:YYYY-MM-DD`})
