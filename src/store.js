import Q from 'q'

// @var {Object[]} highlights Each object is highlighted text schema, see doc:
// https://github.com/LeaveNote/LeaveNote/issues/4
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
