import * as yup from 'yup';
import onChange from 'on-change';
import render from './view.js';

const validate = (url, urls) => {
  const schema = yup
    .string()
    .url()
    .notOneOf(urls)
    .required();

  return schema.validate(url);
};

export default () => {
  const state = {
    form: {
      valid: true,
      error: null,
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
        watchedState.form.error = error.message;
        watchedState.form.status = 'filling';
      });
  });
};
