<template>
  <div class="category">
    <nav-bar class="nav-bar"><template v-slot:center>分类</template></nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navBar/NavBar";

export default {
  name: "Category",
  components: {
    NavBar
  }
}
</script>

<style scoped>
</style>
