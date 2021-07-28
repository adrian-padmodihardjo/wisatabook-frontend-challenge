<template>
  <div class="images-grid">
    <figure
      v-for="(img, i) in images"
      :key="i"
      class="images-grid__item"
      :style="gridItemStyles"
    >
      <img
        :src="img.src"
        :alt="img.caption"
      >
    </figure>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => null,
    },
    column: {
      type: [String, Number],
      default: 3,
    },
  },
  computed: {
    gridItemStyles () {
      const col = typeof (+this.column) === 'number'
        ? this.column
        : 3
      return {
        flexBasis: `${100 / Math.max(col, 1)}%`,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@use "./ImagesGrid.scss";
</style>
