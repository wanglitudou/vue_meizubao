<template>
  <div class="infore_container">
    <div class="perfect">
      <div class="id_num">
        <p class="id_name">
          <span>姓 名：</span>
          <span class="id_txt">
            <input type="text"
                   v-model="data.name"
                   placeholder="请输入姓名">
          </span>
        </p>
      </div>
      <div class="id_num">
        <p class="id_name">
          <span>年 龄：</span>
          <span class="id_txt">
            <input type="text"
                   v-model="data.age"
                   placeholder="请输入年龄">
          </span>
        </p>
      </div>
      <div class="id_num">
        <p class="id_name">
          <span>生 日：</span>
          <span class="id_txt">
            <input type="text"
                   v-model="data.birthdate"
                   placeholder="请输入生日">
          </span>
        </p>
      </div>
      <div class="id_num">
        <p class="id_name">
          <span>电 话：</span>
          <span class="id_txt">
            <input type="text"
                   v-model="data.phone"
                   placeholder="请输入电话">
          </span>
        </p>
      </div>
      <div class="id_num">
        <p class="id_name">
          <span>邮 箱：</span>
          <span class="id_txt">
            <input type="text"
                   v-model="data.mailbox"
                   placeholder="请输入邮箱">
          </span>
        </p>
      </div>
      <div class="id_num">
        <p class="id_name">
          <span>店院名称：</span>
          <span class="id_txt id_ple">
            <input type="text"
                   v-model="data.shop"
                   placeholder="请输入店院名称">
          </span>
        </p>
      </div>
      <div class="id_num">
        <p class="id_name">
          <span>店院地址：</span>
          <span class="id_txt id_ple">
            <input type="text"
                   v-model="data.address"
                   placeholder="请输入店院地址">
          </span>
        </p>
      </div>
      <div class="year_nums">
        <div class="year_lef">
          <span class="manag"> 经营年限：</span>
        </div>
        <div class="year_rig">
          <p class="new_year">
            <span class="new_name yearBtn 新开业"
                  vl="新开业">新开业</span>
            <span class="new_name yearBtn 1年以内"
                  vl="1年以内">1年以内</span>
            <span class="new_name yearBtn 1~3年"
                  vl="1~3年">1~3年</span>
          </p>
          <p class="year_new">
            <span class="new_name yearBtn 3~5年"
                  vl="3~5年">3~5年</span>
            <span class="new_name yearBtn 5~10年"
                  vl="5~10年">5~10年</span>
            <span class="new_name yearBtn 10年以上"
                  vl="10年以上">10年以上</span>
          </p>
        </div>
      </div>
      <div class="year_nums">
        <div class="year_lef">
          <span class="manag"> 经营面积：</span>
        </div>
        <div class="year_rig">
          <p class="new_year">
            <span class="new_name areBtn 50"
                  vl="50">50</span>
            <span class="new_name areBtn 50-100"
                  vl="50-100">50-100</span>

            <span class="new_name areBtn 100-200"
                  vl="100-200">100-200</span>
          </p>
          <p class="year_new">
            <span class="new_name areBtn 200-500"
                  vl="200-500">200-500</span>
            <span class="new_name areBtn 500-1000"
                  vl="500-1000">500-1000</span>
            <span class="new_name areBtn 1000以上"
                  vl="1000以上">1000以上</span>
          </p>
        </div>
      </div>
      <div class="next_up">
        <span class="next_nex"
              @click="authname()">下一步</span>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast, Indicator } from "mint-ui";
