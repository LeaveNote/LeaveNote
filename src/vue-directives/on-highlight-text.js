export default {
  bind () {
    let container = this.el.ownerDocument.body
    container.addEventListener('mouseup', this.handleMouseUp, false)
  },
  handleMouseUp (event) {
    this.getSelectedText(event.view)
  },
  // @param {Object} win `window` object
  getSelectedText (win) {
    if (win.getSelection) {
      return win.getSelection().toString()
    }
    else if (win.document.selection) {
      return win.document.selection.createRange().text
    }
    else return ''
  },
}
