<template>
  <div class="container">
    <div class="collectgoods">
      <p class="collects">
        收货人:
        <span><input type="text"
                 class="inp"></span>
      </p>
      <p class="collects">
        联系电话:
        <span><input type="text"
                 class="inp"></span>
      </p>
      <p class="collect_bet">
        <span>所在地区</span>
        <span>请选择 ></span>
      </p>
      <p class="detail_address">

        <span class="detail_add">
          <input type="text"
                 class="inpts_text"
                 placeholder="请输入详细地址">
          <mt-picker :slots="slots"
                     @change="onValuesChange"></mt-picker>
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
    <div class="preservation">
      <span class="sive"
            @click="sive()">
        保存
      </span>
    </div>
  </div>
</template>
<script>
// import { Checklist } from "mint-ui";
import { Picker } from "mint-ui";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      checked: true
    };
  },
  created() {},
  methods: {
    sive() {
      this.preservation();
    },
    preservation() {
      let that = this;
      that.$axios
        .post("http://mzbao.weiyingjia.org/api/meizubao/address", {
          mobile: "17610160588",
          user_name: "投入和",
          province: "投入和",
          city: "突然ht",
          area: "任务分工",
          address: "让我个",
          is_default_address: 1,
          user_id: 1
        })
        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            Toast(res.data.message);
            setTimeout(() => {
              that.$router.push({ name: "address" });
            }, 500);
          }
        })
        .catch(() => {
          console.log("查询失败");
        });
    },
    onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    }
  }
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  /* background: #dec; */
}
.inp {
  width: 5rem;
  padding: 0.1rem 0.2rem;
  outline: none;
  border: none;
  cursor: pointer;
}
.collectgoods {
  width: 7.1rem;
  height: 6rem;
  margin: 0.2rem auto 0;
}
.collects {
  width: 7.1rem;
  height: 1rem;
  line-height: 1rem;
  font-size: 15px;
  color: #666666;
  padding-left: 10px;
  border-bottom: 2px solid #f7f7f7;
}
.collect_bet {
  width: 7.1rem;
  height: 1rem;
  line-height: 1rem;
  font-size: 15px;
  color: #666666;
  /* padding-left: 10px; */
  display: flex;
  border-bottom: 2px solid #f7f7f7;
  justify-content: space-between;
  padding: 0 10px;
}
.detail_address {
  width: 7.1rem;
  height: 2rem;
  border-bottom: 2px solid #f7f7f7;
  font-size: 15px;
  color: #9b9b9b;
  padding-left: 10px;
  margin-top: 0.1rem;
}
.inpts_text {
  width: 7.1rem;
  height: 2rem;
  outline: none;
  border: none;
  cursor: pointer;
}
.tacit_address {
  width: 7.1rem;
  height: 1rem;
  border-bottom: 2px solid #f7f7f7;
  font-size: 14px;
  color: #9b9b9b;
  padding-left: 10px;
  margin-top: 10px;
}
.preservation {
  width: 7.1rem;
  height: 0.8rem;
  line-height: 0.8rem;
  background-image: linear-gradient(-130deg, #fd82d9 0%, #fd4689 100%);
  box-shadow: 0 0 13px 0 #eeeeee;
  margin: 0.2rem auto 0;
  text-align: center;
  margin-top: 1.4rem;
  color: #ffffff;
  font-size: 15px;
}
</style>

