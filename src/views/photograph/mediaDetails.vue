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
                      style="width:100%;height:250px;"
                      :options="playerOptions"
                      :playsinline="true"
                      ref="videoPlayer"
                      @ready="playerReadied($event)"></video-player>

      </div>
      <!-- <video-player class="vjs-custom-skin" :options="playerOptions" :playsinline="true" ref="videoPlayer" @ready="playerReadied($event)"></video-player> -->
      <div v-else>
        <img :src="$route.query.images"
             alt="">
      </div>

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
  </div>
</template>

<script>
import ClipboardJS from "clipboard";
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
import { MessageBox, Toast } from "mint-ui";
import videojs from "video.js";
export default {
  data() {
    return {
      show3: false,
      baidu_cloud: this.$route.query,
      message: "赋值",
      playerOptions: {
        height: "360",
        playbackRates: [0.7, 1, 1.3, 1.5, 1.7],
        width: document.documentElement.clientWidth,
        height: 250 + "px",
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
  // directives: {
  //   TransferDom
  // },
  created() {
    let that = this;

    console.log(this.$route.query);
  },

  mounted() {
    // console.log(this.$route.query);
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
    if (this.$route.query.type == "video") {
      // this.playerOptions.sources[0].src =this.$route.query;
      this.playerOptions.sources[0].src =
        "http://10.2.9.130/mzbadmin.weiyingjia.org/upload/1530084920911.mp4";
      // console.log( $router.query.images)
    }
  },
  methods: {
    baiducloud() {
      //百度云下载调用方法 确定 取消
      MessageBox.confirm(
        "密码:" + this.baidu_cloud.baidu_cloud_pwd + ",点击确定继续前往",
        {}
      )
        .then(action => {
          if (action == "confirm") {
            window.location.href = this.baidu_cloud.baidu_cloud_link;
            console.log("确定");
          }
        })
        .catch(err => {
          console.log("取消");
        });
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
.baiducloud {
  color: #fd4689;
  margin-left: 1rem;
  font-size: 16px;
}
.video-js .vjs-big-play-button {
  position: absolute !important;
  top: 35% !important;
  left: 35% !important;
  top: 40% !important;
  left: 40% !important;
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
