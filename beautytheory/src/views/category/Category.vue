<template>
  <div class="category">
    <nav-bar class="nav-bar"><template v-slot:center>商品分类</template></nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
      <scroll ref="scroll" id="tab-content" :data="[categoryData]">
        <div>
          <tab-control :titles="['综合', '新品', '销量']" @itemClick="tabClick"></tab-control>
          <tab-content-category :subcategories="showSubcategory"></tab-content-category>
          <goods-list :goods="showCategoryDetail"></goods-list>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/navBar/NavBar";
import Scroll from "@/components/common/scroll/Scroll";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";

import TabMenu from "@/views/category/childComps/TabMenu";
import TabContentCategory from "@/views/category/childComps/TabContentCategory";

import {getCategory} from "@/network/category";
import {getCategoryDetail} from "@/network/category";
import {getSubcategory} from "@/network/category";
import {POP, NEW, SELL} from "@/common/const";
import {tabControlMixin} from "@/common/mixin";

export default {
  name: "Category",
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    TabMenu,
    TabContentCategory,
  },
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
    }
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[0];
    }
  },
  mixins: [tabControlMixin],
  methods: {
    CgetCategory() {
      getCategory().then(res => {
        //获取分类数据
        this.categories = res.data.category.list
        console.log(res);
        //初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': [],
            }
          }
        }
        //请求第一个分类的数据
        this.CgetSubcategories(0)
      })
    },
    CgetSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then(res => {
        this.categoryData[index].subcategories = res.data;
        this.categoryData = {...this.categoryData};
        this.CgetCategoryDetail(POP);
        this.CgetCategoryDetail(SELL);
        this.CgetCategoryDetail(NEW);
      });
    },
    CgetCategoryDetail(type) {
      //获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      //发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        //将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = {...this.categoryData};
      });
    },
    selectItem(index) {
      this.CgetSubcategories(index);
    }
  },
  created() {
    //请求分类数据
    this.CgetCategory();
    //监听图片加载完成
    this.$bus.$on("imgLoad", () => {
      this.$refs.scroll && this.$refs.scroll.refresh();
    })
  },
}
</script>

<style scoped>
.category {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  display: flex;
  overflow: hidden;
}

#tab-content {
  height: 100%;
  flex: 1;
}
</style>
