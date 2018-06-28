<template>
  <div class="detail-container">
    <div class="list_list">
      <div class="detailsBanner">

        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(item,index) in imgLists"
                         :key="index">
            <img :src="item"
                 alt="">
          </mt-swipe-item>
        </mt-swipe>

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
        <!-- <div>666</div> -->
        <p class="cent_time">
          <span class="sesame">验证芝麻信用</span>
        </p>
        <!-- <div class="cent_time">666</div> -->
        <div class="begin_rent">
          <span class="timeLong">选择你租赁的时长(月):</span>
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
          <span class="sign"
                @click="showSign">网签租赁协议</span>

        </p>
      </div>

      <orderFooter :text="'立即下单'"
                   :count="(month*data.firstrent + (data.deposit-0)).toFixed(2)"
                   :nextFun="jumpToConfirm"></orderFooter>

      <!-- <sign id="componentSign" v-if="showSignTag" :src="data.agreement" :gid="data.id" :saveAgreementId="saveAgreementId"></sign> -->
      <sign id="componentSign"
            v-if="showSignTag"
            :type="type"
            :src="data.agreement"
            :gid="data.id"
            :saveAgreementId="saveAgreementId"></sign>

    </div>
  </div>
</template>
<script>
import orderFooter from "../../components/orderFooter.vue";
// import sign from '../../components/sign.vue'
import sign from "../../components/canvas.vue";
import { Toast, Swipe, SwipeItem } from "mint-ui";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      imgLists: [], //banner
      data: [],
      month: 1,
      type: 1,
      agreementId: null,
      showSignTag: false,
      dataList: {
        appId: "",
        nonceStr: "",
        timestamp: null,
        dataUrl: "",
        signature: ""
      },
      userId: null,
      dqurl: ""
    };
  },
  created() {},
  activated(){
    console.log(this.$route.query)
  },
  mounted() {
    this.init();
    //获取userid
    this.userId = localStorage.getItem("id");
    //获取当前浏览器的地址
    this.dqurl = window.location.href;
    //			this.dqurl = encodeURIComponent(window.location.href)
    //			console.log(typeof this.dqurl)
    console.log(this.dqurl);
    //签名

    $.smartScroll = function(container, selectorScrollable) {
      // 如果没有滚动容器选择器，或者已经绑定了滚动时间，忽略
      if (!selectorScrollable || container.data("isBindScroll")) {
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
        touchstart: function(event) {
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
          } else if (
            (elScroll = elTarget.parents(selectorScrollable)).length == 0
          ) {
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
        touchmove: function() {
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
            elScroll.trigger("scroll");
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
          if (distanceY < 0 && scrollTop + 1 >= data.maxscroll) {
            // 往下滑，并且到头
            // 禁止滚动的默认行为
            event.preventDefault();
            return;
          }
        },
        touchend: function() {
          data.maxscroll = 0;
        }
      });

      // 防止多次重复绑定
      container.data("isBindScroll", true);
    };
  },

  components: {
    orderFooter,
    sign
  },
  methods: {
    ...mapActions(["setConfirmData"]),
    //签名
    // generatingsignature() {
    //   let that = this;
    //   that.$axios
    //     .get("http://mzbao.weiyingjia.org/api/meizubao/wxSign", {})
    //     .then(res => {
    //       console.log(res);
    //       if (res.data.status_code == 1001) {
    //         that.autograph = res.data.data;
    //       }
    //     })
    //     .catch(() => {
    //       console.log("查询失败");
    //     });
    // },

    saveAgreementId: function(agreementId) {
      this.showSignTag = false;
      this.agreementId = agreementId;
    },
    showSign: function() {
      this.showSignTag = true;
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
      if (!this.agreementId) {
        Toast("请网签租赁协议后下单");
        return false;
      }

      if (this.month < this.data.lease_time) {
        Toast("请重新选择您要租赁的时长");
        return false;
      }

      // console.log(this.month)
      this.setConfirmData({
        type: 1,
        g_id: this.$route.query.pid,
        m_type: 1,
        strtime: "",
        stoptime: "",
        stage: this.month,
        agreement: this.agreementId,
        image: this.data.images[0],
        goods_num: 1,
        total_price: this.month * this.data.firstrent + (this.data.deposit - 0),
        goods_name: this.data.name,
        deposit: this.data.deposit,
        price: this.data.firstrent,
        month: this.data.num
      });
      this.$router.push({
        //          path: '/confirm/instrument',
        name: "confirm",
        params: {
          type: 1,
          g_id: this.$route.query.pid,
          m_type: 1,
          strtime: "",
          stoptime: "",
          stage: this.month,
          agreement: this.agreementId,
          image: this.data.images[0],
          goods_num: 1,
          total_price:
            this.month * this.data.firstrent + (this.data.deposit - 0),
          goods_name: this.data.name,
          deposit: this.data.deposit,
          price: this.data.firstrent,
          month: this.data.num
        }
      });
    },
    init() {
      this.$axios
        .get(window.ajaxSrc + "/api/meizubao/instrumentDetail", {
          params: {
            id: this.$route.query.pid
          }
        })
        .then(res => {
          //        console.log(res.data.status_code == "1001", "ffff");
          if (res.data.status_code == "1001") {
            console.log(res);
            this.data = res.data.data;
            this.month = this.data.lease_time;
            this.imgLists = res.data.data.images;
            console.log(this.imgLists[0], "hhhh");
            //微信分享
            let that = this;
            that.$axios
              .get("http://mzbao.weiyingjia.org/api/meizubao/wxSign", {
                params: {
                  http: location.href
                }
              })
              .then(res => {
                console.log(res, "950927");
                if (res.data.status_code == 1001) {
                  that.dataList.appId = res.data.data.appId;
                  that.dataList.nonceStr = res.data.data.nonceStr;
                  that.dataList.timestamp = res.data.data.timestamp;
                  that.dataList.dataUrl = res.data.data.dataUrl;
                  that.dataList.signature = res.data.data.signature;
                  wx.config({
                    debug: false,
                    appId: that.dataList.appId,
                    timestamp: that.dataList.timestamp,
                    nonceStr: that.dataList.nonceStr,
                    signature: that.dataList.signature,
                    jsApiList: [
                      //需要使用的网页服务接口
                      //									"checkJsApi", //判断当前客户端版本是否支持指定JS接口
                      "onMenuShareTimeline", //分享给好友
                      "onMenuShareAppMessage" //分享到朋友圈
                    ]
                  });
                  wx.ready(function() {
                    // 分享朋友圈
                    wx.onMenuShareTimeline({
                      title: that.data.name, // 分享标题
                      desc: that.data.centent, // 分享描述
                      link: that.dqurl, // 分享链接
                      imgUrl: that.imgLists[0], // 分享图标
                      type: "link", // 分享类型,music、video或link，不填默认为link
                      dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
                      success: function(data) {
                        //							layer.msg("分享成功");
                        //													alert("1111")
                        that.$axios
                          .get(
                            "http://mzbao.weiyingjia.org/api/meizubao/addPoint",
                            {
                              params: {
                                uid: that.userId
                              }
                            }
                          )
                          .then(res => {
                            console.log(res);
                            console.log(11111);
                          });
                      },
                      cancel: function() {
                        //							layer.msg("已取消分享");
                        //													alert("1111")
                      }
                    });
                    // 分享朋友
                    wx.onMenuShareAppMessage({
                      title: that.data.name, // 分享标题
                      desc: that.data.centent, // 分享描述
                      link: that.dqurl, // 分享链接
                      imgUrl: that.imgLists[0], // 分享图标
                      type: "link", // 分享类型,music、video或link，不填默认为link
                      dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
                      success: function(data) {
                        //							layer.msg("分享成功");
                        //													alert("1111")
                        that.$axios
                          .get(
                            "http://mzbao.weiyingjia.org/api/meizubao/addPoint",
                            {
                              params: {
                                uid: that.userId
                              }
                            }
                          )
                          .then(res => {
                            console.log(res);
                          });
                      },
                      cancel: function() {
                        //							layer.msg("已取消分享");
                        //													alert("1111")
                      }
                    });
                  });
                }
              })
              .catch(res => {
                console.log(res);
              });
          }
        })
        .catch(() => {
          console.log("http请求错误");
        });
    }
  }
};
</script>
<style>
</style>
<style lang="scss" scoped>
@import "../../styles/helper.scss";
#datePicker
  .c-header
  .c-title-layout
  .c-title-popover
  .c-title-anchor
  .c-title {
  font-size: 0.32rem;
}

