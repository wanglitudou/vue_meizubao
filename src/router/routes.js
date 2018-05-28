import index from "../views/index.vue";
import home from "../views/home.vue";
import catagory from "../views/catagory.vue";
import cart from "../views/cart.vue";
import mine from "../views/mine.vue";
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
import information from "../views/information/information.vue";
import curriculum from "../views/curriculum/curriculum.vue";
import coursepage from "../views/coursepage/coursepage.vue";
import integral from "../views/integral/integral.vue";
import address from "../views/address/address.vue";
import customservice from "../views/customservice/customservice.vue";
import viewscreen from "../views/viewscreen/viewscreen.vue";
import photograph from "../views/photograph/photograph.vue";
import pageindustry from "../views/pageindustry/pageindustry.vue";
import sign from "../views/sign.vue";

let routes = [{
    path: "/",
    redirect: "./index/home"
  },
  {
    name: "index",
    path: "/index",
    component: index,
    children: [{
        name: "home",
        path: "home",
        component: home
      },
      {
        name: "catagory",
        path: "catagory",
        component: catagory
      },
      {
        name: "cart",
        path: "cart",
        component: cart
      },
      {
        name: "mine",
        path: "mine",
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
      }
    ]
  },
  {
    name: "detail",
    path: "/detail",
    component: detail
  },
  {
    name: "details",
    path: "/details",
    component: details,
    meta: {
      keepAlive: true
    },
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
    component: looksee
  },
  {
    name: "seemore",
    path: "/seemore",
    component: seemore
  },
  {
    name: "clickpay",
    path: "/clickpay",
    component: clickpay
  },
  {
    name: "curriculum",
    path: "/curriculum",
    component: curriculum
  },
  {
    name: "integral",
    path: "/integral",
    component: integral
  },
  {
    name: "address",
    path: "/address",
    component: address
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
    component: confirm
  },
  {
    name: "order_details",
    path: "/order_details/:type",
    component: orderDetails
  },
  {
    name: "authname",
    path: "/authname",
    component: authname
  }
];

export default routes; //抛出
