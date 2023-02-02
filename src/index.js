import { getNews } from './js/requests/newsFetch';
import { createMarkup } from './js/markup/createMarkup';
import { renderMarkup } from './js/markup/renderMarkup';
import { haveRead } from './js/read/haveReadOnHome';
import { checkBtnId } from './js/favorit/checkBtnId';
import './js/header/toggle-theme-dark';
import './js/calendar/calendar';
import './js/calendar/calendarFetch';
import './js/header/burger-menu';
import './js/favorit/favoritButton';
import './js/pagination/pagination';
import './js/favorit/favoriteToLocalStorage';
import './js/requests/weatherFetch';
import './js/categories';
import './js/header/btn-search-mob';
import './js/read/add-to-read';
import './js/pagination/paginationFetch';
import { addFetchedToLocalStorage } from './js/read/fromFetchToLocalStorage';
import './js/header/inputFetch';

const refs = {
  newsList: document.querySelector('.news__list'),
};
getNews('mostPopular')
  .then(resp => {
    const markup = createMarkup(resp.data.results, 'popularCards');
    renderMarkup(refs.newsList, markup);
    checkBtnId();
    return resp.data.results;
  })
  .then(results => {
    addFetchedToLocalStorage(results);
    haveRead.checkFetchedNewsByID(results);
  });

const obj1 = {
  date: '30/01/2023',
  news: [
    {
      uri: 'nyt://article/246fe9bf-07b6-5bfd-a35b-439d5a85da39',
      url: 'https://www.nytimes.com/article/expiration-dates.html',
      id: 100000007075927,
      asset_id: 100000007075927,
      source: 'New York Times',
      published_date: '2020-04-13',
      updated: '2023-01-31 08:50:55',
      section: 'Food',
      subsection: '',
      nytdsection: 'food',
      adx_keywords:
        'Cooking and Cookbooks;Food;Quarantine (Life and Culture);Food Contamination and Poisoning;internal-sub-only',
      column: null,
      byline: 'By J. Kenji López-Alt',
      type: 'Article',
      title: 'The Food Expiration Dates You Should Actually Follow',
      abstract:
        'The first thing you should know? The dates, as we know them, have nothing to do with safety. J. Kenji López-Alt explains.',
      des_facet: [
        'Cooking and Cookbooks',
        'Food',
        'Quarantine (Life and Culture)',
        'Food Contamination and Poisoning',
        'internal-sub-only',
      ],
      org_facet: [],
      per_facet: [],
      geo_facet: [],
      media: [
        {
          type: 'image',
          subtype: 'photo',
          caption: '',
          copyright: 'Jonathan Carlson',
          approved_for_syndication: 1,
          'media-metadata': [
            {
              url: 'https://static01.nyt.com/images/2020/04/15/dining/15Kenji-Cover-Illustration/15Kenji-Cover-Illustration-thumbStandard.jpg',
              format: 'Standard Thumbnail',
              height: 75,
              width: 75,
            },
            {
              url: 'https://static01.nyt.com/images/2020/04/15/dining/15Kenji-Cover-Illustration/15Kenji-Cover-Illustration-mediumThreeByTwo210.jpg',
              format: 'mediumThreeByTwo210',
              height: 140,
              width: 210,
            },
            {
              url: 'https://static01.nyt.com/images/2020/04/15/dining/15Kenji-Cover-Illustration/15Kenji-Cover-Illustration-mediumThreeByTwo440.jpg',
              format: 'mediumThreeByTwo440',
              height: 293,
              width: 440,
            },
          ],
        },
      ],
      eta_id: 0,
    },
    {
      uri: 'nyt://article/0b4b123b-ff4d-565f-bc04-0bc94f114b6f',
      url: 'https://www.nytimes.com/2023/01/19/well/live/aging-tips-margareta-magnusson.html',
      id: 100000008734867,
      asset_id: 100000008734867,
      source: 'New York Times',
      published_date: '2023-01-19',
      updated: '2023-01-23 13:30:40',
      section: 'Well',
      subsection: 'Live',
      nytdsection: 'well',
      adx_keywords:
        'Elderly;Age, Chronological;Content Type: Service;Longevity;Memory;internal-sub-only-nl',
      column: null,
      byline: 'By Jancee Dunn',
      type: 'Article',
      title: '3 Steps to Age Exuberantly',
      abstract:
        'An 86-year-old author has a few rules to live by even when the trials of getting older make it easy to complain.',
      des_facet: [
        'Elderly',
        'Age, Chronological',
        'Content Type: Service',
        'Longevity',
        'Memory',
        'internal-sub-only-nl',
      ],
      org_facet: [],
      per_facet: [],
      geo_facet: [],
      media: [
        {
          type: 'image',
          subtype: 'photo',
          caption: '',
          copyright: 'Delcan & Co.',
          approved_for_syndication: 1,
          'media-metadata': [
            {
              url: 'https://static01.nyt.com/images/2023/01/25/well/19Well-NL-Exuberance/19Well-NL-Exuberance-thumbStandard.jpg',
              format: 'Standard Thumbnail',
              height: 75,
              width: 75,
            },
            {
              url: 'https://static01.nyt.com/images/2023/01/25/well/19Well-NL-Exuberance/19Well-NL-Exuberance-mediumThreeByTwo210.jpg',
              format: 'mediumThreeByTwo210',
              height: 140,
              width: 210,
            },
            {
              url: 'https://static01.nyt.com/images/2023/01/25/well/19Well-NL-Exuberance/19Well-NL-Exuberance-mediumThreeByTwo440.jpg',
              format: 'mediumThreeByTwo440',
              height: 293,
              width: 440,
            },
          ],
        },
      ],
      eta_id: 0,
    },
  ],
};

