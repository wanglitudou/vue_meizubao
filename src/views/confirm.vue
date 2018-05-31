<script>

    import orderFooter from '../components/orderFooter.vue'
    import addressCard from '../components/addressCard.vue'
    import orderCard from '../components/orderCard.vue'

  export default {

    data() {
      return {};
    },
    components: {
      orderFooter,addressCard,orderCard,
    },
    created() {
    },
    mounted() {


    },
    methods: {

      createOrder:function(){//全部参数通过  $route传入 除 uid addressId

        this.$axios
        .post(window.ajaxSrc + "/api/meizubao/addOrder", {
          uid:window.localStorage.id,
          g_id:$route.params.g_id,
          type:$route.params.type,
          m_type:$route.params.m_type,
          strtime:$route.params.strtime,
          stoptime:$route.params.stoptime,
          stage:$route.params.stage,
          agreement:$route.params.agreement,
          image:$route.params.image,
          goods_num:$route.params.goods_num,
          total_price:$route.params.total_price,
          goods_name:$route.params.goods_name,
          address_id:addressId,
          deposit:$route.params.deposit,

        })
          .then(res => {
            console.log(res);
            if (res.data.status_code == 1001) {
              this.data = res.data.data;
            }
          })
          .catch((err) => {
            console.log("http请求错误");
          });
      },




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

    <addressCard :type="'button'"></addressCard>

    <orderCard
      :type="$route.params.type"
      :name="$route.params.name"
      :price="$route.params.price"
      :during="$route.params.during"
      :deposit="$route.params.deposit"
      :month="$route.params.month"
      :number="$route.params.number"
    ></orderCard>

    <orderFooter :count="$route.params.count" :text="'立即下单'" :nextFun="createOrder"></orderFooter>

  </div>
</template>


