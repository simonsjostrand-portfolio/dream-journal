export const renderDreamMessage = msg => (msg.style.display = 'block');
export const hideDreamMessage = msg => (msg.style.display = 'none');

export const showForm = function (overlay, formContainer) {
  overlay.style.display = 'block';
  formContainer.style.display = 'block';
};

export const closeForm = function (form, formContainer, overlay) {
  form.reset();
  overlay.style.display = 'none';
  formContainer.style.display = 'none';
};

export const fillForm = function (
  dreamArticle,
  inputTitle,
  inputDate,
  fieldDescription
) {
  const title = dreamArticle.querySelector('.dream-title').textContent;
  inputTitle.value = title;

  const text = dreamArticle.querySelector('.dream-description').textContent;
  fieldDescription.value = text;

  const date = dreamArticle.querySelector('.dream-date').textContent;
  inputDate.value = date;
};

export const showDreamIcons = function (dreamArticle) {
  // Show edit button
  const editIcon = dreamArticle.querySelector('.btn-edit');
  editIcon.style.display = 'block';

  // Show delete button
  const closeIcon = dreamArticle.querySelector('.btn-delete');
  closeIcon.style.display = 'block';
};

export const hideDreamIcons = function (dreamArticle) {
  // Hide edit button
  const closeIcon = dreamArticle.querySelector('.btn-delete');
  closeIcon.style.display = 'none';

  // Hide delete button
  const editIcon = dreamArticle.querySelector('.btn-edit');
  editIcon.style.display = 'none';
};
