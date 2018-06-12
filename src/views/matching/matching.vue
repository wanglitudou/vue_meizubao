<template>
  <div class="match-container">
    <div class="list_bans">
      <div class="matchBanner">
        <img :src="data.images && data.images[0]"
             alt="">
      </div>
      <div class="pro_name">
        <span class="pro_names">{{data.name}}</span>
      </div>
      <div class="list_coor">
        <p class="cate_pro">
          <span>配合仪器: {{data.instrument}}</span>
        </p>
        <p class="cate_cen">
          <span>配合产品:</span>
          <span>422266522335118</span>
        </p>
      </div>
      <div class="price_cent">
        <p class="pri_cen pri_common">
          <span class="zro">零售价</span>
          <span>￥{{data.price}}</span>
        </p>
        <p class="pri_lis pri_common">
          <span class="zro">折扣价</span>
          <span class="pri_mon">￥{{data.discount}}</span>
        </p>
        <div class="pri_common">
          <span class="zro">购买数量</span>


          <div class="spinner">
            <div class="decrease" @click="decrease" v-bind:class="{ disable: number==1  }">-</div>
            <input type="number" class="value" maxlength="3" v-model="number"/>
            <div class="increase" @click="increase">+</div>
          </div>


        </div>
        <!--<p class="pri_common">-->
        <!--<span class="zro">总金额</span>-->
        <!--<span class="price_con">￥4500</span>-->
        <!--</p>-->
      </div>
      <div class="pro_detail">
        <p class="pro_det">产品详情</p>
        <p class="pro_beg">{{data.details}}</p>
      </div>
    </div>

    <orderFooter :text="'立即下单'" :count="number*data.discount" :nextFun="jumpToConfirm"></orderFooter>

  </div>
</template>
<script>
  import orderFooter from '../../components/orderFooter.vue'
  export default {

    data() {
      return {
        data: [],
        number:1,
      };
    },


    mounted(){
      this.init();
    },
    methods: {



      decrease: function () {
        if (this.number>1) {
          this.number--
        } else {
          return false
        }
      },
      increase: function () {
        this.number++
      },
      jumpToConfirm: function () {



        this.$router.push({
//          path: '/confirm/instrument',
          name: "confirm",
          params: {
            type: 3,
            g_id:this.$route.query.pid,
            m_type:1,
            strtime:"",
            stoptime:"",
            stage:"",
            agreement:"",
            image:this.data.images[0],
            goods_num:this.number,
            total_price:this.number*this.data.discount,
            goods_name:this.data.name,
            deposit:"",



            price:this.data.discount,

          }
        })



      },

      createOrder:function(){
        this.$axios
          .post(window.ajaxSrc + "/api/meizubao/addOrder", {
            uid:window.localStorage.id,
            g_id:this.data.id,
            type:3,
            m_type:1,
            strtime:"",
            stoptime:"",
            stage:"",
            agreement:"",
            image:this.data.images[0],
            goods_num:this.number,
            total_price:this.number*this.data.discount,
            goods_name:this.data.name,
            address_id:"",
            deposit:"",
          })
          .then(res => {
            console.log(res);
            if (res.data.status_code == 1001) {
              this.data = res.data.data;
            }
          })
          .catch(() => {
            console.log("http请求错误");
          });
      },
      init(){
        this.$axios
          .get(window.ajaxSrc + "/api/meizubao/productDetail", {
            params: { id: this.$route.query.pid }
          })
          .then(res => {
          console.log(res);
        if (res.data.status_code == 1001) {
          this.data = res.data.data;
        }
      })
      .catch(() => {
          console.log("http请求错误");
      });


      },
    },
    components: {
      orderFooter,
    },


  };
</script>
<style lang="scss">
@import '../../styles/helper.scss';
  .match-container {
    width: 100%;
    /* height: calc(100% - 0.88rem); */
    height: auto;
    background: #fff;
  }

  .list_bans {
    width: 94.5%;
    margin: 0 2.7%;
    overflow-y: scroll;
    padding-bottom: 1.3rem;
  }

  .matchBanner {
    width: 100%;
    height: 5rem;
    /* margin: 0.2rem  0; */
  }

  .matchBanner img {
    width: 100%;
    height: 100%;
  }

  .pro_name {
    height: px2rem(47px);
    line-height: px2rem(47px);
    border: 1px solid #f7f7f7;
    // margin-left: 2px;
  }

  .pro_names {
    margin-left: 20px;
    font-size: px2rem(16px);
    color: #000000;
    letter-spacing: 0;
    color: #000;
  }

  .list_coor {
    width: 100%;
    height: px2rem(90px);
    margin-top: px2rem(15px);
    border-radius: 2px;
  }

  .cate_pro {
    width: 100%;
    height: px2rem(44px);
    line-height: px2rem(44px);
    border: 1px solid #f7f7f7;
  }

  .cate_pro span {
    margin-left: 20px;
    font-size: px2rem(14px);
    color: #666666;
    letter-spacing: 0;
  }

  .cate_cen {
    width: 100%;
    height: px2rem(44px);
    line-height: px2rem(44px);
    border: 1px solid #f7f7f7;
  }

  .cate_cen span {
    margin-left: 20px;
    font-size: px2rem(14px);
    color: #666666;
    letter-spacing: 0;
  }

  .price_cent {
    width: 100%;
    height: px2rem(138px);
    background: #ffffff;
    box-shadow: 0 2px 9px 0 #eeeeee;
    border-radius: 2px;
    margin-top: 5px;
  }

  .pri_common {
    width: 100%;
    height: px2rem(44px);
    line-height: px2rem(44px);
    border-bottom: 1px solid #f7f7f7;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    font-size: px2rem(14px);
  }

  .pri_mon {
    font-size: 14px;
    color: #ff272d;
    letter-spacing: 0;
  }

  .price_con {
    font-size: 14px;
    color: #fd4689;
    letter-spacing: 0;
  }

  .zro {
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
  }

  .pro_detail {
    width:100%;
    height: auto;
    // background: #ffffff;
    box-shadow: 0 2px 9px 0 #EEE;
    border-radius: px2rem(3px);
   overflow: hidden;
    margin-top: px2rem(15px);
  }

  .pro_det {
    // padding: 0.2rem;
    font-size: px2rem(14px);
    color: #000000;
    letter-spacing: 0;
    font-weight: bold;
    margin: px2rem(10px)
  }

  .pro_beg {
    // padding: 0.1rem;
    font-size: px2rem(14px);
    color: #666666;
    letter-spacing: 0;
    margin-left: px2rem(10px);
    line-height: px2rem(20px);
    margin-bottom: px2rem(20px);
  }

  .spinner {
    display: inline-block;
  }

  .decrease, .value, .increase {
    height: 26px;
    width: 26px;

    display: inline-block;
    vertical-align: middle;
  }

  .value {
    width: 30px;
    font: 16px Arial;
    line-height: 26px;
    text-align: center;
    background-color: #f96198;
    border: none;
    color: #fff;
  }

  .decrease, .increase {
    display: inline-block;
    vertical-align: middle;
    -moz-box-shadow: 0 0 2px #999 inset; /* For Firefox3.6+ */
    -webkit-box-shadow: 0 0 2px #999 inset; /* For Chrome5+, Safari5+ */
    box-shadow: 0 0 2px #999 inset;
    color: #e5312a;
    line-height: 26px;
    text-align: center;
  }

  .decrease {
    border-bottom-left-radius: 3px;
    border-top-left-radius: 3px;
  }

  .disable {
    background-color: #eee;
  }

  .increase {
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
  }

</style>
