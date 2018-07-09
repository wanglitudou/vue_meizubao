// import index from "../views/index.vue";
// import home from "../views/home.vue";
// import catagory from "../views/catagory.vue";
// import cart from "../views/cart.vue";
// import mine from "../views/mine.vue";
// import aaa from "../views/aaa.vue";
// import confirm from "../views/confirm.vue";
// import orderDetails from "../views/orderDetails.vue";
// //引入其他页面的组件

// import detail from "../views/detail/detail.vue";
// import industry from "../views/industry/industry.vue";
// import details from "../views/details/details.vue";
// import cooperation from "../views/cooperation/cooperation.vue";
// import project from "../views/project/project.vue";
// import matching from "../views/matching/matching.vue";
// import train from "../views/train/train.vue";
// import essence from "../views/essence/essence.vue";
// import looksee from "../views/looksee/looksee.vue";
// import seemore from "../views/seemore/seemore.vue";
// import clickpay from "../views/clickpay/clickpay.vue";
// import login from "../views/login/login.vue";
// import ordergoods from "../views/ordergoods/ordergoods.vue";
// import payment from "../views/payment/payment.vue";
// import authname from "../views/authname/authname.vue";
// // import authnames from "../views/authname/authnames.vue";
// import information from "../views/information/information.vue";
// import curriculum from "../views/curriculum/curriculum.vue";
// import coursepage from "../views/coursepage/coursepage.vue";
// import integral from "../views/integral/integral.vue";
// import address from "../views/address/address.vue";
// import addresssite from "../views/address/addresssite.vue";
// import customservice from "../views/customservice/customservice.vue";
// import viewscreen from "../views/viewscreen/viewscreen.vue";
// import photograph from "../views/photograph/photograph.vue";
// import pageindustry from "../views/pageindustry/pageindustry.vue";
// import addtheaddress from "../views/addtheaddress/addtheaddress.vue";
// import mediaDetails from "../views/photograph/mediaDetails.vue";
// import search from "../views/search/search.vue";
// import dataBase from "../views/dataBase/index.vue";
// import qian from "../views/qian/qian.vue";
// import phone from "../views/phone.vue";
// import addtheaddre from "../views/addtheaddress/addtheaddre.vue";

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
    component: resolve => require(["../views/index.vue"], resolve), //懒加载
    children: [
      {
        name: "home",
        path: "home",
        meta: {
          title: "首页"
        },
        component: resolve => require(["../views/home.vue"], resolve)
      },
      {
        name: "catagory",
        path: "catagory",
        meta: {
          title: "分类"
        },
        component: resolve => require(["../views/catagory.vue"], resolve)
      },
      {
        name: "mine",
        path: "mine",
        meta: {
          title: "我的"
        },
        component: resolve => require(["../views/mine.vue"], resolve)
      },
      {
        name: "ordergoods",
        path: "ordergoods",
        component: resolve =>
          require(["../views/ordergoods/ordergoods.vue"], resolve)
      },
      {
        name: "payment",
        path: "payment",
        component: resolve => require(["../views/payment/payment.vue"], resolve)
      },

      {
        name: "coursepage",
        path: "coursepage",
        component: resolve =>
          require(["../views/coursepage/coursepage.vue"], resolve)
      },
      {
        name: "cart",
        path: "cart",
        meta: {
          title: "订单"
        },
        component: resolve => require(["../views/cart.vue"], resolve)
      }
    ]
  },
  {
    name: "detail",
    path: "/detail",
    meta: {
      title: "热租仪器"
    },
    component: resolve => require(["../views/detail/detail.vue"], resolve)
  },
  {
    name: "search",
    path: "/search",
    component: resolve => require(["../views/search/search.vue"], resolve)
  },
  {
    name: "details",
    path: "/details",
    component: resolve => require(["../views/details/details.vue"], resolve),
    meta: {
      keepAlive: true,
      title: "详情页"
    }
  },
  {
    name: "industry",
    path: "/industry",
    component: resolve => require(["../views/industry/industry.vue"], resolve)
  },
  {
    name: "cooperation",
    path: "/cooperation",
    component: resolve =>
      require(["../views/cooperation/cooperation.vue"], resolve)
  },
  {
    name: "project",
    path: "/project",
    component: resolve => require(["../views/project/project.vue"], resolve)
  },
  {
    name: "matching",
    path: "/matching",
    component: resolve => require(["../views/matching/matching.vue"], resolve)
  },
  {
    name: "train",
    path: "/train",
    component: resolve => require(["../views/train/train.vue"], resolve)
  },
  {
    name: "essence",
    path: "/essence",
    component: resolve => require(["../views/essence/essence.vue"], resolve)
  },
  {
    name: "looksee",
    path: "/looksee",
    meta: {
      title: "美业菁英"
    },
    component: resolve => require(["../views/looksee/looksee.vue"], resolve)
  },
  {
    name: "seemore",
    path: "/seemore",
    meta: {
      title: "配套产品"
    },
    component: resolve => require(["../views/seemore/seemore.vue"], resolve)
  },
  {
    name: "clickpay",
    path: "/clickpay",
    meta: {
      title: "我的视频"
    },
    component: resolve => require(["../views/clickpay/clickpay.vue"], resolve)
  },
  {
    name: "curriculum",
    path: "/curriculum",
    meta: {
      title: "我的课程"
    },
    component: resolve =>
      require(["../views/curriculum/curriculum.vue"], resolve)
  },
  {
    name: "integral",
    path: "/integral",
    meta: {
      title: "我的积分"
    },
    component: resolve => require(["../views/integral/integral.vue"], resolve)
  },
  {
    name: "address",
    path: "/address",
    meta: {
      title: "我的地址"
    },
    component: resolve => require(["../views/address/address.vue"], resolve)
  },
  {
    name: "addresssite",
    path: "/addresssite",
    meta: {
      title: "我的地址"
    },
    component: resolve => require(["../views/address/addresssite.vue"], resolve)
  },
  {
    name: "customservice",
    path: "/customservice",
    component: resolve =>
      require(["../views/customservice/customservice.vue"], resolve)
  },
  {
    name: "viewscreen",
    path: "/viewscreen",
    component: resolve =>
      require(["../views/viewscreen/viewscreen.vue"], resolve)
  },
  {
    name: "photograph",
    path: "/photograph",
    meta: {
      title: "资料库"
    },
    component: resolve =>
      require(["../views/photograph/photograph.vue"], resolve)
  },
  {
    name: "pageindustry",
    path: "/pageindustry",
    component: resolve =>
      require(["../views/pageindustry/pageindustry.vue"], resolve)
  },
  {
    name: "login",
    path: "/login",
    component: resolve => require(["../views/login/login.vue"], resolve)
  },
  {
    name: "information",
    path: "/information",
    component: resolve =>
      require(["../views/information/information.vue"], resolve)
  },
  {
    name: "confirm",
    path: "/confirm/:type",
    component: resolve => require(["../views/confirm.vue"], resolve),
    meta: {
      keepAlive: true
    }
  },
  {
    name: "order_details",
    path: "/order_details",

    component: resolve => require(["../views/orderDetails.vue"], resolve)
  },
  {
    name: "authname",
    path: "/authname",
    component: resolve => require(["../views/authname/authname.vue"], resolve)
  },
  {
    name: "aaa",
    path: "/aaa",
    component: resolve => require(["../views/aaa.vue"], resolve)
  },
  {
    name: "qqq",
    path: "/qqq",
    component: resolve => require(["../views/qqq.vue"], resolve)
  },
  {
    name: "addtheaddress",
    path: "/addtheaddress",
    component: resolve =>
      require(["../views/addtheaddress/addtheaddress.vue"], resolve)
  },
  {
    name: "addtheaddre",
    path: "/addtheaddre",
    component: resolve =>
      require(["../views/addtheaddress/addtheaddre.vue"], resolve)
  },

  {
    name: "mediaDetails",
    path: "/mediaDetails",
    component: resolve =>
      require(["../views/photograph/mediaDetails.vue"], resolve)
  },
  {
    name: "dataBase",
    path: "/dataBase",
    component: resolve => require(["../views/dataBase/index.vue"], resolve)
  },
  {
    name: "qian",
    path: "/qian",
    component: resolve => require(["../views/qian/qian.vue"], resolve)
  },
  {
    name: "phone",
    path: "/phone/:id",
    component: resolve => require(["../views/phone.vue"], resolve),
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
