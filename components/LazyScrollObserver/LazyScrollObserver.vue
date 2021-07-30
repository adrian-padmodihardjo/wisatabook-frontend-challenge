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
        this.$emit('intersect', entry, observer)
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
        this.observeTarget()
      }
    },
    reobserve () {
      this.unobserveTarget()
      this.observeTarget()
    },
    unobserveTarget () {
      if (this.isInit) {
        this.intersectionObserver.unobserve(this.$el)
      }
    },
    observeTarget () {
      if (this.isInit) {
        this.intersectionObserver.observe(this.$el)
      }
    },
    destroyObserver () {
      if (this.isInit) {
        this.intersectionObserver.disconnect()
        this.intersectionObserver = null
      }
    },
  },
}
</script>

<style>

</style>