#datePicker .c-weekdays {
  font-size: 0.28rem;
}

#datePicker .c-day-content {
  width: 0.5rem;
  height: 0.5rem;
  font-size: 0.28rem;
}

#datePicker .c-day-background {
  height: 0.7rem !important;
}

.cent_time {
  width: 94.7%;
  height: 1rem;
  line-height: 1rem;
  box-shadow: 0 2px 9px 0 #eeeeee;
}

.mar_centime {
  margin-left: px2rem(10px);
  font-size: px2rem(14px);
}

.detail-container {
  width: 100%;
  height: auto;
  background: #fff;
  padding-bottom: 1.5rem;
}

.list_list {
  width: 100%;
  height: auto;
}

.detailsBanner {
  height: px2rem(250px);
}

.detailsBanner img {
  width: 94%;
  height: px2rem(250px);
}

.detailsBanner img {
  width: 100%;
  height: 100%;
}

.ban_cent {
  width: 94.7%;
  padding-bottom: 10px;
  margin: 0.2rem auto 0;
  box-shadow: 0 2px 9px 0 #eeeeee;
  background: #fff;
  border-radius: 2px;
}

.name_cent {
  padding: 0.2rem 0.3rem;
  margin-top: px2rem(10px);
}

.name {
  font-size: px2rem(16px);
  font-weight: bold;
  color: #000000;
  letter-spacing: 0;
  margin-top: 0.8%;
}

