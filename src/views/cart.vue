
<template>
  <div class="cartcontainer">
    <div class="cart_pic_view">
      <div class="nav_pic">

        <div class="tabBar">
          <button @click="select">{{statusCode}}</button>
          <div class="bgContent"  v-show="ulShow">
            <span class="triangular"></span>
            <ul class="uli">
              <li class="status_item" v-for="(optionItem,index) in options" :key="index" @click="optionLi(optionItem,index)">{{optionItem.item}}</li>
            </ul>
          </div>
        </div>
        <div class="tabBar" v-for="(item,index) in tabs" :key="index">
          <div class="status" :class="tabNum == index ?'active':''" @click="tabClick(item.id,index)">
            {{item.item}}
          </div>
        </div>
        <!-- <div class="tabBar"></div> -->
        <!-- <div class="tabBar"></div> -->
      </div>

      <order :orderlist="orderlist" :receipt="receipt" :cancel="cancel" :todetail="todetail" :loadMore="loadMore" :load="load" :toPay="toPay" :complete="complete" :renewal="renewal" :back="back"></order>

    </div>
  </div>
</template>
<script>
//  aa(){
//       if (window.history && window.history.pushState) {
//   window.addEventListener('popstate', () => {
//     let hashLocation = location.hash
//     let hashSplit = hashLocation.split('#/')
//     let hashName = hashSplit[1]

