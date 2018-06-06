<template>
  <div class="container">
    <div class="perfect">
      <div class="id_num">
        <p class="id_name">
          <span>姓 名：</span>
          <span class="id_txt">
            <input type="text"
                   v-model="data.name"
                   placeholder="请输入姓名"
                   @blur="provingname()">
          </span>
        </p>
      </div>
      <div class="id_num">
        <p class="id_name">
          <span>年 龄：</span>
          <span class="id_txt">
            <input type="text"
                   v-model="data.age"
                   placeholder="请输入年龄"
                   @blur="provingage()">
          </span>
        </p>
      </div>
      <div class="id_num">
        <p class="id_name">
          <span>生 日：</span>
          <span class="id_txt">
            <input type="text"
                   v-model="data.birthdate"
                   @blur="provingbirthday()"
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
                   @blur="remind()"
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
                   @blur="provingmailbox()"
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
                   @blur="provingshop()"
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
                   @blur="provingaddress()"
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
            <span class="new_name yearBtn year1"
                  vl="year1">新开业</span>
            <span class="new_name yearBtn year2"
                  vl="year2">1年以内</span>
            <span class="new_name yearBtn year3"
                  vl="year3">1~3年</span>
          </p>
          <p class="year_new">
            <span class="new_name yearBtn year4"
                  vl="year4">3~5年</span>
            <span class="new_name yearBtn year5"
                  vl="year5">5~10年</span>
            <span class="new_name yearBtn year6"
                  vl="year6">10年以上</span>
          </p>
        </div>
      </div>
      <div class="year_nums">
        <div class="year_lef">
          <span class="manag"> 经营面积：</span>
        </div>
        <div class="year_rig">
          <p class="new_year">
            <span class="new_name areBtn are1"
                  vl="are1">50</span>
            <span class="new_name areBtn are2"
                  vl="are2">50-100</span>

            <span class="new_name areBtn are3"
                  vl="are3">100-200</span>
          </p>
          <p class="year_new">
            <span class="new_name areBtn are4"
                  vl="are4">200-500</span>
            <span class="new_name areBtn are5"
                  vl="are5">500-1000</span>
            <span class="new_name areBtn are6"
                  vl="are6">1000以上</span>
          </p>
        </div>
      </div>
    </div>
    <div class="next_up">
      <span class="next_nex"
            @click="authname()">下一步</span>
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
      .get(
        "http://mzbao.weiyingjia.org/api/meizubao/userInfo?uid=" +
          localStorage.id
      )
      .then(res => {
        console.log(res);
        if (res.data.status_code == 1001) {
          console.log(res.data.data);
          // that.data.id="",//用户id
          //  that.data.headimg="",//头像
          that.data.name = res.data.data.nickname;
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
        // 假装 请求成功 赋值页面
        this.shop = "聚通达";
      })
      .catch(() => {
        console.log("查询失败");
      });
  },
  methods: {
    authname() {
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
      }); //调节其他页面时的跳转(完善信息页面)
    },
    //验证姓名
    provingname() {
      let that = this;
      if (!/^([a-zA-Z0-9\u4e00-\u9fa5\·]{1,10})$/.test(that.name)) {
        Toast("请输入正确的格式");
        return false;
      }
    },
    //验证年龄
    provingage() {
      let that = this;
      if (!/^(?:[1-9]?\d|100)$/.test(that.age)) {
        Toast("请输入正确的格式");
        return false;
      }
    },
    //验证生日
    provingbirthday() {
      let that = this;
      if (
        !/^(19|20)\d{2}-(1[0-2]|0?[1-9])-(0?[1-9]|[1-2][0-9]|3[0-1])$/.test(
          that.birthday
        )
      ) {
        Toast("请输入正确的格式");
        return false;
      }
    },
    //验证电话号码
    remind() {
      let that = this;
      if (!/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(that.phone)) {
        Toast("请输入正确的手机号格式");
        return false;
      }
    },

    //验证邮箱
    provingmailbox() {
      let that = this;
      if (
        !/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/.test(that.mailbox)
      ) {
        Toast("请输入正确的格式");
        return false;
      }
    },
    //验证店铺
    provingshop() {
      let that = this;
      if (!/^[\u4e00-\u9fa5A-Za-z]{2,20}$/.test(that.shop)) {
        Toast("请输入正确的格式");
        return false;
      }
    },
    //验证地址
    provingaddress() {
      let that = this;
      if (!/^[\u4e00-\u9fa5A-Za-z]{2,20}$/.test(that.address)) {
        Toast("请输入正确的格式");
        return false;
      }
    },

    next() {
      console.log(this.shop);
      let that = this;
      that.$axios
        .post("http://mzbao.weiyingjia.org/api/meizubao/updateUserInfo", {
          uid: localStorage.id,
          nickname: that.data.name,
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
<style scoped>
.yearActive {
  color: red;
  background: #dec;
}
.container {
  width: 100%;
  height: auto;
  height: calc(100% - 0.88rem);
  background: #fff;
}
.perfect {
  width: 7.068rem;
  height: 10.34rem;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 3px;
  margin: 0.2rem auto 0;
  margin-top: 0.2rem;
}
.id_num {
  width: 7.068rem;
  height: 0.88rem;
  line-height: 0.88rem;
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
  width: 4rem;
  height: 0.88rem;
  line-height: 0.88rem;
  border: 0;
  outline: none;
  border-bottom: 1px solid #f7f7f7;
  border-right: 0;
}
.id_ple {
  margin-left: 0px;
}
.year_nums {
  width: 7.068rem;
  height: 1.6rem;
  margin: 0.2rem auto 0;
  border: 1px solid #f7f7f7;
  border-bottom: 1px solid #f7f7f7;
  display: flex;
  justify-content: space-between;
}
.year_lef {
  width: 25%;
  height: 1.6rem;
}
.year_rig {
  width: 78%;
  height: 1.6rem;
}
.manag {
  margin: 0.1rem;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
}
.new_year {
  display: flex;
  justify-content: space-between;
  padding: 2px 5px;
}
.year_new {
  display: flex;
  justify-content: space-between;
  padding: 2px 5px;
}
.new_name {
  border: 1px solid #ccc;
  width: 80px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  text-align: center;
}
.next_up {
  margin-top: 0.3rem;
  text-align: center;
}
.next_nex {
  width: 2.4rem;
  height: 0.72rem;
  line-height: 0.72rem;
  padding: 0.2rem 0.7rem;
  background: #ffffff;
  border: 1px solid #fd4689;
  border-radius: 3px;
  font-size: 0.3rem;
  color: #fd4689;
  letter-spacing: 0;
}
</style>
