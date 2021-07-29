<template>
  <div class="rating-review">
    <figure class="rating-review__indicator">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        :viewBox="viewBox"
        class="rating-review__svg"
      >
        <circle
          fill="transparent"
          :cx="centerPoint"
          :cy="centerPoint"
          :r="rad"
          :stroke-width="strokeWidth"
          :stroke-dasharray="dashArrays"
          stroke-dashoffset="0"
          class="rating-review__svg__background"
        />
        <circle
          fill="transparent"
          :cx="centerPoint"
          :cy="centerPoint"
          :r="rad"
          :stroke-width="strokeWidth"
          :stroke-dasharray="dashArrays"
          :stroke-dashoffset="dashOffset"
          class="rating-review__svg__foreground"
        />
      </svg>
      <figcaption class="rating-review__score">
        {{ parsedRating }}
      </figcaption>
    </figure>
    <span>
      {{ ratingDescription }} · {{ parsedRatingCount }} reviews
    </span>
  </div>
</template>

<script>
export default {
  props: {
    rating: {
      type: [String, Number],
      default: 0,
    },
    ratingDescription: {
      type: String,
      default: '',
    },
    count: {
      type: [String, Number],
      default: 0,
    },
  },
  data () {
    return {
      rad: 28,
      strokeWidth: 7,
    }
  },
  computed: {
    parsedRating () {
      const int = parseInt(this.rating)
      return Number.isNaN(int) ? 0 : int
    },
    parsedRatingCount () {
      const int = parseInt(this.count)
      return Number.isNaN(int) ? 0 : int
    },
    viewBox () {
      const size = ((this.rad * 2) + this.strokeWidth)
      return [0, 0, size, size].join(' ')
    },
    centerPoint () {
      return this.rad + (this.strokeWidth / 2)
    },
    dashArrays () {
      return (22 / 7) * this.rad * 2
    },
    dashOffset () {
      return this.dashArrays * (1 - (this.parsedRating / 100))
    },
  },
}
</script>

<style lang="scss" scoped>
@use "./RatingReview.scss";
</style>
