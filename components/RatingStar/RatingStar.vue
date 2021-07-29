<template>
  <figure
    :class="{
      'rating-star': true,
      'rating-star--dark': $theme.dark,
    }"
  >
    <i
      v-for="i in maxRating"
      :key="i"
      class="rating-star__icon"
    >
      <IconStar
        :class="{
          'rating-star__icon__background': true,
          'rating-star__icon__background--disabled': isIconDisabled(i)
        }"
        :style="getClippedBackgroundStyles(i)"
      />
      <img
        v-if="isIconClipped(i)"
        :src="iconStarImage"
        class="rating-star__icon__foreground"
        :style="getClippedForegroundStyles(i)"
      >
    </i>
  </figure>
</template>

<script>
import _inRange from 'lodash/inRange'
import IconStar from '@/assets/icons/star.svg?vue'
import iconStarImage from '@/assets/icons/star.svg'
export default {
  components: {
    IconStar,
  },
  props: {
    rating: {
      type: [String, Number],
      default: 0,
    },
  },
  data () {
    return {
      maxRating: 5,
      iconStarImage,
    }
  },
  computed: {
    parsedRating () {
      const float = parseFloat(this.rating)
      return Number.isNaN(float) ? 0 : float
    },
  },
  methods: {
    isIconClipped (i) {
      if ([0, 5].includes(this.parsedRating)) {
        return false
      }
      return _inRange(this.parsedRating, i - 1, i)
    },
    getClippedBackgroundStyles (i) {
      if (!this.isIconClipped(i)) {
        return null
      }
      const size = this.parsedRating + 1 - i
      const percent = (100 - (size * 100)) + '%'
      return {
        clipPath: `inset(0 ${percent} 0 0)`,
      }
    },
    getClippedForegroundStyles (i) {
      const size = this.parsedRating + 1 - i
      const percent = (size * 100) + '%'
      return {
        clipPath: `inset(0 0 0 ${percent})`,
      }
    },
    isIconDisabled (i) {
      return this.isIconClipped(i - 1)
    },
  },
}
</script>

<style lang="scss" scoped>
@use "./RatingStar.scss";
</style>
