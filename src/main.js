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
import VCalendar from "v-calendar";
import "v-calendar/lib/v-calendar.min.css";
//引入axios
// import axios from "axios";
import axios from './http';
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
  firstDayOfWeek: 1, // Monday
  local: "zh-CN",
  // paneWidth:100,
  datePickerShowDayPopover: false
});

//日期格式转换
Date.prototype.Format = function(fmt) {
  //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

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
