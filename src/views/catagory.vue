<template>
  <div class="fenlei-container">
    <div class="list_imgs">
      <div class="box">
        <img src=""
             alt=""
             v-for="(item,index) in url"
             :src="item.img"
             name="pic"
             :key="item.index"
             @click="updataImg(item.href)">
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
export default {
  data() {
    return {
      url: [
        {
          img: require("../assets/images/img_1.jpg"),
          href: "detail"
        },
        {
          img: require("../assets/images/img_2.png"),
          href: "looksee"
        },

        {
          img: require("../assets/images/img_3.png"),
          href: "seemore"
        },

        {
          img: require("../assets/images/img_4.png"),
          href: "clickpay"
        },

        {
          img: require("../assets/images/img_5.png"),
          href: "project"
        }
      ]
    };
  },
  created() {
    Indicator.open();
    setTimeout(() => {
      Indicator.close();
    }, 1000);
  },
  mounted() {},
  methods: {
    updataImg(url) {
      this.$router.push({ name: url });
    }
  }
};
</script>

<style lang="scss">
@import "../styles/helper.scss";
.fenlei-container {
  width: 100%;
  height: 100%;
  background: #fff;

}
.list_imgs {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.box {
  width: 100%;
  height: auto;
  padding-bottom: 1rem;
  // border: 1px solid #ccc;
}
.box img {
  width: 100%;
  height: px2rem(180px);
  margin-top: px2rem(15px);
}
</style>
