<template>
  <ImageCarousel
    width="900px"
    max-width="85vw"
    v-bind="$props"
    v-on="$listeners"
  >
    <template #item="{ item }">
      <LazyImage
        class="prop-gallery-carousel__img"
        :alt="item.caption"
        :srcset="item.srcset"
      />
    </template>
  </ImageCarousel>
</template>

<script>
import { ImageCarousel } from '@/components/ImageCarousel'
import LazyImage from '../LazyImage/LazyImage.vue'

export default {
  components: {
    ImageCarousel,
    LazyImage,
  },
  extends: ImageCarousel,
}
</script>
