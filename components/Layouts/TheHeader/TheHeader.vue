<template>
  <header
    :class="{
      'the-header': true,
      'the-header--shadowed': isShadowed,
    }"
  >
    <ResponsiveContainer class="the-header__container">
      <slot />
    </ResponsiveContainer>
  </header>
</template>

<script>
import _throttle from 'lodash/throttle'
import { ResponsiveContainer } from '../ResponsiveContainer'
export default {
  components: {
    ResponsiveContainer,
  },
  data () {
    return {
      isShadowed: false,
    }
  },
  mounted () {
    window.addEventListener('scroll', this.listenToScrollEvent)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.listenToScrollEvent)
  },
  methods: {
    listenToScrollEvent: _throttle(
      function () {
        const { scrollY } = window
        this.isShadowed = scrollY > 0
      },
      150,
      { leading: false, trailing: true },
    ),
  },
}
</script>

<style lang="scss" scoped>
@use "./TheHeader.scss";
</style>
