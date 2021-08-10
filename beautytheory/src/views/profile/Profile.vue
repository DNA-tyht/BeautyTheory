<template>
  <div class="profile">
    <nav-bar class="nav-bar"><template v-slot:center>我的档案</template></nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true">
      <user-info></user-info>
      <account-info></account-info>
      <normal-list-view :list-data="orderList"/>
      <normal-list-view :list-data="serviceList"/>
    </scroll>
  </div>
</template>

<script>
import NavBar from "@/components/common/navBar/NavBar";
import Scroll from "@/components/common/scroll/Scroll";

import UserInfo from "@/views/profile/childComps/UserInfo";
import AccountInfo from "@/views/profile/childComps/AccountInfo";
import NormalListView from "@/views/profile/childComps/NormalListView";

export default {
  name: "Profile",
  components: {
    NavBar,
    Scroll,
    UserInfo,
    AccountInfo,
    NormalListView,
  },
  data() {
    return {
      orderList: [
        {icon: 'message.svg', info: '我的消息'},
        {icon: 'pointer.svg', info: '积分商城'},
        {icon: 'vip.svg', info: '会员卡'},
      ],
      serviceList: [
        {icon: 'cart.svg', info: '我的购物车'},
        {icon: 'shopping.svg', info: '下载购物APP'},
      ]
    }
  }
}
</script>

<style scoped>
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}

.profile {
  background-color: #f2f2f2;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
