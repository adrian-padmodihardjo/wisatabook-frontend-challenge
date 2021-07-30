<template>
  <div class="lazy-img">
    <template v-for="set in srcset">
      <img
        v-if="canRenderImage(set)"
        :key="set.src"
        :src="set.src"
        class="lazy-img__image"
        @load="onImageLoaded(set)"
      >
    </template>
  </div>
</template>

<script>
/**
 * @typedef {object} ImageSet
 * @property {string} src - image src
 * @property {number} minWidth - image will be shown on min-width
 */
export default {
  props: {
    /**
     * @type {Array<ImageSet>}
     */
    srcset: {
      type: Array,
      default: () => [],
    },
    alt: {
      type: String,
      default: 'image',
    },
  },
  data () {
    return {
      loadedImages: [],
    }
  },
  methods: {
    isImageLoaded (imageSet) {
      return this.loadedImages.includes(imageSet.src)
    },
    isImageMinWidthMatched (imageSet) {
      return this.$theme.viewportWidth >= imageSet.minWidth
    },
    onImageLoaded (imageSet) {
      this.loadedImages.push(imageSet.src)
    },
    canRenderImage (imageSet) {
      return this.isImageLoaded(imageSet)
        || this.isImageMinWidthMatched(imageSet)
    },
  },
}
</script>

<style lang="scss" scoped>
@use "./LazyImage.scss";
</style>
