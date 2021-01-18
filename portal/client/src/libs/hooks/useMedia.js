import { useState, useEffect } from 'react'

const desktop = 960
const tablet = 769

const MediaSizes = {
  MOBILE: `(nax-width: ${tablet - 1}px)`,
  TABLET: `(min-width: ${tablet}px)`,
  DESKTOP: `(min-width: ${desktop}px)`,
}

// Bulma breakpoints reference

// // The container horizontal gap, which acts as the offset for breakpoints
// $gap: 32px !default
// // 960, 1152, and 1344 have been chosen because they are divisible by both 12 and 16
// $tablet: 769px !default
// // 960px container + 4rem
// $desktop: 960px + (2 * $gap) !default
// // 1152px container + 4rem
// $widescreen: 1152px + (2 * $gap) !default
// $widescreen-enabled: true !default
// // 1344px container + 4rem
// $fullhd: 1344px + (2 * $gap) !default
// $fullhd-enabled: true !default

// Hook
function useMedia(queries, values, defaultValue) {
  // Array containing a media query list for each query
  const mediaQueryLists = queries.map((q) => window.matchMedia(q))

  // Function that gets value based on matching media query
  const getValue = () => {
    // Get index of first media query that matches
    const index = mediaQueryLists.findIndex((mql) => mql.matches)
    // Return related value or defaultValue if none
    return typeof values[index] !== 'undefined' ? values[index] : defaultValue
  }

  // State and setter for matched value
  const [value, setValue] = useState(getValue)

  useEffect(
    () => {
      // Event listener callback
      // Note: By defining getValue outside of useEffect we ensure that it has ...
      // ... current values of hook args (as this hook callback is created once on mount).
      const handler = () => setValue(getValue)
      // Set a listener for each media query with above handler as callback.
      mediaQueryLists.forEach((mql) => mql.addListener(handler))
      // Remove listeners on cleanup
      return () => mediaQueryLists.forEach((mql) => mql.removeListener(handler))
    },
    [] // Empty array ensures effect is only run on mount and unmount
  )

  return value
}

export { useMedia as default, MediaSizes }
