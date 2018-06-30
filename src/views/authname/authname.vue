<template>
  <div class="infor_container">
    <div class="auth_name">
      <div class="id_num">
        <p class="id_name">
          <span class="id_id">身份证号码:</span>
          <span class="id_txt"
                id="updata">
            <input type="text"
                   class="inpt"
                   v-model="data.id_card"
                   placeholder="请输入身份证号码">
          </span>
        </p>
      </div>
      <div class="up_data">
        <span class="updata_lef">

          <input type="file"
                 class="inpt_imgone"
                 id="choose"
                 @click="actionSheet"
                 @change="updataimg($event,1)">
          <img :src="data[0].imgOne"
               alt="">
        </span>
        <span class="updata_rig"><input type="file"
                 class="inpt_imgtwo"
                 id="img-upload"
                 name="upload"
                 accept="image/*"
                 multiple
                 @change="updataimg($event,2)">
          <img :src="data[0].imgtwo"
               alt=""></span>

      </div>
      <div class="id_details">
        <div class="positive">身份证正面</div>
        <div class="reverse">身份证反面</div>
      </div>
      <div class="id_num id_number">
        <p class="id_name">
          <span class="id_id">家庭住址:</span>
          <span class="id_txt">
            <input type="text"
                   v-model="data.home_address"
                   @blur="homeaddress()"
                   placeholder="请输入家庭住址">
          </span>
        </p>
      </div>
      <div class="up_data up_dataimg">
        <span class="updata_lefs"><input type="file"
                 class="inpt_imgthree"
                 id="img-upload"
                 name="upload"
                 accept="image/*"
                 multiple
                 @change="updataimg($event,3)">
          <img :src="data[0].imgthree"
               alt="">
        </span>
        <span class="updata_rigs"><input type="file"
                 class="inpt_imgfour"
                 id="img-upload"
                 name="upload"
                 accept="image/*"
                 multiple
                 @change="updataimg($event,4)">
          <img :src="data[0].imgfour"
               alt="">
        </span>
      </div>
      <div class="id_details">
        <div class="positive">店面门头照片</div>
        <div class="reverse">店面内部照片</div>
      </div>
      <div class="relation">
        <p class="credit">
          <span class="sesame">关联芝麻信用</span>
        </p>
      </div>
    </div>
    <div class="next_up">
      <span class="next_nex"
            @click="submitBtn()">已完成</span>
    </div>

    <!-- <div>
      <button @click="actionSheet">
        <label class="mint-button-text">点击上拉 action sheet</label>
      </button>

    </div> -->
    <mt-actionsheet :actions="data"
                    v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>
