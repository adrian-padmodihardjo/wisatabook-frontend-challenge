<template>
  <div>
    <TheHeader />
    <ResponsiveContainer>
      <PropertyGallery property-id="9000248525" />
    </ResponsiveContainer>
  </div>
</template>

<script>
import { TheHeader } from '@/components/Layouts/TheHeader'
import { ResponsiveContainer } from '@/components/Layouts/ResponsiveContainer'
import { PropertyGallery } from '@/components/PropertyGallery'
export default {
  components: {
    TheHeader,
    ResponsiveContainer,
    PropertyGallery,
  },
}
</script>
