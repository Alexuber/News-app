import { alreadyRead } from './add-to-read';

export function addFetchedToLocalStorage(response) {
  const json = alreadyRead.getJsonFromLocalStorage('NewsFromHome');
  const news = alreadyRead.dataFromLocalStorage(json);
  if (news !== null) {
    alreadyRead.newsArr = [...news, ...response];
    localStorage.setItem('NewsFromHome', JSON.stringify(alreadyRead.newsArr));
  } else {
    localStorage.setItem('NewsFromHome', JSON.stringify(response));
  }
}
