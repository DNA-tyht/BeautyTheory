<template>
  <div class="cart">
    <nav-bar class="nav-bar"><template v-slot:center>购物车({{cartLength}})</template></nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true">
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import NavBar from "@/components/common/navBar/NavBar";

import CartList from "@/views/cart/childComps/CartList";
import CartBottomBar from "@/views/cart/childComps/CartBottomBar";

import {mapGetters} from "vuex";

export default {
  name: "Cart",
  components: {
    Scroll,
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters({
      cartLength: `cartLength`,
    }),
  },
  activated() {
    this.$refs.scroll && this.$refs.scroll.refresh && this.$refs.scroll.refresh();
  }
}
</script>

<style scoped>
.cart {
  height: 100vh;
  position: relative;
}

.nav-bar {
  background-color: var(--color-tint);
  color: var(--color-background);
}

.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 93px;
  right: 0;
  left: 0;
}
</style>
