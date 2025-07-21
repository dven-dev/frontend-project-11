import { Modal } from 'bootstrap'
import * as yup from 'yup'
import onChange from 'on-change'
import axios from 'axios'
import { uniqueId } from 'lodash'
import initI18n from './i18n'
import render from './view'
import parseRSS from './parser'

const getElements = () => ({
  form: document.querySelector('.rss-form'),
  input: document.querySelector('input[name="url"]'),
  feedback: document.querySelector('.feedback'),
  feeds: document.querySelector('.feeds'),
  posts: document.querySelector('.posts'),
  modalTitle: document.querySelector('#modal .modal-title'),
  modalBody: document.querySelector('#modal .modal-body'),
})

const buildSchema = urls => yup.string().required().url().notOneOf(urls)

function checkForUpdates(state) {
  const { feeds, posts } = state

  const promises = feeds.map((feed) => {
    const { url } = feed
    const proxyUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`

    return axios.get(proxyUrl)
      .then((response) => {
        const { posts: newPosts } = parseRSS(response.data.contents)
        const existingLinks = posts.map(post => post.link)

        const freshPosts = newPosts
          .filter(post => !existingLinks.includes(post.link))
          .map(post => ({
            ...post,
            id: uniqueId('post_'),
            feedId: feed.id,
          }))

        if (freshPosts.length > 0) {
          state.posts.push(...freshPosts)
        }
      })
  })

  Promise.all(promises)
    .catch((err) => {
      console.error('Ошибка при обновлении одного из фидов:', err.message)
    })
    .finally(() => {
      setTimeout(() => checkForUpdates(state), 5000)
    })
}

export default async () => {
  const i18n = await initI18n()
  const elements = getElements()

  const state = {
    form: {
      valid: true,
      error: null,
      status: 'filling',
    },
    urls: [],
    feeds: [],
    posts: [],
    readPosts: new Set(),
  }

  const watchedState = onChange(state, render(state, elements))

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const url = formData.get('url').trim()

    watchedState.form.status = 'sending'

    buildSchema(watchedState.urls)
      .validate(url)
      .then(() => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`))
      .then((response) => {
        const { feed, posts } = parseRSS(response.data.contents)
        const feedId = uniqueId('feed_')
        const postsWithId = posts.map(post => ({
          ...post,
          id: uniqueId('post_'),
          feedId,
        }))

        watchedState.urls.push(url)
        watchedState.feeds.push({ ...feed, id: feedId, url })
        watchedState.posts.push(...postsWithId)

        watchedState.form.valid = true
        watchedState.form.status = 'finished'
        watchedState.form.error = null

        if (watchedState.feeds.length === 1) {
          checkForUpdates(watchedState)
        }
      })
      .catch((err) => {
        watchedState.form.valid = false
        watchedState.form.status = 'filling'

        if (err.isParsingError) {
          watchedState.form.error = i18n.t('feedback.errors.invalidRss')
        }
        else if (err.name === 'ValidationError') {
          watchedState.form.error = err.message
        }
        else {
          watchedState.form.error = i18n.t('feedback.errors.network')
        }
      })
  })

  elements.posts.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' && e.target.dataset.postId) {
      const { postId } = e.target.dataset

      watchedState.readPosts.add(postId)

      const post = watchedState.posts.find(p => p.id === postId)
      if (!post) return

      elements.modalTitle.textContent = post.title
      elements.modalBody.textContent = post.description

      const modal = new Modal(document.getElementById('modal'))
      modal.show()
    }
  })
}
