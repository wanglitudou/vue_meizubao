<template>
  <div class="cooperation-container">
    <div class="con_cents">
      <div class="con_pro">
        <div class="cooperationBanner">
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,index) in imgLists"
                           :key="index">
              <img :src="item"
                   alt="">
            </mt-swipe-item>
          </mt-swipe>
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
          <span>项目类别123：</span>
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
        <p class="pro_int"
           v-html="data.content"></p>
      </div>
      <div class="order_name">
        <p class="good_fail">
          <span>预付诚意金：</span>
          <span>￥{{data.money}}</span>
        </p>
      </div>
      <p class="list_rent">
        <!-- <span>
          网签租赁协议
        </span> -->
        <span class="imgs"
              @click="check">
          <img src="../../assets/images/button2.png"
               v-if="checked">
          <img src="../../assets/images/button.png"
               v-else>
        </span>
        <span class="text"
              @click="toNew">《什么乱7八糟的协议》</span>
      </p>
    </div>
    <orderFooter :text="'立即下单'"
                 :count="data.money"
                 :nextFun="createOrder"></orderFooter>
    <!-- <sign id="componentSign"
          v-if="showSignTag"
          :src="data.agreement"
          :gid="data.id"
          :saveAgreementId="saveAgreementId"
          :type="type"></sign> -->

  </div>
</template>
<script>
import orderFooter from "../../components/orderFooter.vue";
import sign from "../../components/canvas.vue";
import { Toast } from "mint-ui";
import { Swipe, SwipeItem } from "mint-ui";
export default {
  data() {
    return {
      imgLists: [], //banner
      data: [],
      checked: false,
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
      dqurl: "",
      type: 5
    };
  },

  saveAgreementId: function(agreementId) {
    this.showSignTag = false;
    this.agreementId = agreementId;
  },
  showSign: function() {
    this.showSignTag = true;
  },

  mounted() {
    this.init();
    this.userId = localStorage.getItem("id");
    this.dqurl = window.location.href;
  },

  components: {
    orderFooter,
    sign
  },
  methods: {
    check() {
      console.log(this.checked);
      if (!this.checked) {
        this.checked = true;
        this.agreementId = 1;
      } else {
        this.checked = false;
        this.agreementId = "";
      }
    },
    toNew() {
      this.$router.push({
        name: "news",
        query: {
          id: 3
        }
      });
    },
    init() {
      this.$axios
        .get(window.ajaxSrc + "/api/meizubao/projectDetail", {
          params: {
            id: this.$route.query.pid
          }
        })
        .then(res => {
          console.log(res.data.data);
          console.log(res.data.status_code == "1001", "fff");
          if (res.data.status_code == "1001") {
            this.data = res.data.data;
            this.imgLists = res.data.data.images;
            console.log(this.imgLists[0], "hhhh");

            //微信分享
            let that = this;
            that.$axios
              .get(window.ajaxSrc + "/api/meizubao/wxSign", {
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
                      desc: that.data.centent, // 分享描述
                      link: that.dqurl, // 分享链接
                      imgUrl: that.imgLists[0], // 分享图标
                      type: "link", // 分享类型,music、video或link，不填默认为link
                      dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
                      success: function(data) {
                        //							layer.msg("分享成功");
                        //													alert("1111")
                        that.$axios
                          .get(window.ajaxSrc + "/api/meizubao/addPoint", {
                            params: {
                              uid: that.userId
                            }
                          })
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
                          .get(window.ajaxSrc + "/api/meizubao/addPoint", {
                            params: {
                              uid: that.userId
                            }
                          })
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
    },

    saveAgreementId: function(agreementId) {
      this.showSignTag = false;
      this.agreementId = agreementId;
    },
    showSign: function() {
      this.showSignTag = true;
    },

    createOrder: function() {
      if (!this.agreementId) {
        Toast("请同意协议后下单");
        return false;
      }

      //      window.location.href="http://mzbao.weiyingjia.org/meizubao/pay/index.php?total_fee=0.01&order_id=45";
      this.$axios
        .post(window.ajaxSrc + "/api/meizubao/addOrder", {
          uid: window.localStorage.id,
          g_id: this.data.id,
          type: 5,
          m_type: 1,
          strtime: "",
          stoptime: "",
          stage: "",
          agreement: this.agreementId,
          image: this.data.images[0],
          goods_num: 1,
          total_price: this.data.money,
          goods_name: this.data.name,
          address_id: "",
          deposit: "",
          open_id: window.localStorage.openid
        })
        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            window.location.href = res.data.data.url;
          } else {
            if (res.data.status_code == 1002) {
              // window.location.href = res.data.data.url;
              Toast(res.data.message);
            }
          }
        })
        .catch(err => {
          console.log("http请求错误");
          console.log(err);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/helper.scss";
.cooperation-container {
  width: 100%;
  height: calc(100% - 1rem);
  background: #fff;
}

.con_cents {
  width: 94.7%;
  margin-left: 2.6%;
  height: auto;
  margin: 0.2rem auto 0;
  padding-bottom: px2rem(5px);
}

.con_pro {
  width: 100%;
  height: px2rem(297px);
  background: #ffffff;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 2px;
  margin: 0.2rem auto 0;
}

.cooperationBanner {
  height: px2rem(250px);
}

.cooperationBanner img {
  width: 94%;
  height: px2rem(250px);
}

.cooperationBanner img {
  width: 100%;
}

.conpro_img img {
  width: 100%;
  height: 100%;
}

.conpro_pro {
  width: 100%;
  height: px2rem(48px);
  line-height: px2rem(48px);
}

.conname_name {
  font-size: 14px;
  color: #000000;
  letter-spacing: 0;
  margin-left: px2rem(10px);
}

.conmoney {
  font-size: 18px;
  color: #fd4689;
  letter-spacing: 0;
  line-height: 17px;
}

.cent_cate {
  width: 100%;
  padding: 0 px2rem(10px);
  margin: 0.2rem auto 0;
  // margin-bottom: 0.5rem;
}

.pro_cate {
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  border-bottom: 1px solid #f7f7f7;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
  display: flex;
  justify-content: space-between;
}

.pro_intro {
  width: 100%;
  margin: 0.2rem auto 0;
  padding-bottom: 12px;
  background: #ffffff;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 3px;
  // padding: 0 10px;
}

.pro_introduce {
  margin-left: px2rem(10px);
  font-size: 14px;
}

.pro_int {
  padding: 0 10px;
  font-size: 13px;
  color: #666666;
  letter-spacing: 0;
}

.order_name {
  width: 100%;
  margin: 0.2rem auto 0;
  margin-bottom: 20px;
  background: #ffffff;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 2px;
}

.order_time {
  width: 100%;
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
  width: 100%;
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
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  padding: 0 10px;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
  border-bottom: 1px solid #f7f7f7;
}

.net_sign {
  width: 100%;
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

.list_rent {
  //;
  // line-height: 1rem;
  // border-bottom: 1px solid #f7f7f7;
  // font-size: 14px;
  // color: #fd4689;
  // letter-spacing: 0;
  // // text-align: center;
  margin-bottom: 1.5rem;
  // .name_credit {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  display: flex;
  // justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  // }
}
.list_rent .imgs {
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
}
.list_rent .imgs img {
  width: 25px;
  height: 25px;
}
.list_rent .text {
  font-size: 14px;
  color: red;
}
</style>