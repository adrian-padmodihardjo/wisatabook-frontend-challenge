<template>
  <button
    :class="{
      'tab-layout-item': true,
      'tab-layout-item--dark': $theme.dark,
      'tab-layout-item--active': mActive
    }"
    @click="onClick"
  >
    <slot
      v-bind="{
        iconClass: 'tab-layout-item__icon',
        labelClass: 'tab-layout-item__label'
      }"
    />
  </button>
</template>

<script>
import { tabLayout } from '../TabLayout/tab-layout.symbol'
export default {
  inject: {
    $tabLayout: {
      from: tabLayout,
      default: () => null,
    },
  },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    active: {
      default: false,
    },
    // eslint-disable-next-line vue/require-prop-types
    value: {
      default: undefined,
    },
  },
  data () {
    return {
      mActive: undefined,
    }
  },
  watch: {
    active: {
      immediate: true,
      handler (v) {
        if (v === this.value) {
          this.mActive = true
          return
        }
        if (typeof v === 'boolean') {
          this.mActive = v
          return
        }
        this.mActive = !!v
      },
    },
  },
  methods: {
    onClick () {
      this.mActive = !this.mActive
      if (this.$tabLayout) {
        if (this.mActive) {
          this.$tabLayout.setActive(this)
        } else {
          this.$tabLayout.setInactive()
        }
      }
      this.$emit('click')
    },
  },
}
</script>

<style lang="scss" scoped>
@use "./TabLayoutItem.scss";
</style>
