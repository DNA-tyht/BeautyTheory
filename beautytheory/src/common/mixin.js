import {debounce} from "@/common/utils";
import {POP, NEW, SELL} from "@/common/const";
import BackTop from "@/components/content/backTop/BackTop";

//混入，多个组件间可的复用代码
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
    }
  },
  mounted() {
    //图片加载完成事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.itemImgListener = () => {
      this.$refs.scroll && this.$refs.scroll.refresh && refresh();
    }
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    listenShowBackTop(position) {
      //判断backTop是否显示
      this.isShowBackTop = (-position.y > 600);
    }
  }
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP,
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP;
          break
        case 1:
          this.currentType = NEW;
          break
        case 2:
          this.currentType = SELL;
          break
      }
      console.log(this.currentType);
    }
  }
}
