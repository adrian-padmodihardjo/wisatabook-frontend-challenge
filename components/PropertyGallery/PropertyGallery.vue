<template>
  <div
    v-lazy-scroll="fetchImages"
    class="property-gallery"
  >
    <ImagesGrid
      class="property-gallery__images-grid"
      :column="cols"
      :images="imagesToShow"
    />
  </div>
</template>

<script>
import { ImagesGrid } from '@/components/ImagesGrid'
import { mockApiClient } from '@/api-client/main.mock'
import { getImages } from '@/api/property'
import { lazyScroll } from '@/directives/lazy-scroll'

const mock = mockApiClient()

export default {
  components: {
    ImagesGrid,
  },
  directives: {
    lazyScroll,
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
      return images.map((obj) => {
        return {
          caption: obj.caption,
          src: obj.size_lg,
        }
      })
    },
  },
  watch: {
    caption: {
      immediate: false,
      handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.resetImages()
          this.fetchImages()
        }
      },
    },
  },
  methods: {
    resetImages () {
      this.currentPage = 0
      this.images = []
    },
    // this method must return boolean,
    // to determine whether intersection observer
    // should be restarted or not
    async fetchImages () {
      this.currentPage += 1
      const limit = this.cols * this.rows
      const { data } = await getImages.call(mock, this.propertyId, {
        page: this.currentPage,
        caption: this.caption,
        limit,
      })
      if (Array.isArray(data) && data.length) {
        this.images.push(...data)

        // when array size is less than limit,
        // assume that there's no data available within next page
        return data.length === limit
      } else {
        return false
      }
    },
  },
}
</script>
