<template>
  <div class="train-container">

    <div>

      <div class="cent_list">

        <div class="list_lists">
          <div class="trainBanner"
               v-if="data.is_play == 1">
            <!-- <img :src="data.images" alt=""> -->
            <!-- <video id="video" autoplay :poster="data.images" controls width="100%" height="100%">
              <source :src="data.url" type="video/mp4">

            </video> -->

            <video-player class="vjs-custom-skin"
                          :options="playerOptions"
                          :playsinline="true"
                          ref="videoPlayer"
                          @ready="playerReadied($event)"></video-player>

          </div>
          <div class="trainBanner"
               v-else>
            <img :src="data.images"
                 alt="">
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

      <orderFooter :text="'开始预约'"
                   :count="data.price"
                   :nextFun="nextFun"
                   v-if="data.is_play == 2"></orderFooter>
    </div>
    <div class="opcity"
         v-show="showOpcity"
         @click="clearOpcity">
    </div>
    <div class="payMethod"
         v-show="showOpcity">
      <mt-radio title="请选择支付方式"
                v-model="value"
                :options="options">
      </mt-radio>
      <div class="pay">
        <mt-button type="danger"
                   style="margin:5px"
                   @click="nextPay">立即支付 </mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Radio } from "mint-ui";
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
// import ""
import videojs from "video.js";
import orderFooter from "../../components/orderFooter.vue";
export default {
  methods: {
    playerReadied(player) {
      const track = new videojs.AudioTrack({
        id: "my-spanish-audio-track",
        kind: "translation",
        label: "Spanish",
        language: "es"
      });
      player.audioTracks().addTrack(track);
      // Get the current player's AudioTrackList object.
      const audioTrackList = player.audioTracks();
      // Listen to the "change" event.
      audioTrackList.addEventListener("change", function() {
        // Log the currently enabled AudioTrack label.
        for (let i = 0; i < audioTrackList.length; i++) {
          const track = audioTrackList[i];
          if (track.enabled) {
            videojs.log(track.label);
            return;
          }
        }
      });
    },
    inits() {
      this.$axios
        .get(
          window.ajaxSrc +
            "/api/meizubao/videoDetail?id=" +
            this.$route.query.pid +
            "&uid=" +
            window.localStorage.getItem("id")
        )
        .then(res => {
          console.log(res.data.data);
          if (res.data.status_code == 1001) {
            this.data = res.data.data;
            this.images = res.data.data.images;
            this.playerOptions.sources[0].src = res.data.data.url;
            this.playerOptions.poster = res.data.data.images;
            console.log(res.data.data.integral);

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
                      desc: that.data.centent, // 分享描述
                      link: that.dqurl, // 分享链接
                      imgUrl: that.images, // 分享图标
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
                      imgUrl: that.images, // 分享图标
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
    },
    //获取用户信息
    initIntegral() {
      this.$axios
        .get(window.ajaxSrc + "/api/meizubao/userInfo", {
          params: {
            uid: window.localStorage.id
          }
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
      let payPrice = "";
      if (this.value == "") {
        Toast("请选择支付方式");
        return false;
      } else if (this.value == 1) {
        payPrice = this.data.price;
      } else {
        payPrice = this.data.integral;
      }
      // console.log(payPrice)
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
          total_price: payPrice,
          goods_name: this.data.name,
          address_id: "",
          deposit: "",
          open_id: window.localStorage.openid
        })
        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            if (this.value == 2) {
              this.$router.push({
                name: "cart"
              });
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
    orderFooter,
    videoPlayer
  },

  mounted() {
    this.inits();
    this.initIntegral();
    this.userId = localStorage.getItem("id");
    this.dqurl = window.location.href;
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
      integral: "",
      playerOptions: {
        height: "360",
        playbackRates: [0.7, 1, 1.3, 1.5, 1.7],
        sources: [
          {
            type: "video/mp4",
            src: ""
          }
        ],
        poster: ""
      },
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
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/helper.scss";
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

.trainBanner {
  width: 100%;
  height: px2rem(250px);
  margin: 0.2rem auto 0;
  // box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 2px;
}

.trainBanner img {
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

.video-js {
  width: 100%;
  height: 250px;
}

.vjs-button > .vjs-icon-placeholder:before {
  font-size: 2em !important;
}

.video-js .vjs-big-play-button {
  top: 40% !important;
  left: 40% !important;
}
</style>