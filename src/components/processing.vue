<template>
  <div>
    <order :orderlist="orderlist"
           :receipt="receipt"
           :todetail="todetail"></order>
  </div>
</template>
<script>
import order from "./order.vue";
export default {
  data() {
    return {
      uid: 1,
      type: 0,
      status: 2,
      page: 1,
      orderlist: []
    };
  },
  created() {
    this.getorder();
  },
  methods: {
    receipt(id) {
      console.log(id);
      this.$axios
        .post(window.ajaxSrc + "/api/meizubao/updateOrderStatus", {
          uid: 1,
          id: id,
          status: 3
        })
        .then(res => {
          if (res.data.status_code == "1001") {
            remove(this.orderlist, { id: id });
            Toast("修改成功");
          } else {
            Toast("修改失败");
          }
        });
    },
    getorder() {
      let that = this;
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
    todetail(status, type) {
      console.log(status, type);
    }
  },
  components: {
    order
  }
};
</script>
<style>
</style>
