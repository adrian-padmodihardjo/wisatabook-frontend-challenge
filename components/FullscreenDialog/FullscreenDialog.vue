<template>
  <div
    :class="{
      'fs-dialog': true,
      'fs-dialog--show': mShow
    }"
    @mousewheel.prevent="onScroll"
  >
    <slot
      name="activator"
      v-bind="{ open, close, toggle }"
    />
    <div
      class="fs-dialog__overlay"
      @click.self="onClickOverlay"
    />
    <div class="fs-dialog__body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'show',
    event: 'change',
  },
  props: {
    show: {
      type: Boolean,
    },
  },
  data () {
    return {
      mShow: false,
    }
  },
  mounted () {
    this.$watch(
      'show',
      function (v) {
        this.mShow = v
        this.onVisibilityChanged(v)
      },
      { immediate: true },
    )
  },
  methods: {
    onScroll (e) {
      // intentionally empty
    },
    onVisibilityChanged (show) {
      if (document) {
        // document.documentElement.style.setProperty('overflow-y', show ? 'hidden' : 'scroll')
      }
    },
    open () {
      this.mShow = true
      this.onVisibilityChanged(true)
      this.emitChange()
    },
    close () {
      this.mShow = false
      this.onVisibilityChanged(false)
      this.emitChange()
    },
    toggle (show) {
      if (typeof show === 'boolean') {
        this.mShow = show
      } else {
        this.mShow = !this.mShow
      }
      this.onVisibilityChanged(this.mShow)
      this.emitChange()
    },
    emitChange () {
      this.$emit('change', this.mShow)
    },
    onClickOverlay () {
      this.close()
    },
  },
}
</script>

<style lang="scss" scoped>
@use "./FullscreenDialog.scss";
</style>
