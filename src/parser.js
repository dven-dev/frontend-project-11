export default (xmlString) => {
  const parser = new DOMParser()
  const parsedDocument = parser.parseFromString(xmlString, 'application/xml')

  const parserError = parsedDocument.querySelector('parsererror')
  if (parserError) {
    const error = new Error('Invalid RSS')
    error.isParsingError = true
    throw error
  }

  const channelTitle = parsedDocument.querySelector('channel > title')
  const channelDescription = parsedDocument.querySelector('channel > description')

  const feed = {
    title: channelTitle ? channelTitle.textContent : '',
    description: channelDescription ? channelDescription.textContent : '',
  }

  const itemElements = parsedDocument.querySelectorAll('item')
  const posts = Array.from(itemElements).map((itemElement) => {
    const postTitle = itemElement.querySelector('title')
    const postLink = itemElement.querySelector('link')
    const postDescription = itemElement.querySelector('description')

    return {
      title: postTitle ? postTitle.textContent : '',
      link: postLink ? postLink.textContent : '',
      description: postDescription ? postDescription.textContent : '',
    }
  })

  return { feed, posts }
}
