const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function getPositionForModal(buttonElem, modalElem, bodyElem) {
  let x = 0;
  let y = 0;

  const getParams = elem => {
    const rect = elem.getBoundingClientRect();
    return {
      x: rect.x + window.scrollX,
      y: rect.y + window.scrollY,
      width: rect.width,
      height: rect.height,
    };
  };

  const btnRect = getParams(buttonElem);
  const modalRect = getParams(modalElem);
  const bodyRect = getParams(bodyElem);

  if (btnRect.x + btnRect.width > modalRect.width) {
    x = btnRect.x - (modalRect.width - btnRect.width);
  } else if (bodyRect.width - (btnRect.x + btnRect.width) > modalRect.width) {
    x = btnRect.x;
  }

  if (bodyRect.height - (btnRect.y + btnRect.height) < modalRect.height) {
    y = btnRect.y - modalRect.height;
  } else {
    y = btnRect.y + btnRect.height;
  }

  x = x < 0 ? 0 : x;
  y = y < 0 ? 0 : y;
  return { x, y };
}

function addLeadingZero(num) {
  return num < 10 ? String(`0${num}`) : String(num);
}

class SCDate {
  constructor(defaultDate = null) {
    this.date;
    if (!defaultDate) {
      this.date = new Date();
    } else {
      this.date = new Date(defaultDate);
    }
    this.pastDate = new Date(this.date);
  }

  getDate() {
    return this.date.getDate();
  }

  comparePeriods() {
    return (
      this.date.getMonth() === this.pastDate.getMonth() &&
      this.date.getFullYear() === this.pastDate.getFullYear()
    );
  }

  getFormattedDate(format) {
    const yyyy = this.date.getFullYear();
    const mm = addLeadingZero(this.date.getMonth() + 1);
    const dd = addLeadingZero(this.date.getDate());
    // Негарне рішення, я знаю :-(
    if (format === 'yyyy-mm-dd') {
      return `${yyyy}-${mm}-${dd}`;
    } else if (format === 'yyyymmdd') {
      return `${yyyy}${mm}${dd}`;
    } else {
      return `${dd}/${mm}/${yyyy}`;
    }
  }

  getYear() {
    return this.date.getFullYear();
  }

  getMonth() {
    return this.date.getMonth();
  }

  setDate(d) {
    this.date.setDate(d);
  }

  savePastDate() {
    this.pastDate = new Date(this.date);
  }

  setYear(y) {
    this.date.setFullYear(y);
  }

  setMonth(m) {
    this.date.setMonth(m);
  }

  getDaysInMonth(year, month) {
    const h = new Date(year, month);
    h.setMonth(h.getMonth() + 1);
    h.setDate(h.getDate() - 1);
    return h.getDate();
  }

  getFirstDayOfMonth(year, month) {
    const d = new Date(year, month, 1).getDay();
    return !d ? d + 6 : d - 1;
  }
}

