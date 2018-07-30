<template>
  <div>
    <order :orderlist="orderlist"></order>
  </div>
</template>
<script>
import order from "./order.vue";
export default {
  data() {
    return {
      uid: 1,
      type: 1, //代付款
      status: 1,
      page: 1,
      orderlist: []
    };
  },
  created() {
    let that = this;
    //热租仪器分类
    this.$axios
      .post(window.ajaxSrc + "/api/meizubao/orderList", {
        uid: this.uid,
        type: this.type,
        status: this.status,
        page: this.page
      })
      .then(res => {
        console.log(res.data.data);
        if (res.data.status_code == "1001") {
          that.orderlist = res.data.data;
          console.log(that.orderlist);
        }
      })
      .catch(() => {
        console.log("查询失败");
      });
  },
  components: {
    order
  }
};
</script>
<style>
</style>
