<template>
  <div class="horizontal-scroller">
    <!-- must contain only one element -->
    <button
      class="horizontal-scroller__btn-prev"
      @click="onClickPrev"
    />
    <div
      ref="trackWrapper"
      class="horizontal-scroller__track-wrapper"
    >
      <div class="horizontal-scroller__track">
        <slot />
      </div>
    </div>
    <button
      class="horizontal-scroller__btn-next"
      @click="onClickNext"
    />
  </div>
</template>

<script>
import _inRange from 'lodash/inRange'

let Hammer = null
if (process.client) {
  Hammer = require('hammerjs')
}
export default {
  data () {
    return {
      childElement: null,
      manager: null,
      curX: 0,
      deltaX: 0,
    }
  },
  async mounted () {
    await this.$nextTick()
    this.initHammer()
    this.registerChildren()
  },
  beforeDestroy () {
    this.destroyHammer()
  },
  methods: {
    initHammer () {
      if (!Hammer) {
        return
      }
      if (this.manager instanceof Hammer.Manager === false) {
        this.manager = new Hammer.Manager(this.$el, {
          recognizers: [
            [Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL }],
          ],
        })
        this.manager.on('panstart', this.onPanStart)
        this.manager.on('panmove', this.onPanMove)
        this.manager.on('panend', this.onPanEnd)
      }
    },
    destroyHammer () {
      if (this.manager instanceof Hammer.Manager) {
        this.manager.destroy()
      }
    },
    registerChildren () {
      if (Array.isArray(this.$slots.default)) {
        this.childElement = this.$slots.default[0].elm
      }
    },
    enableTransition () {
      this.childElement
        .style
        .setProperty(
          'transition',
          'all 0.3s ease',
        )
    },
    disableTransition () {
      this.childElement
        .style
        .setProperty(
          'transition',
          'none',
        )
    },
    setTranslateX (x) {
      this.childElement
        .style
        .setProperty(
          'transform',
          `translateX(${x}px)`,
        )
    },
    getMaximumTranslateX () {
      return (this.childElement.offsetWidth - this.$refs.trackWrapper.offsetWidth) * -1
    },
    getScrollerTrackDOMRect () {
      return this.$refs.trackWrapper.getBoundingClientRect()
    },
    onPanStart () {
      this.disableTransition()
    },
    onPanMove (event) {
      this.setTranslateX(this.curX + event.deltaX)
    },
    onPanEnd (event) {
      const max = this.getMaximumTranslateX()
      const x = this.curX + event.deltaX
      this.curX = x > 0
        ? 0
        : Math.max(x, max)
      this.enableTransition()
      this.$nextTick(() => {
        this.setTranslateX(this.curX)
      })
    },
    onClickPrev () {
      const [el, index] = this.getFirstVisibleElement()
      if (index === 0) {
        return
      }
      if (el instanceof Node) {
        const { x, width } = this.getScrollerTrackDOMRect()
        const { x: childX, width: childWidth } = el.previousSibling.getBoundingClientRect()
        const diffX = x + width - childX - childWidth
        const translateX = Math.min(0, this.curX + diffX)
        this.curX = translateX
        this.setTranslateX(translateX)
      }
    },
    onClickNext () {
      const [el, index] = this.getLastVisibleElement()
      if (index === 0) {
        return
      }
      if (el instanceof Node) {
        const { x } = this.getScrollerTrackDOMRect()
        const { x: childX } = el.nextSibling.getBoundingClientRect()
        const max = this.getMaximumTranslateX()
        const diffX = x - childX
        const translateX = Math.max(this.curX + diffX, max)
        this.curX = translateX
        this.setTranslateX(translateX)
      }
    },
    getVisibleElement (childNodes) {
      const { x, width } = this.getScrollerTrackDOMRect()
      let result
      let i = -1
      while (!result) {
        i++
        const node = childNodes[i]
        const { x: childX, width: childWidth } = node.getBoundingClientRect()
        const isVisible = _inRange(childX, x, x + width)
          && _inRange(childX + childWidth, x, x + width)
        if (isVisible) {
          result = node
        }
      }
      return [result, i]
    },
    getFirstVisibleElement () {
      return this.getVisibleElement(Array.from(this.childElement.childNodes))
    },
    getLastVisibleElement () {
      return this.getVisibleElement(Array.from(this.childElement.childNodes).reverse())
    },
  },
}
</script>

<style lang="scss" scoped>
@use "./HorizontalScroller.scss";
</style>
