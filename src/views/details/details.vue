
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
            <div class="swiper-slide" v-for="item in data.images">
              <img :src="item" alt="">
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
                 v-bind:class="{ disable: month==data.lease_time }">-</div>
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
          <span class="sign" @click="showSign">网签租赁协议</span>
        </p>
      </div>

      <orderFooter :text="'立即下单'" :count="(month*data.firstrent + (data.deposit-0)).toFixed(2)" :nextFun="jumpToConfirm"></orderFooter>


      <sign id="componentSign" v-if="showSignTag" :src="data.agreement" :gid="data.id" :saveAgreementId="saveAgreementId"></sign>

    </div>
  </div>
</template>
<script>
  import orderFooter from '../../components/orderFooter.vue'
  import sign from '../../components/sign.vue'
  import { Toast } from 'mint-ui';


  export default {

    data() {
      return {
        data: [],
        month: 1,
        agreementId:null,
        showSignTag:false,
      };
    },
    mounted() {
      this.init();




      $.smartScroll = function(container, selectorScrollable) {
        // 如果没有滚动容器选择器，或者已经绑定了滚动时间，忽略
        if (!selectorScrollable || container.data('isBindScroll')) {
          return;
        }

        // 是否是搓浏览器
        // 自己在这里添加判断和筛选
        var isSBBrowser;

        var data = {
          posY: 0,
          maxscroll: 0
        };

        // 事件处理
        container.on({
          touchstart: function (event) {
            var events = event.touches[0] || event;

            // 先求得是不是滚动元素或者滚动元素的子元素
            var elTarget = $(event.target);

            if (!elTarget.length) {
              return;
            }

            var elScroll;

            // 获取标记的滚动元素，自身或子元素皆可
            if (elTarget.is(selectorScrollable)) {
              elScroll = elTarget;
            } else if ((elScroll = elTarget.parents(selectorScrollable)).length == 0) {
              elScroll = null;
            }

            if (!elScroll) {
              return;
            }

            // 当前滚动元素标记
            data.elScroll = elScroll;

            // 垂直位置标记
            data.posY = events.pageY;
            data.scrollY = elScroll.scrollTop();
            // 是否可以滚动
            data.maxscroll = elScroll[0].scrollHeight - elScroll[0].clientHeight;
          },
          touchmove: function () {
            // 如果不足于滚动，则禁止触发整个窗体元素的滚动
            if (data.maxscroll <= 0 || isSBBrowser) {
              // 禁止滚动
              event.preventDefault();
            }
            // 滚动元素
            var elScroll = data.elScroll;
            // 当前的滚动高度
            var scrollTop = elScroll.scrollTop();

            // 现在移动的垂直位置，用来判断是往上移动还是往下
            var events = event.touches[0] || event;
            // 移动距离
            var distanceY = events.pageY - data.posY;

            if (isSBBrowser) {
              elScroll.scrollTop(data.scrollY - distanceY);
              elScroll.trigger('scroll');
              return;
            }

            // 上下边缘检测
            if (distanceY > 0 && scrollTop == 0) {
              // 往上滑，并且到头
              // 禁止滚动的默认行为
              event.preventDefault();
              return;
            }

            // 下边缘检测
            if (distanceY < 0 && (scrollTop + 1 >= data.maxscroll)) {
              // 往下滑，并且到头
              // 禁止滚动的默认行为
              event.preventDefault();
              return;
            }
          },
          touchend: function () {
            data.maxscroll = 0;
          }
        });

        // 防止多次重复绑定
        container.data('isBindScroll', true);
      };


    },




    components: {
      orderFooter,
      sign,
    },
    methods: {

      saveAgreementId:function(agreementId){
        this.showSignTag=false;
        this.agreementId=agreementId;
      },
      showSign:function(){
        this.showSignTag=true
      },


      decrease: function() {
        if (this.month > this.data.lease_time) {
          this.month--;
        } else {
          return false;
        }
      },
      increase: function() {
        this.month = parseInt(this.month) + 1;
      },

      jumpToConfirm: function() {
        if(!this.agreementId){
          Toast('请网签租赁协议后下单');
          return false
        }


        if(this.month < this.data.lease_time){
          Toast('请重新选择您要租赁的时长');
          return false
        }

console.log(this.month)

//         this.$router.push({
// //          path: '/confirm/instrument',
//           name: "confirm",
//           params: {
//             type: 1,
//             g_id:this.$route.query.pid,
//             m_type:1,
//             strtime:"",
//             stoptime:"",
//             stage:this.month,
//             agreement:this.agreementId,
//             image:this.data.images[0],
//             goods_num:1,
//             total_price:this.month*this.data.firstrent+(this.data.deposit-0),
//             goods_name:this.data.name,
//             deposit:this.data.deposit,



//             price:this.data.firstrent,
//             month:this.data.num,
//           }
//         })





      },

      init() {
        this.$axios
          .get(window.ajaxSrc + "/api/meizubao/instrumentDetail", {
            params: { id: this.$route.query.pid }
          })
          .then(res => {
            console.log(res);
            if (res.data.status_code == 1001) {
              this.data = res.data.data;
              this.month = this.data.lease_time;
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

  .swiper-container{
    height:5rem;
  }




</style>
<style>

  #datePicker .c-header .c-title-layout .c-title-popover .c-title-anchor .c-title{
    font-size:0.32rem;
  }
  #datePicker .c-weekdays{
    font-size:0.28rem;
  }

  #datePicker .c-day-content {

    width: .5rem;
    height: .5rem;
    font-size: .28rem;
  }
  #datePicker .c-day-background{
    /*width:.7rem !important;*/
    height:.7rem !important;
  }
</style>
