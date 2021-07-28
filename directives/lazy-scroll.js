/**
 * @typedef {Function} OnIntersectCallback
 * @returns {boolean} - whether observer must be restarted or not
 */

/**
 * @param {OnIntersectCallback} onIntersect
 * @returns {IntersectionObserverCallback}
 */
function observerCallback (onIntersect) {
  return async function (entries, observer) {
    const entry = entries[0]
    if (!entry.isIntersecting || entry.intersectionRatio < 0.8) {
      return
    }
    observer.unobserve(entry.target)
    let shouldRestart = onIntersect()
    if (shouldRestart instanceof Promise) {
      shouldRestart = await shouldRestart
    }
    if (shouldRestart) {
      observer.observe(entry.target)
    }
  }
}

/**
 * Callback can be provided using binding.value.
 * Callback will be invoked when scroll (almost) reached to the bottom.
 * @See https://vuejs.org/v2/guide/custom-directive.html
 */
export const lazyScroll = function (el, binding) {
  /**
   * target is the observed element,
   * put at the bottom of component.
   */
  const target = document.createElement('div')
  el.append(target)

  if (el.observer instanceof IntersectionObserver === false) {
    const cb = observerCallback(binding.value)
    el.observer = new IntersectionObserver(cb, {
      rootMargin: '0px 0px 320px 0px',
    })
  }
  el.observer.observe(target)
}
