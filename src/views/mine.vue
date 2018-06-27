
<template>
  <div class="mine-container">
    <div class="a-cent_ban">
      <div class="banners">
        <div class="ban_left">
          <div class="portrait">
            <img :src="headImg" alt="666">
            <p class="notes_list">
              <span class="name">{{nickname}}</span>
              <span class="upddatePhone" @click="updatePhone">修改手机号</span>
            </p>

            <!-- <span class = "name">赵越</span> -->
          </div>
        </div>
        <div class="ban_right">
          <span @click="Perfectinformation()"><img src="../assets/icon/edit_1.png" alt=""></span>
        </div>
      </div>
      <div class="list_cents">
        <p @click="curriculum()">
          <span>
            <span class="icon"><img src="../assets/icon/course.png" alt=""></span>
            <span class="mine">我的课程</span>

          </span>
          <span class="more"><img src="../assets/icon/more.png" alt=""></span>
        </p>
        <p @click="integral()">
          <span>
            <span class="icon"><img src="../assets/icon/integral.png" alt=""></span>
            <span class="mine">我的积分</span>

          </span>
          <span class="more"><img src="../assets/icon/more.png" alt=""></span>
        </p>
        <p @click="address()">
          <span>
            <span class="icon"><img src="../assets/icon/address.png" alt=""></span>
            <span class="mine">我的地址</span>
          </span>
          <span class="more"><img src="../assets/icon/more.png" alt=""></span>

        </p>

        <!--<p @click="customservice()">-->
        <!--<span>-->
        <!--<i class="iconfont icon-yingyongchengxu-xianxing"></i>-->
        <!--<span class="mine">我的客服</span>-->

        <!--</span>-->
        <!--<span class="iconfont icon-yingyongchengxu-xianxing"></span>-->
        <!--</p>-->
        <!--<p>-->
        <!--<span>-->
        <!--<i class="iconfont icon-yingyongchengxu-xianxing"></i>-->
        <!--<span class="mine">我的微贷</span>-->

        <!--</span>-->
        <!--<span class="iconfont icon-yingyongchengxu-xianxing"></span>-->
        <!--</p>-->
        <p @click="photograph()">
          <span>

            <span class="icon"><img src="../assets/icon/database.png" alt=""></span>
            <span class="mine">资料库</span>

          </span>
          <span class="more"><img src="../assets/icon/more.png" alt=""></span>
        </p>
      </div>

    </div>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
export default {
  data() {
    return {
      headImg: "",
      nickname: ""
    };
  },
  created() {
    let that = this;
    that.getname();
    Indicator.open();
    setTimeout(() => {
      Indicator.close();
    }, 1000);
    //获取头像
    // this.headImg = localStorage.getItem("headimg");
    // this.nickname = localStorage.getItem("nickname");
  },
  methods: {
    getname() {
      let that = this;
      that.$axios
        .get(
          "http://mzbao.weiyingjia.org/api/meizubao/userInfo?uid=" +
            localStorage.id
        )
        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            this.headImg = res.data.data.headimg;
            this.nickname = res.data.data.nickname;
            console.log(res.data.data.verify_status);
            localStorage.verify_status = res.data.data.verify_status;
            // if (res.data.data.verify_status != 4) {
            //   console.log("99999");
            //   // this.$router.push({ name: "information" });
            // }
            console.log(nicknamename);
            console.log(headimgimg);
          }
        })
        .catch(() => {
          console.log("查询失败");
        });
    },
    //我的课程
    curriculum() {
      //点击我的课程时 跳到对应的页面
      this.$router.push({ name: "curriculum" });
    },
    //我的积分
    integral() {
      this.$router.push({ name: "integral" });
    },
    //我的地址
    address() {
      this.$router.push({ name: "address" });
    },
    //资料库
    photograph() {
      this.$router.push({ name: "photograph" });
    },
    //完善信息
    Perfectinformation() {
      let verify_status = localStorage.verify_status;
      if (verify_status != 4) {
        console.log("99999");
        this.$router.push({ name: "information" });
      }
    },
    updatePhone() {
      this.$router.push({
        path: `/phone/${2}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/helper.scss";
.mine-container {
  width: 100%;
  height: 100%;
  position: relative;
  background: #fff;
  // height: calc(100% - 0.88rem);
  // background: #fff;
}
.a-cent_ban {
  width: 100%;
  height: auto;
}
.banners {
  width: 100%;
  height: px2rem(150px);
  background-image: linear-gradient(-130deg, #fd4689 0%, #fd82d9 100%);
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.banners .ban_left {
  width: px2rem(184px);
  height: px2rem(120px);
  // line-height: px2rem(100px);
}
.banners .ban_left .portrait {
  width: px2rem(184px);
  height: px2rem(76px);
  border-radius: 50%;
  margin-top: px2rem(23px);
  z-index: 1000;
  display: flex;
}
.banners .ban_left .portrait img {
  width: px2rem(76px);
  height: 100%;
  border-radius: 50%;
}
.banners .ban_left .notes_list {
  display: block;
  font-size: px2rem(17px);
  // color: #000;
  // line-height: px2rem(76px);
  height: 100%;

  margin-left: px2rem(12px);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  span{
    display: block;
    line-height: (30px);
  }
  // width
}

.banners .ban_right {
  width: px2rem(20px);
  height: 100%;
  // line-height: 2rem;
  color: #fff;
  display: flex;
  align-items: center;
  /* background: red; */
}
.banners .ban_right img {
  width: 100%;
  height: px2rem(20px);
  margin-bottom: px2rem(30px);
  // height: 100%;
}
.icons {
  color: #ddeecc;
}
.list_cents {
  width: 94.7%;
  box-shadow: 0 2px 9px 0 rgba(253, 74, 203, 0.15);
  border-radius: 10px;
  margin: 0 auto;
  margin-top: -20px;
  background: #fff;
}
.list_cents p {
  width: 100%;
  height: px2rem(46px);
  line-height: px2rem(46px);
  border-bottom: 1px solid #f7f7f7;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
}
.list_cents p {
  position: relative;
  display: flex;
}

.list_cents p .icon {
  width: 18.4px;
  height: 17.4px;
  display: block;
}
.list_cents p .icon img {
  display: block;
  width: 100%;
}
.icon_right img {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-top: 10px;
}
.curriculum_mine img {
  width: 20px;
  height: 20px;
  margin-top: 10px;
}
.list_cents p i {
  color: #fd4689;
  font-size: 0.36rem;
}
/* .list_cent p{} */
.list_cents p .mine {
  position: absolute;
  top: -0px;
  left: 47px;
  font-size: 15px;
  font-family: PingFangSC-Regular, sans-serif;
}
.list_cents p .more {
  width: 20px;
  height: 14px;
  display: block;
}
.list_cents p .more img {
  width: 100%;
  display: block;
  left: 42px;
  font-size: 15px;
  color: #333333;
  margin-left: 15px;
  font-size: 14px;
}
.upddatePhone {
  display: inline-block;
  color: #fff;
  font-size: px2rem(14px);
}
</style>
