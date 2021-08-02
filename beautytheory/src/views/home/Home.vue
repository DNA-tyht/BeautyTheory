<template>
  <div id="home">
    <nav-bar class="home-nav"><template v-slot:center>美丽说</template></nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true"
            @scroll="contentScroll" @pullingUp="loadMore">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick"></tab-control>
      <goods-list class="goods-list" :goods="goods[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
import NavBar from "@/components/common/navBar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";

import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";

import {getHomeMultidata} from "@/network/home";
import {getHomeGoods} from "@/network/home";

export default {
  name: "Home",
  components: {
    GoodsList,
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        "pop": {page: 0, list: []},
        "new": {page: 0, list: []},
        "sell": {page: 0, list: []}
      },
      currentType: "pop",
      isShow: false,
    }
  },
  methods: {
    /**
    * @Description 网络请求相关的方法
    * @Return
    * @Author 脱氧核糖
    * @Date 2021/8/1 20:55
    */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        ({banner: this.banners, recommend: this.recommends} = res.data);
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list); //可变参数
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      })
    },
    /**
    * @Description 事件监听相关的方法
    * @Return
    * @Author 脱氧核糖
    * @Date 2021/8/1 20:56
    */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      this.isShow = (-position.y > 600);
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    }
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
}
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: var(--color-background);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
}

.tab-control {
  top: 44px;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
</style>
