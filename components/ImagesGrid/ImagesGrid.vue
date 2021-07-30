<template>
  <div class="images-grid">
    <figure
      v-for="(img, i) in images"
      :key="img.actual"
      :class="{
        'images-grid__item': true,
        'images-grid__item--loading': isLoadingImage(i)
      }"
      :style="gridItemStyles"
    >
      <LazyImage
        class="images-grid__item__img"
        :alt="img.caption"
        :preview="img.preview"
        :actual="img.actual"
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
  data () {
    return {
      loadedImages: [],
    }
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
  methods: {
    isLoadingImage (imageIndex) {
      return !this.loadedImages.includes(imageIndex)
    },
    onImageLoaded (imageIndex) {
      this.loadedImages.push(imageIndex)
    },
  },
}
</script>

<style lang="scss" scoped>
@use "./ImagesGrid.scss";
</style>
