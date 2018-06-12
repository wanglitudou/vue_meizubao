<template>
  <div class="train-container">
    <div>

      <div class="cent_list">
        <div class="list_lists">
          <div class="banner">
            <img :src="data.images" alt="">
          </div>
          <div class="name_project">
            <p>
              <span class="name_pro">{{data.name}}</span>
              <span class="name_col">￥{{data.price}}</span>
            </p>
          </div>
        </div>

        <div class="name_intro">
          <p class="intro_con">
            {{data.content}}
          </p>
        </div>
        <div class="bes_time">
        </div>
      </div>
      <!-- 选择支付方式 -->

      <orderFooter :text="'开始预约'" :count="data.price" :nextFun="nextFun"></orderFooter>
    </div>
    <div class="opcity" v-show="showOpcity" @click="clearOpcity">
    </div>
    <div class="payMethod" v-show="showOpcity">
      <mt-radio title="请选择支付方式" v-model="value" :options="options">
      </mt-radio>
      <div class="pay">
        <mt-button type="danger" style="margin:5px" @click="nextPay">立即支付 </mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Radio } from "mint-ui";
import orderFooter from "../../components/orderFooter.vue";
export default {
  methods: {
    init() {
      this.$axios
        .get(window.ajaxSrc + "/api/meizubao/videoDetail", {
          params: { id: this.$route.query.pid }
        })
        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            this.data = res.data.data;
            console.log(res.data.data.integral);
          }
        })
        .catch(() => {
          console.log("http请求错误");
        });
    },
    //获取用户信息
    initIntegral() {
      this.$axios
        .get(window.ajaxSrc + "/api/meizubao/userInfo", {
          params: { uid: window.localStorage.id }
        })
        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            this.integral = res.data.data.integral;
          }
        })
        .catch(() => {
          console.log("http请求错误");
        });
    },
    //  弹出遮罩选择支付方式
    nextFun: function() {
      this.showOpcity = true;
      // console.log(this.integral)
      if (this.data.integral > this.integral) {
        this.options[1].disabled = true;
      } else {
        this.options[1].disabled = false;
      }
      // this.$axios
      //   .post(window.ajaxSrc + "/api/meizubao/addOrder", {
      //     uid:window.localStorage.id,
      //     g_id:this.data.id,
      //     type:5,
      //     m_type:1,
      //     strtime:"",
      //     stoptime:"",
      //     stage:"",
      //     agreement:"",
      //     image:this.data.images[0],
      //     goods_num:1,
      //     total_price:this.data.price,
      //     goods_name:this.data.name,
      //     address_id:"",
      //     deposit:"",
      //     open_id:window.localStorage.openid,
      //   })
      //   .then(res => {
      //     console.log(res);
      //     if (res.data.status_code == 1001) {
      //       window.location.href=res.data.data.url;
      //     }
      //   })
      //   .catch(() => {
      //     console.log("http请求错误");
      //   });
    },
    // 微信支付 和积分兑换
    nextPay() {
      if (this.value == "") {
        Toast("请选择支付方式");
        return false;
      }
      this.$axios
        .post(window.ajaxSrc + "/api/meizubao/addOrder", {
          uid: window.localStorage.id,
          g_id: this.data.id,
          type: 4,
          m_type: this.value,
          strtime: "",
          stoptime: "",
          stage: "",
          agreement: "",
          image: this.data.images[0],
          goods_num: 1,
          total_price: this.data.price,
          goods_name: this.data.name,
          address_id: "",
          deposit: "",
          open_id: window.localStorage.openid
        })
        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            if (this.value == 2) {
              this.$router.push({ name: "cart" });
              // console.log(11)
            } else {
              window.location.href = res.data.data.url;
            }
          }
        })
        .catch(() => {
          console.log("http请求错误");
        });
      setTimeout(() => {
        this.showOpcity = false;
      }, 500);
    },
    // 隐藏遮罩
    clearOpcity() {
      this.showOpcity = false;
    }
  },
  components: {
    orderFooter
  },

  mounted() {
    this.init();
    this.initIntegral();
  },
  data() {
    return {
      data: [],
      options: [
        {
          label: "微信支付",
          value: "1",
          disabled: false
        },
        {
          label: "积分兑换",
          value: "2",
          disabled: false
        }
      ],
      value: "",
      showOpcity: false,
      integral: ""
    };
  }
};
</script>
<style lang="scss">
@import '../../styles/helper.scss';
.train-container {
  width: 100%;
  background-color: #fff;
  height: calc(100% - 1rem);
}

