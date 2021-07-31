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
  background-color: #f5f5f5;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -2px 0 rgba(245, 245, 245, 0.5);
}
</style>
