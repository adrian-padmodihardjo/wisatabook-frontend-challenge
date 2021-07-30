<template>
  <div class="property-gallery">
    <ImagesGrid
      class="property-gallery__images-grid"
      :column="cols"
      :images="images"
    />
    <hr class="property-gallery__divider">
    <LazyScrollObserver
      :options="{
        rootMargin: '0px 0px 56px 0px'
      }"
      @reach:bottom="onReachBottom"
    />
  </div>
</template>

<script>
import { ImagesGrid } from '@/components/ImagesGrid'
import { mockApiClient } from '@/api-client/main.mock'
import { getImages } from '@/api/property'
import { LazyScrollObserver } from '@/components/LazyScrollObserver'

const mock = mockApiClient()

export default {
  components: {
    ImagesGrid,
    LazyScrollObserver,
  },
  props: {
    propertyId: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      default: undefined,
    },
  },
  data () {
    return {
      imageObjectsCache: {},
      images: [],
      cols: 3,
      rows: 3,
      currentPage: 0,
    }
  },
  watch: {
    caption: {
      immediate: false,
      handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.refreshImages()
        }
      },
    },
  },
  methods: {
    getImageIdentifier (imgData) {
      return imgData?.size_lg
    },
    async onReachBottom (entry, observer) {
      await this.appendImages(this.currentPage + 1)
    },
    async refreshImages () {
      const newImages = await this.fetchImages(1)
      this.images = newImages
      this.currentPage = 1
    },
    async appendImages (page) {
      const newImages = await this.fetchImages(page)
      this.images.push(...newImages)
      this.currentPage = page
    },
    async fetchImages (page) {
      const limit = this.cols * this.rows
      const { data } = await getImages.call(mock, this.propertyId, {
        caption: this.caption,
        page,
        limit,
      })
      if (Array.isArray(data) && data.length) {
        return data.map(img => ({
          // shouldn't refer to size_xs
          id: img.size_xs,
          srcset: this.transformToSourceSet(img),
        }))
      }
      return []
    },
    transformToSourceSet (imgObject) {
      // eslint-disable-next-line camelcase
      const { size_xs, size_sm, size_lg } = imgObject
      return [
        { src: size_xs, minWidth: 0 },
        { src: size_sm, minWidth: 0 },
        { src: size_lg, minWidth: parseInt(this.$theme.breakpoints.md) },
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
@use "./PropertyGallery.scss";
</style>
