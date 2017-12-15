export const firstWord = (value) => {
  let space = value.indexOf(' ')
  if (space < 0) { return value }
  return value.substr(0, space)
}

export const ucFirst = (value) => {
  return value.charAt(0).toUpperCase() + value.substr(1)
}
