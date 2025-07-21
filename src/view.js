import { Modal } from 'bootstrap'

const renderFeedback = (elements, { valid, error }) => {
  const { input, feedback } = elements

  if (valid) {
    input.classList.remove('is-invalid')
    feedback.classList.remove('text-danger')
    feedback.classList.add('text-success')
    feedback.textContent = ''
  } 
  else {
    input.classList.add('is-invalid')
    feedback.classList.remove('text-success')
    feedback.classList.add('text-danger')
    feedback.textContent = error
  }
}

const renderFormStatus = (elements, status) => {
  const { input, feedback } = elements

  if (status === 'finished') {
    input.value = ''
    input.focus()
    feedback.classList.remove('text-danger')
    feedback.classList.add('text-success')
    feedback.textContent = 'RSS успешно загружен'
  }
}

const renderFeeds = (feeds, containerElement) => {
  containerElement.innerHTML = ''

  const card = document.createElement('div')
  card.classList.add('card', 'border-0')

  const cardBody = document.createElement('div')
  cardBody.classList.add('card-body')

  const title = document.createElement('h2')
  title.classList.add('card-title', 'h4')
  title.textContent = 'Фиды'

  cardBody.appendChild(title)
  card.appendChild(cardBody)

  const list = document.createElement('ul')
  list.classList.add('list-group', 'border-0', 'rounded-0')

  feeds.forEach(({ title, description }) => {
    const item = document.createElement('li')
    item.classList.add('list-group-item', 'border-0', 'border-end-0')

    const itemTitle = document.createElement('h3')
    itemTitle.classList.add('h6', 'm-0')
    itemTitle.textContent = title

    const itemDesc = document.createElement('p')
    itemDesc.classList.add('m-0', 'small', 'text-black-50')
    itemDesc.textContent = description

    item.append(itemTitle, itemDesc)
    list.appendChild(item)
  })

  card.appendChild(list)
  containerElement.appendChild(card)
};

const showModal = (title, description, link) => {
  const modalTitle = document.querySelector('.modal-title')
  const modalBody = document.querySelector('.modal-body')
  const modalLink = document.querySelector('.full-article')

  modalTitle.textContent = title
  modalBody.textContent = description
  modalLink.href = link

  const modal = new Modal(document.getElementById('modal'))
  modal.show()
}

const renderPosts = (state, elements) => {
  const { posts } = state
  const container = elements.posts
  container.innerHTML = ''

  const card = document.createElement('div')
  card.classList.add('card', 'border-0')

  const cardBody = document.createElement('div')
  cardBody.classList.add('card-body')

  const title = document.createElement('h2')
  title.classList.add('card-title', 'h4')
  title.textContent = 'Посты'

  cardBody.appendChild(title)
  card.appendChild(cardBody)

  const list = document.createElement('ul')
  list.classList.add('list-group', 'border-0', 'rounded-0')

  posts.forEach(({ id, title, link }) => {
    const item = document.createElement('li')
    item.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-start',
      'border-0',
      'border-end-0',
    )

    const postLink = document.createElement('a')
    postLink.setAttribute('href', link)
    postLink.setAttribute('target', '_blank')
    postLink.setAttribute('rel', 'noopener noreferrer')
    postLink.dataset.id = id
    postLink.textContent = title

    if (state.readPosts.has(id)) {
      postLink.classList.add('fw-normal', 'link-secondary')
    } 
    else {
      postLink.classList.add('fw-bold')
    }

    postLink.addEventListener('click', () => {
      state.readPosts.add(id)
      renderPosts(state, elements)
    })

    const button = document.createElement('button')
    button.setAttribute('type', 'button')
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm')
    button.dataset.id = id
    button.textContent = 'Просмотр'

    button.addEventListener('click', () => {
      const post = state.posts.find((p) => p.id === id)
      if (!post) return

      state.readPosts.add(id)
      showModal(post.title, post.description, post.link)
      renderPosts(state, elements)
    })

    item.append(postLink, button)
    list.appendChild(item)
  })

  card.appendChild(list)
  container.appendChild(card)
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
    case 'readPosts':
      renderPosts(state, elements);
      break;

    default:
      break
  }
};
