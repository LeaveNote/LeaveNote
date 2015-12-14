export default {
  // @param {Element} scopeElement
  // @param {Function} handleHighlightText
  // @param {Function} handleError
  // Error code:
  // 1. cannot highlight text selection
  params: ['scopeElement', 'handleHighlightText', 'handleError'],

  bind () {
    this._boundHandleMouseDown = this.handleMouseDown.bind(this)
    this._boundHandleMouseUp = this.handleMouseUp.bind(this)
    this._elOnMouseDown = null

    let scopeElement = this.params.scopeElement
    scopeElement.addEventListener('mousedown', this._boundHandleMouseDown)
    scopeElement.addEventListener('mouseup', this._boundHandleMouseUp)

    if (this.params.handleError === void 0) {
      this.params.handleError = noop
    }
  },

  unbind () {
    let scopeElement = this.params.scopeElement
    scopeElement.removeEventListener('mousedown', this._boundHandleMouseDown)
    scopeElement.removeEventListener('mouseup', this._boundHandleMouseUp)
    this._boundHandleMouseDown = null
    this._boundHandleMouseUp = null
  },

  handleMouseDown (event) {
    this._elOnSelectionStart = event.target
  },

  handleMouseUp (event) {
    let text = this.getSelectedText(event)
    if (!text) return
  },

  // @param {Event} event
  getSelectedText (event) {
    let win = event.view
    if (win.getSelection) {
      return win.getSelection().toString()
    }
    else return ''
  },

  // @param {Element} el
  getSelectors (el) {
    let selectors = []
    do {
      selectors.unshift({
        tagName: el.tagName.toLowerCase(),
        classList: [].slice.call(el.classList, 0),
      })
    }
    while (!isHtmlBodyElement(el))
    return selectors
  },
}

function noop () {}

function isHtmlBodyElement (el) {
  return ({}).toString.call(el) === '[object HTMLBodyElement]'
}
