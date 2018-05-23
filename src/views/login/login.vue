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
        <span class="ple_pho">请输入手机号码</span>
      </p>
      <p class="ver_code">
        <span class="ver_tel">验证码</span>
        <span class="ver_pho">请输入验证码</span>
        <span class="ver_send">发送</span>
      </p>
      <p class="log_log">
        <span class="log_lo"
              @click="login()"> 登录</span>
      </p>
      <p class="wech">
        <span class="wech_img">
          <img src="../../assets/icon/wechat.png"
               alt="">
        </span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    login() {
      this.$router.push({ name: "home" });
    }
  }
};
</script>
<style scoped>
.container {
  width: 100%;
  height: auto;
  height: calc(100% - 1.5rem);
  background: #ffffff;
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
