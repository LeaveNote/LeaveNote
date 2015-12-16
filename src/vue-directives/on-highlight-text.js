import {getHighlightedTextNode} from '../dom-utils'

export default {
  // @param {Element} scopeElement
  // @param {Function} handleHighlightText
  // @param {Function} [handleError]
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

    try {
      var highlightedTextNode = getHighlightedTextNode(selection)
    } catch (error) {
      switch (error.message) {
        case getHighlightedTextNode.ERROR_MESSAGES[0]:
        case getHighlightedTextNode.ERROR_MESSAGES[1]:
        case getHighlightedTextNode.ERROR_MESSAGES[2]:
          // No need to do anything
          return
      }
    }

    this.params.handleHighlightText(highlightedTextNode)
  },
}

function noop () {}

function isHtmlBodyElement (el) {
  return ({}).toString.call(el) === '[object HTMLBodyElement]'
}
