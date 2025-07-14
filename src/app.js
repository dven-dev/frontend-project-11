import * as yup from 'yup';
import onChange from 'on-change';

const validate = (url, urls) => {
  const schema = yup
    .string()
    .url()
    .notOneOf(urls)
    .required();

  return schema.validate(url);
};

const render = (path, value) => {
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
    feedback.textContent = window.i18next.t(`feedback.errors.${value}`);
  }

  if (path === 'form.status' && value === 'finished') {
    input.value = '';
    input.focus();
  }
};

export default () => {
  const state = {
    form: {
      valid: true,
      error: null, // error code: 'url', 'required' и т.д.
      status: 'filling',
    },
    urls: [],
  };

  const watchedState = onChange(state, render);

  const form = document.querySelector('.rss-form');
  const input = form.querySelector('input');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url').trim();

    watchedState.form.status = 'sending';
    validate(url, watchedState.urls)
      .then(() => {
        watchedState.form.valid = true;
        watchedState.urls.push(url);
        watchedState.form.status = 'finished';
        watchedState.form.error = null;
      })
      .catch((error) => {
        watchedState.form.valid = false;
        watchedState.form.error = error.type || 'unknown';
        watchedState.form.status = 'filling';
      });
  });
};