.dollar {
  font-size: px2rem(14px);
  color: #333333;
  letter-spacing: 0;
  margin-left: px2rem(10px);
}

.name_rent {
  padding: 0rem 0.3rem;
}

.monthly a {
  color: red;
  font-size: 18px;
  letter-spacing: 0;
  line-height: 17px;
  text-decoration: none;
}

.renewal {
  margin-left: 20px;
  font-size: 12px;
  color: #666666;
  letter-spacing: 0;
}

.renewal a {
  font-size: 14px;
  color: #000000;
  letter-spacing: 0;
  line-height: 17px;
  text-decoration: none;
}

.name_words {
  padding: 0.1rem 0.2rem;
  font-size: 13px;
  color: #666666;
}

.name_cate {
  padding: 0rem 0.2rem;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  font-size: 12px;
  color: #999999;
  letter-spacing: 0;
}

.product {
  width: 94.7%;
  height: 1rem;
  line-height: 1rem;
  background: #ffffff;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 2px;
  margin: 0.2rem auto 0;
}

.name_pro {
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
}

.name_pro span {
  padding: 0 20px;
}

.data_name {
  width: 94.7%;
  background: #ffffff;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 2px;
  margin-top: 10px;
  margin: 0.2rem auto 0;
}

.begin_rent {
  width: 100%;
  height: px2rem(45px);
  line-height: px2rem(45px);
  box-shadow: 0 2px 9px 0 #eeeeee;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  .timeLong {
    font-size: px2rem(14px);
  }
}

.name_credit {
  width: 100%;
  height: px2rem(55px);
  line-height: px2rem(55px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.sesame {
  font-size: px2rem(14px);
  color: #00a5ff;
  letter-spacing: 0;
  padding: 0 20px;
}

.sign {
  font-size: 14px;
  color: #fd4689;
  letter-spacing: 0;
}

.spinner {
  display: inline-block;
}

.decrease,
.value,
.increase {
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

.decrease,
.increase {
  display: inline-block;
  vertical-align: middle;
  -moz-box-shadow: 0 0 2px #999 inset;
  /* For Firefox3.6+ */
  -webkit-box-shadow: 0 0 2px #999 inset;
  /* For Chrome5+, Safari5+ */
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