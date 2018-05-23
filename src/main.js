// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "../static/common/reset.css";

import "./font/iconfont.css";

import Vue from "vue";
import App from "./App.vue";
import router from "./router/router.config.js";
// import router from "./router";
// 轮播图用到的swiper

// import "./common/swiper.min.css";
// import "./common/swiper.min.js";

import "../static/common/swiper.min.css";
import "../static/common/swiper.min.js";

// import "swiper/dist/css/swiper.css";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// import MintUI from "mint-ui";
// import "mint-ui/lib/style.css";
//引入axios
import axios from "axios";
axios.defaults.transformRequest = [
  function(data) {
    let newData = "";
    for (let k in data) {
      newData +=
        encodeURIComponent(k) + "=" + encodeURIComponent(data[k]) + "&";
    }
    return newData;
  }
];
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers.get["Content-Type"] =
  "application/x-www-form-urlencoded";
Vue.prototype.$axios = axios;

Vue.use(ElementUI);
Vue.config.productionTip = false;

// eslint-disable no-new
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
