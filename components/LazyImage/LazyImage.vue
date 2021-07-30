<template>
  <div class="lazy-img">
    <img
      :src="preview"
      :alt="alt"
      class="lazy-img__image lazy-img__image--preview"
    >
    <img
      :src="actual"
      :alt="alt"
      class="lazy-img__image lazy-img__image--actual"
    >
  </div>
</template>

<script>
export default {
  props: {
    preview: {
      type: String,
      default: null,
    },
    actual: {
      type: String,
      default: null,
    },
    alt: {
      type: String,
      default: 'image',
    },
  },
}
</script>

<style lang="scss" scoped>
@use "./LazyImage.scss";
</style>
