// extract just the first word from a sentence (ie. a string containing spaces)
export const firstWord = (value) => {
  if (!value) return ''
  value = value.toString()
  let space = value.indexOf(' ')
  if (space < 0) { return value }
  return value.substr(0, space)
}

// uppercase first letter in a string
export const ucFirst = (value) => {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
}

// divide a sentence at the last space when a max length is given
export const sentenceMax = (value, maxLength, placeholder) => {
  if (!placeholder) placeholder = ''
  if (!value) return placeholder

  if (value.length <= maxLength) return value

  value = value.toString().substr(0, maxLength)
  let cut = value.lastIndexOf(' ')
  if (cut > 0) value = value.substr(0, cut)
  return value + ' ...'
}

// for text values with multiple lines, return only a maximum value of lines
export const maxLines = (value, maxLines) => {
  if (!value) return ''

  let val = value.split('\n')
  if (val.length <= maxLines + 1) return value

  let newVal = ''
  for (let index = 0; index < maxLines; index++) {
    if (val[index] && val[index].trim() === '') maxLines += 1
    else newVal += (index > 0 ? '\n' : '') + val[index]
  }
  return newVal + (' ...')
}
