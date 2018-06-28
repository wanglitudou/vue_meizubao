<template>
  <div class="conatin">
    <input type="text"
           class="inp">
    <button @click="wxshare()">上传图片</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList: {
        appId: "",
        nonceStr: "",
        timestamp: null,
        dataUrl: "",
        signature: ""
      },
      userId: null,
      visualscreen: [], //培训视屏
      dqurl: ""
    };
  },
  created() {
    let that = this;
    // that.upload();
    // that.wxshare();
  },
  methods: {
    upload() {
      console.log("上传");
    },
    wxshare() {
      let that = this;
      that.$axios
        .get("http://mzbao.weiyingjia.org/api/meizubao/wxSign", {
          params: {
            http: location.href
          }
        })
        .then(res => {
          if (res.data.status_code == 1001) {
            console.log(res.data.data);
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
                "chooseImage" //上传图片
              ]
            });

            wx.chooseImage({
              count: 1, // 默认9
              sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
              success: function(res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                console.log(localIds + "666");
                console.log("微信上传");
                alert(album);
                alert(camera);
              }
            });
          }
        })
        .catch(res => {
          console.log(res);
        });
    }
  }
};
</script>
<style scoped>
.inp {
  width: 100px;
  height: 50px;
  border: 1px solid #cccccc;
}
</style>


