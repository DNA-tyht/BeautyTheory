<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true"
            @scroll="contentScroll" @pullingUp="loadMore">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <detail-common-info :comment-info="commentInfo"></detail-common-info>
    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";

import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommonInfo from "@/views/detail/childComps/DetailCommonInfo";

import {getDetail} from "@/network/detail";
import {Goods} from "@/network/detail";
import {Shop} from "@/network/detail";
import {GoodsParam} from "@/network/detail";

export default {
  name: "Detail",
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommonInfo,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
    }
  },
  methods:{
    imageLoad() {
      this.$refs.scroll && this.$refs.scroll.refresh();
    }
  },
  created: function () {
    //保存传入的iid
    this.iid = this.$route.params.iid;
    //根据iid请求数据
    getDetail(this.iid).then(res => {
      const data = res.result;
      console.log(data);
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
    })
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
  bottom: 0;
  right: 0;
  left: 0;
}
</style>