//    let hashSplit1 =  hashName.split('/')
//    console.log(hashSplit1[0])
//    if(hashSplit1[0] == 'cart'){
//      this.$route.push('/name');
//    }
//   })
//    }
// }
import order from "../components/order.vue";
import { find, remove, filter, forEach } from "lodash";
import { Spinner, Toast, Indicator } from "mint-ui";
export default {
  data() {
    return {
      tabs: ["待付款", "进行中", "已完成"],
      tabs: [
        { id: 1, item: "待付款" },
        { id: 2, item: "进行中" },
        { id: 3, item: "已完成" }
      ],
      statusCode: "全部订单",
      status: 0, //订单的三种状态 1：代付款，2：进行中，3：已完成
      type: 0, //四大类产品 0:全部 ，1：仪器， 2：技师，3：产品，5：项目
      options: [
        { id: 0, item: "全部订单" },
        { id: 1, item: "仪器订单" },
        { id: 2, item: "技师订单" },
        { id: 3, item: "产品订单" },
        { id: 5, item: "项目订单" }
      ],
      num: 0,
      tabNum: 3,
      uid: window.localStorage.getItem("id"),
      ulShow: false,
      page: 1,
      orderlist: [],
      count: 15,
      load: true
    };
  },
  created() {
    Indicator.open();
    this.getOrder(this.type, this.status, this.page, this.uid);
  },
  methods: {
    tab(index) {
      console.log(index);
      this.num = index;
    },
    // 点击选择订单
    select() {
      this.ulShow = true;
      setTimeout(() => {
        this.ulShow = false;
      }, 2500);
    },
    // 点击下拉框选择  订单的状态 例如：仪器的订单  产品的订单
    optionLi(value, index) {
      this.ulShow = false;
      this.statusCode = value.item;
      this.type = value.id;
      this.orderlist = [];
      this.getOrder(this.type, this.status, this.page, this.uid);
    },
    tabClick(item, index) {
      // console.log(index)
      (this.tabNum = index), (this.ulShow = false);
      this.status = item;
      this.page = 1;
      this.orderlist = [];
      console.log(this.status);
      this.getOrder(this.type, this.status, 1, this.uid);
    },
    // 根据状态获取order列表
    getOrder(type, status, page, uid) {
      let that = this;
      //热租仪器分类
      this.$axios
        .post("http://mzbao.weiyingjia.org/api/meizubao/orderList", {
          uid: uid,
          type: type,
          status: status,
          page: page
        })
        .then(res => {
          // console.log(res.data.data);
          if (res.data.status_code == "1001") {
            Indicator.close();
            if (res.data.data.length < 15) {
              this.load = false;
            } else {
              this.load = true;
            }

            that.orderlist = this.orderlist.concat(res.data.data);
            console.log(that.orderlist);
          }
        })
        .catch(() => {
          console.log("查询失败");
        });
    },
    // 加载更多~~~
    loadMore() {
      this.page++;
      console.log(this.page);

      this.getOrder(this.type, this.status, this.page, this.uid);
    },
    //确认收货
    receipt(type, id) {
      console.log(id);
      let status = 6;
      if (type == 3) {
        status = 7;
      }
      this.$axios
        .post("http://mzbao.weiyingjia.org/api/meizubao/updateOrderStatus", {
          uid: this.uid,
          id: id,
          status: status
        })
        .then(res => {
          if (res.data.status_code == "1001") {
            //  remove(this.orderlist,{"id":id})
            Toast("确认成功");

            if (type == 3) {
              var result2 = filter(this.orderlist, { id: id });
              forEach(result2, function(item) {
                item.status = 7;
              });
            } else {
              var result2 = filter(this.orderlist, { id: id });
              forEach(result2, function(item) {
                item.status = 6;
              });
            }
            //  this.getOrder()
          } else {
            Toast("确认失败");
          }
        });
    },
    //取消订单
    cancel(id) {
      console.log(id);
      this.$axios
        .post("http://mzbao.weiyingjia.org/api/meizubao/updateOrderStatus", {
          uid: this.uid,
          id: id,
          status: 8
        })
        .then(res => {
          if (res.data.status_code == "1001") {
            //  remove(this.orderlist,{"id":id})
            Toast("取消成功");

            var result2 = filter(this.orderlist, { id: id });
            forEach(result2, function(item) {
              item.status = 8;
            });

            //  this.getOrder()
          } else {
            Toast("确认失败");
          }
        });
    },
    //去详情页
    todetail(id) {
      console.log(id);
      this.$router.push({
        name: "order_details",
        params: {
          id: id
        }
      });
    },
    // 立即付款
    toPay(id) {
      this.$router.push({
        name: "order_details",
        params: {
          id: id
        }
      });
    },
    //确认收货物
    complete(id) {
      this.$axios
        .post("http://mzbao.weiyingjia.org/api/meizubao/updateOrderStatus", {
          uid: this.uid,
          id: id,
          status: 5
        })
        .then(res => {
          if (res.data.status_code == "1001") {
            //  remove(this.orderlist,{"id":id})

            Toast("修改成功");
            var result2 = filter(this.orderlist, { id: id });
            forEach(result2, function(item) {
              item.status = 5;
            });

            //  this.getOrder()
          } else {
            Toast("修改失败");
          }
        });
    },
    //退还
    back(id) {
      this.$router.push({
        name: "order_details",
        params: {
          id: id
        }
      });
    },
    //续约
    renewal(id) {
      this.$router.push({
        name: "order_details",
        params: {
          id: id
        }
      });
    }
  },
  watch: {},
  components: {
    order
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/helper.scss";
.dora {
  border-bottom: 2px solid #fd4689;
}
.cartcontainer {
  width: 100%;
  height: 100%;
  // position: relative;
  background: #fff;
}
.cart_pic_view {
  width: 100%;
  height: 100%;
  // margin: 0.2rem auto 0;
}
.nav_pic {
  width: 100%;
  height: px2rem(44px);
  line-height: px2rem(44px);
  box-shadow: 0 2px 9px 0 #eeeeee;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  font-size: px2rem(16px);
  color: #999;
  position: fixed;
  top: 0;
  z-index: 3;
  background: #fff;
}
.nav_pic .tabBar {
  width: 24%;
  text-align: center;
}
.nav_pic span a {
  color: #000;
  text-decoration: none;
}
.total {
  width: 7.5rem;
  height: auto;
  /* margin-top: 10px; */
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 3px;
}
.total_other {
  width: 7.5rem;
  height: auto;
  margin-top: 10px;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 3px;
}

.pay_one {
  width: 7.1rem;
  height: 36px;
  line-height: 36px;
  display: flex;
  justify-content: space-between;
}
.pay_num {
  width: 7.1rem;
  height: 36px;
  line-height: 36px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
.pay_wait {
  font-size: 14px;
  color: #ff272d;
}
.pay_code {
  font-size: 14px;
  color: #6666;
}
.pay_order {
  width: 7.1rem;
  height: 86px;
  background: #fbfbfb;
  border-radius: 3px;
  border: 1px solid #f7f7f7;
  display: flex;
  justify-content: space-between;
}
.pay_left {
  width: 30%;
  height: 86px;
  line-height: 86px;
  text-align: center;
}
.pay_right {
  width: 70%;
  height: 86px;
}
.pay_left img {
  width: 87.8px;
  height: 66px;
  margin-top: 10px;
}
.name_ord {
  margin: 0.2rem;
  font-size: 16px;
  color: #000000;
}
.amount {
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
}
.consume {
  font-size: 13px;
  color: #ff272d;
}
.freight {
  width: 7.1rem;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  color: #666666;
  border: 1px solid #f2f2f2;
}
.reckon {
  width: 7.1rem;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  color: #666666;
}
.total_reck {
  margin-left: 83px;
}
.return_back {
  border: 1px solid #f00;
  width: 7.1rem;
  height: 56px;
  line-height: 56px;
}
.btn_cent {
  width: 100%;
  height: 1.12rem;
  line-height: 0.72rem;
  margin-top: 0.3rem;
}
.btn_cent .one {
  float: left;
  border: 1px solid #00a5ff;
  padding: 0 10px;
  margin-left: 0.2rem;
  font-size: 14px;
  color: #00a5ff;
  letter-spacing: 0;
  border-radius: 5px;
}
.btn_cent .two {
  float: right;
  border: 1px solid #ccc;
  padding: 0 10px;
  margin-right: 30px;
  font-size: 14px;
  color: #cccccc;
  letter-spacing: 0;
  border-radius: 5px;
}
.btn_cent .third {
  float: right;
  border: 1px solid #fd4689;
  padding: 0 10px;
  margin-right: 30px;
  font-size: 14px;
  color: #fd4689;
  letter-spacing: 0;
  border-radius: 5px;
}
.active {
  display: block;
  color: #000;
  border-bottom: 2px solid #fd4689;
}
.bgContent {
  width: px2rem(118px);
  height: auto;
  box-shadow: 0 2px 4px #fd4689;
  position: relative;
  background: #fff;
   filter: drop-shadow(0 0 6px  #FD4689); 
  border-radius: px2rem(5px);
}
.triangular{
  position:absolute;
     border-left: 10px solid transparent;
                border-right: 10px solid transparent; 
                border-bottom: 10px solid #fff;
               
                position: absolute;
                top: -10px;
                left: 50%;
                margin-left: -10px; 
}
.uli {
  background: #fff;
  z-index: 3;
}
.status_item{
  font-size: px2rem(14px);
  color:#555;
  line-height: px2rem(40px);
}
button {
  border: none;
  background: #fff;
  outline: none;
  position: relative;
}
button::after {
  content: "";
  width: 14px;
  height: 8px;
  background: url(../assets/images/jian.png) no-repeat center;
  /* //通过定位将图标放在合适的位置 */
  position: absolute;
  top: 40%;
  /* margin-bottom: 10px; */
  /* //给自定义的图标实现点击下来功能 */
  pointer-events: none;
  transform: rotate(180deg);
}
.nav {
  width: 100%;
  height: 1.1rem;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #ffffff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.05);
  padding-top: 0.15rem;
  box-sizing: border-box;
  color: #999;
  /* box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.05); */
}
.nav li {
  flex: 1;
  text-align: center;
}
.router-link-active {
  color: #fd4689;
}
.nav li span {
  display: block;
  height: 50%;
  margin: 0 auto;
  font-size: 10px;
}
</style>
