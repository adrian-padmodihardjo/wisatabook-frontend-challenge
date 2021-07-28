<template>
  <div class="button-chip-group">
    <slot />
  </div>
</template>

<script>
import { chipGroup } from './chip-group.symbol'
export default {
  provide () {
    return {
      [chipGroup]: this,
    }
  },
  methods: {
    setActive (child) {
      if (Array.isArray(this.$children)) {
        this.$children.forEach((c) => {
          c.mActive = c === child
        })
        this.$emit('change', child.value)
      }
    },
    setInactive () {
      if (Array.isArray(this.$children)) {
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
@use "./ButtonChipGroup.scss";
</style>
