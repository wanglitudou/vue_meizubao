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

      order:function(){
        console.log("模拟下单")
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

    <orderFooter :count="$route.params.count" :text="'立即下单'" :nextFun="$route.params.createOrder"></orderFooter>

  </div>
</template>


