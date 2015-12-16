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
// @return {Text[]} All text nodes inside element, as the order in DOM
export function getTextNodesIn (node) {
  let textNodes = []

  (function pushIntoTextNodes (node) {
    if (node.nodeType === Node.TEXT_NODE) {
      textNodes.push(node)
      return
    }
    else {
      for (let i = 0; i < node.childNodes.length; ++i) {
        pushIntoTextNodes(node.childNodes[i])
      }
    }
  })(node)

  return textNodes
}
