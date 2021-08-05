<template>
  <div class="comment-info" v-if="Object.keys(commentInfo).length !== 0">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多<i class="arrow-right"></i>
      </div>
    </div>
    <div v-for="item in commentInfo">
      <div class="info-user">
        <img :src="item.user.avatar" alt=""/>
        <span>{{item.user.uname}}</span>
      </div>
      <div class="info-detail">
        <p>{{item.content}}</p>
      </div>
      <div class="info-other">
        <span class="date">{{item.created | showDate}}</span>
        <span>{{item.style}}</span>
      </div>
      <div class="info-images">
        <img :src="img" v-for="img in item.images"  alt=""/>
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from "@/common/utils";

export default {
  name: 'DetailCommentInfo',
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    showDate(value) {
      //将时间戳转换成date对象
      const date = new Date(value * 1000);
      //将date进行格式化
      return formatDate(date, 'yyyy-MM-dd');
    }
  }
}
</script>

<style scoped>
.comment-info {
  padding: 5px 12px;
  color: #333333;
  border-bottom: 5px solid var(--color-background);
}
/**/
.info-header {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 1);
}

.header-title {
  float: left;
  font-size: 15px;
}
.header-more {
  float: right;
  margin-right: 10px;
  font-size: 13px;
}

.info-user {
  padding: 10px 0 5px;
}
.info-user img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.info-user span {
  position: relative;
  font-size: 15px;
  top: -15px;
  margin-left: 10px;
}

.info-detail {
  padding: 0 5px 15px;
}

.info-detail p {
  font-size: 14px;
  color: var(--color-text);
  line-height: 1.5;
}

.info-other {
  font-size: 12px;
  color: var(--color-text);
  margin-top: 10px;
}
.info-other .date {
  margin-right: 8px;
}

.info-images {
  margin-top: 10px;
}

.info-images img{
  width: 70px;
  height: 70px;
  margin-right: 5px;
}
</style>
