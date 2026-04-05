import "./helpers.js";
import {
  renderDreamMessage,
  hideDreamMessage,
  showForm,
  closeForm,
  fillForm,
  showDreamIcons,
  hideDreamIcons,
} from "./helpers.js";

const header = document.querySelector(".hero");
const dreamList = document.querySelector(".dream-list");
const dreamMessage = document.querySelector(".no-dreams-note");
const form = document.querySelector(".dream-form");
const formContainer = document.querySelector(".dream_form-container");
const overlay = document.querySelector(".form-overlay");
const inputTitle = document.querySelector(".dream_title-input");
const inputDate = document.querySelector(".dream_date-input");
const inputSearch = document.querySelector(".input-search");
const fieldDescription = document.querySelector(".dream_description-field");
const btnAddDream = document.querySelector(".btn-add-dream");
const btnSubmitDream = document.querySelector(".btn-submit-dream");
const btnCloseForm = document.querySelector(".icon-close-form");
const fixedIconWrapper = document.querySelector(".fixed-icon-wrapper");
const iconFixed = document.querySelector(".icon-go-top");

////////////////////////////////////////////////////////////

let dreams = [];
let editingDreamId = null;

// LOCAL STORAGE
const getLocalStorage = function () {
  const data = JSON.parse(localStorage.getItem("dreams"));
  if (data) dreams = data;
};

const setLocalStorage = function () {
  localStorage.setItem("dreams", JSON.stringify(dreams));
};

// RENDER
const renderDreams = function (dreamsToRender = dreams) {
  dreamList.innerHTML = "";

  if (dreamsToRender.length === 0) {
    renderDreamMessage(dreamMessage);
    inputSearch.classList.remove("active");
    return;
  }

  hideDreamMessage(dreamMessage);
  inputSearch.classList.add("active");

  dreamsToRender.forEach((dream) => {
    const html = `
      <article class="dream" data-id="${dream.id}">
        <header class="dream-info">
          <p class="dream-date">${dream.date}</p>
          <h2 class="dream-title">${dream.title}</h2>
        </header>

        <p class="dream-description">${dream.description}</p>

        <div class="dream-actions">
          <button class="btn-edit" type="button" aria-label="Edit dream">
            <img src="src/img/edit-icon.png" alt="" />
          </button>

          <button class="btn-delete" type="button" aria-label="Delete dream">
            <img src="src/img/delete-icon.png" alt="" />
          </button>
        </div>
      </article>
    `;
    dreamList.insertAdjacentHTML("afterbegin", html);
  });
};

// SUBMIT
const handleSubmit = function (e) {
  e.preventDefault();

  const newDream = {
    id: editingDreamId ? editingDreamId : crypto.randomUUID(),
    title: inputTitle.value.trim(),
    date: inputDate.value.trim(),
    description: fieldDescription.value.trim(),
  };

  if (editingDreamId) {
    const index = dreams.findIndex((d) => d.id === editingDreamId);

    if (index !== -1) {
      dreams[index] = newDream;
    }

    editingDreamId = null;
    btnSubmitDream.textContent = "Submit my Dream";
  } else {
    dreams.push(newDream);
  }

  setLocalStorage();
  renderDreams();
  closeForm(form, formContainer, overlay);
  form.reset();
};

// OPEN FORM
const handleShowForm = function () {
  editingDreamId = null;
  btnSubmitDream.textContent = "Submit my Dream";

  form.reset();
  showForm(overlay, formContainer);
};

// CLOSE FORM
const handleCloseForm = function () {
  if (fieldDescription.value) {
    if (!confirm("Are you sure? Unsaved changes will be lost.")) return;
  }
  closeForm(form, formContainer, overlay);
};

// EDIT
const handleEdit = function (dreamArticle) {
  editingDreamId = dreamArticle.dataset.id;

  fillForm(dreamArticle, inputTitle, inputDate, fieldDescription);

  btnSubmitDream.textContent = "Save & close";

  showForm(overlay, formContainer);
};

// DELETE
const handleDelete = function (id) {
  if (!confirm("This will permanently remove the dream.")) return;

  dreams = dreams.filter((d) => d.id !== id);

  setLocalStorage();
  renderDreams();
};

// EVENT DELEGATION
const handleDreamActions = function (e) {
  const dreamArticle = e.target.closest(".dream");
  if (!dreamArticle) return;

  const id = dreamArticle.dataset.id;

  if (e.target.closest(".btn-edit")) {
    handleEdit(dreamArticle);
  }

  if (e.target.closest(".btn-delete")) {
    handleDelete(id);
  }
};

// SEARCH
const handleSearchDreams = function () {
  const query = inputSearch.value.toLowerCase();

  const filtered = dreams.filter(
    (d) =>
      d.title.toLowerCase().includes(query) ||
      d.description.toLowerCase().includes(query),
  );

  renderDreams(filtered);
};

// SCROLL ICON
const handleToggleScrollIcon = () => {
  if (window.scrollY > header.offsetHeight) {
    fixedIconWrapper.classList.add("visible");
  } else {
    fixedIconWrapper.classList.remove("visible");
  }
};

const handleScrollToTop = function (e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// EVENTS
form.addEventListener("submit", handleSubmit);
btnAddDream.addEventListener("click", handleShowForm);
btnCloseForm.addEventListener("click", handleCloseForm);
overlay.addEventListener("click", handleCloseForm);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") handleCloseForm();
});

dreamList.addEventListener("click", handleDreamActions);
inputSearch.addEventListener("input", handleSearchDreams);

window.addEventListener("scroll", handleToggleScrollIcon);
iconFixed.addEventListener("click", handleScrollToTop);

// INIT
const init = function () {
  getLocalStorage();
  renderDreams();
};
init();