export default {
  data() {
    return {
      data: {
        phone: "",
        name: "",
        age: "",
        mailbox: "",
        shop: "",
        address: "",
        birthdate: "",
        //其他
        id: "",
        headimg: "",
        manage_years: "",
        manage_area: "",
        id_card: "",
        lists: []
      }
      //   arr: ["200", "333"]
    };
  },
  created() {
    Indicator.open();
    setTimeout(() => {
      Indicator.close();
    }, 1000);

    let that = this;
    setTimeout(function() {
      $(".new_name").each(function(x) {
        $(".new_name")
          .eq(x)
          .click(function() {
            if (x < 6) {
              that.data.manage_years = $(".new_name")
                .eq(x)
                .attr("vl");
              $(".yearBtn").removeClass("yearActive");
              $(".yearBtn")
                .eq(x)
                .addClass("yearActive");
            } else {
              that.data.manage_area = $(".new_name")
                .eq(x)
                .attr("vl");
              $(".areBtn").removeClass("yearActive");
              $(".areBtn")
                .eq(x - 6)
                .addClass("yearActive");
            }
          });
      });
    }, 0);
    console.log($(".new_name"));
    //用户信息
    that.$axios
      .get(window.ajaxSrc + "/api/meizubao/userInfo?uid=" + localStorage.id)
      .then(res => {
        console.log(res);
        if (res.data.status_code == 1001) {
          console.log(res.data.data);
          // that.data.id="",//用户id
          //  that.data.headimg="",//头像
          that.data.name = res.data.data.user_name;
          that.data.age = res.data.data.age;
          that.data.phone = res.data.data.telephone;
          that.data.shop = res.data.data.store_name;
          that.data.address = res.data.data.store_addr;
          that.data.birthdate = res.data.data.birthdate;
          that.data.mailbox = res.data.data.email;
          that.data.manage_years = res.data.data.manage_years; //经营年限
          that.data.manage_area = res.data.data.manage_area; //经营面积
          that.lists = res.data.data;
          $("." + res.data.data.manage_years).addClass("yearActive");
          $("." + res.data.data.manage_area).addClass("yearActive");
        }
        //如果verify_status==4  跳转到个人信息页面
        console.log(res.verify_status);
        if (res.data.data.verify_status !== 4) {
          // alert("666" if (res.data.data.verify_status !== 4) {
          // alert("666");
          // that.$router.push()
          // that.$router.push({ name: "information" });
          console.log("111");
        } else {
          console.log("lalalla");
        }
      })
      .catch(() => {
        console.log("查询失败");
      });
  },
  methods: {
    authname() {
      let that = this;
      if (!/^(?:[1-9]?\d|100)$/.test(that.data.age)) {
        Toast("请输入正确的年龄格式");
        return false;
      }
      //验证姓名
      if (!/^([a-zA-Z0-9\u4e00-\u9fa5\·]{1,10})$/.test(that.data.name)) {
        Toast("请输入正确的姓名格式");
        return false;
      }
      // if (
      //   !/^(19|20)\d{2}-(1[0-2]|0?[1-9])-(0?[1-9]|[1-2][0-9]|3[0-1])$/.test(
      //     that.data.birthdate
      //   )
      // ) {
      //   Toast("请输入正确的格式生日");
      //   return false;
      // }
      if (!/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(that.data.phone)) {
        Toast("请输入正确的手机号格式");
        return false;
      }
      if (
        !/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/.test(
          that.data.mailbox
        )
      ) {
        Toast("请输入正确的邮箱格式");
        return false;
      }
      // if (!/^[\u4e00-\u9fa5A-Za-z]{2,20}$/.test(that.data.shop)) {
      //   Toast("请输入正确的格式店铺");
      //   return false;
      // }
      // if (!/^[\u4e00-\u9fa5A-Za-z]{2,20}$/.test(that.data.address)) {
      //   Toast("请输入正确的格式地址");
      //   return false;
      // }
      this.$router.push({
        path: "/authname",
        query: {
          name: this.data.name,
          Adname: this.data.shop,
          age: this.data.age,
          birthdate: this.data.birthdate,
          phone: this.data.phone,
          mailbox: this.data.mailbox,
          address: this.data.address,
          manage_years: this.data.manage_years,
          manage_area: this.data.manage_area,
          id_card: this.data.id_card
        }
      });
      //调节其他页面时的跳转(完善信息页面)
    },
    //验证姓名
    // provingname() {
    //   let that = this;
    //   if (!/^([a-zA-Z0-9\u4e00-\u9fa5\·]{1,10})$/.test(that.data.name)) {
    //     Toast("请输入正确的格式");
    //     return false;
    //   }
    // },
    //验证年龄
    // provingage() {
    //   let that = this;
    //   if (!/^(?:[1-9]?\d|100)$/.test(that.data.age)) {
    //     Toast("请输入正确的格式");
    //     return false;
    //   }
    // },
    //验证生日
    // provingbirthday() {
    // let that = this;
    // if (
    //   !/^(19|20)\d{2}-(1[0-2]|0?[1-9])-(0?[1-9]|[1-2][0-9]|3[0-1])$/.test(
    //     that.data.birthdate
    //   )
    // ) {
    //   Toast("请输入正确的格式");
    //   return false;
    // }
    // },
    //验证电话号码
    // remind() {
    //   let that = this;
    //   if (!/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(that.data.phone)) {
    //     Toast("请输入正确的手机号格式");
    //     return false;
    //   }
    // },

    //验证邮箱
    // provingmailbox() {
    //   let that = this;
    //   if (
    //     !/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/.test(
    //       that.data.mailbox
    //     )
    //   ) {
    //     Toast("请输入正确的格式");
    //     return false;
    //   }
    // },
    //验证店铺
    // provingshop() {
    //   let that = this;
    //   if (!/^[\u4e00-\u9fa5A-Za-z]{2,20}$/.test(that.data.shop)) {
    //     Toast("请输入正确的格式");
    //     return false;
    //   }
    // },
    //验证地址
    // provingaddress() {
    //   let that = this;
    //   if (!/^[\u4e00-\u9fa5A-Za-z]{2,20}$/.test(that.data.address)) {
    //     Toast("请输入正确的格式");
    //     return false;
    //   }
    // },

    next() {
      console.log(this.shop);
      let that = this;
      that.$axios
        .post(window.ajaxSrc + "/api/meizubao/updateUserInfo", {
          uid: localStorage.id,
          user_name: that.data.name,
          age: that.data.age,
          birthdate: that.data.birthday,
          telephone: that.data.phone,
          email: that.data.name,
          store_name: that.data.name,
          store_addr: that.data.address
          // manage_years: that.data.name,
          // manage_area: that.data.name,
          // id_card: that.data.name,
          // home_address: that.data.name
        })
        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            console.log(res.data.data);
            // that.lists = res.data.data;
            // this.shop = res.data.data.shop;
            // this.getData(res.data.data[0].id, "", this.pages, 1);
          }
        })
        .catch(() => {
          console.log("查询失败");
        });
    }
  }
};
</script>
<style  lang="scss" scoped>
@import "../../styles/helper.scss";
.yearActive {
  color: #fff;
  background: #fd4689;
}
.infore_container {
  width: 100%;
  height: 100%;
  // height: calc(100% - 0.88rem);
  overflow: hidden;
  background: #fff;
}
.perfect {
  // width: 7.068rem;
  width: px2rem(355px);
  // height: 10.34rem;
  // height: px2rem(517px);
  // width: 100%;
  // height: 100%;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 3px;
  margin: 0.2rem auto 0;
  margin-top: 0.2rem;
  // height: calc(100% - 0.88rem);
}
.id_num {
  width: px2rem(355px);
  // height: 0.88rem;
  // line-height: 0.88rem;
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
  margin-left: 20px;
  font-size: 14px;
  color: #cccccc;
  letter-spacing: 0;
}
.id_txt input {
  // width: 4rem;
  width: px2rem(250px);
  // height: 0.88rem;
  // line-height: 0.88rem;
  // margin-left:50px;
  height: px2rem(44px);
  line-height: px2rem(44px);
  border: 0;
  outline: none;
  border: none;
  border-bottom: 1px solid #f7f7f7;
  border-right: 0;
}
.id_ple {
  margin-left: 0px;
}
.year_nums {
  width: px2rem(355px);
  height: px2rem(97.5px);
  margin: 0.2rem auto 0;
  border: 1px solid #f7f7f7;
  // border-bottom: 1px solid #f7f7f7;
  display: flex;
  justify-content: space-between;
}
.year_lef {
  width: px2rem(90px);
  height: px2rem(92.6px);
}
.year_rig {
  width: px2rem(263px);
  height: px2rem(92.6px);
  line-height: px2rem(92.6px);
}
.manag {
  // margin: 0.1rem;
  margin-top: 15px;
  display: inline-block;
  font-size: 14px;
  color: #666666;
  margin-left: px2rem(10px);
}
.new_year {
  display: flex;
  justify-content: space-between;
  padding: 5px 3px;
  margin-top: 5px;
}
.year_new {
  display: flex;
  justify-content: space-between;
  padding: 10px 5px;
}
.new_name {
  border: 1px solid #ccc;
  font-size: 14px;
  color: #ccc;
  width: px2rem(66px);
  line-height: px2rem(30px);
  border: 1px solid #cccccc;
  border-radius: 3px;
  text-align: center;
}
.next_up {
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
  position: relative;
}
.next_nex {
  width: px2rem(120px);
  height: px2rem(50px);
  line-height: px2rem(50px);
  text-align: center;
  background: #ffffff;
  border: 1px solid #fd4689;
  border-radius: 3px;
  font-size: 14px;
  color: #fd4689;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}
</style>
