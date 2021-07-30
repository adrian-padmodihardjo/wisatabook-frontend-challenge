<template>
  <div class="lazy-img">
    <template v-for="set in srcset">
      <img
        v-if="canRenderImage(set)"
        ref="imgElements"
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
 * @property {number} minWidth - image will be rendered on min-width
 * @property {boolean} onVisibleOnly - image will be rendered only when visible within viewport
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
      intersectionObserver: null,
      isVisible: false,
    }
  },
  async mounted () {
    await this.$nextTick()
    this.watchSrcSet()
  },
  methods: {
    watchSrcSet () {
      this.$watch(
        function () {
          return this.srcset
        },
        function () {
          this.destroyObserver()
          this.initObserver()
        },
        { immediate: true, deep: true },
      )
    },
    observerCallback (entries) {
      const entry = entries[0]
      this.isVisible = entry.isIntersecting
    },
    initObserver () {
      this.intersectionObserver = new IntersectionObserver(this.observerCallback, {
        root: null,
        rootMargin: '0px 0px 0px 0px',
        threshold: 0.5,
      })
      this.intersectionObserver.observe(this.$el)
    },
    destroyObserver () {
      if (this.intersectionObserver instanceof IntersectionObserver) {
        this.intersectionObserver.disconnect()
        this.intersectionObserver = null
      }
    },
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
      if (this.isImageLoaded(imageSet)) {
        return true
      }
      if (imageSet.onVisibleOnly) {
        return this.isVisible
          && this.isImageMinWidthMatched(imageSet)
      }
      return this.isImageMinWidthMatched(imageSet)
    },
  },
}
</script>

<style lang="scss" scoped>
@use "./LazyImage.scss";
</style>
