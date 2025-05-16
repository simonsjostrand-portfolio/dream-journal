export const renderDreamMessage = msg => (msg.style.display = 'block');
export const hideDreamMessage = msg => (msg.style.display = 'none');

export const closeForm = function (form, formContainer, overlay) {
  form.reset();
  overlay.style.display = 'none';
  formContainer.style.display = 'none';
};

export const showDreamIcons = function (dreamArticle) {
  // Show edit button
  const editIcon = dreamArticle.querySelector('.icon-edit');
  editIcon.style.display = 'block';

  // Show delete button
  const closeIcon = dreamArticle.querySelector('.icon-delete');
  closeIcon.style.display = 'block';
};

export const hideDreamIcons = function (dreamArticle) {
  // Hide edit button
  const closeIcon = dreamArticle.querySelector('.icon-delete');
  closeIcon.style.display = 'none';

  // Hide delete button
  const editIcon = dreamArticle.querySelector('.icon-edit');
  editIcon.style.display = 'none';
};
