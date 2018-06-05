
<template>
  <div class="container">
    <div class="cent_ban">
      <div class="banner">
        <div class="ban_left">
          <div class="portrait">
            <img src="../assets/images/icon1.jpg"
                 alt="666">
            <span class="name">丹丹</span>
          </div>
        </div>
        <div class="ban_right">
          <span class="iconfont icon-yingyongchengxu-xianxing"></span>
        </div>
      </div>
      <div class="list_cent">
        <p @click="curriculum()">
          <span>
            <i class="iconfont icon-yingyongchengxu-xianxing"></i>
            <span class="mine">我的课程</span>

          </span>
          <span class="iconfont icon-yingyongchengxu-xianxing"></span>
        </p>
        <p @click="integral()">
          <span>
            <i class="iconfont icon-yingyongchengxu-xianxing"></i>
            <span class="mine">我的积分</span>

          </span>
          <span class="iconfont icon-yingyongchengxu-xianxing"></span>
        </p>
        <p @click="address()">
          <span>
            <i class="iconfont icon-yingyongchengxu-xianxing"></i>
            <span class="mine">我的地址</span>

          </span>
          <span class="iconfont icon-yingyongchengxu-xianxing"></span>
        </p>
        <!--<p @click="customservice()">-->
          <!--<span>-->
            <!--<i class="iconfont icon-yingyongchengxu-xianxing"></i>-->
            <!--<span class="mine">我的客服</span>-->

          <!--</span>-->
          <!--<span class="iconfont icon-yingyongchengxu-xianxing"></span>-->
        <!--</p>-->
        <!--<p>-->
          <!--<span>-->
            <!--<i class="iconfont icon-yingyongchengxu-xianxing"></i>-->
            <!--<span class="mine">我的微贷</span>-->

          <!--</span>-->
          <!--<span class="iconfont icon-yingyongchengxu-xianxing"></span>-->
        <!--</p>-->
        <p @click="photograph()">
          <span>
            <i class="iconfont icon-yingyongchengxu-xianxing"></i>
            <span class="mine">资料库</span>

          </span>
          <span class="iconfont icon-yingyongchengxu-xianxing"></span>
        </p>
        <!--<p>-->
          <!--<span>-->
            <!--<i class="iconfont icon-yingyongchengxu-xianxing"></i>-->
            <!--<span class="mine">我的下载</span>-->

          <!--</span>-->
          <!--<span class="iconfont icon-yingyongchengxu-xianxing"></span>-->
        <!--</p>-->
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    //我的课程
    curriculum() {
      //点击我的课程时 跳到对应的页面
      this.$router.push({ name: "curriculum" });
    },
    //我的积分
    integral() {
      this.$router.push({ name: "integral" });
    },
    //我的地址
    address() {
      this.$router.push({ name: "address" });
    },

    //资料库
    photograph() {
      this.$router.push({ name: "photograph" });
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: auto;
  height: calc(100% - 0.88rem);
  background: #fff;
}
.cent_ban {
  width: 100%;
  height: auto;
}
.banner {
  width: 7.5rem;
  height: 2.6rem;
  background-image: linear-gradient(-130deg, #fd4689 0%, #fd82d9 100%);
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.banner .ban_left {
  height: 2rem;
  line-height: 2rem;
}
.banner .ban_left .portrait {
  width: 1.52rem;
  height: 1.52rem;
  border-radius: 50%;
  margin-top: 0.4rem;
  z-index: 1000;
}
.banner .ban_left .portrait img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.banner .ban_left .portrait .name {
  margin-top: -10px;
  font-size: 16px;
  position: absolute;
  top: 20px;
  left: 30%;
  color: #fff;
}

.banner .ban_right {
  height: 2rem;
  line-height: 2rem;
  color: #fff;
}
.list_cent {
  width: 7.1rem;
  box-shadow: 0 2px 9px 0 rgba(253, 74, 203, 0.15);
  border-radius: 10px;
  margin: 0 auto;
  margin-top: -20px;
  background: #fff;
}
.list_cent p {
  width: 100%;
  height: 0.88rem;
  line-height: 0.88rem;
  border-bottom: 1px solid #f7f7f7;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}
.list_cent p {
  position: relative;
}
.list_cent p i {
  color: #fd4689;
  font-size: 0.36rem;
}
.list_cent p .mine {
  position: absolute;
  top: -0px;
  left: 42px;
}
</style>
