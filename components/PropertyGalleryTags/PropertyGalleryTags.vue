<template>
  <div class="property-gallery-tags">
    <HorizontalScroller>
      <ButtonChipGroup @change="onActiveChipChanged">
        <ButtonChip
          v-for="(tag, i) in tags"
          :key="i"
          :value="tag"
          :active="tag === activeChip"
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

const ALL_IMAGES = 'ALL'
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
  data () {
    return {
      activeChip: ALL_IMAGES,
    }
  },
  computed: {
    tags () {
      const captions = propertyDetails.images.reduce((obj, img) => {
        obj[img.caption] = ''
        return obj
      }, {})

      return [ALL_IMAGES, ...Object.keys(captions)]
    },
  },
  methods: {
    onActiveChipChanged (activeChip) {
      this.activeChip = activeChip === undefined
        ? ALL_IMAGES
        : activeChip
      this.$emit('change', activeChip === ALL_IMAGES ? undefined : activeChip)
    },
  },
}
</script>

<style lang="scss" scoped>
@use "./PropertyGalleryTags.scss";
</style>