const obj2 = {
  date: '31/01/2023',
  news: [
    {
      uri: 'nyt://article/246fe9bf-07b6-5bfd-a35b-439d5a85da39',
      url: 'https://www.nytimes.com/article/expiration-dates.html',
      id: 100000007075927,
      asset_id: 100000007075927,
      source: 'New York Times',
      published_date: '2020-04-13',
      updated: '2023-01-31 08:50:55',
      section: 'Food',
      subsection: '',
      nytdsection: 'food',
      adx_keywords:
        'Cooking and Cookbooks;Food;Quarantine (Life and Culture);Food Contamination and Poisoning;internal-sub-only',
      column: null,
      byline: 'By J. Kenji López-Alt',
      type: 'Article',
      title: 'The Food Expiration Dates You Should Actually Follow',
      abstract:
        'The first thing you should know? The dates, as we know them, have nothing to do with safety. J. Kenji López-Alt explains.',
      des_facet: [
        'Cooking and Cookbooks',
        'Food',
        'Quarantine (Life and Culture)',
        'Food Contamination and Poisoning',
        'internal-sub-only',
      ],
      org_facet: [],
      per_facet: [],
      geo_facet: [],
      media: [
        {
          type: 'image',
          subtype: 'photo',
          caption: '',
          copyright: 'Jonathan Carlson',
          approved_for_syndication: 1,
          'media-metadata': [
            {
              url: 'https://static01.nyt.com/images/2020/04/15/dining/15Kenji-Cover-Illustration/15Kenji-Cover-Illustration-thumbStandard.jpg',
              format: 'Standard Thumbnail',
              height: 75,
              width: 75,
            },
            {
              url: 'https://static01.nyt.com/images/2020/04/15/dining/15Kenji-Cover-Illustration/15Kenji-Cover-Illustration-mediumThreeByTwo210.jpg',
              format: 'mediumThreeByTwo210',
              height: 140,
              width: 210,
            },
            {
              url: 'https://static01.nyt.com/images/2020/04/15/dining/15Kenji-Cover-Illustration/15Kenji-Cover-Illustration-mediumThreeByTwo440.jpg',
              format: 'mediumThreeByTwo440',
              height: 293,
              width: 440,
            },
          ],
        },
      ],
      eta_id: 0,
    },
    {
      uri: 'nyt://article/0b4b123b-ff4d-565f-bc04-0bc94f114b6f',
      url: 'https://www.nytimes.com/2023/01/19/well/live/aging-tips-margareta-magnusson.html',
      id: 100000008734867,
      asset_id: 100000008734867,
      source: 'New York Times',
      published_date: '2023-01-19',
      updated: '2023-01-23 13:30:40',
      section: 'Well',
      subsection: 'Live',
      nytdsection: 'well',
      adx_keywords:
        'Elderly;Age, Chronological;Content Type: Service;Longevity;Memory;internal-sub-only-nl',
      column: null,
      byline: 'By Jancee Dunn',
      type: 'Article',
      title: '3 Steps to Age Exuberantly',
      abstract:
        'An 86-year-old author has a few rules to live by even when the trials of getting older make it easy to complain.',
      des_facet: [
        'Elderly',
        'Age, Chronological',
        'Content Type: Service',
        'Longevity',
        'Memory',
        'internal-sub-only-nl',
      ],
      org_facet: [],
      per_facet: [],
      geo_facet: [],
      media: [
        {
          type: 'image',
          subtype: 'photo',
          caption: '',
          copyright: 'Delcan & Co.',
          approved_for_syndication: 1,
          'media-metadata': [
            {
              url: 'https://static01.nyt.com/images/2023/01/25/well/19Well-NL-Exuberance/19Well-NL-Exuberance-thumbStandard.jpg',
              format: 'Standard Thumbnail',
              height: 75,
              width: 75,
            },
            {
              url: 'https://static01.nyt.com/images/2023/01/25/well/19Well-NL-Exuberance/19Well-NL-Exuberance-mediumThreeByTwo210.jpg',
              format: 'mediumThreeByTwo210',
              height: 140,
              width: 210,
            },
            {
              url: 'https://static01.nyt.com/images/2023/01/25/well/19Well-NL-Exuberance/19Well-NL-Exuberance-mediumThreeByTwo440.jpg',
              format: 'mediumThreeByTwo440',
              height: 293,
              width: 440,
            },
          ],
        },
      ],
      eta_id: 0,
    },
  ],
};

