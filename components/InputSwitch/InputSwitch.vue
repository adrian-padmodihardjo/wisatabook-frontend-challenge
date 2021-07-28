<template>
  <div
    tabindex="0"
    :class="{
      'input-switch': true,
      'input-switch--active': mChecked
    }"
    :style="[mChecked && activeColor && { color: activeColor }]"
    @click="onClick"
  >
    <input
      ref="checkboxEl"
      tabindex="-1"
      :value="value"
      :checked="mChecked"
      type="checkbox"
      style="display: none"
      @input="onInput"
    >
    <div class="input-switch__track" />
    <div class="input-switch__highlight" />
    <div class="input-switch__toggle" />
  </div>
</template>

<script>
export default {
  model: {
    prop: 'checked',
    event: 'input',
  },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    checked: {
      default: false,
    },
    // eslint-disable-next-line vue/require-prop-types
    value: {
      default: null,
    },
    activeColor: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      mChecked: false,
    }
  },
  watch: {
    checked: {
      immediate: true,
      handler (v) {
        if (v === this.value) {
          this.mChecked = true
          return
        }
        if (typeof v === 'boolean') {
          this.mChecked = v
          return
        }
        this.mChecked = !!v
      },
    },
  },
  methods: {
    toggle (checked) {
      if (typeof checked === 'boolean') {
        this.mChecked = checked
      } else {
        this.mChecked = !this.mChecked
      }
      this.$emit('input', this.mChecked)
    },
    onInput (e) {
      this.toggle(e.target.checked)
    },
    onClick () {
      this.toggle()
    },
  },
}
</script>

<style lang="scss" scoped>
@use "./InputSwitch.scss";
</style>
