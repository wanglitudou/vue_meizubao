<template>
  <div class="container">
    <div class="cent_ber">
      <div class="cent_img">
        <img src="../../assets/images/ban.jpg"
             alt="">
      </div>
    </div>
    <div class="phone">
      <p class="pho_pho">
        <span class="pho_tel">手机号</span>
        <span class="ple_pho">
          <input name="phone"
                 type="text"
                 class="inpt"
                 placeholder="请输入手机号码"
                 v-model="phone" />
        </span>
      </p>
      <p class="ver_code">
        <span class="ver_tel">验证码</span>
        <span class="ver_pho">
          <input type="text"
                 class="inpt"
                 placeholder="请输入验证码">
        </span>
        <span class="ver_send"
              @click="send()">发送</span>
      </p>
      <p class="log_log">
        <span class="log_lo"
              @click="login()"> 登录</span>
      </p>
      <p class="wech">
        <span class="wech_img">
          <img src="../../assets/icon/wechat.png"
               alt=""
               @click="authorization()">
        </span>
      </p>
    </div>
  </div>
</template>
<script src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js "></script>

<script>
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      phone: this.phone
    };
  },
  methods: {
    send() {
      let that = this;
      if (!/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(that.phone)) {
        MessageBox.alert("请输入正确的手机号格式");
        // alert("请输入正确的手机号格式");
        return false;
      }
      //获取验证码
      that.$axios
        .get(
          "http://mzbao.weiyingjia.org/api/meizubao/telcode?phone=" +
            that.phone +
            "&used_type=1",
          {}
        )
        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            console.log(res.data.data);
            // that.tabs = res.data.data;
            // this.getData(res.data.data[0].id, "", this.pages, 1);
          }
        })
        .catch(() => {
          console.log("查询失败");
        });
    },
    login() {
      this.$router.push({ name: "home" });
    },
    authorization() {
      console.log("666");
    },
    types() {
      let that = this;
      //手机号登陆
      that.$axios
        .get("http://mzbao.weiyingjia.org/api/meizubao/wlogin", {})
        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
          }
        })
        .catch(() => {
          console.log("查询失败");
        });
      // $.ajax({
      //   type: "get",
      //   url: "http://mzbao.weiyingjia.org/api/meizubao/wlogin",
      //   async: false,
      //   // dataType: "jsonp",
      //   success: function(data) {
      //     console.log(data);
      //     // if (data.errcode == 100010) {
      //     //   var _url = data.errmsg + "?url=" + window.location.href;
      //     //   console.log(data.errmsg + "?url=" + window.location.href);
      //     //   window.location.href = _url;
      //     // }
      //   },
      //   error: function() {
      //     console.log("异常！");
      //   }
      // });
    }
  },
  created() {
    //获取授权

    this.types();
    // var tokenUrl = window.sessionStorage.getItem("token");
    // var $login = window.sessionStorage.getItem("$login");
    // if ($login !== "$login") {
    //   if (!tokenUrl) {
    //     var url = "http://pushcms.wx.weiyingjia.org/site/getuserinfo";
    //     function UrlSearch() {
    //       var name, value;
    //       var str = location.href; //取得整个地址栏
    //       var num = str.indexOf("?");
    //       str = str.substr(num + 1); //str得到?之后的字符串
    //       var arr = str.split("&"); //得到&分割的参数，放入数组中
    //       for (var i = 0; i < arr.length; i++) {
    //         num = arr[i].indexOf("=");
    //         if (num >= 0) {
    //           name = arr[i].substring(0, num);
    //           value = arr[i].substr(num + 1);
    //           this[name] = value;
    //         }
    //       }
    //     }

    //     var Request = new UrlSearch();
    //     var code = Request.code;
    //     // var userId = Request.userid;
    //     if (Request.userid == "undefined") {
    //       var userId = "";
    //     } else {
    //       var userId = Request.userid;
    //     }
    //     var storage = window.sessionStorage;
    //     console.log(code);
    //     if (code) {
    //       //console.log(code);return false;
    //       var urlCode = url + "?code=" + code + "&userid=" + userId;
    //       $.ajax({
    //         type: "get",
    //         url: urlCode,
    //         async: false,
    //         success: function(data) {
    //           console.log(data);
    //           if (data.errcode == 200) {
    //             var errmessage = data.errmsg;
    //             var member = data.member;
    //             window.sessionStorage.setItem("$login", "$login");
    //             window.sessionStorage.setItem("token", errmessage); // 在这里设置的
    //             window.sessionStorage.setItem("member", member); //  授权获得用户的token，后面分享出去需要带的参数
    //             // alert(errmessage);
    //           }
    //         },
    //         error: function(err) {
    //           console.log(err);
    //         }
    //       });
    //     } else {
    //       $.ajax({
    //         type: "get",
    //         url: url,
    //         async: false,
    //         success: function(data) {
    //           console.log(data);
    //           if (data.errcode == 100010) {
    //             var _url = data.errmsg + "?url=" + window.location.href;
    //             console.log(data.errmsg + "?url=" + window.location.href);
    //             window.location.href = _url;
    //           }
    //         },
    //         error: function() {
    //           console.log("异常！");
    //         }
    //       });
    //     }
    //   }
    // }
  }
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  height: calc(100% - 1.5rem);
  overflow: hidden;
  background: #ffffff;
}
.inpt {
  width: 5rem;
  padding: 0.1rem 0.2rem;
  outline: none;
  border: none;
  cursor: pointer;
}
.cent_ber {
  width: 7.068rem;
  height: 3rem;
  line-height: 3rem;
  margin: 0.2rem auto 0;
  text-align: center;
  margin: 0 auto;
  position: relative;
}
.cent_img {
  width: 60%;
  height: 60%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}
