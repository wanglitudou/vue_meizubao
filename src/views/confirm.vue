<script>
import orderFooter from "../components/orderFooter.vue";
import addressCard from "../components/orderAddressCard.vue";
import orderCard from "../components/orderCard.vue";
import { Toast } from "mint-ui";
import { find, findIndex, isEmpty } from "lodash";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      addressId: null,
      userInfo: {},
      datas: {},
      type: ""
    };
  },
  components: {
    orderFooter,
    addressCard,
    orderCard
  },
  created() {},
  mounted() {
    this.datas = this.confirmData;
    console.log(this.datas);
  },
  computed: {
    ...mapGetters(["confirmData"])
  },
  methods: {
    createOrder: function() {
      if (!this.userInfo.id) {
        Toast("请先选择地址");
        return false;
      }

      //全部参数通过  $route传入 除 uid addressId
      this.$axios
        .post(window.ajaxSrc + "/api/meizubao/addOrder", {
          uid: window.localStorage.id,
          g_id: this.datas.g_id,
          type: this.datas.type,
          m_type: this.datas.m_type,
          strtime: this.datas.strtime,
          stoptime: this.datas.stoptime,
          stage: this.datas.stage,
          agreement: this.datas.agreement,
          image: this.datas.image,
          goods_num: this.datas.goods_num,
          total_price: this.datas.total_price,
          goods_name: this.datas.goods_name,
          address_id: this.userInfo.id,
          address_mobile: this.userInfo.mobile,
          address_username: this.userInfo.user_name,
          address_info:
            this.userInfo.province +
            this.userInfo.city +
            this.userInfo.area +
            this.userInfo.address,
          deposit: this.datas.deposit,
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
      if (isEmpty(id)) {
        this.type = 0;
      } else {
        this.type = 1;
      }

      this.userInfo = id;
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

    <addressCard :type="type" :saveAddressId="saveAddressId"></addressCard>

    <!--stage 仪器租赁时长(月)、技师租赁天数-->
    <!--month 仪器起租期(月)-->
    <!--number 商品数量-->

    <orderCard :type="datas.type" :name="datas.goods_name" :img="datas.image" :price="datas.price" :total_price="datas.total_price" :stage="datas.stage" :deposit="datas.deposit" :month="datas.month" :number="datas.goods_num"></orderCard>

    <orderFooter :count="datas.total_price" :text="'立即下单'" :nextFun="createOrder"></orderFooter>

  </div>
</template>


