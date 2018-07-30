import axios from "axios";
export function imgPreview(that, file, type) {
  console.log(1234);
  let file_use = file;
  console.log(file_use);
  let self = that;
  let Orientation;
  if (!file || !window.FileReader) return;
  if (/^image/.test(file.type)) {
    // 创建一个reader
    let reader = new FileReader();
    // 将图片将转成 base64 格式
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
        console.log("taidale");
        img.onload = function() {
          let src = compress(img, Orientation);
          if (type == 1) {
            console.log("zoule");
            console.log(that.data.imgOne);
            that.data.imgOne = src;
            console.log(that.data.imgOne);
          } else if (type == 2) {
            that.data.imgtwo = src;
          } else if (type == 3) {
            that.data.imgthree = src;
          } else if (type == 4) {
            that.data.imgfour = src;
          }
          upImgFront(self, file_use, type);
        };
      }
    };
  }
}
//压缩 carvas画图，知道图的大小
function compress(img, Orientation) {
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
  if ((ratio = (width * height) / 4000000) > 1) {
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
  if ((count = (width * height) / 1000000) > 1) {
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
}
// 身份证正面
function upImgFront(that, src, type) {
  that.isLoadingShow = true;
  that.loadingTit = "图片上传中...";
  console.log("23456");
  var formData = new FormData();
  //上传图片
  formData.append("img", src);
  formData.append("type", type);
  formData.append("uid", localStorage.id);
  $.ajax({
    type: "post",
    // url: "http://mzbao.weiyingjia.org/api/meizubao/uploadImages",
    url: "http://interface.coronets.com.cn/api/meizubao/uploadImages",
    data: formData,
    processData: false,
    contentType: false,
    dataType: "json",
    success: function(res) {
      console.log(res.data);
      // alert(res.data.url);

      if (res.code == 200) {
        // that.fileList = res.data;
        // if (num == 1) {
        //   that.data.imgOne = res.data.url;
        //   console.log("666");
        // } else if (num == 2) {
        //   that.data.imgtwo = res.data.url;
        // } else if (num == 3) {
        //   that.data.imgthree = res.data.url;
        // } else if (num == 4) {
        //   that.data.imgfour = res.data.url;
        // }
      }
      if (num == 1) {
        that.data.imgOne = res.data.url;
        console.log("666");
      } else if (num == 2) {
        that.data.imgtwo = res.data.url;
      } else if (num == 3) {
        that.data.imgthree = res.data.url;
      } else if (num == 4) {
        that.data.imgfour = res.data.url;
      }
    }
  });
}
