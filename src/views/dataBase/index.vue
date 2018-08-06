<template>
  <div class="main">
    <div class="content">
      <div class="video"
           ref="video"
           id="divDisplay">
        <!-- <video id="video" autoplay poster="../../assets/images/icon7.jpg" controls width="100%" height="100%">
                    <source :src="item.url" type="video/mp4"> 您的浏览器不支持 video 标签。
                </video> -->
        <video-player class="vjs-custom-skin"
                      :options="playerOptions"
                      :playsinline="true"
                      ref="videoPlayer"
                      @ready="playerReadied($event)"></video-player>
      </div>
      <div class="desc">
        <div class="title">课程标题</div>
        <div class="text"
             v-html="item.content">

        </div>
      </div>
      <div class="price">
        <div class="title">支付方式</div>
        <div class="price_desc">
          <div class="price_title">{{item.m_type == 1?'微信支付':"积分兑换"}}</div>
          <div class="total_price">{{item.total_price}}</div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import videojs from "video.js";
import ClipboardJS from "clipboard";
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
export default {
  data() {
    return {
      item: this.$route.query.item,
      playerOptions: {
        playbackRates: [0.7, 1, 1.3, 1.5, 1.7],
        width: "",
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
  created() {
    // this.init();

    this.playerOptions.sources[0].src = this.item.url;
  },
  mounted() {
    var div = document.getElementById("divDisplay");

    var clientHeight = div.clientWidth;
    // var clientWidth = div.clientWidth;
    this.playerOptions.width = clientHeight + "px";
  },
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
    }
    // init() {
    //   console.log(this.id);
    //   this.$axios.get(window.ajaxSrc+'/api/meizubao/orderDetail',{
    //   params:{id:this.id}
    //    /   }).then(res=>{
    //   console.log(res)
    //   }).catch(()=>{
    //   console.log("请求失败")
    //   })
    // }
  }
};
</script>
<style scoped>
.mian {
  width: 100%;
  height: auto;
}
.content {
  width: 94.7%;
  margin-left: 2.6%;
  height: auto;
}
.video {
  width: 98%;
  /* margin-left: 2.6%; */
  height: 250px;
  border-radius: 6px;
}
.desc {
  width: 97.4%;
  height: auto;
  margin-left: 1.2%;
  box-shadow: 0 2px 9px #eee;
}
.title {
  font-size: 16px;
  margin-left: 2.7%;
  color: #000;
  font-weight: bold;
  line-height: 44px;
}
.text {
  width: 94.6%;
  height: auto;
  font-size: 13px;
  line-height: 18px;
  margin-left: 2.7%;
  color: #666;
  font-family: PingFangSC-Regular;
  padding-bottom: 10px;
}
.price {
  /* border:  */
  width: 97.4%;
  margin-left: 1.2%;
  margin-top: 5px;
  height: auto;
  box-shadow: 0 2px 9px 0px #eee;
  /* display: flex; */
  /* justify-content: space-between; */
  /* line-height: 44px; */
  font-size: 16px;
}
.price_desc {
  display: flex;
  justify-content: space-between;
}
.price_title {
  margin-left: 2.7%;
}
.total_price {
  margin-right: 2.7%;
}
</style>
