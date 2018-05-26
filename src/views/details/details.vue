<template>
  <div class="container">
    <div class="list_list">
      <!-- <div class="banner">
          <img src="../../assets/images/icon1.jpg"
               alt="">
      </div> -->
      <div class="banner">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <!-- <img src=""
                   alt=""
                   v-for="(item,index) in url "
                   :src="item.images"
                   name="pic"
                   :key="item.index"
                   @click="updataImg(item.href)"> -->
            </div>
          </div>
        </div>
      </div>
      <div class="ban_cent">
        <p class="name_cent">
          <span class="name">{{data.name}}</span>
          <span class="dollar">￥ {{data.price}}元</span>
        </p>
        <p class="name_rent">
          <span class="monthly">
            <a>￥{{data.firstrent}}</a>/月</span>
          <span class="renewal">续租 :
            <a>￥{{data.continued}}</a>
          </span>
          <span></span>
        </p>
        <p class="name_words">
          <span>{{data.centent}}</span>
        </p>
        <p class="name_cate">
          <span>起租期:{{data.num}}个月</span>
          <span>租赁押金:￥{{data.deposit}}</span>
          <span>{{data.place}}</span>
        </p>
      </div>
      <div class="product">
        <p class="name_pro">
          <span>配合产品 ：</span>
          <span>{{data.match_product}}</span>
        </p>

      </div>
      <div class="data_name">
        <div class="begin_rent">
          <span>选择你租赁的时长(月):</span>
          <div class="spinner">
            <div class="decrease"
                 @click="decrease"
                 v-bind:class="{ disable: month==data.num }">-</div>
            <input type="number"
                   class="value"
                   maxlength="3"
                   v-model="month" />
            <div class="increase"
                 @click="increase">+</div>
          </div>

          <!--<span v-on:click="datePicker('date1')"> 起租日期 <span>{{date1}}</span>-->
          <!--<i class="iconfont icon-xiaoxizhongxin"></i>-->
          <!--</span>-->
          <!--<span v-on:click="datePicker('date2',14)"> 终止日期 {{date2}}-->
          <!--<i class="iconfont icon-xiaoxizhongxin"></i>-->
          <!--</span>-->
        </div>
        <p class="name_credit">
          <span class="sesame">验证芝麻信用</span>
          <span class="sign">网签租赁协议</span>
        </p>
      </div>

      <orderFooter :text="'立即下单'" :count="month*data.firstrent + (data.deposit-0)" :nextFun="jumpToConfirm"></orderFooter>


    </div>
  </div>
</template>
<script>
  import orderFooter from '../../components/orderFooter.vue'


  export default {

    data() {
      return {
        data: [],
        month: 1,
      };
    },
    mounted() {
      this.init();
    },
    components: {
      orderFooter
    },
    methods: {
      decrease: function() {
        if (this.month > this.data.num) {
          this.month--;
        } else {
          return false;
        }
      },
      increase: function() {
        this.month = this.month + 1;
      },
      jumpToConfirm: function() {
        this.$router.push({
//          path: '/confirm/instrument',
          name:"confirm",
          params: {
            type:'instrument',
            name: "设备名称",
            price: 1000,
            during: 10,
            deposit: 2800,
            month:this.data.num,
            count:25700,
          }
        });
      },

      init() {
        this.$axios
          .get(window.ajaxSrc + "/api/meizubao/instrumentDetail", {
            params: { id: 6 }
          })
          .then(res => {
            console.log(res);
            if (res.data.status_code == 1001) {
              this.data = res.data.data;
              this.month = this.data.num;
            }
          })
          .catch(() => {
            console.log("http请求错误");
          });
      }
    }
  };
</script>
<style scoped>
  @import "./details.css";
</style>