const obj3 = {
  date: '01/02/2023',
  news: [
    {
      uri: 'nyt://article/246fe9bf-07b6-5bfd-a35b-439d5a85da39',
      url: 'https://www.nytimes.com/article/expiration-dates.html',
      id: 100000007075927,
      asset_id: 100000007075927,
      source: 'New York Times',
      published_date: '2020-04-13',
      updated: '2023-01-31 08:50:55',
      section: 'Food',
      subsection: '',
      nytdsection: 'food',
      adx_keywords:
        'Cooking and Cookbooks;Food;Quarantine (Life and Culture);Food Contamination and Poisoning;internal-sub-only',
      column: null,
      byline: 'By J. Kenji López-Alt',
      type: 'Article',
      title: 'The Food Expiration Dates You Should Actually Follow',
      abstract:
        'The first thing you should know? The dates, as we know them, have nothing to do with safety. J. Kenji López-Alt explains.',
      des_facet: [
        'Cooking and Cookbooks',
        'Food',
        'Quarantine (Life and Culture)',
        'Food Contamination and Poisoning',
        'internal-sub-only',
      ],
      org_facet: [],
      per_facet: [],
      geo_facet: [],
      media: [
        {
          type: 'image',
          subtype: 'photo',
          caption: '',
          copyright: 'Jonathan Carlson',
          approved_for_syndication: 1,
          'media-metadata': [
            {
              url: 'https://static01.nyt.com/images/2020/04/15/dining/15Kenji-Cover-Illustration/15Kenji-Cover-Illustration-thumbStandard.jpg',
              format: 'Standard Thumbnail',
              height: 75,
              width: 75,
            },
            {
              url: 'https://static01.nyt.com/images/2020/04/15/dining/15Kenji-Cover-Illustration/15Kenji-Cover-Illustration-mediumThreeByTwo210.jpg',
              format: 'mediumThreeByTwo210',
              height: 140,
              width: 210,
            },
            {
              url: 'https://static01.nyt.com/images/2020/04/15/dining/15Kenji-Cover-Illustration/15Kenji-Cover-Illustration-mediumThreeByTwo440.jpg',
              format: 'mediumThreeByTwo440',
              height: 293,
              width: 440,
            },
          ],
        },
      ],
      eta_id: 0,
    },
    {
      uri: 'nyt://article/0b4b123b-ff4d-565f-bc04-0bc94f114b6f',
      url: 'https://www.nytimes.com/2023/01/19/well/live/aging-tips-margareta-magnusson.html',
      id: 100000008734867,
      asset_id: 100000008734867,
      source: 'New York Times',
      published_date: '2023-01-19',
      updated: '2023-01-23 13:30:40',
      section: 'Well',
      subsection: 'Live',
      nytdsection: 'well',
      adx_keywords:
        'Elderly;Age, Chronological;Content Type: Service;Longevity;Memory;internal-sub-only-nl',
      column: null,
      byline: 'By Jancee Dunn',
      type: 'Article',
      title: '3 Steps to Age Exuberantly',
      abstract:
        'An 86-year-old author has a few rules to live by even when the trials of getting older make it easy to complain.',
      des_facet: [
        'Elderly',
        'Age, Chronological',
        'Content Type: Service',
        'Longevity',
        'Memory',
        'internal-sub-only-nl',
      ],
      org_facet: [],
      per_facet: [],
      geo_facet: [],
      media: [
        {
          type: 'image',
          subtype: 'photo',
          caption: '',
          copyright: 'Delcan & Co.',
          approved_for_syndication: 1,
          'media-metadata': [
            {
              url: 'https://static01.nyt.com/images/2023/01/25/well/19Well-NL-Exuberance/19Well-NL-Exuberance-thumbStandard.jpg',
              format: 'Standard Thumbnail',
              height: 75,
              width: 75,
            },
            {
              url: 'https://static01.nyt.com/images/2023/01/25/well/19Well-NL-Exuberance/19Well-NL-Exuberance-mediumThreeByTwo210.jpg',
              format: 'mediumThreeByTwo210',
              height: 140,
              width: 210,
            },
            {
              url: 'https://static01.nyt.com/images/2023/01/25/well/19Well-NL-Exuberance/19Well-NL-Exuberance-mediumThreeByTwo440.jpg',
              format: 'mediumThreeByTwo440',
              height: 293,
              width: 440,
            },
          ],
        },
      ],
      eta_id: 0,
    },
  ],
};

