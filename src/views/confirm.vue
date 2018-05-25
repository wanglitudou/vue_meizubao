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
      console.log(this.$route.params)
    },
    methods: {}
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


    <orderCard :type="$route.params.type"></orderCard>


    <orderFooter :count="'19700'" :text="'立即下单'"></orderFooter>



  </div>
</template>


