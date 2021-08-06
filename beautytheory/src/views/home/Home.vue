<template>
  <div id="home">
    <nav-bar class="home-nav"><template v-slot:center>美丽说</template></nav-bar>
    <!--  小技巧  -->
    <tab-control class="tab-control" ref="tabControls" :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true"
            @scroll="contentScroll" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control ref="tabControl" :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"></tab-control>
      <goods-list class="goods-list" :goods="goods[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "@/components/common/navBar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";

import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";

import {getHomeGoods} from "@/network/home";
import {getHomeMultidata} from "@/network/home";
import {itemListenerMixin} from "@/common/mixin";
import {backTopMixin} from "@/common/mixin";

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
  },
  mixins: [
    itemListenerMixin,
    backTopMixin,
  ],
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
      isTabFixed: false,
      tabOffsetTop: 0,
      saveY: 0,
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
        this.$refs.scroll && this.$refs.scroll.finishPullUp &&this.$refs.scroll.finishPullUp();
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
      this.$refs.scroll.scrollTo(0, -this.tabOffsetTop);
      this.$refs.tabControl.currentIndex = index;
      this.$refs.tabControls.currentIndex = index;
    },
    contentScroll(position) {
      //判断tabControl是否吸顶
      this.isTabFixed = (-position.y > this.tabOffsetTop);
      this.listenShowBackTop(position);
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    }
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY);
    this.$refs.scroll && this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
    //取消全局时间的监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
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
}

.tab-control {
  position: relative;
  z-index: 9;
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
