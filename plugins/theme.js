import Vue from 'vue'
import breakpoints from '@/assets/stylesheet/_breakpoints.scss'

// set theme as observable, instead of using Vuex
// to minimize bundle size
export const theme = Vue.observable({
  dark: false,
  breakpoint: {
    sm: false,
    md: false,
    lg: false,
    xl: false,
  },
  breakpointConfig: breakpoints,
  viewportWidth: Infinity,
})

// expose observable value mutation
export function setDarkMode (dark) {
  const { classList } = document.body
  const className = 'theme--dark'
  const doSwitchOn = dark
    && !classList.contains(className)
  const doSwitchOff = !dark
    && classList.contains(className)

  if (doSwitchOn) {
    classList.add(className)
  } else if (doSwitchOff) {
    classList.remove(className)
  }

  theme.dark = dark
}

export function syncBreakpoint () {
  if (!window) {
    return
  }
  for (const [name, minWidth] of Object.entries(breakpoints)) {
    const matched = window.innerWidth >= parseInt(minWidth)
    theme.breakpoint[name] = matched
  }
  theme.viewportWidth = window.innerWidth
}

// use provide/inject for observable theme object
export default function ({ app }) {
  const THEME = Symbol('theme')

  // theme is injected by all Vue instances
  Vue.mixin({
    inject: {
      $theme: {
        from: THEME,
        default: () => {},
      },
    },
  })

  // theme is provided by root Vue instance
  app.mixins = app.mixins || []
  app.mixins.push({
    provide () {
      return {
        [THEME]: theme,
      }
    },
  })

  if (process.client || process.browser) {
    syncBreakpoint()
    window.addEventListener('resize', syncBreakpoint)
  }
}
