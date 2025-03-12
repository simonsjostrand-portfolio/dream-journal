'use strict';

const header = document.querySelector('.hero');
const dreamList = document.querySelector('.dream-list');
const dreamMessage = document.querySelector('.dream-message');
const overlay = document.querySelector('.overlay');
const formContainer = document.querySelector('.dream_form-container');
const form = document.querySelector('.dream-form');
const inputTitle = document.querySelector('.dream_title-input');
const inputDate = document.querySelector('.dream_date-input');
const fieldDescription = document.querySelector('.dream_description-field');
const btnAddDream = document.querySelector('.btn-add-dream');
const btnSubmitDream = document.querySelector('.btn-submit-dream');
const btnCloseForm = document.querySelector('.icon-close-form');
const fixedIconWrapper = document.querySelector('.fixed-icon-wrapper');
const iconFixed = document.querySelector('.icon-go-top');

///////////////////////////////////////////////////////////////////////////////////////////

let dreams = [];

// Get data from local storage
const getLocalStorage = function () {
  try {
    const data = JSON.parse(localStorage.getItem('dreams'));
    if (data) dreams = data;
  } catch {
    error('Error parsing dreams from localStorage:', error);
  }
};
getLocalStorage();

// Save dreams to local storage
const setLocalStorage = function (dream) {
  localStorage.setItem('dreams', JSON.stringify(dream));
};

// Handle dream message
const displayDreamMessage = () => (dreamMessage.style.display = 'block');
const hideDreamMessage = () => (dreamMessage.style.display = 'none');

// Render dreams
const renderDreams = function (dreams) {
  dreamList.innerHTML = '';

  if (dreams.length === 0) {
    displayDreamMessage();
  } else {
    hideDreamMessage();
  }

  dreams.forEach(dream => {
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
renderDreams(dreams);

// Create dream
const createDream = function () {
  const newDream = {
    id: (Date.now() + '').slice(-10),
    title: inputTitle.value,
    date: inputDate.value,
    description: fieldDescription.value,
  };

  dreams.push(newDream);
};

// Form handling
const showForm = function () {
  overlay.style.display = 'block';
  formContainer.style.display = 'block';
};

const hideForm = function () {
  form.reset();
  overlay.style.display = 'none';
  formContainer.style.display = 'none';
};

const closeForm = function () {
  if (fieldDescription.value) {
    if (confirm('Your dream will vanish... Are you sure you want to close?'))
      hideForm();
  } else {
    hideForm();
  }
};

// Scroll-to-top functionality
const scrollToTop = function (e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

//////////////////////////////////////////////////////////////////////////

// Event handlers
btnAddDream.addEventListener('click', showForm);
btnCloseForm.addEventListener('click', closeForm);
overlay.addEventListener('click', closeForm);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeForm();
});

// Submit dream
form.addEventListener('submit', function (e) {
  e.preventDefault();

  createDream();
  setLocalStorage(dreams);
  renderDreams(dreams);
  hideForm();
});

// Icon scroll-to-top
iconFixed.addEventListener('click', scrollToTop);

// Toggle visibility of scroll icon
window.addEventListener('scroll', function () {
  const headerHeight = header.offsetHeight;
  const scrollPosition = window.scrollY;

  // Show or hide scroll icon based on scroll position
  if (scrollPosition > headerHeight) {
    fixedIconWrapper.classList.add('visible');
  } else {
    fixedIconWrapper.classList.remove('visible');
  }
});