.cent_img img {
  width: 90%;
  height: 80%;
}
.phone {
  width: 7.068rem;
  /* height: 2.4rem; */
  margin: 0.2rem auto 0;
  margin-top: 1rem;
}
.pho_pho {
  border-bottom: 1px solid #f7f7f7;
  height: 1.2rem;
  line-height: 1.2rem;
}
.ver_code {
  height: 1.2rem;
  line-height: 1.2rem;
}
.pho_tel {
  margin-left: 20px;
  font-size: 15px;
  color: #333333;
  letter-spacing: 0;
  line-height: 16px;
}
.ple_pho {
  margin-left: 20px;
  font-size: 17px;
  color: #cccccc;
  letter-spacing: 0;
  line-height: 16px;
}
.ver_tel {
  margin-left: 20px;
  font-size: 15px;
  color: #333333;
  letter-spacing: 0;
  line-height: 16px;
}
.ver_pho {
  margin-left: 20px;
  font-size: 17px;
  color: #cccccc;
  letter-spacing: 0;
  line-height: 16px;
}
.ver_send {
  width: 1rem;
  height: 0.8rem;
  line-height: 0.8rem;
  float: right;
  border: 1px solid #fd4689;
  padding: 0 10px;
  margin-right: 30px;
  font-size: 14px;
  color: #fd4689;
  letter-spacing: 0;
  border-radius: 5px;
  margin-top: 0.2rem;
}
.log_log {
  width: 6rem;
  height: 0.8rem;
  line-height: 0.8rem;
  margin: 0.2rem auto 0;
  border: 1px solid rgb(241, 113, 113);
  background-image: linear-gradient(-130deg, #fd4689 0%, #fd82d9 100%);
  box-shadow: 0 2px 4px 0 rgba(253, 70, 137, 0.25);
  border-radius: 3px;
  margin-top: 1.2rem;
  text-align: center;
}
.log_lo {
  font-size: 15px;
  color: #ffffff;
  letter-spacing: 0;
}
.wech {
  width: 7.068rem;
  height: 0.88rem;
  line-height: 0.88rem;
  text-align: center;
  margin-top: 1.5rem;
}
.wech_img img {
  width: 0.88rem;
  height: 0.88rem;
}
</style>
