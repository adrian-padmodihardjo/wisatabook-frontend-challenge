<template>
  <footer
    :class="{
      'the-footer': true,
      'the-footer--dark': $theme.dark
    }"
  >
    <ResponsiveContainer>
      <div class="the-footer__wrapper">
        <span class="the-footer__brand-name">Adrian Padmodihardjo</span>
        <span>&nbsp;&nbsp; · &nbsp;&nbsp;Terms & Condition</span>
        <i class="the-footer__spacer" />
        <small>Frontend Challenge</small>
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
