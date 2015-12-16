export default {
  // @param {Element} scopeElement
  // @param {Function} handleHighlightText
  // @param {Function} handleError
  // Error code:
  // 1. cannot highlight text selection
  params: ['scopeElement', 'handleHighlightText', 'handleError'],

  bind () {
    if (this.params.handleError === void 0) this.params.handleError = noop
    this._boundHandleMouseUp = this.handleMouseUp.bind(this)

    this.params.scopeElement
      .addEventListener('mouseup', this._boundHandleMouseUp)
  },

  unbind () {
    this.params.scopeElement
      .removeEventListener('mouseup', this._boundHandleMouseUp)
    this._boundHandleMouseUp = null
  },

  handleMouseUp (event) {
    let win = event.view
    let selection
    if (!win.getSelection) return
    selection = win.getSelection()
    if (selection.isCollapsed) return
  },
}

function noop () {}

function isHtmlBodyElement (el) {
  return ({}).toString.call(el) === '[object HTMLBodyElement]'
}
