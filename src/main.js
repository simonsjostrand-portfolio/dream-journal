import './helpers.js';
import { renderDreamMessage, hideDreamMessage, closeForm } from './helpers.js';

const header = document.querySelector('.hero');
const dreamList = document.querySelector('.dream-list');
const dreamMessage = document.querySelector('.dream-message');
const form = document.querySelector('.dream-form');
const formContainer = document.querySelector('.dream_form-container');
const overlay = document.querySelector('.overlay');
const inputTitle = document.querySelector('.dream_title-input');
const inputDate = document.querySelector('.dream_date-input');
const fieldDescription = document.querySelector('.dream_description-field');
const btnAddDream = document.querySelector('.btn-add-dream');
const btnSubmitDream = document.querySelector('.btn-submit-dream');
const btnCloseForm = document.querySelector('.icon-close-form');
const fixedIconWrapper = document.querySelector('.fixed-icon-wrapper');
const iconFixed = document.querySelector('.icon-go-top');

////////////////////////////////////////////////////////////

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

// Save dreams to local storage
const setLocalStorage = function (dream) {
  localStorage.setItem('dreams', JSON.stringify(dream));
};

const renderDreams = function () {
  dreamList.innerHTML = '';

  if (dreams.length === 0) {
    renderDreamMessage(dreamMessage);
  } else {
    hideDreamMessage(dreamMessage);
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

// Event handlers
const handleSubmit = e => {
  e.preventDefault();

  const dream = {
    id: crypto.randomUUID(),
    title: inputTitle.value.trim(),
    date: inputDate.value.trim(),
    description: fieldDescription.value.trim(),
  };

  dreams.push(dream);

  setLocalStorage(dreams);
  renderDreams(dreams);
  closeForm(form, formContainer, overlay);
};

const handleShowForm = () => {
  overlay.style.display = 'block';
  formContainer.style.display = 'block';
};

const handleCloseForm = () => {
  if (fieldDescription.value) {
    if (confirm('Your dream will vanish... Are you sure you want to close?'))
      closeForm(form, formContainer, overlay);
  } else {
    closeForm(form, formContainer, overlay);
  }
};

const handleCloseFormKey = e => (e.key === 'Escape' ? handleCloseForm() : '');

const handleScrollToTop = e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleToggleScrollIcon = () => {
  // Get header height
  const headerHeight = header.offsetHeight;

  // Get current vertical scroll position
  const scrollPosition = window.scrollY;

  // Show or hide scroll icon based on scroll position
  if (scrollPosition > headerHeight) {
    fixedIconWrapper.classList.add('visible');
  } else {
    fixedIconWrapper.classList.remove('visible');
  }
};

// Event listeners
form.addEventListener('submit', handleSubmit);
btnAddDream.addEventListener('click', handleShowForm);
btnCloseForm.addEventListener('click', handleCloseForm);
overlay.addEventListener('click', handleCloseForm);
document.addEventListener('keydown', handleCloseFormKey);

iconFixed.addEventListener('click', handleScrollToTop);
window.addEventListener('scroll', handleToggleScrollIcon);

// INIT
const init = function () {
  getLocalStorage();
  renderDreams();
};
init();
