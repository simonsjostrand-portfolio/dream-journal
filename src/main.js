import './helpers.js';
import {
  renderDreamMessage,
  hideDreamMessage,
  showForm,
  closeForm,
  fillForm,
  showDreamIcons,
  hideDreamIcons,
} from './helpers.js';

const header = document.querySelector('.hero');
const dreamList = document.querySelector('.dream-list');
const dreamMessage = document.querySelector('.dream-message');
const form = document.querySelector('.dream-form');
const formContainer = document.querySelector('.dream_form-container');
const overlay = document.querySelector('.form-overlay');
const inputTitle = document.querySelector('.dream_title-input');
const inputDate = document.querySelector('.dream_date-input');
const inputSearch = document.querySelector('.input-search');
const fieldDescription = document.querySelector('.dream_description-field');
const btnAddDream = document.querySelector('.btn-add-dream');
const btnSubmitDream = document.querySelector('.btn-submit-dream');
const btnCloseForm = document.querySelector('.icon-close-form');
const fixedIconWrapper = document.querySelector('.fixed-icon-wrapper');
const iconFixed = document.querySelector('.icon-go-top');

////////////////////////////////////////////////////////////

let dreams = [];
let editingDreamId = null;

// Get dreams from local storage
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

const renderDreams = function (dreamsToRender = dreams) {
  dreamList.innerHTML = '';

  if (dreams.length === 0) {
    renderDreamMessage(dreamMessage);
  } else {
    hideDreamMessage(dreamMessage);
    inputSearch.classList.add('active');
  }

  dreamsToRender.forEach(dream => {
    const html = `
      <article class="dream" data-id="${dream.id}">
        <header class="dream-info">
          <p class="dream-date">${dream.date}</p>
          <h2 class="dream-title">${dream.title}</h2>
        </header>
        <p class="dream-description">${dream.description}</p>
        <img class="btn-edit" src="src/img/edit-icon.png" />
        <img class="btn-delete" src="src/img/delete-icon.png" />
      </article> 
    `;
    dreamList.insertAdjacentHTML('afterbegin', html);
  });
};

// Event handlers
const handleSubmit = function (e) {
  e.preventDefault();

  const dream = {
    id: editingDreamId ?? crypto.randomUUID(), // If editing, use existing ID
    title: inputTitle.value.trim(),
    date: inputDate.value.trim(),
    description: fieldDescription.value.trim(),
  };

  if (editingDreamId) {
    // Find index and replace the dream
    const index = dreams.findIndex(dream => dream.id === editingDreamId);
    dreams[index] = dream;
  } else {
    dreams.push(dream);
  }

  setLocalStorage(dreams);
  renderDreams(dreams);
  closeForm(form, formContainer, overlay);
};

const handleShowForm = function () {
  editingDreamId = null;
  btnSubmitDream.textContent = 'Submit my Dream';

  form.reset();
  showForm(overlay, formContainer);
};

const handleCloseForm = function () {
  if (fieldDescription.value) {
    if (
      confirm(
        'Are you sure you want to close the form? Any unsaved changes will be lost.'
      )
    )
      closeForm(form, formContainer, overlay);
  } else {
    closeForm(form, formContainer, overlay);
  }
};

const handleCloseOnKey = e => (e.key === 'Escape' ? handleCloseForm() : '');

const handleSearchDreams = function () {
  const query = inputSearch.value.toLowerCase();
  const filtered = dreams.filter(
    dream =>
      dream.title.toLowerCase().includes(query) ||
      dream.description.toLowerCase().includes(query)
  );
  renderDreams(filtered);
};

const handleToggleDreamHighlight = function (e, isHovering) {
  const dreamArticle = e.target.closest('.dream');

  if (!dreamArticle || !dreamList.contains(dreamArticle)) return;

  dreamArticle.style.outline = isHovering ? '2px solid #333' : 'none';

  if (isHovering) {
    showDreamIcons(dreamArticle);
  } else {
    hideDreamIcons(dreamArticle);
  }
};

const handleEdit = function (e) {
  if (e.target.classList.contains('btn-edit')) {
    handleShowForm();

    const dreamArticle = e.target.closest('.dream');

    // Save ID being edited
    editingDreamId = dreamArticle.dataset.id;

    fillForm(dreamArticle, inputTitle, inputDate, fieldDescription);

    btnSubmitDream.textContent = 'Save & close';
  }
};

const handleDelete = function (e) {
  if (e.target.classList.contains('btn-delete')) {
    const dreamArticle = e.target.closest('.dream');
    console.log(dreamArticle);
    const id = dreamArticle.dataset.id;
    if (dreamArticle && confirm('This will permanently remove the dream.')) {
      // Remove from DOM
      dreamArticle.remove();

      // Remove from dreams array
      dreams = dreams.filter(dream => id !== dream.id);

      // Update localStorage
      setLocalStorage(dreams);

      // If deleting last dream, hide search input and show dream message
      if (JSON.parse(localStorage.getItem('dreams') || '[]').length === 0) {
        inputSearch.classList.remove('active');
        renderDreamMessage(dreamMessage);
      }
    }
  }
};

const handleScrollToTop = function (e) {
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
document.addEventListener('keydown', handleCloseOnKey);
iconFixed.addEventListener('click', handleScrollToTop);
window.addEventListener('scroll', handleToggleScrollIcon);
inputSearch.addEventListener('input', handleSearchDreams);
dreamList.addEventListener('click', handleEdit);
dreamList.addEventListener('click', handleDelete);
dreamList.addEventListener('mouseover', e =>
  handleToggleDreamHighlight(e, true)
);
dreamList.addEventListener('mouseout', e =>
  handleToggleDreamHighlight(e, false)
);

// RUN APP
const init = function () {
  getLocalStorage();
  renderDreams();
};
init();
