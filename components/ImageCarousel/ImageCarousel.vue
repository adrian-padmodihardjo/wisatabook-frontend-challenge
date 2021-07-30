<template>
  <div class="image-carousel">
    <button
      class="image-carousel__btn-prev"
      :disabled="mActiveIndex === 0"
      @click="onClickPrev"
    />
    <div
      class="image-carousel__track-wrapper"
      :style="carouselSize"
    >
      <transition-group
        tag="div"
        :name="transitionName"
        class="image-carousel__track"
      >
        <template v-for="(item, itemIndex) in items">
          <div
            v-show="mActiveIndex === itemIndex"
            :key="item.id"
            class="image-carousel__item-wrapper"
            :style="carouselSize"
          >
            <div
              class="image-carousel__item"
            >
              <slot name="item" v-bind="{ item, itemIndex }" />
            </div>
          </div>
        </template>
      </transition-group>
    </div>
    <button
      class="image-carousel__btn-next"
      @click="onClickNext"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  model: {
    prop: 'active',
    event: 'change',
  },
  props: {
    active: {
      type: [String, Number],
      default: 0,
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      mActiveIndex: 0,
      transitionName: null,
    }
  },
  computed: {
    carouselSize () {
      return {
        width: this.$attrs.width,
        maxWidth: this.$attrs['max-width'],
      }
    },
    canGoToPrevious () {
      return this.mActiveIndex > 0
    },
    canGoToNext () {
      return this.mActiveIndex < this.items.length - 1
    },
  },
  watch: {
    active: {
      immediate: true,
      handler (v) {
        const int = parseInt(v)
        this.mActiveIndex = Number.isNaN(int)
          ? -1
          : int
      },
    },
  },
  methods: {
    onClickPrev () {
      this.transitionName = 'slide-left'
      this.$nextTick()
      if (this.canGoToPrevious) {
        this.mActiveIndex -= 1
        this.emitChange()
      }
    },
    onClickNext () {
      this.transitionName = 'slide-right'
      if (this.canGoToNext) {
        this.mActiveIndex += 1
        this.emitChange()
      }
    },
    emitChange () {
      this.$emit('change', this.mActiveIndex)
    },
  },
}
</script>

<style lang="scss" scoped>
@use "./ImageCarousel.scss";
</style>
