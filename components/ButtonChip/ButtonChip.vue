<template>
  <button
    :class="{
      'button-chip': true,
      'button-chip--dark': $theme.dark,
      'button-chip--active': mActive
    }"
    :style="[mActive && activeColor && { color: activeColor }]"
    v-on="listeners"
  >
    <span class="button-chip__text">
      <slot />
    </span>
  </button>
</template>

<script>
import { chipGroup } from '../ButtonChipGroup/chip-group.symbol'
export default {
  inject: {
    $chipGroup: {
      from: chipGroup,
      default: () => null,
    },
  },
  props: {
    active: {
      type: Boolean,
    },
    activeColor: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      mActive: false,
    }
  },
  computed: {
    listeners () {
      return {
        ...this.$listeners,
        click: this.onClick,
      }
    },
  },
  watch: {
    active: {
      immediate: true,
      handler (v) {
        this.mActive = v
      },
    },
  },
  methods: {
    onClick () {
      this.mActive = !this.mActive
      if (this.mActive && this.$chipGroup) {
        this.$chipGroup.setActive(this)
      }
      this.$emit('click')
    },
  },
}
</script>

<style lang="scss" scoped>
@use "./ButtonChip.scss";
</style>
