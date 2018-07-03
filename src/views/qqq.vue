<template>
  <div class="boxcontext">
    <li class="input-img">
      <span class="item">
        <b>&lowast;</b>身份证正面照</span>
      <span class="item-value">
        <a href="javascript:"
           class="input-img-btn"
           v-on:click="addPicFront">+</a>
        <input type="file"
               @change="onFileFrontChange"
               style="display: none;"
               ref="onFileFrontChange"
               accept="image/*">
        <span class="img-wrapper"
              v-if="imageFront">
          <img :src="imageFront"
               alt="">
          <b class="delete"
             @click="onDelete('imageFront')"></b>
        </span>
        <span class="img-wrapper"
              v-else>
          <!-- <img src="./u111.png"
               alt=""> -->
          <i>示例照片</i>
        </span>
      </span>
    </li>
  </div>
</template>
<script>
// import { api } from "../../api/api.js";
import axios from "axios";
export default {
  data() {},
  created() {
    let that = this;
    that.imgPreview();
  },
  methods: {
    imgPreview() {
      let self = that;
      let Orientation;
      if (!file || !window.FileReader) return;
      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          //判断图片是否大于100K,是就直接上传，反之压缩图片
          if (this.result.length <= 100 * 1024) {
            if (type == "imageFront") {
              upImgFront(self, this.result);
            }
          } else {
            img.onload = function() {
              let src = compress(img, Orientation);
              if (type == "imageFront") {
                upImgFront(self, src);
              }
            };
          }
        };
      }
    },
    addPicFront(e) {
      e.preventDefault();
      this.$refs.onFileFrontChange.click();
      return false;
    },

    onFileFrontChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      imgPreview(this, files[0], "imageFront");
      this.$refs.onFileFrontChange.value = "";
      this.idCardFrontDialogName = "";
      this.idCardFrontDialogId = "";
      this.idCardFrontDialogAddress = "";
    },
    compress(img, Orientation) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      //瓦片canvas
      let tCanvas = document.createElement("canvas");
      let tctx = tCanvas.getContext("2d");
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio;
      if ((ratio = width * height / 4000000) > 1) {
        console.log("大于400万像素");
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
      } else {
        ratio = 1;
      }
      canvas.width = width;
      canvas.height = height;
      //        铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      //如果图片像素大于100万则使用瓦片绘制
      let count;
      if ((count = width * height / 1000000) > 1) {
        console.log("超过100W像素");
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
        //            计算每块瓦片的宽和高
        let nw = ~~(width / count);
        let nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(
              img,
              i * nw * ratio,
              j * nh * ratio,
              nw * ratio,
              nh * ratio,
              0,
              0,
              nw,
              nh
            );
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height);
      }
      //进行最小压缩
      let ndata = canvas.toDataURL("image/jpeg", 0.3);
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
      return ndata;
    },
    // 身份证正面

    upImgFront(that, src) {
      that.isLoadingShow = true;
      that.loadingTit = "图片上传中...";
      axios({
        method: "post",
        url: api + "/upload/image/base64",
        data: {
          fileBase64: src,
          authType: "1"
        },
        transformRequest: [
          function(data) {
            let ret = "";
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            return ret;
          }
        ],
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(res => {
          that.isLoadingShow = false;
          // if (res.data.code == 0) {
          //   that.imageFrontPath = res.data.data.path;
          //   // if (res.data.data.info) {
          //   //   if (res.data.data.info.address) {
          //   //     that.idCardFrontDialogAddress = res.data.data.info.address;
          //   //   }
          //   //   if (res.data.data.info.name) {
          //   //     that.idCardFrontDialogName = res.data.data.info.name;
          //   //   }
          //   //   if (res.data.data.info.number) {
          //   //     that.idCardFrontDialogId = res.data.data.info.number;
          //   //   }
          //   // }
          //   that.idCardFrontDialog = true;
          //   that.isFrontSuccess = true;
          //   that.imageFront = src;
          // }
          if ((res.data.status_code = "1001")) {
            localStorage.user_name = this.$route.query.name;
            console.log(localStorage.user_name);
            Toast("修改成功");
            setTimeout(() => {
              this.$router.push({ name: "mine" });
            }, 800);
          } else {
            setTimeout(() => {
              that.isDialogShow = true;
            }, 100);
            that.dialogTit = "图片上传失败";
          }
        })
        .catch(error => {
          // that.isLoadingShow = false;
          // setTimeout(() => {
          //     that.isDialogShow = true;
          // },100);
          // that.dialogTit = '服务器错误';
          // console.log('错误了'+ error);
        });
    }
  }
};
</script>
<style>
.boxcontext {
  width: 400px;
  height: 400px;
  background: #dec;
}
</style>
