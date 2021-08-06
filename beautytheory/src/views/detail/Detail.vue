<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" ref="detailNav" @titleClick="titleClick"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true"
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info ref="goods" :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "@/components/content/goods/GoodsList";

import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

import {getDetail} from "@/network/detail";
import {getRecommend} from "@/network/detail";
import {debounce} from "@/common/utils";
import {itemListenerMixin} from "@/common/mixin";
import {backTopMixin} from "@/common/mixin";
import {Goods} from "@/network/detail";
import {Shop} from "@/network/detail";
import {GoodsParam} from "@/network/detail";

export default {
  name: "Detail",
  components: {
    Scroll,
    GoodsList,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
  },
  mixins: [
    itemListenerMixin,
    backTopMixin
  ],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: {},
      themeTopY: [],
      getThemeTopY: null,
      currentIndex: 0,
    }
  },
  methods:{
    imageLoad() {
      const refresh = debounce(this.$refs.scroll.refresh, 200);
      this.$refs.scroll && this.$refs.scroll.refresh() && refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 500);
    },
    contentScroll(position) {
      this.listenShowBackTop(position);
      const positionY = -position.y;
      for (let i = 0; i < this.themeTopY.length - 1; i++) {
        if (this.currentIndex !== i && (positionY >= this.themeTopY[i] && positionY < this.themeTopY[i + 1])) {
          this.currentIndex = i;
          this.$refs.detailNav.currentIndex = this.currentIndex;
        }
      }
    },
    addCart() {
      //获取购物车展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.newPrice;
      product.iid = this.iid;
    },
  },
  created: function () {
    //保存传入的iid
    this.iid = this.$route.params.iid;
    this.$refs.scroll && this.$refs.scroll.refresh();
    //根据iid请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result;
      //顶部图片
      this.topImages = data.itemInfo.topImages;
      //商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      //店铺信息
      this.shop = new Shop(data.shopInfo);
      //商品详情信息
      this.detailInfo = data.detailInfo;
      //商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
      //评论信息
      this.commentInfo = (data.rate.cRate !== 0) ? data.rate.list : 0;
    });
    //请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
    //参数获取防抖动
    this.getThemeTopY = debounce(() => {
      this.themeTopY = [];
      this.themeTopY.push(this.$refs.goods.$el.offsetTop);
      this.themeTopY.push(this.$refs.param.$el.offsetTop);
      this.themeTopY.push(this.$refs.comment.$el.offsetTop);
      this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopY.push(Number.MAX_VALUE);
    });
  },
  deactivated() {
    //取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
}
</script>

<style scoped>
.detail {
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color: var(--color-background);
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: var(--color-background);
}

.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
</style>
