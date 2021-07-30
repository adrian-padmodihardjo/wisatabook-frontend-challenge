<template>
  <div class="property-gallery">
    <ImagesGrid
      class="property-gallery__images-grid"
      :column="cols"
      :images="imagesToShow"
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
      images: [],
      cols: 3,
      rows: 3,
      currentPage: 0,
    }
  },
  computed: {
    imagesToShow () {
      const { images } = this
      if (!Array.isArray(images)) {
        return []
      }

      const { breakpoint } = this.$theme
      const sizeToUse = breakpoint.md
        ? 'size_lg'
        : 'size_sm'
      return images.map((obj) => {
        return {
          caption: obj.caption,
          preview: obj.size_xs,
          actual: obj[sizeToUse],
        }
      })
    },
    imagesCacheMap () {
      const { images } = this
      if (!Array.isArray(images)) {
        return {}
      }
      return images.reduce((obj, img, index) => {
        const id = this.getImageIdentifier(img)
        obj[id] = img
        return obj
      }, {})
    },
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
        return data.map((img) => {
          const id = this.getImageIdentifier(img)
          if (id in this.imagesCacheMap) {
            return this.imagesCacheMap[id]
          }
          return img
        })
      }
      return []
    },
  },
}
</script>

<style lang="scss" scoped>
@use "./PropertyGallery.scss";
</style>