class SimpleCalendar extends SCDate {
  constructor({ fromYear, toYear, defaultDate }) {
    super(defaultDate);
    this.settings = { fromYear, toYear, defaultDate };
    this.#createBaseMarkup();
    this.refs = {
      openBtn: document.querySelector('.simple-calendar-open'),
      calendar: document.querySelector('.simple-calendar'),
      backdrop: document.querySelector('.simple-calendar-backdrop'),
      dateBox: document.querySelector('.date-box'),
      periodBox: document.querySelector('.period-box'),
      dropDownBtn: document.querySelector('.drop-down-btn'),
      monthItems: document.querySelector('.month-items'),
      nextBtn: document.querySelector('.js-to-next'),
      prevBtn: document.querySelector('.js-to-previous'),
      numItems: document.querySelector('.number-items'),
      yearList: document.querySelector('.years-drop-down'),
    };
    this.refs.openBtn.addEventListener(
      'click',
      this.#onOpenCalendar.bind(this)
    );
    this.refs.backdrop.addEventListener(
      'click',
      this.#onCloseCalendar.bind(this)
    );
    this.refs.dropDownBtn.addEventListener(
      'click',
      this.#onOpenPeriodBox.bind(this)
    );
    this.refs.monthItems.addEventListener(
      'click',
      this.#onSelectMonth.bind(this)
    );
    this.refs.nextBtn.addEventListener('click', this.#onClickNext.bind(this));
    this.refs.prevBtn.addEventListener('click', this.#onClickPrev.bind(this));
    this.refs.numItems.addEventListener('click', this.#onSelectDate.bind(this));
    this.refs.yearList.addEventListener('click', this.#onSelectYear.bind(this));

    this.refs.dropDownBtn.value = `${
      MONTHS[this.getMonth()]
    } ${this.getYear()}`;
    this.#printDates();
    this.#printDate();
    this.#printYears();
    this.#setValueToYearList(this.getYear());
    this.#highlightCurrentDate();
    this.#highlightCurrentMonth();
  }

  #createBaseMarkup() {
    const markup = `
      <div class="simple-calendar-backdrop js-not-visible">
        <div class="simple-calendar">
          <div class="simple-calendar-navigator">
            <div class="dd-wrapper">
              <input class="drop-down-btn" type="button" value="January 2023" />
              <svg class="dd-wrapper__arrow dd-wrapper__arrow--navi" id="icon-arrow-right" viewBox="0 0 19 32">
                <path d="M18.667 16c0-0.773-0.267-1.387-0.88-1.973l-13.6-13.333c-0.413-0.428-0.992-0.695-1.633-0.695-0.026
                  0-0.052 0-0.078 0.001l0.004-0c-1.37 0-2.48 1.11-2.48 2.48v0c0 0.667 0.267 1.28 0.8 1.787l12 11.733-12
                  11.733c-0.493 0.45-0.801 1.096-0.801 1.813 0 1.355 1.098 2.453 2.453 2.453 0 0 0.001 0 0.001 0h-0c0.667
                  0 1.253-0.24 1.707-0.72l13.6-13.333c0.551-0.473 0.9-1.168 0.907-1.946v-0.001z">
                </path>
              </svg>
            </div>
            <div class="switchers">
              <button class="switcher js-to-previous">
              <svg class="switcher__arrow" id="icon-big-arrow-left" viewBox="0 0 16 32">
              <path d="M0 16c0 0.604 0.196 1.102 0.64 1.547l12.196 12.978c0.356 0.373 0.782 0.587 1.298 0.587 1.031 0 1.867-0.889 
                1.867-2.027 0-0.569-0.213-1.067-0.569-1.44l-10.987-11.644 10.987-11.644c0.356-0.391 0.569-0.889 0.569-1.44 
                0-1.138-0.836-2.027-1.867-2.027-0.516 0-0.96 0.196-1.298 0.587l-12.196 12.96c-0.444 0.462-0.64 0.96-0.64 1.564z">
              </path>
              </svg>
                
              </button>
              <button class="switcher js-to-next">
              <svg class="switcher__arrow" id="icon-big-arrow-right" viewBox="0 0 16 32">
                <path d="M16 16c0-0.604-0.213-1.102-0.64-1.564l-12.196-12.978c-0.32-0.35-0.778-0.569-1.288-0.569-0.003
                  0-0.007 0-0.010 0h0.001c-1.067 0-1.867 0.889-1.867 2.027 0 0.533 0.196 1.067 0.569 1.44l10.969 11.644-10.969
                  11.644c-0.356 0.391-0.569 0.889-0.569 1.44 0 1.138 0.818 2.027 1.867 2.027 0.515-0.007 0.976-0.231 1.296-0.585l0.001-0.002
                  12.196-12.978c0.444-0.444 0.64-0.942 0.64-1.547z">
                </path>
              </svg>
              </button>
            </div>
          </div>

          <div class="date-box">
            <ul class="day-items">
              <li class="day-items__item">
                <span class="day-items__name">Mo</span>
              </li>
              <li class="day-items__item">
                <span class="day-items__name">Tu</span>
              </li>
              <li class="day-items__item">
                <span class="day-items__name">We</span>
              </li>
              <li class="day-items__item">
                <span class="day-items__name">Th</span>
              </li>
              <li class="day-items__item">
                <span class="day-items__name">Fr</span>
              </li>
              <li class="day-items__item">
                <span class="day-items__name">Sa</span>
              </li>
              <li class="day-items__item">
                <span class="day-items__name">Su</span>
              </li>
            </ul>

            <ul class="number-items">
            </ul>
          </div>

          <div class="period-box js-not-visible">
            <div class="dd-wrapper dd-wrapper--years">
              <select class="years-drop-down" name="years" id="years">
              </select>
              <svg class="dd-wrapper__arrow dd-wrapper__arrow--years" id="icon-arrow-right" viewBox="0 0 19 32">
                <path d="M18.667 16c0-0.773-0.267-1.387-0.88-1.973l-13.6-13.333c-0.413-0.428-0.992-0.695-1.633-0.695-0.026
                  0-0.052 0-0.078 0.001l0.004-0c-1.37 0-2.48 1.11-2.48 2.48v0c0 0.667 0.267 1.28 0.8 1.787l12 11.733-12
                  11.733c-0.493 0.45-0.801 1.096-0.801 1.813 0 1.355 1.098 2.453 2.453 2.453 0 0 0.001 0 0.001 0h-0c0.667
                  0 1.253-0.24 1.707-0.72l13.6-13.333c0.551-0.473 0.9-1.168 0.907-1.946v-0.001z">
                </path>
              </svg>
            </div>
            
            <ul class="month-items">
              <li class="month-items__item" data-value="0">
                <span class="month-name">Jan.</span>
              </li>
              <li class="month-items__item" data-value="1">
                <span class="month-items__name">Feb.</span>
              </li>
              <li class="month-items__item" data-value="2">
                <span class="month-items__name">Mar.</span>
              </li>
              <li class="month-items__item" data-value="3">
                <span class="month-items__name">Apr.</span>
              </li>
              <li class="month-items__item" data-value="4">
                <span class="month-items__name">May</span>
              </li>
              <li class="month-items__item" data-value="5">
                <span class="month-items__name">June</span>
              </li>
              <li class="month-items__item" data-value="6">
                <span class="month-items__name">July</span>
              </li>
              <li class="month-items__item" data-value="7">
                <span class="month-items__name">Aug.</span>
              </li>
              <li class="month-items__item" data-value="8">
                <span class="month-items__name">Sept.</span>
              </li>
              <li class="month-items__item" data-value="9">
                <span class="month-items__name">Oct.</span>
              </li>
              <li class="month-items__item" data-value="10">
                <span class="month-items__name">Nov.</span>
              </li>
              <li class="month-items__item" data-value="11">
                <span class="month-items__name">Dec.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    `;
    const body = document.querySelector('body');
    body.insertAdjacentHTML('beforeend', markup);
  }

  #printYears() {
    let markup = '';
    for (let i = 0; i <= this.settings.toYear - this.settings.fromYear; ++i) {
      const date = new Date();
      date.setFullYear(this.settings.fromYear + i);
      markup += `<option class="sc-year" value="${date.getFullYear()}">${date.getFullYear()}</option>`;
    }
    this.refs.yearList.innerHTML = markup;
  }

  #printDates() {
    const year = this.getYear();
    const month = this.getMonth();
    const firstDay = this.getFirstDayOfMonth(year, month);
    const days = this.getDaysInMonth(year, month);
    let markup = '';
    for (let i = 0; i < firstDay; ++i) {
      markup += `<li></li>`;
    }
    for (let i = 0; i < days; ++i) {
      markup += `<li class="number-items__item" data-active data-value="${
        i + 1
      }"><p class="number-items__num">${i + 1}</p></li>`;
    }
    this.refs.numItems.innerHTML = markup;
  }

  #printDate() {
    const dd = addLeadingZero(this.getDate());
    const mm = addLeadingZero(this.getMonth() + 1);
    const yyyy = this.getYear();
    this.refs.openBtn.value = `${dd}/${mm}/${yyyy}`;
  }

