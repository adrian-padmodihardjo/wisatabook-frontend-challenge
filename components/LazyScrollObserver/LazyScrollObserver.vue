<template>
  <div style="padding: 0; margin: 0" />
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  data () {
    return {
      intersectionObserver: null,
    }
  },
  computed: {
    isInit () {
      return this.intersectionObserver instanceof IntersectionObserver
    },
  },
  mounted () {
    this.initObserver()
  },
  beforeDestroy () {
    this.destroyObserver()
  },
  methods: {
    intersectionObserverCallback (entries, observer) {
      const entry = entries[0]
      if (entry.isIntersecting) {
        this.$emit('reach:bottom', entry, observer)
      }
    },
    initObserver () {
      if (!this.isInit) {
        this.intersectionObserver = new IntersectionObserver(
          this.intersectionObserverCallback,
          {
            root: null,
            rootMargin: '0px 0px 0px 0px',
            threshold: 1,
            ...this.options,
          },
        )
        this.addScrollListener()
        this.observeTarget()
      }
    },
    observeTarget () {
      if (this.isInit) {
        this.intersectionObserver.observe(this.$el)
      }
    },
    destroyObserver () {
      if (this.isInit) {
        this.removeScrollListener()
        this.intersectionObserver.disconnect()
        this.intersectionObserver = null
      }
    },
    onScroll () {
      this.observeTarget()
    },
    addScrollListener () {
      if (this.isInit) {
        const scroller = this.intersectionObserver.root || window
        scroller.addEventListener?.('scroll', this.onScroll)
      }
    },
    removeScrollListener () {
      if (this.isInit) {
        const scroller = this.intersectionObserver.root || window
        scroller.removeEventListener?.('scroll', this.onScroll)
      }
    },
  },
}
</script>

<style>

</style>
