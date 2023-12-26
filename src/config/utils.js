export const escapeRegExp = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\$|#\s]/g, '\\$&')
}