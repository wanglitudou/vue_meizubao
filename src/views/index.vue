<template>

  <div class="container">
    <!-- <keep-alive> -->
        <router-view class="wrapper"></router-view>
    <!-- </keep-alive> -->
   
    <ul class="nav">
      <router-link :tag="'li'"
                   :to="{name:'home'}">
        <span class="icon icon1"></span>
        <span class="spanInfo">首页</span>
      </router-link>
      <router-link :tag="'li'"
                   :to="{name:'catagory'}">
        <span class="icon icon2"></span>
        <span class="spanInfo">分类</span>
      </router-link>
      <router-link :tag="'li'"
                   :to="{name:'cart'}">
        <span class="icon icon3"></span>
        <span class="spanInfo">订单</span>
      </router-link>
      <router-link :tag="'li'"
                   :to="{name:'mine'}">
        <span class="icon icon4"></span>
        <span class="spanInfo">我的</span>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: [] //banner
    };
  },
  created() {},
  mounted: function() {},
  methods: {}
};
</script>
<style scoped>
.container {
  height: 100%;
  overflow: hidden;
}
.nav {
  width: 100%;
  height: 1.1rem;
  /* height: px2rem(48px); */
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #ffffff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.05);
  padding-top: 0.15rem;
  box-sizing: border-box;
  color: #999;
  z-index: 2000;
}
.nav li {
  flex: 1;
  text-align: center;
}
.router-link-active {
  color: #fd4689;
}
.nav li span {
  display: block;
  height: 50%;
  margin: 0 auto;
  font-size: 10px;
}
.icon {
  width: 0.5rem;
  height: 0.5rem;
  background-position: bottom center;
  background-repeat: no-repeat;
}
.icon1 {
  background-image: url(../assets/icon/icon1.png);
  background-size: 0.48rem;
}
.icon2 {
  background-image: url(../assets/icon/icon2.png);
  background-size: 0.46rem;
}
.icon3 {
  background-image: url(../assets/icon/icon3.png);
  background-size: 0.46rem 0.48rem;
}
.icon4 {
  background-image: url(../assets/icon/icon4.png);
  background-size: 0.48rem;
}
.router-link-active .icon1 {
  background-image: url(../assets/icon/icon1-a.png);
  background-size: 0.48rem;
}
.router-link-active .icon2 {
  background-image: url(../assets/icon/icon2-a.png);
  background-size: 0.46rem;
}
.router-link-active .icon3 {
  background-image: url(../assets/icon/icon3-a.png);
  background-size: 0.46rem 0.48rem;
}
.router-link-active .icon4 {
  background-image: url(../assets/icon/icon4-a.png);
  background-size: 0.48rem;
}
</style>

