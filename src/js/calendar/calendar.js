import { SimpleCalendar } from '../simple-calendar/simple-calendar';

const currentDate = new Date();
const calendarBtn = document.querySelector('.calendar__btn');
const simpleCalendar = new SimpleCalendar({
  fromYear: 1899,
  toYear: currentDate.getFullYear(),
  defaultDate: currentDate,
});

// function setDate(timestamp) {
//   simpleCalendar.setDate(timestamp);
// }

function getDate(dateType) {
  return simpleCalendar.getFormattedDate(dateType);
}

function addEventListenerToChangeDate(callback) {
  calendarBtn.addEventListener('changeDate', e => {
    callback(e);
  });
}

export { getDate, addEventListenerToChangeDate };
