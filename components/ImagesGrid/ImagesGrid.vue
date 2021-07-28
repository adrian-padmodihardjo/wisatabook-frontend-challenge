<template>
  <div class="images-grid">
    <figure
      v-for="(img, i) in images"
      :key="i"
      :class="{
        'images-grid__item': true,
        'images-grid__item--loading': isLoadingImage(i)
      }"
      :style="gridItemStyles"
    >
      <img
        :src="img.src"
        :alt="img.caption"
        @load="onImageLoaded(i)"
      >
      <i class="images-grid__item__spinner" />
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
