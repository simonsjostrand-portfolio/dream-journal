'use strict';

const dreamFormContainer = document.querySelector('.dream_form-container');
const dreamForm = document.getElementById('dream-form');
const titleInput = document.getElementById('dream_title-input');
const dateInput = document.getElementById('dream_date-input');
const descriptionInput = document.getElementById('dream_description-input');
const btnAddDream = document.querySelector('.btn-add-dream');
const btnSubmitDream = document.querySelector('.btn-submit-dream');
const iconCloseForm = document.querySelector('.icon-close-form');
const dreamList = document.querySelector('.dream-list');
const overlay = document.getElementById('overlay');

const dreams = [];

const closeFormPrompt = function () {
  if (descriptionInput.value === '') {
    dreamForm.reset();
    overlay.style.display = 'none';
    dreamFormContainer.style.display = 'none';
  } else {
    const youSure = prompt('Are you sure you want to close? Yes or No');
    if (youSure === 'Yes' || youSure === 'yes') {
      dreamForm.reset();
      overlay.style.display = 'none';
      dreamFormContainer.style.display = 'none';
    }
  }
};

// Open form (add dream)
btnAddDream.addEventListener('click', function () {
  overlay.style.display = 'block';
  dreamFormContainer.style.display = 'block';
});

// Submit dream
dreamForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const newDream = {
    id: Date.now(),
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  };

  dreams.push(newDream);

  // dreamList.innerHTML = '';

  const newCard = document.createElement('article');
  newCard.classList.add('dream-card');
  newCard.innerHTML = `
  <header class="dream-info">
    <p class="dream-date">${newDream.date}</p>
    <h2 class="dream-title">${newDream.title}</h2>
  </header>
  <p class="dream">${newDream.description}</p>
`;
  dreamList.prepend(newCard);

  dreamForm.reset();
  overlay.style.display = 'none';
  dreamFormContainer.style.display = 'none';
});

iconCloseForm.addEventListener('click', function () {
  closeFormPrompt();
});

overlay.addEventListener('click', function () {
  closeFormPrompt();
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeFormPrompt();
});

// Fixed icon (go to top)
const fixedIconWrapper = document.querySelector('.fixed-icon-wrapper');
const iconFixed = document.querySelector('.icon-go-top');
const header = document.querySelector('.hero');

window.onscroll = function () {
  let headerHeight = header.offsetHeight;
  let scrollPosition = window.scrollY;

  if (scrollPosition > headerHeight) {
    fixedIconWrapper.classList.add('visible');
  } else {
    fixedIconWrapper.classList.remove('visible');
  }
};

iconFixed.addEventListener('click', function (e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
