<template>
  <div class="property-gallery-tags">
    <HorizontalScroller>
      <ButtonChipGroup>
        <ButtonChip
          v-for="(tag, i) in tags"
          :key="i"
          active-color="#1a73e8"
        >
          {{ tag }}
        </ButtonChip>
      </ButtonChipGroup>
    </HorizontalScroller>
  </div>
</template>

<script>
import { ButtonChipGroup } from '@/components/ButtonChipGroup'
import { ButtonChip } from '@/components/ButtonChip'
import { HorizontalScroller } from '@/components/HorizontalScroller'
import propertyDetails from '@/mocks/property-details.mock.json'
export default {
  components: {
    HorizontalScroller,
    ButtonChipGroup,
    ButtonChip,
  },
  props: {
    propertyId: {
      type: String,
      required: true,
    },
  },
  computed: {
    tags () {
      const captions = propertyDetails.images.reduce((obj, img) => {
        obj[img.caption] = ''
        return obj
      }, {})

      return Object.keys(captions)
    },
  },
}
</script>

<style lang="scss" scoped>
@use "./PropertyGalleryTags.scss";
</style>
