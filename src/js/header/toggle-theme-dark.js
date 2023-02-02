// const toggle = document.getElementById('toggle');
const toggle = document.querySelector('.js-toggle');
const body = document.body;
const toggleT = document.querySelector('.js-toggle-t');
const toggleM = document.querySelector('.js-toggle-m');

if (JSON.parse(window.localStorage.getItem('theme'))) {
  body.classList.add('dark-theme');
  toggle.checked = true;
  toggleT.checked = true;
  toggleM.checked = true;
}

toggleT.addEventListener('input', toggleCallback);
toggle.addEventListener('input', toggleCallback);

toggleM.addEventListener('input', toggleCallback);

function toggleCallback(e) {
  const isChecked = e.target.checked;

  if (isChecked) {
    body.classList.add('dark-theme');
  } else {
    body.classList.remove('dark-theme');
  }
  window.localStorage.setItem('theme', isChecked);
}
