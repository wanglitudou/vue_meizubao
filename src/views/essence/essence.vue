<template>
  <div class="containerss">
    <div class="cent_list">
      <div class="ban_two">
        <div class="ban_lef">
          <img :src="data.images"
               alt="">
        </div>
        <div class="ban_rig">
          <p>
            <span>姓 名:</span>
            <span>{{data.name}}</span>
          </p>
          <p>
            <span>语言交流:</span>
            <span>{{data.language}}</span>
          </p>
          <p>
            <span>宗教信仰:</span>
            <span>{{data.faith}}</span>
          </p>
          <p>
            <span>饮食习惯:</span>
            <span>{{data.diet}}</span>
          </p>
          <p>
            <span>住宿标准:</span>
            <span>{{data.live}}</span>
          </p>
          <p>
            <span>交通方案:</span>
            <span>{{data.tarffic}}</span>
          </p>
        </div>
      </div>
      <div class="metting">
        <p class="met_cent"
           v-html="data.centetnt"></p>
      </div>
      <div class="list_app">
        <p class="list_time">
          <span>预约时间:</span>
        </p>
        <p class="list_begin">
          <v-date-picker id="datePicker"
                         mode='range'
                         v-model='selectedDate'
                         :disabled-dates='this.disableDate'
                         :input-props='{ class: "input-style" ,disabled:"disabled", style:"color:#000",placeholder: "请选择你要租赁的日期"}'
                         show-caps>
          </v-date-picker>
        </p>

        <p class="list_tech">
          <span>您一共预约了{{during}}天</span>
        </p>

        <p class="list_tech">
          <span>技师最快到达时间：三天 </span>
        </p>
        <p class="list_apvance">
          <span>预付诚意金：
            <span>
              <span class="mon_ery"> ￥{{totalPrice}}</span>
            </span>
          </span>
        </p>
        <p class="list_rent"
           @click="showSign">
          <span>
            网签租赁协议
          </span>
        </p>
      </div>

    </div>
    <!--<div class="foot_cent">-->
    <!--<div class="total_foot">-->
    <!--<div class="total_lef">-->
    <!--<span class="add">合计:</span>-->
    <!--<span class="tinct">¥19:000</span>-->
    <!--</div>-->
    <!--<div class="total_rig">-->
    <!--<span>开始预约</span>-->
    <!--</div>-->
    <!--</div>-->

    <!--</div>-->

    <orderFooter :text="'立即下单'"
                 :count="totalPrice"
                 :nextFun="jumpToConfirm"></orderFooter>

    <sign id="componentSign"
          v-if="showSignTag"
          :src="data.agreement"
          :type="type"
          :gid="data.id"
          :saveAgreementId="saveAgreementId"></sign>

  </div>
