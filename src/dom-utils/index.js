// @function get `HighlightedTextNode` object from selection
// @param {Selection} selection See doc:
// https://developer.mozilla.org/en-US/docs/Web/API/Selection
// @throws {Error} Error messages are listed in
// `getHighlightedTextNode.ERROR_MESSAGES`
// @return {HighlightedTextNode} See doc:
// https://github.com/LeaveNote/LeaveNote/issues/4
export function getHighlightedTextNode (selection) {
  if (selection.isCollapsed) {
    throw new Error(getHighlightedTextNode.ERROR_MESSAGES[0])
  }

  // @var {Range} range See doc:
  // https://developer.mozilla.org/en-US/docs/Web/API/Range
  let range = selection.getRangeAt(0)

  // @var {Node} commonAncestorNode
  let commonAncestorNode = range.commonAncestorContainer
  if (!commonAncestorNode) {
    throw new Error(getHighlightedTextNode.ERROR_MESSAGES[1])
  }
  // @var {Element} commonAncestorElement
  let commonAncestorElement = commonAncestorNode
  while (commonAncestorNode.nodeType !== Node.ELEMENT_NODE) {
    commonAncestorNode = commonAncestorNode.parentNode
    if (!commonAncestorElement) {
      throw new Error(getHighlightedTextNode.ERROR_MESSAGES[1])
    }
  }

  let allTextNodes = getTextNodesIn(commonAncestorElement)
  let highlightedTextNodes
  // TODO: check whether `range.startContainer` is always text node
  if (range.startContainer.nodeType !== Node.TEXT_NODE ||
    range.endContainer.nodeType !== Node.TEXT_NODE
  ) {
    throw new Error(getHighlightedTextNode.ERROR_MESSAGES[2])
  }
  let indexOfRangeStartTextNode = allTextNodes.indexOf(range.startContainer)
  let indexOfRangeEndTextNode = allTextNodes.indexOf(range.endContainer)
  if (indexOfRangeStartTextNode === -1 && indexOfRangeEndTextNode === -1) {
    highlightedTextNodes = allTextNodes
  }
  else {
    if (indexOfRangeStartTextNode === -1) indexOfRangeStartTextNode = 0
    else indexOfRangeEndTextNode = allTextNodes.length
    highlightedTextNodes = allTextNodes.slice(
      indexOfRangeStartTextNode,
      indexOfRangeEndTextNode
    )
  }

  return {
    cae: commonAncestorElement,
    htn: highlightedTextNodes,
    fhtno: range.startOffset,
    lhtno: range.endOffset,
  }
}

// Array index is error code, array item is error message,
// so item value can be changed, but make sure keep the same meaning.
getHighlightedTextNode.ERROR_MESSAGES = [
  'selection is collapsed',
  'no common ancestor element',
  'range edge node is not text node'
]

// @param {Node} node
// @param {Object} [options]
// @param {boolean} [options.excludeWhitespaceText=true]
// @param {string[]} [options.excludeTagNames=[...]] See source code for default
// value. Not find text nodes in these tags.
// @return {Text[]} All text nodes inside element, as the order in DOM.
export function getTextNodesIn (node, options) {
  options = options || {}
  if (!options.hasOwnProperty('excludeWhitespaceText')) {
    options.excludeWhitespaceText = true
  }
  if (!options.hasOwnProperty('excludeTagNames')) {
    options.excludeTagNames = [
      'AUDIO', 'AREA',
      'BGSOUND', 'BUTTON',
      'CANVAS',
      'EMBED',
      'HEAD',
      'IFRAME', 'INPUT', 'IMG',
      'KEYGEN',
      'LINK',
      'NOSCRIPT',
      'META', 'MAP',
      'OBJECT', 'OPTION', 'OPTGROUP',
      'PARAM',
      'SCRIPT', 'STYLE', 'SELECT', 'SOURCE',
      'TEXTAREA', 'TIME', 'TRACK', 'TEMPLATE', 'TITLE',
      'VIDEO',
    ]
  }

  const NON_WHITESPACE = /\S/
  let textNodes = []

  ;(function pushIntoTextNodes (node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (options.excludeWhitespaceText) {
        let isAllWhitespaceText = !NON_WHITESPACE.test(node.nodeValue)
        if (isAllWhitespaceText) return
        else textNodes.push(node)
      }
      else {
        textNodes.push(node)
        return
      }
    }
    else {
      if (options.excludeTagNames.indexOf(node.tagName) >= 0) return
      for (let i = 0; i < node.childNodes.length; ++i) {
        pushIntoTextNodes(node.childNodes[i])
      }
    }
  })(node)

  return textNodes
}
