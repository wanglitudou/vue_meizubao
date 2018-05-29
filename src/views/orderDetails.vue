<script>
import orderFooter from "../components/orderFooter.vue";
import addressCard from "../components/addressCard.vue";
import orderCard from "../components/orderCard.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      // address: {
      //   user_name: "",
      //   mobile: "",
      //   province: "",
      //   city: "",
      //   area: "",
      //   address: ""
      // }
      detail:{}
    };
  },
  components: {
    "com-orderFooter": orderFooter,
    "com-addressCard": addressCard,
    "com-orderCard": orderCard
  },
  created() {
    console.log(this.id);
    this.$axios
      .get("http://mzbao.weiyingjia.org/api/meizubao/orderDetail", {
        params: { id: this.id }
      })
      .then(res => {
        if (res.data.status_code == "1001") {
          this.detail =  res.data.data
        }
      })
      .catch({});
  },
  mounted() {},
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

    <com-addressCard :type="'show'" :orderDetail="orderDetail"></com-addressCard>

    <com-orderCard :type="'technician'" :orderDetail="orderDetail"></com-orderCard>

    <com-orderFooter :count="'19700'" :text="'确认到达'"></com-orderFooter>

  </div>
</template>


