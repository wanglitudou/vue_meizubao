<template>
  <div class="match-container">
    <div class="list_bans">
      <div class="matchBanner">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(item,index) in imgLists"
                         :key="index">
            <img :src="item"
                 alt="">
          </mt-swipe-item>
        </mt-swipe>
        <!-- <img :src="data.images && data.images[0]"
             alt=""> -->
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
            <div class="decrease"
                 @click="decrease"
                 v-bind:class="{ disable: number==1  }">-</div>
            <input type="number"
                   class="value"
                   maxlength="3"
                   v-model="number" />
            <div class="increase"
                 @click="increase">+</div>
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

    <orderFooter :text="'立即下单'"
                 :count="number*data.discount"
                 :nextFun="jumpToConfirm"></orderFooter>

  </div>
</template>
<script>
import orderFooter from "../../components/orderFooter.vue";
import { Swipe, SwipeItem } from "mint-ui";
export default {
  data() {
    return {
      imgLists: [], //banner
      data: [],
      number: 1,
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

  mounted() {
    this.init();
    this.userId = localStorage.getItem("id");
    this.dqurl = window.location.href;
  },
  methods: {
    decrease: function() {
      if (this.number > 1) {
        this.number--;
      } else {
        return false;
      }
    },
    increase: function() {
      this.number++;
    },
    jumpToConfirm: function() {
      this.$router.push({
        //          path: '/confirm/instrument',
        name: "confirm",
        params: {
          type: 3,
          g_id: this.$route.query.pid,
          m_type: 1,
          strtime: "",
          stoptime: "",
          stage: "",
          agreement: "",
          image: this.data.images[0],
          goods_num: this.number,
          total_price: this.number * this.data.discount,
          goods_name: this.data.name,
          deposit: "",

          price: this.data.discount
        }
      });
    },

    createOrder: function() {
      this.$axios
        .post(window.ajaxSrc + "/api/meizubao/addOrder", {
          uid: window.localStorage.id,
          g_id: this.data.id,
          type: 3,
          m_type: 1,
          strtime: "",
          stoptime: "",
          stage: "",
          agreement: "",
          image: this.data.images[0],
          goods_num: this.number,
          total_price: this.number * this.data.discount,
          goods_name: this.data.name,
          address_id: "",
          deposit: ""
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
    init() {
      this.$axios
        .get(window.ajaxSrc + "/api/meizubao/productDetail", {
          params: {
            id: this.$route.query.pid
          }
        })
        .then(res => {
          console.log(res.data.status_code == "1001", "ffff");
          console.log(res.data.data);
          if (res.data.status_code == "1001") {
            this.data = res.data.data;
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
                      desc: that.data.details, // 分享描述
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
                      desc: that.data.details, // 分享描述
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
  },
  components: {
    orderFooter
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/helper.scss";
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
  height: px2rem(250px);
}

.matchBanner img {
  width: 94%;
  height: px2rem(250px);
}

.matchBanner img {
  width: 100%;
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
  width: 100%;
  height: auto;
  // background: #ffffff;
  box-shadow: 0 2px 9px 0 #eee;
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
  margin: px2rem(10px);
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