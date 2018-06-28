<template>
  <div class="main">
    <!-- <div class="total">
            <div class="payment">
                <div class="pay_one">
                    <p class="pay_num">
                        <span class="pay_code">201802113470380334</span>
                        <span class="pay_wait">代付款</span>
                    </p>
                </div>
                <div class="pay_order">
                    <div class="pay_left">
                        <img src="../assets/images/icon1.jpg" alt="">
                    </div>
                    <div class="pay_right">
                        <p class="name_ord">
                            仪器名称
                        </p>
                        <p class="amount">
                            <span class="consume">￥1200.00</span>
                            <span>数量：
                                <span>3</span>
                            </span>
                        </p>
                    </div>
                </div>
                <div class="freight">
                    <p class="reckon">
                        <span class="total_reck">共1件仪器</span>
                        <span>合计￥
                            <span>1200.00</span>
                        </span>
                        <span>（含运费0.00）</span>
                    </p>
                </div>
            </div>
        </div> -->
    <!-- <div class="payment">
           <div class="paymenttop">
             <div>d123321321321</div>
             <div>代发货</div>
           </div>
           <div class="paymentcenter">
                <div class="img"><img src="../assets/images/icon1.jpg" alt=""></div>
                <div class="detail">
                   <p class="name">仪器名称</p>
                   <p class="content">十点开会到的空间撒谎的空间撒但是看到空间撒大大会上的空间撒旦等会撒大口径sad打卡机等会撒大口径sad</p>
                   <div class="numPrice">
                       <p class="num">数量：3</p>
                       <p class="price">￥：1200</p>
                   </div>
                </div>
           </div>
           <div class ="paymentbottom">
              

           </div>

      </div> -->
    <order :orderlist="orderlist"
           :receipt="receipt"
           :cancel="cancel"
           :todetail="todetail"></order>
  </div>
</template>
<script>
import order from "./order.vue";
import { find, remove } from "lodash";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      status: 0,
      page: 1,
      uid: 1,
      type: 0,
      orderlist: []
    };
  },
  created() {
    this.getOrder();
    let obj = [{ a: 1 }, { b: 2 }, { c: 3 }];
    remove(obj, { a: 1 });
    console.log(obj);
    //  console.log(vv)
  },
  methods: {
    //   确认收货
    receipt(id) {
      console.log(id);
      this.$axios
        .post("http://mzbao.weiyingjia.org/api/meizubao/updateOrderStatus", {
          uid: 1,
          id: id,
          status: 3
        })
        .then(res => {
          if (res.data.status_code == "1001") {
            remove(this.orderlist, { id: id });
            Toast("修改成功");
          } else {
            Toast("修改失败");
          }
        });
    },
    // 取消订单
    cancel(id) {
      console.log(id);
    },
    todetail(id) {
      this.$router.push({
        name: "order_details",
        params: {
          id: id
        }
      });
    },
    getOrder() {
      let that = this;
      //热租仪器分类
      this.$axios
        .post("http://mzbao.weiyingjia.org/api/meizubao/orderList", {
          uid: this.uid,
          type: this.type,
          status: this.status,
          page: this.page
        })
        .then(res => {
          console.log(res.data.data);
          if (res.data.status_code == "1001") {
            that.orderlist = res.data.data;
            console.log(that.orderlist);
          }
        })
        .catch(() => {
          console.log("查询失败");
        });
    }
  },
  components: {
    order,
    Toast
  }
};
</script>
<style scoped>
.total {
  width: 96%;
  height: auto;
  margin-top: 10px;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 3px;
  margin-left: 2%;
}
.payment {
  width: 100%;
  margin: 0.2rem auto 0;
}
/* .pay_one {
  width: 100%;
  height: 36px;
  line-height: 36px;
  display: flex;
  justify-content: space-between;
}
.pay_num {
  width: 100%;
  height: 36px;
  line-height: 36px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
.pay_order {
  width: 100%;
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
  width: 100%;
  /* height: 66px; */
/* margin-top: 10px; */
/* } */
.main {
  font-size: 62.5%;
  font-family: PingFangSC-Regular;
}
</style>
