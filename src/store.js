import Q from 'q'

// @var {Object[]} highlights
// @var {string} highlight.page Page URI, including hash, exclude protocol
// @var {string[]} highlight.selectors
// @var {string} highlight.content
export let highlights = []

// @prop {Object[]} notes
// @prop {string} note.page
// @prop {number} note.left
// @prop {number} note.top
// @prop {string} note.content
export let notes = []

export function fetchHighlights () {
  return Q.Promise((resolve, reject, notify) => {
    resolve([{
      page: '*',
      selectors: ['.foo'],
      content: 'hello',
    }])
  })
  .then((highlights) => {
    return highlights
  })
}

export function updateHighlights (newHighlights) {
  highlights = newHighlights
  return Q.Promise((resolve, reject, notify) => resolve())
}
