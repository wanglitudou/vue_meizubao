import index from "../views/index.vue";
import home from "../views/home.vue";
import catagory from "../views/catagory.vue";
import cart from "../views/cart.vue";
import mine from "../views/mine.vue";
import aaa from "../views/aaa.vue";
import confirm from "../views/confirm.vue";
import orderDetails from "../views/orderDetails.vue";
//引入其他页面的组件

import detail from "../views/detail/detail.vue";
import industry from "../views/industry/industry.vue";
import details from "../views/details/details.vue";
import cooperation from "../views/cooperation/cooperation.vue";
import project from "../views/project/project.vue";
import matching from "../views/matching/matching.vue";
import train from "../views/train/train.vue";
import essence from "../views/essence/essence.vue";
import looksee from "../views/looksee/looksee.vue";
import seemore from "../views/seemore/seemore.vue";
import clickpay from "../views/clickpay/clickpay.vue";
import login from "../views/login/login.vue";
import ordergoods from "../views/ordergoods/ordergoods.vue";
import payment from "../views/payment/payment.vue";
import authname from "../views/authname/authname.vue";
// import authnames from "../views/authname/authnames.vue";
import information from "../views/information/information.vue";
import curriculum from "../views/curriculum/curriculum.vue";
import coursepage from "../views/coursepage/coursepage.vue";
import integral from "../views/integral/integral.vue";
import address from "../views/address/address.vue";
import addresssite from "../views/address/addresssite.vue";
import customservice from "../views/customservice/customservice.vue";
import viewscreen from "../views/viewscreen/viewscreen.vue";
import photograph from "../views/photograph/photograph.vue";
import pageindustry from "../views/pageindustry/pageindustry.vue";
import addtheaddress from "../views/addtheaddress/addtheaddress.vue";
import mediaDetails from "../views/photograph/mediaDetails.vue";
import search from "../views/search/search.vue";
import dataBase from "../views/dataBase/index.vue";
import qian from "../views/qian/qian.vue";
import phone from "../views/phone.vue";
import addtheaddre from "../views/addtheaddress/addtheaddre.vue";

let routes = [
  {
    path: "/",
    redirect: "./index/home"
  },
  {
    name: "index",
    path: "/index",
    // meta: {
    //   title: "首页"
    // },
    component: index,
    children: [
      {
        name: "home",
        path: "home",
        meta: {
          title: "首页"
        },
        component: home
      },
      {
        name: "catagory",
        path: "catagory",
        meta: {
          title: "分类"
        },
        component: catagory
      },
      {
        name: "mine",
        path: "mine",
        meta: {
          title: "我的"
        },
        component: mine
      },
      {
        name: "ordergoods",
        path: "ordergoods",
        component: ordergoods
      },
      {
        name: "payment",
        path: "payment",
        component: payment
      },

      {
        name: "coursepage",
        path: "coursepage",
        component: coursepage
      },
      {
        name: "cart",
        path: "cart",
        meta: {
          title: "订单"
        },
        component: cart
      }
    ]
  },
  {
    name: "detail",
    path: "/detail",
    meta: {
      title: "热租仪器"
    },
    component: detail
  },
  {
    name: "search",
    path: "/search",
    component: search
  },
  {
    name: "details",
    path: "/details",
    component: details,
    meta: {
      keepAlive: true,
      title: "详情页"
    }
  },
  {
    name: "industry",
    path: "/industry",
    component: industry
  },
  {
    name: "cooperation",
    path: "/cooperation",
    component: cooperation
  },
  {
    name: "project",
    path: "/project",
    component: project
  },
  {
    name: "matching",
    path: "/matching",
    component: matching
  },
  {
    name: "train",
    path: "/train",
    component: train
  },
  {
    name: "essence",
    path: "/essence",
    component: essence
  },
  {
    name: "looksee",
    path: "/looksee",
    meta: {
      title: "美业精英"
    },
    component: looksee
  },
  {
    name: "seemore",
    path: "/seemore",
    meta: {
      title: "配套产品"
    },
    component: seemore
  },
  {
    name: "clickpay",
    path: "/clickpay",
    meta: {
      title: "合作项目"
    },
    component: clickpay
  },
  {
    name: "curriculum",
    path: "/curriculum",
    meta: {
      title: "我的课程"
    },
    component: curriculum
  },
  {
    name: "integral",
    path: "/integral",
    meta: {
      title: "我的积分"
    },
    component: integral
  },
  {
    name: "address",
    path: "/address",
    meta: {
      title: "我的地址"
    },
    component: address
  },
  {
    name: "addresssite",
    path: "/addresssite",
    meta: {
      title: "我的地址"
    },
    component: addresssite
  },
  {
    name: "customservice",
    path: "/customservice",
    component: customservice
  },
  {
    name: "viewscreen",
    path: "/viewscreen",
    component: viewscreen
  },
  {
    name: "photograph",
    path: "/photograph",
    meta: {
      title: "资料库"
    },
    component: photograph
  },
  {
    name: "pageindustry",
    path: "/pageindustry",
    component: pageindustry
  },
  {
    name: "login",
    path: "/login",
    component: login
  },
  {
    name: "information",
    path: "/information",
    component: information
  },
  {
    name: "confirm",
    path: "/confirm/:type",
    component: confirm,
    meta: {
      keepAlive: true
    }
  },
  {
    name: "order_details",
    path: "/order_details",

    component: orderDetails
  },
  {
    name: "authname",
    path: "/authname",
    component: authname
  },
  {
    name: "aaa",
    path: "/aaa",
    component: aaa
  },
  {
    name: "addtheaddress",
    path: "/addtheaddress",
    component: addtheaddress
  },
  {
    name: "addtheaddre",
    path: "/addtheaddre",
    component: addtheaddre
  },

  {
    name: "mediaDetails",
    path: "/mediaDetails",
    component: mediaDetails
  },
  {
    name: "dataBase",
    path: "/dataBase",
    component: dataBase
  },
  {
    name: "qian",
    path: "/qian",
    component: qian
  },
  {
    name: "phone",
    path: "/phone/:id",
    component: phone,
    meta: {
      title: ""
    }
  }

  // {
  //   name: "mine",
  //   path: "mine",
  //   component: mine
  // }
];

export default routes; //抛出
