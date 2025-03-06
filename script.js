'use strict';

const header = document.querySelector('.hero');
const dreamList = document.querySelector('.dream-list');
const noteNoDreams = document.querySelector('.note-no-dreams');
const overlay = document.querySelector('.overlay');

const formContainer = document.querySelector('.dream_form-container');
const form = document.querySelector('.dream-form');
const inputTitle = document.querySelector('.dream_title-input');
const inputDate = document.querySelector('.dream_date-input');
const textareaDescription = document.querySelector('.dream_description-input');

const btnAddDream = document.querySelector('.btn-add-dream');
const btnSubmitDream = document.querySelector('.btn-submit-dream');
const btnCloseForm = document.querySelector('.icon-close-form');

let dreams = [];

// Render dreams
const displayDreams = function (dreams) {
  dreamList.innerHTML = '';

  if (dreams.length === 0) {
    noteNoDreams.style.display = 'block';
  } else {
    noteNoDreams.style.display = 'none';
    btnAddDream.style.marginBlockEnd = '300px';
  }

  dreams.forEach(function (dream) {
    const html = `
      <article class="dream">
        <header class="dream-info">
          <p class="dream-date">${dream.date}</p>
          <h2 class="dream-title">${dream.title}</h2>
        </header>
        <p class="dream-description">${dream.description}</p>
      </article> 
    `;
    dreamList.insertAdjacentHTML('afterbegin', html);
  });
};

// Get data from local storage
const getLocalStorage = function () {
  const data = JSON.parse(localStorage.getItem('dreams'));

  if (!data) return;

  dreams = data ? data : [];

  displayDreams(dreams);
};
getLocalStorage();

// Save dreams to local storage
const setLocalStorage = function (dream) {
  localStorage.setItem('dreams', JSON.stringify(dream));
};

// Open dream form
btnAddDream.addEventListener('click', function () {
  overlay.style.display = 'block';
  formContainer.style.display = 'block';
});

// Submit and display new dream
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const newDream = {
    id: Date.now(),
    title: inputTitle.value,
    date: inputDate.value,
    description: textareaDescription.value,
  };
  dreams.push(newDream);

  setLocalStorage(dreams);
  displayDreams(dreams);
  hideForm();
});

// Hide and reset form
const hideForm = function () {
  form.reset();
  overlay.style.display = 'none';
  formContainer.style.display = 'none';
};

// Close form (ask if not empty)
const closeForm = function () {
  // Close if textarea is empty
  if (textareaDescription.value === '') {
    hideForm();
  } else {
    if (confirm('Your dream will vanish...')) {
      hideForm();
    }
  }
};

// Close form on click
btnCloseForm.addEventListener('click', closeForm);
overlay.addEventListener('click', closeForm);

// Close form on ESC key
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeForm();
});

// Scroll-to-top (icon)
const fixedIconWrapper = document.querySelector('.fixed-icon-wrapper');
const iconFixed = document.querySelector('.icon-go-top');

iconFixed.addEventListener('click', function (e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Show scroll icon after header
window.addEventListener('scroll', function () {
  let headerHeight = header.offsetHeight;
  let scrollPosition = window.scrollY;

  if (scrollPosition > headerHeight) {
    fixedIconWrapper.classList.add('visible');
  } else {
    fixedIconWrapper.classList.remove('visible');
  }
});
