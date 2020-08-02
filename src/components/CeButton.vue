<template>
  <button
    @click="buttonClick"
    class="bg-transparent text-blue-400 hover:text-blue-600 cursor-pointer font-semibold "
  >
    <beat-loader :loading="isLoading" :color="'#68d391'" :size="8" />
    <slot v-if="!isLoading"></slot>
  </button>
</template>

<script>
export default {
  name: 'CeButton',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    buttonClick() {
      this.$emit('click')
    }
  }
}
</script>
