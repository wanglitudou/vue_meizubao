<script>

    import orderFooter from '../components/orderFooter.vue'
    import addressCard from '../components/addressCard.vue'
    import orderCard from '../components/orderCard.vue'

  export default {
    data() {
      return {};
    },
    components: {
      'com-orderFooter':orderFooter,
      'com-addressCard':addressCard,
      'com-orderCard':orderCard,
    },
    created() {
    },
    mounted() {
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

    <com-addressCard :type="'button'"></com-addressCard>


    <com-orderCard :type="'technician'"></com-orderCard>


    <com-orderFooter :count="'19700'" :text="'确认到达'"></com-orderFooter>



  </div>
</template>


