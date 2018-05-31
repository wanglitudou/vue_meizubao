import "../static/common/reset.css";

import "./font/iconfont.css";

import Vue from "vue";
import App from "./App.vue";
import router from "./router/router.config.js";
// import router from "./router";
// 轮播图用到的swiper
import "../static/common/swiper.min.css";
import "../static/common/swiper.min.js";
//引入element-ui

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
import "./components/js/jquery-2.1.0";


//引入新的日历插件
import VCalendar from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';
//引入axios
import axios from "axios";

window.ajaxSrc = "http://mzbao.weiyingjia.org";

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
//瀑布流

//新的日历插件
Vue.use(VCalendar, {
  firstDayOfWeek: 2,  // Monday
  local:"zh-CN",
  // paneWidth:100,
  // navVisibility:"hidden",
});



import { VueMasonryPlugin } from "vue-masonry";

Vue.use(VueMasonryPlugin);
Vue.use(MintUI);
// eslint-disable no-new
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
