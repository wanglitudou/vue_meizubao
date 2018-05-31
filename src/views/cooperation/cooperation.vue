<template>
  <div class="container">
    <div class="con_cents">
      <div class="con_pro">


        <div class="banner">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="item in data.images">
                <img :src="item" alt="">
              </div>
            </div>
          </div>
        </div>

        <div class="conpro_name">
          <p class="conpro_pro">
            <span class="conname_name">{{data.name}}</span>
            <span class="conmoney">￥{{data.price}}</span>
          </p>
        </div>
      </div>
      <div class="cent_cate">
        <p class="pro_cate">
          <span>项目类别：</span>
          <span>{{data.typeName}}</span>
        </p>
        <p class="pro_cate">
          <span>适合人群：</span>
          <span>{{data.suitable}}</span>
        </p>

        <p class="pro_cate">
          <span>项目禁忌：</span>
          <span>{{data.taboo}}</span>
        </p>
        <p class="pro_cate">
          <span>分成比例：</span>
          <span>{{data.divideinto}}</span>
        </p>

        <p class="pro_cate">
          <span>报名开始时间：</span>
          <span>{{data.sigh_strtime}}</span>
        </p>
        <p class="pro_cate">
          <span>分成比例：</span>
          <span>{{data.sigh_stoptime}}</span>
        </p>


        <p class="pro_cate">
          <span>项目开始时间：</span>
          <span>{{data.strtime}}</span>
        </p>
        <p class="pro_cate">
          <span>项目结束时间：</span>
          <span>{{data.stoptime}}</span>
        </p>

        <!--<p class="pro_cate">-->
          <!--<span>订金</span>-->
          <!--<span>{{data.money}}</span>-->
        <!--</p>-->


      </div>
      <div class="pro_intro">
        <p class="pro_introduce">项目介绍</p>
        <p class="pro_int">{{data.content}}</p>
      </div>
      <div class="order_name">
        <p class="good_fail">
          <span>预付诚意金：</span>
          <span>￥{{data.money}}</span>
        </p>
      </div>
    </div>
    <orderFooter :text="'立即下单'" :count="data.money" :nextFun="createOrder"  ></orderFooter>

  </div>
</template>
<script>
  import orderFooter from '../../components/orderFooter.vue'
export default {
  data() {
    return {
      data:[],
    };
  },

  mounted() {
    this.init();
  },

  components: {
    orderFooter
  },
  methods:{
    init(){
      this.$axios
        .get(window.ajaxSrc + "/api/meizubao/projectDetail", {
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

    createOrder: function() {


      this.$axios
        .post(window.ajaxSrc + "/api/meizubao/addOrder", {
            uid:47,
            g_id:this.data.id,
            type:5,
            m_type:1,
            strtime:"",
            stoptime:"",
            stage:"",
            agreement:5,
            image:this.data.images[0],
            goods_num:1,
            total_price:this.data.money,
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
        .catch((err) => {
          console.log("http请求错误");

          alert(JSON.stringify(err));

        });
    },
  }
};
</script>
<style scoped>
.container {
  width: 100%;
  height: calc(100% - 1rem);
  background: #fff;
}
.con_cents {
  width: 7.1rem;
  height: auto;
  overflow-y: scroll;
  margin: 0.2rem auto 0;
}
.con_pro {
  width: 7.1rem;
  height: 6rem;
  background: #ffffff;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 2px;
  margin: 0.2rem auto 0;
}
.banner {
  width: 7.1rem;
  height: 5rem;
}
.swiper-container{
  height:5rem;
}
.conpro_img img {
  width: 100%;
  height: 100%;
}
.conpro_pro {
  width: 7.1rem;
  height: 1rem;
  line-height: 1rem;
}
.conname_name {
  font-size: 16px;
  color: #000000;
  letter-spacing: 0;
  margin-left: 0.2rem;
}
.conmoney {
  font-size: 18px;
  color: #fd4689;
  letter-spacing: 0;
  line-height: 17px;
}
.cent_cate {
  width: 7.1rem;

  margin: 0.2rem auto 0;
  margin-bottom: 0.5rem;
}
.pro_cate {
  width: 7.1rem;
  height: 0.8rem;
  line-height: 0.8rem;
  border-bottom: 1px solid #f7f7f7;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
}
.pro_intro {
  width: 7.1rem;
  height: 2rem;
  margin-top: 0.2rem;
  margin: 0.2rem auto 0;
  background: #ffffff;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 3px;
}
.pro_introduce {
  margin: 0.08rem;
}
.pro_int {
  padding: 0 10px;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
}
.order_name {
  width: 7.1rem;
  margin: 0.2rem auto 0;
  margin-bottom: 20px;
  background: #ffffff;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 2px;
}
.order_time {
  width: 7.1rem;
  height: 0.6rem;
  line-height: 0.6rem;
}
.order_tim {
  margin: 0.2rem;
  font-size: 14px;
  color: #000000;
  letter-spacing: 0;
}
.begin_str {
  width: 7.1rem;
  height: 1rem;
  line-height: 1rem;
  border-bottom: 1px solid #f7f7f7;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
}
.good_fail {
  width: 7.1rem;
  height: 0.8rem;
  line-height: 0.8rem;
  padding: 0 15px;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
  border-bottom: 1px solid #f7f7f7;
}
.net_sign {
  width: 7.1rem;
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 14px;
  color: #fd4689;
  letter-spacing: 0;
  text-align: center;
}
.name_foot {
  width: 100%;
  margin-top: 20px;
  background: #fff;
  box-shadow: 0 2px 9px 0 #eeeeee;
  margin: 0.2rem auto 0;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
}
.total_foot {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  box-shadow: 0 1px 9px 0 #eeeeee;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  margin: 0.2rem auto 0;
}

.total_lef {
  width: 70%;
  height: 1rem;
  line-height: 1rem;
  line-height: 1rem;
}
.add {
  margin-left: 10px;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
}
.tinct {
  font-size: 17px;
  color: rgba(253, 70, 137, 0.58);
  letter-spacing: 0;
  line-height: 20px;
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
</style>
