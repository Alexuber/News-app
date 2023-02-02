class Read {
  constructor() {
    this.jsonReadNews = localStorage.getItem('alreadyReadNews');
    this.readNews = this.dataFromLocalStorage(this.jsonReadNews) || [];
    // новости из хранилища, сюда их записываем чтоб потом искать в них по айди нужый обьект
    this.newsArr = [];
    this.checkedNew = null;
    this.currentItemID = null;
  }

  getJsonFromLocalStorage(key) {
    const json = localStorage.getItem(key);
    return json;
  }

  dataFromLocalStorage(json) {
    try {
      const data = JSON.parse(json);
      return data;
    } catch (error) {
      console.log(error.name);
      console.log(error.message);
    }
  }

  findCheckedNew(id) {
    let selectedNews;

    this.newsArr.forEach(element => {
      if (element.hasOwnProperty('_id') && element._id === id) {
        selectedNews = element;
      } else if (element.hasOwnProperty('id') && element.id === Number(id)) {
        selectedNews = element;
      } else if (
        element.hasOwnProperty('slug_name') &&
        element.slug_name === id
      ) {
        selectedNews = element;
      }
    });

    return selectedNews;
  }
  getCurrentDate() {
    const date = new Date();

    return `${this.addLeadingZero(
      String(date.getDate())
    )}/${this.addLeadingZero(String(date.getMonth() + 1))}/${String(
      date.getFullYear()
    )}`;
  }

  saveToLocalStorage() {
    localStorage.setItem('alreadyReadNews', JSON.stringify(this.readNews));
  }
  leaveUniqueNews() {}
  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

export const alreadyRead = new Read();

export function handleReadMoreBtnClick(e) {
  const currentItemID = String(
    e.target.parentNode.parentNode.getAttribute('data-id')
  );

  const json = alreadyRead.getJsonFromLocalStorage('NewsFromHome');
  const news = alreadyRead.dataFromLocalStorage(json);

  alreadyRead.newsArr = news;

  alreadyRead.checkedNew = alreadyRead.findCheckedNew(currentItemID);

  if (alreadyRead.readNews.length === 0) {
    const todayNews = {
      date: `${alreadyRead.getCurrentDate()}`,
      news: [alreadyRead.checkedNew],
    };
    alreadyRead.readNews.push(todayNews);
  } else {
    alreadyRead.readNews[alreadyRead.readNews.length - 1].news.push(
      alreadyRead.checkedNew
    );
  }

  alreadyRead.saveToLocalStorage();
}
