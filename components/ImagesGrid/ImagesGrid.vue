<template>
  <div class="images-grid">
    <figure
      v-for="img in images"
      :key="img.id"
      class="images-grid__item"
      :style="gridItemStyles"
    >
      <LazyImage
        class="images-grid__item__img"
        :alt="img.caption"
        :srcset="img.srcset"
        blur
      />
      <i class="images-grid__item__spinner" />
    </figure>
  </div>
</template>

<script>
import { LazyImage } from '@/components/LazyImage'
export default {
  components: {
    LazyImage,
  },
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
