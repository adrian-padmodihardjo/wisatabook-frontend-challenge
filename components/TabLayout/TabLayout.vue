<template>
  <div
    :class="{
      'tab-layout': true,
      'tab-layout--dark': $theme.dark
    }"
  >
    <i
      ref="slider"
      class="tab-layout__slider"
    />
    <div
      ref="track"
      class="tab-layout__track"
    >
      <i class="tab-layout__spacer" />
      <slot />
      <i class="tab-layout__spacer" />
    </div>
  </div>
</template>

<script>
import _throttle from 'lodash/throttle'
import { tabLayout } from './tab-layout.symbol'
export default {
  provide () {
    return {
      [tabLayout]: this,
    }
  },
  model: {
    prop: 'activeTab',
    event: 'change',
  },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    activeTab: {
      default: undefined,
    },
  },
  data () {
    return {
      activeTabElement: null,
    }
  },
  async mounted () {
    await this.$nextTick()
    window.addEventListener('resize', this.onWindowResize)
    this.syncActiveTabElement(this.activeTab)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onWindowResize)
  },
  methods: {
    onWindowResize: _throttle(function () {
      if (this.activeTabElement) {
        this.activateSlider(this.activeTabElement)
      }
    }, 1000 / 60),
    syncActiveTabElement (activeTabValue) {
      let el
      if (Array.isArray(this.$children)) {
        for (const c of this.$children) {
          if (c.value === activeTabValue) {
            el = c.$el || c
            break
          }
        }
      }
      this.activeTabElement = el
      if (el) {
        this.activateSlider(el)
      }
    },
    getSliderTrackRect () {
      return this.$refs.track?.getBoundingClientRect()
    },
    setSliderStyleProperty (property, value) {
      const { slider } = this.$refs
      if (!slider) {
        return
      }
      return slider.style.setProperty(property, value)
    },
    async activateSlider (targetEl, { animate = false } = {}) {
      const sliderRect = this.getSliderTrackRect()
      const rect = targetEl?.getBoundingClientRect?.()
      if (!animate) {
        this.setSliderStyleProperty('transition', 'none')
      } else {
        this.setSliderStyleProperty('transition', 'all 0.3s ease')
      }
      await this.$nextTick()
      this.setSliderStyleProperty('opacity', 1)
      this.setSliderStyleProperty('left', `${rect.x - sliderRect.x}px`)
      this.setSliderStyleProperty('width', `${rect.width}px`)
    },
    setActive (child) {
      const el = child.$el || child
      this.activeTabElement = el
      this.activateSlider(el, { animate: true })

      if (Array.isArray(this.$children)) {
        this.$children.forEach((c) => {
          c.mActive = c === child
        })
        this.$emit('change', child.value)
      }
    },
    setInactive () {
      if (Array.isArray(this.$children) && this.$children.length > 1) {
        this.activeTabElement = null
        this.$children.forEach((c) => {
          c.mActive = false
        })
        this.$emit('change', undefined)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@use "./TabLayout.scss";
</style>
