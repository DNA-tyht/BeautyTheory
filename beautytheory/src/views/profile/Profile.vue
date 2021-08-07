<template>
  <div class="profile">
    <nav-bar class="nav-bar"><template v-slot:center>个人</template></nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navBar/NavBar";
export default {
  name: "Profile",
  components: {
    NavBar,
  }
}
</script>

<style scoped>

</style>