const obj4 = {
  date: '02/02/2023',
  news: [
    {
      uri: 'nyt://article/246fe9bf-07b6-5bfd-a35b-439d5a85da39',
      url: 'https://www.nytimes.com/article/expiration-dates.html',
      id: 100000007075927,
      asset_id: 100000007075927,
      source: 'New York Times',
      published_date: '2020-04-13',
      updated: '2023-01-31 08:50:55',
      section: 'Food',
      subsection: '',
      nytdsection: 'food',
      adx_keywords:
        'Cooking and Cookbooks;Food;Quarantine (Life and Culture);Food Contamination and Poisoning;internal-sub-only',
      column: null,
      byline: 'By J. Kenji López-Alt',
      type: 'Article',
      title: 'The Food Expiration Dates You Should Actually Follow',
      abstract:
        'The first thing you should know? The dates, as we know them, have nothing to do with safety. J. Kenji López-Alt explains.',
      des_facet: [
        'Cooking and Cookbooks',
        'Food',
        'Quarantine (Life and Culture)',
        'Food Contamination and Poisoning',
        'internal-sub-only',
      ],
      org_facet: [],
      per_facet: [],
      geo_facet: [],
      media: [
        {
          type: 'image',
          subtype: 'photo',
          caption: '',
          copyright: 'Jonathan Carlson',
          approved_for_syndication: 1,
          'media-metadata': [
            {
              url: 'https://static01.nyt.com/images/2020/04/15/dining/15Kenji-Cover-Illustration/15Kenji-Cover-Illustration-thumbStandard.jpg',
              format: 'Standard Thumbnail',
              height: 75,
              width: 75,
            },
            {
              url: 'https://static01.nyt.com/images/2020/04/15/dining/15Kenji-Cover-Illustration/15Kenji-Cover-Illustration-mediumThreeByTwo210.jpg',
              format: 'mediumThreeByTwo210',
              height: 140,
              width: 210,
            },
            {
              url: 'https://static01.nyt.com/images/2020/04/15/dining/15Kenji-Cover-Illustration/15Kenji-Cover-Illustration-mediumThreeByTwo440.jpg',
              format: 'mediumThreeByTwo440',
              height: 293,
              width: 440,
            },
          ],
        },
      ],
      eta_id: 0,
    },
    {
      uri: 'nyt://article/0b4b123b-ff4d-565f-bc04-0bc94f114b6f',
      url: 'https://www.nytimes.com/2023/01/19/well/live/aging-tips-margareta-magnusson.html',
      id: 100000008734867,
      asset_id: 100000008734867,
      source: 'New York Times',
      published_date: '2023-01-19',
      updated: '2023-01-23 13:30:40',
      section: 'Well',
      subsection: 'Live',
      nytdsection: 'well',
      adx_keywords:
        'Elderly;Age, Chronological;Content Type: Service;Longevity;Memory;internal-sub-only-nl',
      column: null,
      byline: 'By Jancee Dunn',
      type: 'Article',
      title: '3 Steps to Age Exuberantly',
      abstract:
        'An 86-year-old author has a few rules to live by even when the trials of getting older make it easy to complain.',
      des_facet: [
        'Elderly',
        'Age, Chronological',
        'Content Type: Service',
        'Longevity',
        'Memory',
        'internal-sub-only-nl',
      ],
      org_facet: [],
      per_facet: [],
      geo_facet: [],
      media: [
        {
          type: 'image',
          subtype: 'photo',
          caption: '',
          copyright: 'Delcan & Co.',
          approved_for_syndication: 1,
          'media-metadata': [
            {
              url: 'https://static01.nyt.com/images/2023/01/25/well/19Well-NL-Exuberance/19Well-NL-Exuberance-thumbStandard.jpg',
              format: 'Standard Thumbnail',
              height: 75,
              width: 75,
            },
            {
              url: 'https://static01.nyt.com/images/2023/01/25/well/19Well-NL-Exuberance/19Well-NL-Exuberance-mediumThreeByTwo210.jpg',
              format: 'mediumThreeByTwo210',
              height: 140,
              width: 210,
            },
            {
              url: 'https://static01.nyt.com/images/2023/01/25/well/19Well-NL-Exuberance/19Well-NL-Exuberance-mediumThreeByTwo440.jpg',
              format: 'mediumThreeByTwo440',
              height: 293,
              width: 440,
            },
          ],
        },
      ],
      eta_id: 0,
    },
  ],
};

const all = [obj1, obj2, obj3, obj4];

localStorage.setItem('alreadyReadNews', JSON.stringify(all));
