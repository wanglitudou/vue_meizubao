<template>

  <div>
    <div class="address">
      <div class="left">
        <img src="../assets/icon/address.png"
             alt="">
      </div>
      <div class="center">
        <div class="top">
          <span class="color666">收货人:
            <span class="color333">{{detail.address_username}}</span>
          </span>
          <span class="color333 text-right">{{detail.address_mobile}}</span>
        </div>
        <div class="bottom">
          <span class="color666">收货地址: </span>
          <span class="color333">{{detail.address_info}}</span>
        </div>
      </div>
      <div class="right"
           v-if="type=='button'">
        <img src="../assets/icon/arrow.png"
             alt="">
      </div>
      <div class="right"
           v-else> </div>
    </div>
    <!-- <div class="address-line"  v-if="type=='button'"></div> -->
  </div>
</template>

<script>
export default {
  name: "addressCard",

  props: ["type", "detail"],
  mounted() {},
  methods: {
   
  },
  data() {
    return {
      address: []
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.address {
  font-size: 14px;
  display: flex;
  flex-direction: row;
  background: #ffffff;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 2px;
  padding-top: 10px;
  padding-bottom: 10px;
  justify-content: space-between;
}

.address-line {
  background-image: linear-gradient(-130deg, #fd4689 0%, #fd82d9 100%);
  border-radius: 2px;
  height: 4px;
}

.top {
  margin-bottom: 8px;
}

.left {
  display: flex;
}

.right,
.left {
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.left img {
  width: 20px;
}

.right img {
  width: 18px;
}

.color333 {
  color: #333;
}

.color666 {
  color: #666;
  font-weight: 400;
}

.text-right {
  float: right;
}
</style>
