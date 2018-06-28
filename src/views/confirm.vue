<script>
import orderFooter from "../components/orderFooter.vue";
import addressCard from "../components/orderAddressCard.vue";
import orderCard from "../components/orderCard.vue";
import { Toast } from "mint-ui";
import {mapGetters}from 'vuex'
export default {
  data() {
    return {
      addressId: null,
      datas:{}
    };
  },
  components: {
    orderFooter,
    addressCard,
    orderCard
  },
  created() {console.log(this.$router.params)},
  mounted() {
  this.datas = this.confirmData 
console.log(this.datas)
  },
  computed:{
   ...mapGetters(['confirmData'])
  },
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

    <addressCard :type="' '"
                 :saveAddressId="saveAddressId"></addressCard>

    <!--stage 仪器租赁时长(月)、技师租赁天数-->
    <!--month 仪器起租期(月)-->
    <!--number 商品数量-->

    <orderCard :type="datas.type"
               :name="datas.goods_name"
               :img="datas.image"
               :price="datas.price"
               :total_price="datas.total_price"
               :stage="datas.stage"
               :deposit="datas.deposit"
               :month="datas.month"
               :number="datas.goods_num"></orderCard>

    <orderFooter :count="datas.total_price"
                 :text="'立即下单'"
                 :nextFun="createOrder"></orderFooter>

  </div>
</template>


