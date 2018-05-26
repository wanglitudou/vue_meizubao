<template>
    <div class="container">
        <div class="auth_name">
            <div class="id_num">
                <p class="id_name">
                    <span>身份证号码:</span>
                    <span class="id_txt">
                        <input type="text"
                               v-model="data.id_card"
                               placeholder="请输入身份证号码">
                    </span>
                </p>
            </div>
            <div class="up_data">
                <span class="updata_lef"></span>
                <span class="updata_rig"></span>
            </div>
            <div class="id_num id_number">
                <p class="id_name">
                    <span>家庭住址:</span>
                    <span class="id_txt">
                        <input type="text"
                               v-model="data.home_address"
                               placeholder="请输入家庭住址">
                    </span>
                </p>
            </div>
            <div class="up_data up_dataimg">
                <span class="updata_lef"></span>
                <span class="updata_rig"></span>
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

    </div>
</template>
<script>
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      data: {
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
        lists: []
      }
      //   arr: ["200", "333"]
    };
  },
  created(e) {},
  methods: {
    submitBtn() {
      let that = this;
      //用户信息
      that.$axios
        .post("http://mzbao.weiyingjia.org/api/meizubao/updateUserInfo", {
          uid: localStorage.id,
          nickname: that.$route.query.name,
          age: that.$route.query.age,
          birthdate: that.$route.query.birthdate,
          telephone: that.$route.query.phone,
          email: that.$route.query.mailbox,
          store_name: that.$route.query.Adname, //商店名称
          store_addr: that.$route.query.address,
          manage_years: that.$route.query.manage_years,
          manage_area: that.$route.query.manage_area,
          id_card: that.data.id_card,
          home_address: that.data.home_address
        })
        .then(res => {
          console.log(res);
          if ((res.data.status_code = "1001")) {
            MessageBox.alert("修改成功");
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
.container {
  width: 100%;
  height: auto;
  height: calc(100% - 1.5rem);
  background: #fff;
}
.auth_name {
  width: 7.068rem;
  height: 7.8rem;
  background: #ffffff;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 3px;
  margin: 0.2rem auto 0;
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
  margin-left: 10px;
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
.up_data {
  width: 7.068rem;
  height: 1.48rem;
  line-height: 1.48rem;
  margin-top: 0.22rem;
  display: flex;
  justify-content: space-between;
  padding: 0 50px;
}
.updata_lef {
  width: 115px;
  height: 1.48rem;
  line-height: 72px;
  background: #eeeeee;
  border-radius: 3px;
}
.updata_rig {
  width: 115px;
  height: 1.48rem;
  line-height: 72px;
  background: #eeeeee;
  border-radius: 3px;
}
.id_number {
  margin-top: 10px;
}
.up_dataimg {
  margin-top: 10px;
}
.relation {
  width: 7.068rem;
  height: 1.6rem;
  line-height: 1.6rem;
}
.credit {
  width: 7.068rem;
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
  width: 120px;
  height: 36px;
  line-height: 36px;
  padding: 10px 35px;
  background: #ffffff;
  border: 1px solid #fd4689;
  border-radius: 3px;
  font-size: 14px;
  color: #fd4689;
  letter-spacing: 0;
}
</style>
