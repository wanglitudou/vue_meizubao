<template>
  <div class="container">
    <div class="list_img">
      <div class="box">
        <!-- <img src="../assets/images/img_1.png"
             alt=""> -->
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
import { Indicator } from 'mint-ui'
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
    Indicator.open()
    setTimeout(()=>{
      Indicator.close()
    },1000)
  },
  mounted() {},
  methods: {
    updataImg(url) {
      this.$router.push({ name: url });
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: auto;
  height: calc(100% - 0.88rem);
}
.list_img {
  width: 100%;
  height: 18rem;
  overflow-y: scroll;
}
.box {
  width: 100%;
  height: 3.6rem;
  border: 1px solid #ccc;
  margin: 0 auto;
}
.box img {
  width: 100%;
  height: 100%;
}
</style>
