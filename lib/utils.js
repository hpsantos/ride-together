import { useEffect, useState } from 'react'

const arrayRandom = (array) => array[Math.floor(Math.random() * array.length)]

// Variation should be an array with 3 booleans,
// to indicate which primary colors we should lock
// for example: [true, false, false] will generate a random shade of red
export const generateRandomColor = ([lockRed, lockBlue, lockGreen]) => {
  return `#${lockRed || randHex(2)}${lockBlue || randHex(2)}${
    lockGreen || randHex(2)
  }`
}

export const getRandomRouteType = () => arrayRandom(['Car', 'Foot'])

export const getRandomRouteDistance = () =>
  arrayRandom(['2,42 km', '3,70 km', '1,12 km', '6,72 km'])

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

export const getFullName = (username) => {
  return {
    mquental: 'Márcio Quental',
    cmarques: 'Celso Marques',
    hsantos: 'Helder Santos',
  }[username]
}

export const useDebounce = (value, delay) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler)
      }
    },
    [value, delay] // Only re-call effect if value or delay changes
  )
  return debouncedValue
}
