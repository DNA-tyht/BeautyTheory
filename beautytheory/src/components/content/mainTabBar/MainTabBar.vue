<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <template v-slot:item-icon>
        <img src="~assets/img/tabBar/home.svg" alt=""/>
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabBar/home_active.svg" alt=""/>
      </template>
      <template v-slot:item-text>
        <div>首页</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <template v-slot:item-icon>
        <img src="~assets/img/tabBar/category.svg" alt=""/>
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabBar/category_active.svg" alt=""/>
      </template>
      <template v-slot:item-text>
        <div>分类</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <template v-slot:item-icon>
        <img src="~assets/img/tabBar/shopcart.svg" alt=""/>
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabBar/shopcart_active.svg" alt=""/>
      </template>
      <template v-slot:item-text>
        <div>购物车</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <template v-slot:item-icon>
        <img src="~assets/img/tabBar/profile.svg" alt=""/>
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabBar/profile_active.svg" alt=""/>
      </template>
      <template v-slot:item-text>
        <div>我的</div>
      </template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "@/components/common/tabBar/TabBar";
import TabBarItem from "@/components/common/tabBar/TabBarItem";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem,
  }
}
</script>

<style>

</style>
