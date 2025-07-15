import i18n from './i18n.js';

const renderFeedback = (elements, { valid, error }) => {
  const { input, feedback } = elements;
  if (valid) {
    input.classList.remove('is-invalid');
    feedback.textContent = '';
  } else {
    input.classList.add('is-invalid');
    feedback.textContent = error;
  }
};

const renderFormStatus = (elements, status) => {
  const { input } = elements;
  if (status === 'finished') {
    input.value = '';
    input.focus();
  }
};

const renderFeeds = (feeds, container) => {
  container.innerHTML = '';

  const card = document.createElement('div');
  card.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card-title', 'h4');
  cardTitle.textContent = 'Фиды';
  cardBody.appendChild(cardTitle);
  card.appendChild(cardBody);

  const list = document.createElement('ul');
  list.classList.add('list-group', 'border-0', 'rounded-0');
  feeds.forEach(({ title, description }) => {
    const item = document.createElement('li');
    item.classList.add('list-group-item', 'border-0', 'border-end-0');

    const itemTitle = document.createElement('h3');
    itemTitle.classList.add('h6', 'm-0');
    itemTitle.textContent = title;

    const itemDesc = document.createElement('p');
    itemDesc.classList.add('m-0', 'small', 'text-black-50');
    itemDesc.textContent = description;

    item.append(itemTitle, itemDesc);
    list.appendChild(item);
  });

  card.appendChild(list);
  container.appendChild(card);
};

const renderPosts = (posts, container) => {
  container.innerHTML = '';

  const card = document.createElement('div');
  card.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card-title', 'h4');
  cardTitle.textContent = 'Посты';
  cardBody.appendChild(cardTitle);
  card.appendChild(cardBody);

  const list = document.createElement('ul');
  list.classList.add('list-group', 'border-0', 'rounded-0');
  posts.forEach(({ title, link }) => {
    const item = document.createElement('li');
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

    const postLink = document.createElement('a');
    postLink.setAttribute('href', link);
    postLink.classList.add('fw-bold');
    postLink.setAttribute('target', '_blank');
    postLink.setAttribute('rel', 'noopener noreferrer');
    postLink.textContent = title;

    item.appendChild(postLink);
    list.appendChild(item);
  });

  card.appendChild(list);
  container.appendChild(card);
};

export default (state, elements) => (path, value) => {
  switch (path) {
    case 'form.valid':
    case 'form.error':
      renderFeedback(elements, state.form);
      break;

    case 'form.status':
      renderFormStatus(elements, value);
      break;

    case 'feeds':
      renderFeeds(value, elements.feeds);
      break;

    case 'posts':
      renderPosts(value, elements.posts);
      break;

    default:
      break;
  }
};
