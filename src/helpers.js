export const renderDreamMessage = msg => (msg.style.display = 'block');
export const hideDreamMessage = msg => (msg.style.display = 'none');

export const closeForm = function (form, formContainer, overlay) {
  form.reset();
  overlay.style.display = 'none';
  formContainer.style.display = 'none';
};
