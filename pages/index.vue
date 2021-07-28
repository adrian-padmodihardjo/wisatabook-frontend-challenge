<template>
  <div>
    <TheHeader />
    <ResponsiveContainer>
      <PropertyGalleryTags
        property-id="9000248525"
        style="margin: 0 -12px; padding: 16px 0;"
        @change="caption = $event"
      />
      <PropertyGallery
        property-id="9000248525"
        :caption="caption"
      />
    </ResponsiveContainer>
  </div>
</template>

<script>
import { TheHeader } from '@/components/Layouts/TheHeader'
import { ResponsiveContainer } from '@/components/Layouts/ResponsiveContainer'
import { PropertyGallery } from '@/components/PropertyGallery'
import { PropertyGalleryTags } from '@/components/PropertyGalleryTags'
export default {
  components: {
    TheHeader,
    ResponsiveContainer,
    PropertyGallery,
    PropertyGalleryTags,
  },
  data () {
    return {
      caption: undefined,
    }
  },
}
</script>
