<template>
  <div>
    <TheHeader />
    <ResponsiveContainer>
      <PropertyProfileHeader
        :property-id="propertyId"
        style="margin: 24px 0; padding: 24px 0; margin-bottom: 40px;"
        @load="onProfileLoaded"
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
    <TheFooter :style="footerStyles" />
  </div>
</template>

<script>
import { TheHeader } from '@/components/Layouts/TheHeader'
import { TheFooter } from '@/components/Layouts/TheFooter'
import { ResponsiveContainer } from '@/components/Layouts/ResponsiveContainer'
import { PropertyProfileHeader } from '@/components/PropertyProfileHeader'
import { PropertyGalleryCategories } from '@/components/PropertyGalleryCategories'
import { PropertyGallery } from '@/components/PropertyGallery'
import { PropertyGalleryTags } from '@/components/PropertyGalleryTags'

export default {
  components: {
    TheHeader,
    TheFooter,
    ResponsiveContainer,
    PropertyProfileHeader,
    PropertyGalleryCategories,
    PropertyGallery,
    PropertyGalleryTags,
  },
  data () {
    return {
      propertyId: '9000248525',
      profile: null,
      caption: undefined,
      booted: false,
    }
  },
  head () {
    if (!this.profile) {
      return {}
    }
    return {
      title: `${this.profile?.name} · Secret Deals · Wisatabook`,
    }
  },
  computed: {
    footerStyles () {
      if (this.booted) {
        return null
      }
      return {
        position: 'fixed',
        right: 0,
        bottom: 0,
        left: 0,
      }
    },
  },
  mounted () {
    this.$nextTick(() => {
      this.booted = true
    })
  },
  methods: {
    onProfileLoaded (profile) {
      this.profile = profile
    },
  },
}
</script>