  #setValueToYearList(year) {
    const options = this.refs.yearList.options;
    [...options].map(opt => {
      if (opt.value === String(year)) {
        this.refs.yearList.value = opt.value;
      }
    });
  }

  #highlightCurrentDate() {
    let highlighter;
    if (this.comparePeriods()) {
      highlighter = 'js-accent';
    } else {
      highlighter = 'js-accent-secondary';
    }
    const selectedDate = this.getDate();
    [...this.refs.numItems.children].map(item => {
      if (Number(item.dataset['value']) === selectedDate) {
        item.classList.add(highlighter);
        return;
      }
    });
  }

  #highlightCurrentMonth() {
    const currentMonth = this.getMonth();
    [...this.refs.monthItems.children].map(item => {
      if (item.classList.contains('js-accent')) {
        item.classList.remove('js-accent');
      }

      if (Number(item.dataset['value']) === currentMonth) {
        item.classList.add('js-accent');
      }
    });
  }

  #onOpenCalendar(e) {
    this.refs.backdrop.classList.toggle('js-not-visible');
    this.refs.openBtn.classList.toggle('js-accent');
    const position = getPositionForModal(
      this.refs.openBtn,
      this.refs.calendar,
      this.refs.backdrop
    );
    this.refs.calendar.style.top = `${position.y}px`;
    this.refs.calendar.style.left = `${position.x}px`;
    this.#printDates();
    this.#highlightCurrentDate();
  }

  #onCloseCalendar(e) {
    if (e.target === e.currentTarget) {
      this.close();
    }
  }

  #onOpenPeriodBox(e) {
    this.refs.dropDownBtn.classList.toggle('js-dd-accent');
    this.refs.dateBox.classList.toggle('js-not-visible');
    this.refs.periodBox.classList.toggle('js-not-visible');
  }

  #onSelectMonth(e) {
    let value;
    if (e.target.nodeName === 'SPAN') {
      value = e.target.parentNode.dataset['value'];
    } else if (e.target.nodeName === 'LI') {
      value = e.target.dataset['value'];
    } else {
      return;
    }
    this.setMonth(Number(value));
    this.#closePeriodBox();
    this.#refreshAll();
  }

  #onClickNext(e) {
    if (this.getYear() === this.settings.toYear && this.getMonth() >= 11) {
      return;
    }

    let month;
    let year;
    if (this.getMonth() === 11) {
      month = 0;
      year = this.getYear() + 1;
    } else {
      month = this.getMonth() + 1;
      year = this.getYear();
    }
    this.setYear(year);
    this.setMonth(month);
    this.#refreshAll();
  }

  #onClickPrev(e) {
    if (this.getYear() === this.settings.fromYear && this.getMonth() <= 0) {
      return;
    }

    let month;
    let year;
    if (this.getMonth() === 0) {
      month = 11;
      year = this.getYear() - 1;
    } else {
      month = this.getMonth() - 1;
      year = this.getYear();
    }
    this.setYear(year);
    this.setMonth(month);
    this.#refreshAll();
  }

  #onSelectDate(e) {
    let keys = [];
    let value;

    if (e.target.nodeName === 'P') {
      keys = Object.keys(e.target.parentNode.dataset);
      value = e.target.parentNode.dataset['value'];
    } else if (e.target.nodeName === 'LI') {
      keys = Object.keys(e.target.dataset);
      value = e.target.dataset['value'];
    } else {
      return;
    }

    if (keys.includes('active')) {
      this.setDate(Number(value));
      const customEvent = new CustomEvent('changeDate');
      this.refs.openBtn.dispatchEvent(customEvent);
      this.#printDate();
      this.savePastDate();
      this.close();
    }
  }

  #onSelectYear(e) {
    this.setYear(Number(e.currentTarget.value));
    this.#setValueToYearList(e.currentTarget.value);
    this.#printDates();
    this.refs.dropDownBtn.value = `${
      MONTHS[this.getMonth()]
    } ${this.getYear()}`;
    this.#highlightCurrentDate();
  }

  close() {
    this.refs.backdrop.classList.toggle('js-not-visible');
    this.refs.openBtn.classList.toggle('js-accent');
    this.#closePeriodBox();
  }

  #closePeriodBox() {
    this.refs.periodBox.classList.add('js-not-visible');
    this.refs.dateBox.classList.remove('js-not-visible');
    this.refs.dropDownBtn.classList.remove('js-dd-accent');
  }

  #refreshAll() {
    this.refs.dropDownBtn.value = `${
      MONTHS[this.getMonth()]
    } ${this.getYear()}`;
    this.#printDates();
    this.#highlightCurrentDate();
    this.#highlightCurrentMonth();
    this.#setValueToYearList(String(this.getYear()));
  }
}

export { SimpleCalendar };
