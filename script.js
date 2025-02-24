'use strict';

const header = document.querySelector('.hero');
const overlay = document.getElementById('overlay');
const noteNoDreams = document.querySelector('.note-no-dreams');
const dreamList = document.querySelector('.dream-list');

const formContainer = document.querySelector('.dream_form-container');
const form = document.getElementById('dream-form');
const inputTitle = document.getElementById('dream_title-input');
const inputDate = document.getElementById('dream_date-input');
const inputDescription = document.getElementById('dream_description-input');

const btnAddDream = document.querySelector('.btn-add-dream');
const btnSubmitDream = document.querySelector('.btn-submit-dream');
const iconCloseForm = document.querySelector('.icon-close-form');

let dreams = [
  // {
  //   id: 1,
  //   title: 'Flying Over the Ocean',
  //   date: '2025-02-15',
  //   description:
  //     'I was soaring above a vast, crystal-clear ocean, feeling the wind rush past me as I flew effortlessly. It felt like freedom in its purest form, and the sun set in vibrant oranges and purples as I drifted further out to sea.',
  // },
  // {
  //   id: 2,
  //   title: 'Chasing the Moon',
  //   date: '2025-02-16',
  //   description:
  //     'I found myself running through a dense forest, chasing a giant, glowing moon that seemed to hover just above the trees. As I sprinted, the moon beckoned me forward, and I could feel an incredible energy surrounding me, guiding me deeper into the woods.',
  // },
];

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
    description: inputDescription.value,
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
  if (inputDescription.value === '') {
    hideForm();
  } else {
    if (
      confirm(
        'Poof! Your dream will vanish into the void. Still want to close?'
      )
    ) {
      hideForm();
    }
  }
};

// Close form on click
iconCloseForm.addEventListener('click', closeForm);
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
