<template>
  <div class="conatinerner">
    <div class="page-content">
      <ul class="new-address-form">
        <li class="new-address-form-item">
          <span class="form-required">*</span>
          <span class="form-title">所在地区：</span>
          <input type="text"
                 placeholder="点击选择所在地区"
                 class="form-input"
                 @click="addressPickerShow = true"
                 v-model="provCityCounty">
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
  </div>
</template>
<script>
import { Popup, picker } from "mint-ui";
import { Toast } from "mint-ui";
// import { Picker } from "mint-ui";
import { Picker } from "mint-ui";
import addressData from "../../static/addressData.js";
export default {
  name: "",
  components: {
    "mt-picker": Picker,
    "mt-popup": Popup
    // picker: picker
    // popup: popup
  },
  props: {},
  data() {
    return {
      zipcode: "",
      province: "",
      city: "",
      county: "",
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
          values: addressData.county[0][0],
          className: "slot3",
          textAlign: "center"
        }
      ]
    };
  },
  computed: {
    provCityCounty: function() {
      return this.province + " " + this.city + " " + this.county;
    }
  },
  created() {},
  methods: {
    addressPickerChange: function(picker, values) {
      let provinceIndex = addressData.province.indexOf(values[0]);
      let cityIndex = addressData.city[provinceIndex].indexOf(values[1]);
      picker.setSlotValues(1, addressData.city[provinceIndex]);
      picker.setSlotValues(2, addressData.county[provinceIndex][cityIndex]);
      this.province = values[0];
      this.city = values[1];
      this.county = values[2];
    }
  }
};
</script>
<style scoped>
/* @import "../styles/helper.scss"; */
.conatinerner {
  width: 100%;
  height: 100%;
}
.page-content {
  box-sizing: border-box;
  overflow: auto;
  height: 100%;
  padding-bottom: 100px;
}

.new-address-form .new-address-form-item {
  display: flex;
  align-items: center;
  /* padding: 36px 20px; */
  border-bottom: 1px solid #e6e6e6;
}
.new-address-form .new-address-form-item .form-required {
  color: red;
  margin-right: 10px;
}

.new-address-form .new-address-form-item .form-title {
  font-size: 14px;
  color: #333;
}
.new-address-form .new-address-form-item .form-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 10px;
  border-bottom: 1px solid transparent;
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

