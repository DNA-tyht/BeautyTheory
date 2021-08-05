<template>
  <nav-bar>
    <template v-slot:left>
      <div @click="backClick"><img src="@/assets/img/common/back.svg" alt=""/></div>
    </template>
    <template v-slot:center>
      <div class="title">
        <div class="title-item" v-for="(item, index) in title"
             :class="{active: index === currentIndex}" @click="titleClick(index)">{{item}}</div>
      </div>
    </template>
  </nav-bar>
</template>

<script>
import NavBar from "@/components/common/navBar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      title: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    }
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
    },
    backClick() {
      this.$router.go(-1);
    }
  },
}
</script>

<style scoped>
center {
  display: flex;
}
.title{
  display: flex;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
img {
  margin-top: 10px;
}
</style>