<script>
import { Toast, Indicator } from "mint-ui";
import { Popup, picker } from "mint-ui";
// import { Toast } from "mint-ui";
// import { Picker } from "mint-ui";
import { Actionsheet } from "mint-ui";
import "mint-ui/lib/style.css";
export default {
  name: "infor_container",
  data() {
    return {
      // data: [{
      //   headimg: "",
      //   manage_years: "",
      //   manage_area: "",
      //   id_card: "",
      //   card_front: "",
      //   card_behind: "",
      //   home_address: "",
      //   business_license: "",
      //   store_image: "",
      //   store_name: "",
      //   lists: [],
      //   fileList: [],
      //   imgOne: "",
      //   imgtwo: "",
      //   imgthree: "",
      //   imgfour: ""
      // }],

      // // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏
      sheetVisible: false,
      data: [
        {
          //其他
          headimg: "",
          manage_years: "",
          manage_area: "",
          id_card: "",
          card_front: "",
          card_behind: "",
          home_address: "",
          business_license: "",
          store_image: "",
          store_name: "",
          lists: [],
          fileList: [],
          imgOne: "",
          imgtwo: "",
          imgthree: "",
          imgfour: ""
          // name: "拍照",
          // method: this.getCamera, // 调用methods中的函数
          // name: "从相册中选择",
          // method: this.getLibrary, // 调用methods中的函数
          // sheetVisible: false
        },
        {
          name: "拍照",
          method: this.getCamera // 调用methods中的函数
        },
        {
          name: "从相册中选择",
          method: this.getLibrary // 调用methods中的函数
        }
      ],
      sheetVisible: false
    };
  },
  created(e) {
    // var plateform = Zepto.device.os;
    // if (plateform == "android") {
    //   $("selector")
    //     .find("input[type='file']")
    //     .attr("capture", "camera");
    // } else if (plateform == "ios") {
    //   $("selector")
    //     .find("input[type='file']")
    //     .removeAttr("capture");
    // }
    var ua = navigator.userAgent.toLowerCase();
    //判断是否是苹果手机，是则是true
    var isIos = ua.indexOf("iphone") != -1 || ua.indexOf("ipad") != -1;
    if (isIos) {
      $("input:file").removeAttr("capture");
    }

    Indicator.open();
    this.getInfo();
    setTimeout(() => {
      Indicator.close();
    }, 500);
  },
  methods: {
    getInfo() {
      let that = this;
      that.$axios
        .get(
          "http://mzbao.weiyingjia.org/api/meizubao/userInfo?uid=" +
            localStorage.id
        )
        .then(res => {
          console.log(res);
          console.log("我是图片");
          if (res.data.status_code == 1001) {
            that.data[0].imgOne = res.data.data.card_front;
            that.data[0].imgtwo = res.data.data.card_behind;
            that.data[0].imgthree = res.data.data.business_license;
            that.data[0].imgfour = res.data.data.store_image;
            that.data[0].id_card = res.data.data.id_card;
            that.data[0].home_address = res.data.data.home_address;
          }
        })
        .catch(() => {
          console.log("查询失败");
        });
    },
    submitBtn() {
      //身份验证
      let that = this;
      if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(that.data.id_card)) {
        Toast("请输入正确的身份证格式");
        return false;
      }
      //用户信息
      this.$axios
        .post("http://mzbao.weiyingjia.org/api/meizubao/updateUserInfo", {
          uid: localStorage.id,
          user_name: this.$route.query.name,
          age: this.$route.query.age,
          birthdate: this.$route.query.birthdate,
          telephone: this.$route.query.phone,
          email: this.$route.query.mailbox,
          store_name: this.$route.query.Adname, //商店名称
          store_addr: this.$route.query.address,
          manage_years: this.$route.query.manage_years,
          manage_area: this.$route.query.manage_area,
          id_card: this.data.id_card,
          home_address: this.data.home_address
        })
        .then(res => {
          console.log(res);
          if ((res.data.status_code = "1001")) {
            localStorage.user_name = this.$route.query.name;
            console.log(localStorage.user_name);
            Toast("修改成功");
            setTimeout(() => {
              this.$router.push({ name: "mine" });
            }, 800);
          }
        })
        .catch(res => {
          console.log(res);
          console.log("查询失败");
        });
    },
    // complete() {
    //   this.$router.push({ name: "mine" });
    // },
    // idCardReg(num) {
    //   var regS = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; // 身份证号码

    //   console.log(num);
    // },
    homeaddress() {},
    updataimg(e, num) {
      let file = e.target.files[0];
      console.log(file);
      // alert(file.isClosed);
      // alert(file.path);
      // if (file.isClosed == undefined) {
      //   return Toast("上传失败");
      // }else{
      //    }
      // }
      // alert(file.type);
      // alert(file.name);
      // alert(file.lastModified);

      var formData = new FormData();
      //上传图片
      formData.append("img", file);
      formData.append("type", num);
      formData.append("uid", localStorage.id);
      let that = this;
      // that.$axios
      //   .post("http://mzbao.weiyingjia.org/api/meizubao/uploadImages", {

      //   })
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(() => {
      //     console.log("查询失败");
      //   });
      console.log(formData);
      $.ajax({
        type: "post",
        url: "http://mzbao.weiyingjia.org/api/meizubao/uploadImages",
        data: formData,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function(res) {
          console.log(res.data);
          // alert(res.data.url);

          if (res.code == 200) {
            that.fileList = res.data;
          }
          if (num == 1) {
            that.data[0].imgOne = res.data.url;
            console.log("666");
          } else if (num == 2) {
            that.data[0].imgtwo = res.data.url;
          } else if (num == 3) {
            that.data[0].imgthree = res.data.url;
          } else if (num == 4) {
            that.data[0].imgfour = res.data.url;
          }
        },
        error: function(res) {
          console.log(11111);
        }
      });
    },
    actionSheet: function() {
      // 打开action sheet
      this.sheetVisible = true;
    },
    getCamera: function() {
      console.log("打开照相机");
    },
    getLibrary: function() {
      console.log("打开相册");
    }
  }
};
</script>
<style  lang="scss" scoped>
@import "../../styles/helper.scss";
.infor_container {
  width: 100%;
  height: auto;
  height: calc(100% - 1.5rem);
  background: #fff;
}
.id_details {
  width: px2rem(355px);
  height: px2rem(20px);
  line-height: px2rem(20px);
  color: #666;
  margin-top: 5px;
}
.positive {
  float: left;
  margin-left: 21%;
}
.reverse {
  float: left;
  margin-left: 24%;
}
.auth_name {
  width: px2rem(355px);
  height: px2rem(390px);
  background: #ffffff;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 3px;
  margin: 0.2rem auto 0;
}
.id_id {
  margin-left: px2rem(10px);
}
.id_num {
  width: px2rem(355px);
  height: px2rem(44px);
  line-height: px2rem(44px);
  border-bottom: 1px solid #f7f7f7;
}
.id_name {
  margin-left: 20px;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
}
.id_txt {
  margin-left: 10px;
  font-size: 14px;
  color: #cccccc;
  letter-spacing: 0;
}
.updata {
  margin-left: 10px;
  font-size: 14px;
  color: #cccccc;
  letter-spacing: 0;
}

.id_txt input {
  width: px2rem(200px);
  height: 0.88rem;
  line-height: 0.88rem;
  border: 0;
  outline: none;
  border-bottom: 1px solid #f7f7f7;
  border-right: 0;
}
.up_data {
  width: px2rem(355px);
  height: px2rem(72px);
  line-height: 1.48rem;
  margin-top: 0.22rem;
  display: flex;
  justify-content: space-between;
  padding: 0 50px;
}
.updata_lef {
  width: px2rem(115px);
  height: px2rem(72px);
  line-height: px2rem(72px);
  background: #eeeeee;
  border-radius: 3px;
  position: relative;
}
.updata_lef img {
  position: absolute;
  width: 100%;
  height: 100%;
}
.updata_lefs {
  width: px2rem(115px);
  height: px2rem(72px);
  line-height: px2rem(72px);
  background: #eeeeee;
  border-radius: 3px;
  position: relative;
}
.updata_lefs img {
  position: absolute;
  width: 100%;
  height: 100%;
}
.inpt_imgone {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 999;
}
.inpt_imgtwo {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 999;
}
.inpt_imgthree {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 999;
}
.inpt_imgfour {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 999;
}
.updata_rig {
  width: px2rem(115px);
  height: px2rem(72px);
  line-height: px2rem(72px);
  background: #eeeeee;
  border-radius: 3px;
  position: relative;
}
.updata_rig img {
  position: absolute;
  width: 100%;
  height: 100%;
}
.updata_rigs {
  width: px2rem(115px);
  height: px2rem(72px);
  line-height: px2rem(72px);
  background: #eeeeee;
  border-radius: 3px;
  position: relative;
}
.updata_rigs img {
  position: absolute;
  width: 100%;
  height: 100%;
}
.up_dataimg {
  margin-top: 10px;
}
.relation {
  width: px2rem(355px);
  height: 1.6rem;
  line-height: 1.6rem;
}
.credit {
  width: px2rem(355px);
  height: 1.6rem;
  line-height: 1.6rem;
  text-align: center;
  font-size: 14px;
  color: #fd4689;
  letter-spacing: 0;
}
.next_up {
  margin-top: 1rem;
  text-align: center;
}
.next_nex {
  width: px2rem(120px);
  height: px2rem(36px);
  line-height: px2rem(36px);
  padding: 10px 35px;
  background: #ffffff;
  border: 1px solid #fd4689;
  border-radius: 3px;
  font-size: 14px;
  color: #fd4689;
  letter-spacing: 0;
}
</style>
