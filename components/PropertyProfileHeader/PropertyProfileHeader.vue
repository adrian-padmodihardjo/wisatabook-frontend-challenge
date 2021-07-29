<template>
  <div class="prop-header">
    <template v-if="details">
      <figure class="prop-header__avatar">
        <img :src="propertyAvatar">
      </figure>
      <summary class="prop-header__summary">
        <h1 class="prop-header__name">
          {{ details.name }}
        </h1>
        <div class="prop-header__rating-wrapper">
          <RatingStar
            class="prop-header__rating-star"
            :rating="starRating"
          />
          <span class="prop-header__chip">
            {{ propertyCategory }}
          </span>
        </div>
        <p class="prop-header__address">
          {{ propertyAddress }}
        </p>
        <RatingReview
          rating-description="Excellent"
          :rating="reviewRating"
          :count="numOfReviews"
        />
      </summary>
    </template>
  </div>
</template>

<script>
import { mockApiClient } from '@/api-client/main.mock'
import { RatingStar } from '@/components/RatingStar'
import { RatingReview } from '@/components/RatingReview'
import { getDetails } from '~/api/property'

const mock = mockApiClient()
export default {
  components: {
    RatingStar,
    RatingReview,
  },
  props: {
    propertyId: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      details: null,
    }
  },
  computed: {
    catalog () {
      return this.details?.catalog_data || {}
    },
    propertyAvatar () {
      return this.catalog?.hero_image
    },
    propertyAddress () {
      return this.catalog?.address
    },
    propertyCategory () {
      return this.catalog?.category
    },
    starRating () {
      return this.catalog?.star_rating
    },
    numOfReviews () {
      return this.catalog?.review_count
    },
    reviewRating () {
      return this.catalog?.review_rating
    },
  },
  mounted () {
    this.$watch(
      'propertyId',
      function (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.fetchPropertyDetails()
        }
      },
      { immediate: true },
    )
  },
  methods: {
    async fetchPropertyDetails () {
      if (!this.propertyId) {
        this.details = null
        return
      }
      const { data } = await getDetails.call(mock, this.propertyId)
        .catch((e) => {
          console.log({ e })
          throw e
        })
      this.details = data
    },
  },
}
</script>

<style lang="scss" scoped>
@use "./PropertyProfileHeader.scss";
</style>
