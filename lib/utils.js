// Variation should be an array with 3 booleans,
// to indicate which primary colors we should lock
// for example: [true, false, false] will generate a random shade of red
export const generateRandomColor = ([lockRed, lockBlue, lockGreen]) => {
  return `#${lockRed || randHex(2)}${lockBlue || randHex(2)}${
    lockGreen || randHex(2)
  }`
}

export const randNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const randHex = (size) => {
  return [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('')
}
