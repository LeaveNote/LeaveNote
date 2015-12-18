// @function get `HighlightedTextNode` object from selection
// @param {Selection} selection See doc:
// https://developer.mozilla.org/en-US/docs/Web/API/Selection
// @exception {Error} See `getHighlightedTextNode.ERROR_MAP` for the map from
// error code to error message
// @return {HighlightedTextNode} See doc:
// https://github.com/LeaveNote/LeaveNote/issues/4
export function getHighlightedTextNode (selection) {
  if (selection.isCollapsed) {
    throw new Error(getHighlightedTextNode.ERROR_MAP['10'])
  }

  // @var {Range} range See doc:
  // https://developer.mozilla.org/en-US/docs/Web/API/Range
  let range = selection.getRangeAt(0)

  // @var {Node} commonAncestorNode
  let commonAncestorNode = range.commonAncestorContainer
  if (!commonAncestorNode) {
    throw new Error(getHighlightedTextNode.ERROR_MAP['20'])
  }
  // @var {Element} commonAncestorElement
  let commonAncestorElement = commonAncestorNode
  while (commonAncestorNode.nodeType !== Node.ELEMENT_NODE) {
    commonAncestorNode = commonAncestorNode.parentNode
    if (!commonAncestorElement) {
      throw new Error(getHighlightedTextNode.ERROR_MAP['20'])
    }
  }

  const NON_WHITESPACE = /\S/
  let allTextNodes = getTextNodesIn(commonAncestorElement, {
    isDeepIntoNode (node) {
      return getHighlightedTextNode
        .EXCLUDE_TAG_NAMES
        .indexOf(node.tagName) === -1
    },
    isPickTextNode (textNode) {
      // not pick text node which only contain whitespace characters
      return NON_WHITESPACE.test(textNode.nodeValue)
    },
  })
  // if `range.startContainer` is not text node, use the first text node in
  // `range.startContainer`
  let rangeStartTextNode = range.startContainer.nodeType === Node.TEXT_NODE ?
    range.startContainer :
    getTextNodesIn(range.startContainer).shift()
  let rangeEndTextNode = range.endContainer.nodeType === Node.TEXT_NODE ?
    range.endContainer :
    getTextNodesIn(range.endContainer).pop()
  let highlightedTextNodes = allTextNodes.slice(
    allTextNodes.indexOf(rangeStartTextNode),
    allTextNodes.indexOf(rangeEndTextNode)
  )

  return {
    cae: commonAncestorElement,
    htn: highlightedTextNodes,
    fhtno: range.startOffset,
    lhtno: range.endOffset,
  }
}

getHighlightedTextNode.EXCLUDE_TAG_NAMES = [
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

// Array index is error code, array item is error message,
// so item value can be changed, but make sure keep the same meaning.
getHighlightedTextNode.ERROR_MAP = {
  '10': 'selection is collapsed',
  '20': 'no common ancestor element',
}

// @param {Node} node
// @param {Object} [options]
// @param {Function} [options.isPickTextNode=returnTrue]
// @param {Function} [options.isDeepIntoNode=returnTrue]
// @return {Text[]} All text nodes inside `node`, as the order in DOM.
export function getTextNodesIn (
  node,
  {
    isPickTextNode = returnTrue,
    isDeepIntoNode = returnTrue,
  } = {}
) {
  let textNodes = []

  ;(function pushIntoTextNodes (node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (isPickTextNode(node)) textNodes.push(node)
      else return
    }
    else {
      if (isDeepIntoNode(node)) {
        for (let i = 0; i < node.childNodes.length; ++i) {
          pushIntoTextNodes(node.childNodes[i])
        }
      }
      else return
    }
  })(node)

  return textNodes
}

function returnTrue () {return true}
