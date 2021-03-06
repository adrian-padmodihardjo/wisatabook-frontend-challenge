<template>
  <div class="property-gallery">
    <ImagesGrid
      class="property-gallery__images-grid"
      :column="cols"
      :items="images"
    >
      <template #item="{ item, itemIndex }">
        <LazyImage
          :alt="item.caption"
          :srcset="item.srcset"
          @click="onClickImage(item, itemIndex)"
        />
      </template>
    </ImagesGrid>
    <hr class="property-gallery__divider">
    <LazyScrollObserver
      ref="lazyScrollObserver"
      :options="{
        rootMargin: '0px 0px 56px 0px'
      }"
      @intersect="onObserverIntersect"
    />
    <FullscreenDialog v-model="showCarousel">
      <div class="property-gallery__carousel-wrapper">
        <PropertyGalleryCarousel
          v-model="activeCarouselItemIndex"
          :items="carouselImages"
          @change="onCarouselIndexChanged"
        />
      </div>
    </FullscreenDialog>
  </div>
</template>

<script>
import { ImagesGrid } from '@/components/ImagesGrid'
import { mockApiClient } from '@/api-client/main.mock'
import { getImages } from '@/api/property'
import { LazyScrollObserver } from '@/components/LazyScrollObserver'
import { LazyImage } from '../LazyImage'
import { FullscreenDialog } from '../FullscreenDialog'
import { PropertyGalleryCarousel } from '../PropertyGalleryCarousel'

const mock = mockApiClient()

export default {
  components: {
    ImagesGrid,
    LazyImage,
    LazyScrollObserver,
    FullscreenDialog,
    PropertyGalleryCarousel,
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

      showCarousel: false,
      activeCarouselItemIndex: 0,
    }
  },
  computed: {
    carouselImages () {
      return this.images.map((img) => {
        // eslint-disable-next-line no-unused-vars
        const [xs, sm, lg] = img.srcset
        const srcset = [
          { ...sm, onVisibleOnly: false },
          { ...lg, minWidth: 350 },
        ]
        return {
          ...img,
          srcset,
        }
      })
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
    async onObserverIntersect () {
      await this.appendImages(this.currentPage + 1)
    },
    async refreshImages () {
      const newImages = await this.fetchImages(1)
      this.images = newImages
    },
    async appendImages (page) {
      const newImages = await this.fetchImages(page)
      this.images.push(...newImages)
    },
    async fetchImages (page) {
      const limit = this.cols * this.rows
      const { data } = await getImages.call(mock, this.propertyId, {
        caption: this.caption,
        page,
        limit,
      })
      if (Array.isArray(data) && data.length) {
        // if observer target still visible within viewport,
        // it means some more images need to be fetched
        this.$refs.lazyScrollObserver.reobserve()
        this.currentPage = page
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
        {
          src: size_sm,
          minWidth: 350,
          onVisibleOnly: true,
        },
        {
          src: size_lg,
          minWidth: parseInt(this.$theme.breakpointConfig.md),
          onVisibleOnly: true,
        },
      ]
    },
    onClickImage (item, itemIndex) {
      this.activeCarouselItemIndex = itemIndex
      this.showCarousel = true
    },
    onCarouselIndexChanged (newIndex) {
      if ((newIndex + 2) === this.images.length) {
        this.appendImages(this.currentPage + 1)
      }
      return []
    },
  },
}
</script>

<style lang="scss" scoped>
@use "./PropertyGallery.scss";
</style>
