<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style>
#tab-bar {
  display: flex;
  background-color: #69b0ba;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -2px 0 rgba(105, 176, 186, 0.5);
}
</style>