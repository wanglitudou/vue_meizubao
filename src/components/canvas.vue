<template>
    <div class="signcontant">
        <div class="greet">
            <mt-button size="small" id="btn_clear" @click='reset' type="default">重写签名</mt-button>

            <mt-button size="small" type="default" id="btn_submit" @click="btn_submit">上传协议</mt-button>
            <!-- <a @touchstart="clear" @mousedown="clear">重写</a> -->
            <!-- <a @touchstart="upload" @mousedown="upload">上传协议</a> -->
            <!-- <select v-model="degree">
        <option v-for="item in scope" :value="item.value">{{item.title}}</option>
      </select> -->
        </div>
        <canvas id="canvas" height="400">
            <!-- <p>Your browserdoes not support the canvas element.</p> -->
        </canvas>

        <div class="open">请用正楷体书写</div>
    </div>
</template>
<script>
import { Button, Toast } from "mint-ui";
import Draw from "../assets/js/draw.js";
export default {
  props: ["src", "gid", "saveAgreementId",'type'],
  mounted() {
    this.canvasBox = document.getElementById("canvasBox");
    this.initCanvas();
  },
  components: {
    Draw
  },
  methods: {
    initCanvas() {
      var canvas = document.getElementById("canvas");
      var screenWidth = document.documentElement.clientWidth;
      var screenHeight = document.documentElement.clientHeight;
      let canvasWidth = screenWidth;
      let canvasHeight = 400;
      canvas.setAttribute("width", canvasWidth);

      canvas.setAttribute("height", canvasHeight);

      var context2D = canvas.getContext("2d");

      // var context = canvas.getContext("2d");
      var img = new Image();
      img.crossOrigin = "anonymous";
      //      img.setAttribute("crossOrigin", "anonymous");
      img.src = this.src;
      let imgWidth;
      let imgHeight;

      img.onload = function() {
        imgWidth = img.width;
        imgHeight = img.height;
        //  canvas.setAttribute('width',screenWidth);
        context2D.drawImage(this, 0, 0, canvasWidth, canvasHeight);
      };
      this.draw = new Draw(canvas);
    },
    btn_submit() {
      const image = this.draw.getPNGImage();
        let self= this;
      this.$axios
        .post(window.ajaxSrc + "/api/meizubao/agreement", {
          uid:window.localStorage.id,
          g_id:this.gid,
          img:image,
          type:this.type,
        })
        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            Toast('协议保存成功');
            self.saveAgreementId(res.data.data.id);
          }
        })
        .catch((err) => {
          Toast('协议保存失败');
          console.log("http请求错误");
          console.log(err);
        });
    },
    reset() {
        this.initCanvas()
    }
  }
};
</script>
<style scoped>
.signcontant {
  position: fixed;
  height: 100%;
  width: 100%;
  background: #fff;
  overflow: hidden;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9;
}
canvas {
  flex: 1;
  cursor: crosshair;
  /* width: 100%; */
  /* height: 100%; */
}
.signcontant {
  display: flex;
}
.open {
  position: absolute;
  bottom: 100px;
  font-size: 24px;
  color: #000;
  width: 96%;
  text-align: center;
}
#btn_submit {
  position: absolute;
  top: 12px;
  left: 12px;
}

#btn_clear {
  position: absolute;
  top: 12px;
  left: 100px;
}
</style>

