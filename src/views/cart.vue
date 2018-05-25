
<template>
  <div class="container">
    <div class="pic_view">
      <div class="nav_pic">
        <span v-for="(item,index) in tabs"
              :key="index"
              :class="num==index?'dora':''"
              @click="tab(index)">{{item}}</span>
      </div>

      <div class="pic_ture">

        <div v-show="num==0">
          <div class="total">
            <div class="payment">
              <div class="pay_one">
                <p class="pay_num">
                  <span class="pay_code">201802113470380334</span>
                  <span class="pay_wait">代付款</span>
                </p>
              </div>
              <div class="pay_order">
                <div class="pay_left">
                  <img src="../assets/images/icon1.jpg"
                       alt="">
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
          </div>
          <div class="total_other">
            <div class="payment">
              <div class="pay_one">
                <p class="pay_num">
                  <span class="pay_code">201802113470380334</span>
                  <span class="pay_wait">代付款</span>
                </p>
              </div>
              <div class="pay_order">
                <div class="pay_left">
                  <img src="../assets/images/icon1.jpg"
                       alt="">
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
              <div class="btn_cent">
                <span class="third">续约</span>
                <span class="two">退还</span>

              </div>

            </div>
          </div>

        </div>
        <!-- <div v-show="num==1">
          2222
        </div>
        <div v-show="num==3">
          333
        </div>
        <div v-show="num==4">
          444
        </div> -->
      </div>
      <div class="view_vie">

      </div>
      <div class="view_view">

      </div>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabs: ["全部订单", "待付款", "进行中", "已完成"],
      num: 0
    };
  },
  methods: {
    tab(index) {
      console.log(index)
      this.num = index;
    }
  }
};
</script>

<style scoped>
.dora {
  border-bottom: 2px solid #fd4689;
}
.container {
  width: 100%;
  height: auto;
  height: calc(100% -0.88rem);
  background: #fff;
}
.pic_view {
  width: 7.5rem;
  height: auto;
  margin: 0.2rem auto 0;
}
.nav_pic {
  width: 7.5rem;
  height: 0.88rem;
  line-height: 0.88rem;
  box-shadow: 0 2px 9px 0 #eeeeee;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  font-size: 16px;
  color: #000;
}
.total {
  width: 7.5rem;
  height: auto;
  margin-top: 10px;
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
.payment {
  width: 7.1rem;
  margin: 0.2rem auto 0;
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
</style>
