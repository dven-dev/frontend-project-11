export default (path, value, prevValue) => {
  const input = document.querySelector('input[name="url"]');
  const feedback = document.querySelector('.feedback');

  if (path === 'form.valid') {
    if (value) {
      input.classList.remove('is-invalid');
      feedback.textContent = '';
    } else {
      input.classList.add('is-invalid');
    }
  }

  if (path === 'form.error') {
    feedback.textContent = value;
  }

  if (path === 'form.status' && value === 'finished') {
    input.value = '';
    input.focus();
  }
};
