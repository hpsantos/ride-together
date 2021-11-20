// Variation should be an array with 3 booleans,
// to indicate which primary colors we should lock
// for example: [true, false, false] will generate a random shade of red
export const generateRandomColor = ([lockRed, lockBlue, lockGreen]) => {
  var red = lockRed ? "FF" : randHex(2)
  var green = lockGreen ? "FF" : randHex(2)
  var blue = lockBlue ? "FF" : randHex(2)
  return `#${red}${green}${blue}`
}

export const randNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const randHex = (size) => {
  return [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("")
}
