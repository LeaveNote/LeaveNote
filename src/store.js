export default {
  // @prop {Object[]} highlights
  // @prop {string} highlight.page Page URI, including hash, exclude protocol
  // @prop {string[]} highlight.selectors
  // @prop {string} highlight.content
  highlights: [],
  // @prop {Object[]} notes
  // @prop {string} note.page
  // @prop {number} note.left
  // @prop {number} note.top
  // @prop {string} note.content
  notes: [],
  fetchHighlights () {
    return new Promise((resolve, reject) => {
      resolve([])
    })
    .then((highlights) => {
      this.highlights = highlights
      return highlights
    })
  },
}
