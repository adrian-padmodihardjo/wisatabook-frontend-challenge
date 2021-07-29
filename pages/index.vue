<template>
  <div>
    <TheHeader />
    <ResponsiveContainer>
      <PropertyProfileHeader
        :property-id="propertyId"
        style="margin: 24px 0; padding: 24px 0; margin-bottom: 40px;"
      />
      <PropertyGalleryCategories />
      <PropertyGalleryTags
        :property-id="propertyId"
        style="margin: 0 -12px; padding: 16px 0;"
        @change="caption = $event"
      />
      <PropertyGallery
        :property-id="propertyId"
        :caption="caption"
      />
    </ResponsiveContainer>
  </div>
</template>

<script>
import { TheHeader } from '@/components/Layouts/TheHeader'
import { ResponsiveContainer } from '@/components/Layouts/ResponsiveContainer'
import { PropertyProfileHeader } from '@/components/PropertyProfileHeader'
import { PropertyGalleryCategories } from '@/components/PropertyGalleryCategories'
import { PropertyGallery } from '@/components/PropertyGallery'
import { PropertyGalleryTags } from '@/components/PropertyGalleryTags'
export default {
  components: {
    TheHeader,
    ResponsiveContainer,
    PropertyProfileHeader,
    PropertyGalleryCategories,
    PropertyGallery,
    PropertyGalleryTags,
  },
  data () {
    return {
      propertyId: '9000248525',
      caption: undefined,
    }
  },
}
</script>
