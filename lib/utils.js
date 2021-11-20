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

// The top limit has to be below 16
// use this with caution, not validating this now
export const randHex = (size, topLimmit = 10) => {
  return [...Array(size)]
    .map(() => Math.floor(Math.random() * topLimmit).toString(16))
    .join('')
}

export const formatRouteTime = (routeTime) => {
  // do this properly after
  if (typeof routeTime !== 'string') {
    routeTime = routeTime.toString()
  }
  const minutes = routeTime.slice(-2)
  const hours = routeTime.slice(0, routeTime.length - 2)
  return `${hours}:${minutes}`
}
