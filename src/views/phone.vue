<template>
  <div class="phoneContain" v-title="titles">
    <div class="updatePhone" v-if="status">
      <div class="already">
        <img src="../assets/images/phone.png" alt="">
        <span>已绑定的手机号</span>
      </div>
      <div class="inputContent">
        <input type="number" :placeholder="word" v-model="alreadyNum" ref="input">
      </div>
      <div class="buttons">
        <mt-button size="large" @click="nextTep" :disabled="!isDisableds" :class="isDisableds == true?'isActives':'showActives'">绑定手机号</mt-button>
      </div>
    </div>
    <div class="content" v-else>
      <div class="topline">
        <div class="leftPhone">
          <img src="../assets/images/phone.png" alt=""> 电话号：
        </div>
        <div class="rightInput">
          <input type="text" class="phoneNum" placeholder="请输入绑定的电话号" v-model="phoneNum">

          <!-- <mt-field  placeholder="请输入绑定的电话号" type="tel" v-model="phone"></mt-field> -->
        </div>
      </div>
      <div class="bottomLine">
        <div class="leftPhone">
          <img src="../assets/images/lock.png" alt=""> 验证码：
        </div>
        <div class="rightcoe">
          <input type="number" class="phoneNum" placeholder="请输入验证码" v-model="code">
          <button :disabled="disabled || time > 0" @click="send">
            {{ text }}
          </button>
        </div>
      </div>
      <div class="button">
        <mt-button size="large" @click="sendCode" :disabled="!isDisabled" :class="isDisabled == true?'isActive':'showActive'">绑定手机号</mt-button>
      </div>

    </div>

  </div>
</template>
<script>
import { Field, Toast } from "mint-ui";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      phoneNum: "",
      status: 1,
      code: "",
      //   text:"",
      disabled: false,
      second: 60,
      time: 0,
      id: "",
      titles: "",
      word: "",
      isDisableds: true,
      alreadyNum: ""
      //   isDisabled:true
    };
  },
  computed() {},
  created() {
    var str = window.location.href;
    var spstr = str.split("/");
    this.id = spstr[spstr.length - 1];
    this.alreadyNum = localStorage.tel;
    if (this.id == 1) {
      this.titles = "绑定电话号";
      this.word = "您还未绑定手机号";
    } else {
      this.titles = "修改电话号";
      this.word = "请输入您要修改的手机号";
    }
  },
  computed: {
    text: function() {
      return this.time > 0 ? this.time + "s " : "获取";
    },
    isDisabled: function() {
      if (!/^1[634578]\d{9}$/.test(this.phoneNum)) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    ...mapActions(["setPhoneNum"]),
    send() {
      if (!this.isDisabled) {
        Toast("电话号有误");
        return false;
      }
      this.time = this.second;
      this.timer();
      this.getCode();
    },
    sendCode() {
      if (this.code == "") {
        Toast("验证码不能为空");
        return false;
      }
      this.$axios
        .post(window.ajaxSrc + "/api/meizubao/bindingMobile", {
          mobile: this.phoneNum,
          code: this.code,
          uid: localStorage.id
        })
        .then(res => {
          console.log(res);
          if (res.data.status_code == "1001") {
            Toast("绑定成功");
            localStorage.tel = this.phoneNum;
            this.setPhoneNum(this.phoneNum)
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
          }
        })
        .catch(() => {});
    },
    timer() {
      if (this.time > 0) {
        this.time--;
        setTimeout(this.timer, 1000);
      }
    },
    getCode() {
      this.$axios
        .get(window.ajaxSrc + "/api/meizubao/telcode", {
          params: {
            phone: this.phoneNum,
            used_type: 2
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.status_code == "200") {
            Toast("发送成功");
          }else if(res.data.status_code == '202'){
            Toast("发送失败")
          }
        });
    },
    nextTep() {
      if (this.alreadyNum == "") {
        Toast("电话不能weikong");
        this.isDisableds = false;
        return;
      }
      this.status = false
      this.phoneNum  = this.alreadyNum
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/helper.scss";
.updatePhone {
  width: 100%;
  height: auto;
}
.already {
  font-size: px2rem(15px);
  color: #000;
  width: 100%;

  height: px2rem(30px);
  margin-top: px2rem(30px);
  display: flex;
  align-items: center;
  img {
    width: px2rem(15px);
    height: px2rem(20px);
    margin-right: px2rem(10px);
    margin-left: 2%;
  }
}
.inputContent {
  width: 92%;
  margin-left: 4%;
  margin-top: px2rem(20px);
  height: px2rem(49px);
  border: 1px solid #ccc;
  background: #fafafa;
  color: #999999;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  input {
    border: none;
    outline: none;
    appearance: none;
    background: none;
    font-size: px2rem(20px);
  }
}
.phoneContain {
  width: 100%;

  a {
    text-decoration: none;
  }
  .content {
    width: 100%;
    overflow: hidden;
  }
}
.topline {
  position: relative;
  width: 100%;
  height: px2rem(71px);
  font-size: px2rem(15px);
  display: flex;
  align-items: center;
  flex-direction: crow;
  border-bottom: 1px solid #e8e8e8;
}
.leftPhone {
  // width: 100%;
  // height: px2rem(71px);
  margin-left: 8%;
  display: flex;
  align-items: center;
  img {
    width: px2rem(15px);
    height: px2rem(20px);
    margin-right: px2rem(10px);
  }
}
.rightInput {
  margin-left: 5.3%;
  .phoneNum {
    border: none;
    outline: none;
    appearance: none;
  }
}
.bottomLine {
  position: relative;
  width: 100%;
  height: px2rem(71px);
  font-size: px2rem(15px);
  display: flex;
  align-items: center;
  flex-direction: crow;
  border-bottom: 1px solid #e8e8e8;
  .rightcoe {
    margin-left: 5.3%;
    display: flex;
    input {
      display: block;
      border: none;
      outline: none;
      appearance: none;
    }
    button {
      display: block;
      border: none;
      outline: none;
      width: px2rem(56px);
      height: px2rem(24px);
      border-radius: px2rem(41px);
      background-image: linear-gradient(-130deg, #fd4689 0%, #fd82d9 100%);
      color: #fff;
      font-size: px2rem(14px);
    }
  }
}
.button {
  width: 100%;
  margin-top: px2rem(60px);
  font-size: px2rem(15px);
  .isActive {
    width: 80%;
    margin-left: 10%;
    background-image: linear-gradient(120deg, #fd4689 10%, #fd82d9 100%);
    border-radius: px2rem(100px);
    color: #fff;
  }
  .showActive {
    border-radius: px2rem(100px);
    width: 80%;
    margin-left: 10%;
    background: #cccccc;
    color: #fff;
  }
}
.buttons {
  width: 100%;
  margin-top: px2rem(60px);
  font-size: px2rem(15px);
  .isActives {
    width: 80%;
    margin-left: 10%;
    background-image: linear-gradient(120deg, #fd4689 10%, #fd82d9 100%);
    border-radius: px2rem(100px);
    color: #fff;
  }
  .showActives {
    border-radius: px2rem(100px);
    width: 80%;
    margin-left: 10%;
    background: #cccccc;
    color: #fff;
  }
}
</style>
