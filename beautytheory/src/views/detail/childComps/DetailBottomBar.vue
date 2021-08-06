<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon collect"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    addCart() {
      this.$emit("addCart");
    }
  }
};
</script>
<style scoped>
.bottom-bar {
  width: 100%;
  height: 49px;
  background: var(--color-background);
  position: fixed;
  display: flex;
  text-align: center;
  bottom: 0;
  left: 0;
  right: 0;
}
.bar-item {
  flex: 1;
  display: flex;
}
.bar-item>div {
  flex: 1;
}

.bar-left .text {
  font-size: 13px;
}
.bar-left .icon {
  display: block;
  width: 22px;
  height: 22px;
  margin:6px auto 3px;
  background: url("../../../assets/img/detail/detail_bottom.png") 0 0/100%;
}
.bar-left .service {
  background-position: 0 -54px;
}
.bar-left .shop {
  background-position: 0 -98px;
}

.bar-right {
  font-size: 15px;
  color: var(--color-background);
  line-height: 50px;
}
.bar-right .cart {
  background-color: rgb(255, 174, 0);
  color: var(--color-text);
}
.bar-right .buy {
  background-color: var(--color-tint);
  color: white;
}
</style>
