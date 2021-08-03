<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners.list" :key="index">
      <!--<a :href="item.link">-->
        <img :src="item.image" alt="" @load="imageLoad"/>
      <!--</a>-->
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "@/components/common/swiper";

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  data() {
    return {
      isLoad: false,
    }
  },
  props: {
    banners: {
      type: Object,
      default() {
        return [];
      }
    }
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    }
  }
}
</script>

<style scoped>
img {
  width: 100%;
}
</style>
