<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="@/assets/img/cart/tick.svg" alt=""/>
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.check-button {
  background-color: var(--color-background);
  border: 2px solid var(--color-text);
  border-radius: 50%;
}
.check {
  background-color: var(--color-high-text);
  border: 2px solid var(--color-tint);
}
</style>
