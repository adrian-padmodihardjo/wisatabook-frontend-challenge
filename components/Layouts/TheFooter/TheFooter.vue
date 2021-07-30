<template>
  <footer
    :class="{
      'the-footer': true,
      'the-footer--dark': $theme.dark
    }"
  >
    <ResponsiveContainer>
      <div class="the-footer__wrapper">
        <strong>Adrian Padmodihardjo</strong>
        <span>
          <small class="the-footer__right-text">Wisatabook Frontend Challenge</small>
        </span>
      </div>
    </ResponsiveContainer>
  </footer>
</template>

<script>
import { ResponsiveContainer } from '@/components/Layouts/ResponsiveContainer'
export default {
  components: {
    ResponsiveContainer,
  },
}
</script>

<style lang="scss" scoped>
@use "./TheFooter.scss";
</style>
