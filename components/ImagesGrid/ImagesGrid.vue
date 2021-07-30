<template>
  <div class="images-grid">
    <figure
      v-for="(item, itemIndex) in items"
      :key="item.id"
      class="images-grid__item"
      :style="gridItemStyles"
    >
      <div class="images-grid__item__img">
        <slot name="item" v-bind="{ item, itemIndex }" />
      </div>
      <i class="images-grid__item__spinner" />
    </figure>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => null,
    },
    column: {
      type: [String, Number],
      default: 3,
    },
  },
  computed: {
    gridItemStyles () {
      const col = typeof (+this.column) === 'number'
        ? this.column
        : 3
      return {
        flexBasis: `${100 / Math.max(col, 1)}%`,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@use "./ImagesGrid.scss";
</style>
