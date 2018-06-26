<script>
import orderFooter from "../components/orderFooter.vue";
import addressCard from "../components/orderAddressCard.vue";
import orderCard from "../components/orderCard.vue";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      addressId: null
    };
  },
  components: {
    orderFooter,
    addressCard,
    orderCard
  },
  created() {console.log(this.$router.params)},
  mounted() {},
  methods: {
    createOrder: function() {
      //全部参数通过  $route传入 除 uid addressId
      console.log(this.addressId);
      this.$axios
        .post(window.ajaxSrc + "/api/meizubao/addOrder", {
          uid: window.localStorage.id,
          g_id: this.$route.params.g_id,
          type: this.$route.params.type,
          m_type: this.$route.params.m_type,
          strtime: this.$route.params.strtime,
          stoptime: this.$route.params.stoptime,
          stage: this.$route.params.stage,
          agreement: this.$route.params.agreement,
          image: this.$route.params.image,
          goods_num: this.$route.params.goods_num,
          total_price: this.$route.params.total_price,
          goods_name: this.$route.params.goods_name,
          address_id: this.addressId,
          deposit: this.$route.params.deposit,
          open_id: window.localStorage.openid
        })
        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            window.location.href = res.data.data.url;
          } else if (res.data.status_code == 1002) {
            Toast(res.data.message);
          }
        })
        .catch(err => {
          console.log("http请求错误");
        });
    },
    saveAddressId: function(id) {
      console.log("comfirm页面存id:" + id);
      this.addressId = id;
    }
  }
};
</script>

<style scoped>
.container {
  padding: 11px;
}
</style>


<template>
  <div class="container">

    <addressCard :type="'button'"
                 :saveAddressId="saveAddressId"></addressCard>

    <!--stage 仪器租赁时长(月)、技师租赁天数-->
    <!--month 仪器起租期(月)-->
    <!--number 商品数量-->

    <orderCard :type="$route.params.type"
               :name="$route.params.goods_name"
               :img="$route.params.image"
               :price="$route.params.price"
               :total_price="$route.params.total_price"
               :stage="$route.params.stage"
               :deposit="$route.params.deposit"
               :month="$route.params.month"
               :number="$route.params.goods_num"></orderCard>

    <orderFooter :count="$route.params.total_price"
                 :text="'立即下单'"
                 :nextFun="createOrder"></orderFooter>

  </div>
</template>