</template>
<script>
import orderFooter from "../../components/orderFooter.vue";
import sign from "../../components/canvas.vue";
import { Toast } from "mint-ui";
import { mapActions } from "vuex";
const setUpTime = 3; //常量 技师出发准备时间 (从今天开始算 几天后可选);
export default {
  data() {
    return {
      data: [],
      selectedDate: {
        start: new Date(new Date().getTime() + setUpTime * 24 * 60 * 60 * 1000),
        end: new Date(new Date().getTime() + setUpTime * 24 * 60 * 60 * 1000)
      },
      disableDate: [],
      agreementId: null,
      showSignTag: false,
      type: 2,
      dataList: {
        appId: "",
        nonceStr: "",
        timestamp: null,
        dataUrl: "",
        signature: ""
      },
      userId: null,
      dqurl: "",
      images: ""
    };
  },

  mounted() {
    this.init();
    this.userId = localStorage.getItem("id");
    this.dqurl = window.location.href;
  },

  // computed: {
  //   during(){
  //     return (this.selectedDate.end.getTime() - this.selectedDate.start.getTime()) / (24 * 60 * 60 * 1000)+1
  //   },
  //   totalPrice(){
  //     let temPrice=this.during * this.data.dayprice * 2;
  //     if(this.during>=5){
  //       temPrice = temPrice * 0.8
  //     }
  //     return temPrice

  // const setUpTime = 3; //常量 技师出发准备时间 (从今天开始算 几天后可选);
  // export default {
  //   data() {
  //     return {
  //       data: [],
  //       selectedDate: {
  //         start: new Date(new Date().getTime() + setUpTime * 24 * 60 * 60 * 1000),
  //         end: new Date(new Date().getTime() + setUpTime * 24 * 60 * 60 * 1000)
  // >>>>>>> 6a3ff07b26837019f6450f6e8ca2df123885287f
  //       },
  //       disableDate: [],
  //       agreementId: null,
  //       showSignTag: false
  //     };
  //   },

  mounted() {
    this.init();
  },

  computed: {
    during() {
      return (
        (this.selectedDate.end.getTime() - this.selectedDate.start.getTime()) /
          (24 * 60 * 60 * 1000) +
        1
      );
    },
    totalPrice() {
      let temPrice = (this.during * this.data.dayprice * 2).toFixed(2);
      if (this.during >= 5) {
        temPrice = (temPrice * 0.8).toFixed(2);
      }
      return temPrice;
    },
    startTime() {
      return this.selectedDate.start.Format("yyyy-MM-dd hh:mm:ss");
    },
    endTime() {
      return this.selectedDate.end.Format("yyyy-MM-dd hh:mm:ss");
    }
  },
  components: {
    orderFooter,
    sign
  },

  methods: {
    ...mapActions(["setConfirmData"]),
    saveAgreementId: function(agreementId) {
      this.showSignTag = false;
      this.agreementId = agreementId;
    },
    showSign: function() {
      this.showSignTag = true;
    },

    jumpToConfirm: function() {
      if (!this.agreementId) {
        Toast("请网签租赁协议后下单");
        return false;
      }
      this.setConfirmData({
        type: 2,
        g_id: this.$route.query.pid,
        m_type: "1",
        strtime: this.startTime,
        stoptime: this.endTime,
        stage: this.during,
        agreement: this.agreementId,
        image: this.data.images,
        goods_num: "1",
        total_price: this.totalPrice,
        goods_name: this.data.name,
        deposit: "",

        price: this.data.dayprice
      });
      this.$router.push({
        //          path: '/confirm/instrument',
        name: "confirm",
        params: {
          type: 2,
          g_id: this.$route.query.pid,
          m_type: "1",
          strtime: this.startTime,
          stoptime: this.endTime,
          stage: this.during,
          agreement: this.agreementId,
          image: this.data.images,
          goods_num: "1",
          total_price: this.totalPrice,
          goods_name: this.data.name,
          deposit: "",

          price: this.data.dayprice
        }
      });
    },
    init() {
      this.$axios
        .get(window.ajaxSrc + "/api/meizubao/technicianDetail", {
          params: {
            id: this.$route.query.pid
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            this.data = res.data.data;
            this.createDisableDate();
            this.images = res.data.data.images;
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
                      imgUrl: that.images, // 分享图标
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
                      imgUrl: that.images, // 分享图标
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
        .catch(err => {
          console.log("http请求错误");
          console.log(err);
        });
    },

    createDisableDate: function() {
      let arrTime = [];
      for (var arr of this.data.appointmentTime) {
        let temArrs = {
          start: new Date(arr[0]),
          end: new Date(arr[1])
        };
      }
      arrTime.push(temArrs);
      let temArr = {
        start: null,
        end: new Date(
          new Date().getTime() + (setUpTime - 1) * 24 * 60 * 60 * 1000
        )
      };
      this.disableDate.push(temArr);
      this.disableDate = this.disableDate.concat(arrTime);
    }
  }
};
</script>
<style lang="scss" scoped>
// @import "./essence.css";
@import "../../styles/helper.scss";
.containerss {
  width: 100%;
  height: 100%;
  background: #fff;
  overflow: hidden;
  // height: calc(100% - 0rem);
  background: #fff;
}

.metting .met_cent {
}

.cent_list {
  width: 94.7%;
  height: auto;
  margin: px2rem(10px) 2.6%;
  overflow-y: scroll;
  padding-bottom: 1.5rem;
}

.cent_list .ban_two {
  width: 100%;
  height: px2rem(222px);
  display: flex;
  justify-content: space-between;
  // background: #ffffff;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: px2rem(2px);
}

.cent_list .ban_two .ban_lef {
  width: 50%;
  height: 100%;
  background: red;
}

.cent_list .ban_two .ban_lef img {
  width: 100%;
  height: 100%;
}

.cent_list .ban_two .ban_rig {
  width: 50%;
  height: 100%;
  margin-top: px2rem(10px);
  background: #fff;
  margin-left: px2rem(10px);
}

.cent_list .ban_two .ban_rig p {
  margin-top: p2rem(15px);
  // padding: 0.1rem 0.1rem;
  font-size: px2rem(14px);
  color: #000000;
  letter-spacing: 0;
  &:nth-child(1) {
    font-size: px2rem(16px);
    margin-top: px2rem(10px);
  }
  margin-top: px2rem(10px);
  // / / line-height: px2rem
}

.metting {
  width: 100%;
  margin: px2rem(15px) auto 0;
  background: #ffffff;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 2px;
  display: flex;
  align-items: center;
}

.metting p {
  margin: 2.7%;
  // margin-top: px2rem(15px);
  font-size: px2rem(14px);
  color: #333333;
  letter-spacing: 0;
}

.list_app {
  width: 100%;
  // height: px2rem(217px);
  height: auto;
  background: #ffffff;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 2px;
  margin-top: 15px;
}

.list_app .list_time {
  height: 0.8rem;
  line-height: 0.8rem;
  margin-left: 20px;
  border-bottom: 1px solid #f7f7f7;
  font-size: px2rem(14px);
  font-weight: bold;
}

.list_app .list_begin {
  height: 0.88rem;
  line-height: 0.88rem;
  border-bottom: 1px solid #f7f7f7;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
}

.list_app .list_tech {
  height: px2rem(44px);
  line-height: px2rem(44px);
  border-bottom: 1px solid #f7f7f7;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  font-size: px2rem(14px);
  color: #333333;
  letter-spacing: 0;
}

.list_app .list_apvance {
  height: px2rem(44px);
  line-height: px2rem(44px);
  border-bottom: 1px solid #f7f7f7;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  font-size: px2rem(14px);
  color: #333333;
  letter-spacing: 0;
}

.list_app .list_rent {
  height: 0.88rem;
  line-height: 0.88rem;
  border-bottom: 1px solid #f7f7f7;
  font-size: 14px;
  color: #fd4689;
  letter-spacing: 0;
  text-align: center;
}

.foot_cent {
  width: 100%;
  margin-top: 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #ffffff;
}

.foot_cent .total_foot {
  width: 7.068rem;
  height: 0.88rem;
  line-height: 0.88rem;
  display: flex;
  justify-content: space-between;
  margin: 0.2rem auto 0;
}

.foot_cent .total_foot .total_lef {
  width: 70%;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
}

.foot_cent .total_foot .total_lef .tinct {
  font-size: 17px;
  color: #fd4689;
  letter-spacing: 0;
}

.foot_cent .total_foot .total_lef .add {
  margin-left: 10px;
}

.foot_cent .total_foot .total_rig {
  width: 30%;
  text-align: center;
  background-image: linear-gradient(-130deg, #fd4689 0%, #fd82d9 100%);
  box-shadow: 0 1px 4px 0 rgba(253, 70, 137, 0.58);
  border-radius: 3px;
  font-size: 14px;
  color: #ffffff;
  letter-spacing: 0;
}

.mon_ery {
  font-size: 18px;
  color: #fd4689;
  letter-spacing: 0;
}
</style>

<style>
.input-style {
  width: 200px;
  height: 30px;
  text-align: center;
  border: 1px solid #fd4689;
  /* outline: none; */
  box-shadow: 0 2px 4px 0 #fd4689;
}

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
  /*width:.7rem !important;*/
  height: 0.7rem !important;
}

.popover-origin {
  padding-bottom: 50px !important;
}
</style>