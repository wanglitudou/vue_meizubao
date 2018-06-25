<template>
  <div class="container">
    <div class="top-wrapper">
      <!-- <video id="video"
               autoplay
               poster="../../assets/images/icon7.jpg"
               v-if="$route.query.type=='video'"
               controls
               width="320"
               height="240"
        >
          <source :src="$route.query.images" type="video/mp4">
          您的浏览器不支持 video 标签。
        </video> -->
      <div v-if="$route.query.type=='video'">
        <video-player class="vjs-custom-skin"
                      :options="playerOptions"
                      :playsinline="true"
                      ref="videoPlayer"
                      @ready="playerReadied($event)"></video-player>

      </div>
      <!-- <video-player class="vjs-custom-skin" :options="playerOptions" :playsinline="true" ref="videoPlayer" @ready="playerReadied($event)"></video-player> -->

      <img :src="$route.query.images"
           alt=""
           v-if="$route.query.type=='image'">
    </div>
    <div class="bottom-wrapper">
      <div class="des-wrapper">
        <span class="text">{{$route.query.name}}</span>
        <span class="baiducloud"
              @click="baiducloud()">百度云下载
        </span>
        <!--<a :href="$route.query.images" download="test">下载</a>-->
        <img class="right-button"
             src="../../assets/images/download.jpg"
             alt=""
             :data-clipboard-text="$route.query.images">
      </div>
    </div>
    <!-- <confirm v-model="show3"
             show-input
             :title="$t('Confirm deleting the item')"
             :input-attrs="{type: 'number'}"
             @on-cancel="onCancel"
             @on-confirm="onConfirm"
             @on-show="onShow"
             @on-hide="onHide">
    </confirm> -->
    <!-- <div v-transfer-dom>
      <confirm v-model="show3"
               show-input
               :title="$t('Confirm deleting the item')"
               :input-attrs="{type: 'number'}"
               @on-cancel="onCancel"
               @on-confirm="onConfirm"
               @on-show="onShow"
               @on-hide="onHide">
      </confirm>
    </div> -->
  </div>
</template>

<script>
import ClipboardJS from "clipboard";
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
import { Confirm, TransferDomDirective as TransferDom } from "vux";
import { MessageBox, Toast } from "mint-ui";
// import ""
import videojs from "video.js";
export default {
  data() {
    return {
      show3: false,
      message: "赋值",
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
      }
    };
  },
  directives: {
    TransferDom
  },
  created() {
    let that = this;
  },

  mounted() {
    console.log($route.query.type);
    var clipboard = new ClipboardJS(".right-button");
    clipboard.on("success", function(e) {
      Toast({
        message: "下载链接已复制到剪切板,请通过外部浏览器打开",
        position: "middle",
        duration: 4000
      });
    });

    clipboard.on("error", function(e) {
      Toast({
        message: "自动复制到剪切板失败。",
        position: "middle",
        duration: 4000
      });
    });
    if ($route.query.type == "video") {
      this.playerOptions.sources[0].src = $router.query.images;
    }
  },
  methods: {
    baiducloud() {
      // MessageBox({
      //   title: "提示",
      //   message: "密码:4sC7,点击确定继续前往",
      //   showCancelButton: true,
      //   showConfirmButton: true
      // });

      MessageBox.confirm("密码:4sC7,点击确定继续前往", {
        // title: "提示",
        // message: "密码:4sC7,点击确定继续前往"
        // confirmButtonText: "123",
        // cancelButtonText: "asd"
      })
        .then(action => {
          if (action == "confirm") {
            window.location.href =
              "https://pan.baidu.com/s/1TlvRtDtQSK3A4Ba_nBIRJg";
            console.log("确定");
          }
        })
        .catch(err => {
          console.log("取消");
        });
      // MessageBox.confirm("确定执行此操作？").then(action => {

      //  title: "提示",
      // message: "密码:4sC7,点击确定继续前往",
      // showCancelButton: true,
      // showConfirmButton: true
      // if (showCancelButton == true) {
      //   window.location.href =
      //     "https://pan.baidu.com/s/1TlvRtDtQSK3A4Ba_nBIRJg";
      // } else {
      //   alert("取消");
      // }
      // });
      // if (showCancelButton == true) {
      //   window.location.href =
      //     "https://pan.baidu.com/s/1TlvRtDtQSK3A4Ba_nBIRJg";
      // } else {
      //   alert("取消");
      // }
      // alert();
      // alert("百度云盘密码:4sC7");
      // window.location.href = "https://pan.baidu.com/s/1TlvRtDtQSK3A4Ba_nBIRJg";
      // const _this = this; // 需要注意 onCancel 和 onConfirm 的 this 指向
      // this.$vux.confirm.show({
      // 组件除show外的属性
      // onCancel() {
      //   console.log(this); // 非当前 vm
      //   console.log(_this); // 当前 vm
      // },
      // onConfirm() {}
      // });
      // 隐藏
      // this.$vux.confirm.hide();
      // prompt形式调用
      // this.$vux.confirm.prompt("placeholder", {
      //   onCancel() {},
      //   onConfirm() {}
      // });
      // 设置输入值
      // this.$vux.confirm.setInputValue("value"); // 注意需要在 onShow 事件中执行
      // 获取显示状态
      // this.$vux.confirm.isVisible(); // v2.9.1 支持
    },
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
    }
  },
  components: {
    videoPlayer
    // Confirm
  }
};
</script>

<style scoped>
.video-js {
  width: 100% !important;
  height: 250px !important;
}
.baiducloud {
  color: #ff0000;
  margin-left: 1rem;
  font-size: 14px;
}
.vjs-button > .vjs-icon-placeholder:before {
  font-size: 2em !important;
}
.video-js .vjs-big-play-button {
  top: 40% !important;
  left: 40% !important;
}
#video {
  width: 100%;
}
.container {
}
.top-wrapper {
  width: 100%;
}
.top-wrapper img {
  width: 100%;
}
.des-wrapper {
  padding-left: 12px;
  padding-right: 12px;
  margin-top: 12px;
}
.text {
  font-size: 16px;
  line-height: 24px;
}
.right-button {
  height: 24px;
  float: right;
}
</style>
