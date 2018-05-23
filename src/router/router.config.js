//配置路由
import Vue from "vue";
import VueRouter from "vue-router";
// import HelloWorld from '@/components/HelloWorld'
Vue.use(VueRouter); //注册VueRouter

import routes from "./routes"; //引入routers

//实例化路由
var router = new VueRouter({
  routes: routes
});

//抛出
export default router;