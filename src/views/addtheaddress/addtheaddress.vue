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
        <span class="img_input">
          <span class="plaese_choose"> 请选择</span>
          <i class="icon_right_img">
            <img src="../../assets/icon/more.png"
                 alt=""></i>
        </span>
      </p>
      <div class="page-content">
        <ul class="new-address-form">
          <li class="new-address-form-item">
            <span class="form-title">所在地区：</span>
            <!-- <input type="text"
                   placeholder="点击选择所在地区"
                   class="form-input"
                   @click="addressPickerShow = true"
                   v-model="provCityCounty"> -->
            <span class="form-input"
                  @click="addressPickerShow = true"
                  v-model="provCityCounty">{{province}}{{city}}{{area}}</span>

          </li>

        </ul>
        <mt-popup v-model="addressPickerShow"
                  position="bottom"
                  class="address-popup">
          <mt-picker :slots="addressSlots"
                     @change="addressPickerChange"
                     :visible-item-count="5"></mt-picker>
        </mt-popup>

      </div>

      <span>

      </span>
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
    <mt-popup v-model="addressPickerShow"
              position="bottom"
              class="address-popup">
      <mt-picker :slots="addressSlots"
                 @change="addressPickerChange"
                 :visible-item-count="5"></mt-picker>
    </mt-popup>

  </div>
</template>
<script>
//mint-ui三级
import { Popup, picker } from "mint-ui";
// import { Picker } from "mint-ui";
import { Toast, Picker, Indicator } from "mint-ui";
import addressData from "../../../static/addressData.js";
export default {
  components: {
    "mt-picker": Picker,
    "mt-popup": Popup
    // VuePickers
  },
  data() {
    return {
      zipcode: "",
      province: "",
      city: "",
      // county: "",
      area: "",
      addressPickerShow: false,
      addressSlots: [
        {
          flex: 1,
          values: addressData.province,
          className: "slot1",
          textAlign: "center"
        },
        {
          flex: 1,
          values: addressData.city[0],
          className: "slot2",
          textAlign: "center"
        },
        {
          flex: 1,
          values: addressData.area[0][0],
          className: "slot3",
          textAlign: "center"
        }
      ],
      checked: false,
      show1: false,
      show: false,
      isCopy: "",
      res: null,
      show: false,
      columns: 3,
      link: true,
      address: "",
      consignee: "",
      telephone: "",
      site: []
    };
  },
  computed: {
    isDefault() {
      return this.checked ? 1 : 0;
    },
    provCityCounty: function() {
      return this.province + " " + this.city + " " + this.area;
    }
  },
  created() {
    Indicator.open();
    setTimeout(() => {
      Indicator.close();
    }, 1000);
    let that = this;
    if (this.$route.query.type == "edit") {
      that.$axios
        .get(
          window.ajaxSrc +
            "/api/meizubao/addressInfo?id=" +
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
            that.province = res.data.data.province;
            that.city = res.data.data.city;
            that.area = res.data.data.area;
            res.data.data.is_default_address == 1
              ? (this.checked = true)
              : (this.checked = false);
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
  methods: {
    addressPickerChange: function(picker, values) {
      let provinceIndex = addressData.province.indexOf(values[0]);
      let cityIndex = addressData.city[provinceIndex].indexOf(values[1]);
      picker.setSlotValues(1, addressData.city[provinceIndex]);
      picker.setSlotValues(2, addressData.area[provinceIndex][cityIndex]);
      this.province = values[0];
      this.city = values[1];
      this.area = values[2];
    },
    close() {
      this.show1 = false;
      this.show = false;
    },
    confirmFn(e) {
      this.province = e.select1.text;
      this.city = e.select2.text;
      this.area = e.select3.text;
      this.show = false;
    },
    sive() {
      //验证姓名
      let that = this;
      if (!/^([a-zA-Z0-9\u4e00-\u9fa5\·]{1,10})$/.test(that.consignee)) {
        Toast("请输入正确的姓名格式");
        return false;
      }
      console.log(this.$route.query.type);
      if (this.$route.query.type == "edit") {
        this.editAddress();
      } else {
        this.addAddress();
      }
    },
    addAddress() {
      console.log(1111111);
      let that = this;
      that.$axios
        .post(window.ajaxSrc + "/api/meizubao/address", {
          // user_id: localStorage.id,
          mobile: that.telephone,
          user_name: that.consignee,
          province: that.province,
          city: that.city,
          area: that.area,
          address: that.address,
          is_default_address: that.isDefault,
          user_id: window.localStorage.id,
          // county: that.county,
          province: that.province
        })
        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            Toast(res.data.message);

            // Toast("设置默认地址成功");
            setTimeout(() => {
              that.$router.go(-1);
              // that.$router.push({ name: "address" });
            }, 1000);
          }
        })
        .catch(() => {
          console.log("查询失败");
        });
    },
    editAddress() {
      let that = this;
      that.$axios
        .post(window.ajaxSrc + "/api/meizubao/updateAddress", {
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
              // that.$router.push({
              //   path: "/address",
              //   // query: {
              //   //   consignee: that.province,
              //   //   telephone: that.telephone,
              //   //   address: that.address
              //   // }
              // });
              that.$router.go(-1);
              // that.$router.push({ name: "address" });
            }, 1000);
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
.plaese_choose {
  position: absolute;
  right: 60px;
  top: 80px;
  display: inline-block;
}
.icon_right_img img {
  height: px2rem(22px);
  width: px2rem(20px);
  margin-right: px2rem(40.2px);
}
.icon_right_img {
  position: absolute;
  right: 0px;
  top: 85px;
  display: inline-block;
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
  font-size: 15px;
  color: #666;
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
  padding-left: 10px;
  margin-top: 0.1rem;
}
.inpts_text {
  width: px2rem(330px);
  height: 2rem;
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 15px;
  color: #666;
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
.page-content {
  box-sizing: border-box;
  overflow: auto;
}

.new-address-form .new-address-form-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  margin-right: 20px;
  position: relative;
}

.new-address-form .new-address-form-item .form-title {
  font-size: 15px;
  color: #666;
  margin-left: 10px;
}
.new-address-form .new-address-form-item .form-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 10px;
  font-size: 15px;
  color: #666;
  color: #666666;
  border-bottom: 1px solid transparent;
  width: 80%;
}
.new-address-form .new-address-form-item .form-input .error {
  border-bottom: 1px solid red;
}
.address-popup {
  width: 100%;
}
.address-popup .picker-slot-wrapper {
  backface-visibility: hidden;
}
.address-popup .picker-item {
  backface-visibility: hidden;
}
</style>