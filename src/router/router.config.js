//配置路由
import Vue from "vue";
import VueRouter from "vue-router";
// import HelloWorld from '@/components/HelloWorld'
Vue.use(VueRouter); //注册VueRouter

import routes from "./routes"; //引入routers

//实例化路由
var router = new VueRouter({
  routes: routes
  // mode: "history"
});

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
//抛出
// Vue.use(require("vue-wechat-title")); //实例化参数
export default router;
