<template>
  <div class="bottom-bar">
    <check-button class="select-all" :is-checked="isSelectAll" @click="checkTotalClick"></check-button>
    <span>全选</span>
    <span class="total-price">合计: ¥{{checkTotalPrice}}</span>
    <span class="buy-product">去结算({{checkLength}})</span>
  </div>
</template>
<script>
import CheckButton from "@/components/content/checkButton/CheckButton";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    checkTotalPrice() {
      let checkTotalPrice = 0;
      return this.$store.state.cartList.filter(item => {
        return item.checked;
      }).reduce((preValue, item) => {
        return checkTotalPrice += item.price * item.count;
      }, 0);
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length;
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) return false;
      return !(this.$store.state.cartList.filter(item => !item.checked).length);
    },
  },
  methods: {
    checkTotalClick() {
      if (this.isSelectAll) //全选
        this.$store.state.cartList.forEach(item => item.checked = false);
      else //全不选
        this.$store.state.cartList.forEach(item => item.checked = true);
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 49px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}

.bottom-bar .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}

.bottom-bar .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}

.bottom-bar .buy-product {
  background-color: var(--color-high-text);
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>
