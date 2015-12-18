export const HIGHLIGHT_COMMON_CSS_CLASS = 'leavenote-highlight'

const HIGHLIGHT_UNIQUE_CSS_CLASS_REG = new RegExp(
  `^${HIGHLIGHT_COMMON_CSS_CLASS}-\\w+$`
)

export function parseHighlightUniqueCssClass (highlightUniqueCssClass) {
  return {
    highlightId: highlightUniqueCssClass.slice(
      HIGHLIGHT_COMMON_CSS_CLASS.length + 1
    ),
  }
}

export function formatToHighlightUniqueCssClass ({highlightId}) {
  return `${HIGHLIGHT_COMMON_CSS_CLASS}-${highlightId}`
}

export function isHighlightUniqueCssClass (className) {
  return HIGHLIGHT_UNIQUE_CSS_CLASS_REG.test(className)
}

let {toString: arrProtoToString} = Array.prototype

// @param {DOMTokenList} classList
// @return {string}
export function extractHighlightUniqueCssClass (classList) {
  for (let i = 0; i < classList.length; ++i) {
    if (isHighlightUniqueCssClass(classList.item(i))) {
      return classList.item(i)
    }
  }
  return ''
}