.cent_list {
  width: 94.7%;
  margin-left: 2.7%;
  height: auto;
  overflow-y: scroll;
}

.list_lists {
  // height: 5.58rem;\
  // height: px2rem(280px);
  width: 100%;
  height: auto;
    // box-shadow: 0 2px 9px 0 #eeeeee;
}

.banner {
  width: 100%;
  height: px2rem(250px);
  margin: 0.2rem auto 0;
  // box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 2px;
}

.banner img {
  width: 100%;
  height: 100%; 
}

.name_project {
  width: 100%;
  height: px2rem(30px);
  line-height: px2rem(30px);
  margin: 0rem auto 0;
  background: #ffffff;
  // box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 2px;
  font-weight: bold;
}

.name_pro {
  font-size: 16px;
  color: #000000;
  letter-spacing: 0;
  margin: 0.2rem 0.2rem;
}

.name_col {
  font-size: 18px;
  color: #f00;
  letter-spacing: 0;
  line-height: 17px;
}

.name_cate {
  width: 7.068rem;
  height: 4.56rem;
  background: #ffffff;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 2px;
  margin: 0.2rem auto 0;
  margin-top: 20px;
}

.pro_cate {
  width: 7.068rem;
  height: 0.912rem;
  line-height: 0.912rem;
  // border: 1px solid #f7f7f7;
  display: flex;
  justify-content: space-between;
  /* padding: 0 20px; */
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
}

.name_intro {
  width: 100%;
  height: auto;
  // box-shadow: 0 2px 9px 0 #EEE;
  // height: px2rem(125px);
  // background: #ffffff;
  // border-radius: 3px;
  // margin: 0.2rem auto 0;
}

.intro_pro {
  margin: 0.2rem;
  font-size: 14px;
  color: #000000;
  letter-spacing: 0;
}

.intro_con {
  margin: 0.2rem;
  // margin:px2rem(16px);
  line-height: px2rem(30px);
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
}

.bes_time {
  /* width: 7.068rem; */
  height: 3rem;
  margin: 0.1rem auto 0;
  background: #ffffff;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 2px;
}

.agree_foot {
  width: 100%;
  height: 1rem;
  background: #fff;
  margin: 0.2rem auto 0;
  margin-top: 2rem;
  position: fixed;
  bottom: 0;
  left: 0;
}

.total_foot {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  display: flex;
  justify-content: space-between;
}

.total_lef {
  width: 70%;
  background: #fff;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
  margin-left: 10px;
}

.add {
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
}

.tinct {
  font-size: 17px;
  color: #fd4689;
  letter-spacing: 0;
}

.total_rig {
  width: 30%;
  text-align: center;
  font-size: 14px;
  color: #ffffff;
  letter-spacing: 0;
  background-image: linear-gradient(-130deg, #fd4689 0%, #fd82d9 100%);
  box-shadow: 0 1px 4px 0 rgba(253, 70, 137, 0.58);
}
.payMethod {
  width: 80%;
  height: auto;
  background: #fff;
  z-index: 6;
  box-shadow: 0 2px 9px 0 #fd82d9;
  position: absolute;
  top: 30%;
  left: 10%;
}
.opcity {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: #666666;
  opacity: 0.5;
  z-index: 5;
}
.mint-radiolist-title {
  text-align: center;
  font-size: 16px;
  color: #000;
}
.pay {
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: #fff;
  display: flex;
  justify-content: center;
}
.pay span {
  display: block;
  padding: 10px;
  background: #fd4689;
  border-radius: 10px;
}
</style>
