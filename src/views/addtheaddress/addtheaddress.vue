
<template>
  <div class="container">
    <div class="zhe"
         v-show="show1"
         @click="close"></div>
    <div class="collectgoods">
      <p class="collects">
        收货人:
        <span><input type="text"
                 v-model="consignee"
                 class="inp"></span>
      </p>
      <p class="collects">
        联系电话:
        <span><input type="text"
                 v-model="telephone"
                 class="inp"></span>
      </p>
      <p class="collect_bet">
        <span>所在地区 {{province}}{{city}}{{area}}</span>
        <span @click="levl()">请选择
          <i class="icon_right_img"><img src="../../assets/icon/more.png"
                 alt=""></i>
        </span>

      </p>
      <p class="detail_address">
        <span class="detail_add">
          <input type="text"
                 class="inpts_text"
                 placeholder="请输入详细地址"
                 v-model="address">
        </span>
      </p>
      <p class="tacit_address">
        <span>
          <el-checkbox v-model="checked"
                       class="give_icon"></el-checkbox>
        </span>
        <span>设为默认地址</span>
      </p>
    </div>
    <div class="preservation"
         @click="sive()">
      <span class="sive">
        保存
      </span>
    </div>
    <vue-pickers :show="show1"
                 :selectData="pickData3"
                 v-on:cancel="close"
                 v-on:confirm="confirmFn"></vue-pickers>
  </div>
</template>
<script>
//mint-ui三级
import { Picker, Toast } from "mint-ui";
import { Checklist } from "mint-ui";
import VuePickers from "vue-pickers";
import { provs_data, citys_data, dists_data } from "vue-pickers/lib/areaData";
export default {
  data() {
    return {
      checked: true,
      show1: false,
      pickData3: {
        columns: 3,
        link: true,
        pData1: provs_data,
        pData2: citys_data,
        pData3: dists_data
      },
      province: "",
      city: "",
      area: "",
      address: "",
      consignee: "",
      telephone: ""
    };
  },
  computed: {
    isDefault() {
      return this.checked ? 1 : 0;
    }
  },
  created() {
    let that = this;
    if (this.$route.query.type == "edit") {
      that.$axios
        .get(
          "http://mzbao.weiyingjia.org/api/meizubao/addressInfo?id=" +
            this.$route.query.id
        )
        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            // console.log(res.data.data);
            console.log("666");

            that.consignee = res.data.data.user_name;
            that.telephone = res.data.data.mobile;
            that.address = res.data.data.address;
            console.log(that.consignee);
            console.log(that.telephone);
            console.log(that.address);
          }
        })
        .catch(() => {
          console.log("查询失败");
        });
    }
  },
  components: {
    VuePickers
  },
  methods: {
    close() {
      this.show1 = false;
    },
    confirmFn(e) {
      this.province = e.select1.text;
      this.city = e.select2.text;
      this.area = e.select3.text;
      this.show1 = false;
    },
    sive() {
      if (this.$route.query.type == "edit") {
        this.editAddress();
      } else {
        this.addAddress();
      }
    },
    addAddress() {
      let that = this;
      that.$axios
        .post("http://mzbao.weiyingjia.org/api/meizubao/address", {
          // user_id: localStorage.id,
          mobile: that.telephone,
          user_name: that.consignee,
          province: that.province,
          city: that.city,
          area: that.area,
          address: that.address,
          is_default_address: that.isDefault,
          user_id: window.localStorage.id
        })
        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            Toast(res.data.message);

            // Toast("设置默认地址成功");
            setTimeout(() => {
              that.$router.push({
                path: "/address",
                query: {
                  consignee: that.province,
                  telephone: that.telephone,
                  address: that.address
                }
              });
              // that.$router.push({ name: "address" });
            }, 500);
          }
        })
        .catch(() => {
          console.log("查询失败");
        });
    },
    editAddress() {
      let that = this;
      that.$axios
        .post("http://mzbao.weiyingjia.org/api/meizubao/updateAddress", {
          // user_id: localStorage.id,
          mobile: that.telephone,
          user_name: that.consignee,
          province: that.province,
          city: that.city,
          area: that.area,
          address: that.address,
          is_default_address: that.isDefault,
          user_id: window.localStorage.id,
          id: that.$route.query.id
        })
        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            Toast(res.data.message);
            setTimeout(() => {
              that.$router.push({
                path: "/address",
                query: {
                  consignee: that.province,
                  telephone: that.telephone,
                  address: that.address
                }
              });

              // that.$router.push({ name: "address" });
            }, 500);
          }
        })
        .catch(() => {
          console.log("查询失败");
        });
    },

    levl() {
      this.show1 = true;
    }
  }
};
</script>
<style>
.el-checkbox__inner {
  background: #fff;
}
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background: #fd82d9;
  border: 0;
}
.el-checkbox__inner {
  border-radius: 50%;
}
.mint-checklist-label {
  display: inline-block;
}
.mint-checkbox-input:checked + .mint-checkbox-core {
  background: #fd82d9;
}
</style>

<style lang="scss" scoped>
@import "../../styles/helper.scss";

.zhe {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 6;
}
.icon_right_img img {
  height: px2rem(16px);
}
.container {
  width: 100%;
  height: 100%;
}
.inp {
  width: px2rem(200px);
  padding: 0.1rem 0.2rem;
  outline: none;
  border: none;
  cursor: pointer;
}
.collectgoods {
  width: 94.7%;
  height: auto;
  margin-left: 2.7%;
}
.collects {
  width: px2rem(330px);
  height: 1rem;
  line-height: 1rem;
  font-size: 15px;
  color: #666666;
  padding-left: 10px;
  border-bottom: 2px solid #f7f7f7;
}
.collect_bet {
  width: px2rem(330px);
  height: 1rem;
  line-height: 1rem;
  font-size: 15px;
  color: #666666;
  display: flex;
  border-bottom: 2px solid #f7f7f7;
  justify-content: space-between;
  padding: 0 10px;
}
.detail_address {
  width: px2rem(330px);
  height: 2rem;
  border-bottom: 2px solid #f7f7f7;
  font-size: 15px;
  color: #9b9b9b;
  padding-left: 10px;
  margin-top: 0.1rem;
}
.inpts_text {
  width: px2rem(330px);
  height: 2rem;
  outline: none;
  border: none;
  cursor: pointer;
}
.tacit_address {
  width: px2rem(330px);
  height: 1rem;
  border-bottom: 2px solid #f7f7f7;
  font-size: 14px;
  color: #9b9b9b;
  padding-left: 10px;
  margin-top: 10px;
}
.preservation {
  width: px2rem(330px);
  height: px2rem(36px);
  line-height: px2rem(36px);
  background-image: linear-gradient(-130deg, #fd82d9 0%, #fd4689 100%);
  box-shadow: 0 0 13px 0 #eeeeee;
  margin: 0.2rem auto 0;
  text-align: center;
  margin-top: 1.4rem;
  color: #ffffff;
  font-size: 15px;
}
</style>

