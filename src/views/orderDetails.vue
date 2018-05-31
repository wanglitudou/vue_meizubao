<script>
import { Toast } from "mint-ui";
import orderFooter from "../components/orderDetailFooter.vue";
import addressCard from "../components/addressCard.vue";
import orderCard from "../components/orderDetailCard.vue";
import orderStatus from "../components/statusTop.vue";
import orderInformation from "../components/information.vue";
// import orderRenewalVue from '../components/orderRenewal.vue';
import orderRenewal  from '../components/orderRenewal.vue'
export default {
  data() {
    return {
      orderId: this.$route.params.id,
      renewalShow:false,
      text:'续约',
      showRenewal:false,
      // address: {
      //   user_name: "",
      //   mobile: "",
      //   province: "",
      //   city: "",
      //   area: "",
      //   address: ""
      // }
      detail:{},
      mounth:0,
      allPrice:0,
      stoptime:'',
      allTime:[]
    };
  },
  components: {
    "com-orderFooter": orderFooter,
    "com-addressCard": addressCard,
    "com-orderCard": orderCard,
    "com-orderStatus":orderStatus,
   "com-orderInformation" :orderInformation,
   "com-orderRenewal":orderRenewal
  
  },
  created() {
   
    this.$axios
      .get("http://mzbao.weiyingjia.org/api/meizubao/orderDetail", {
        params: { id: this.orderId }
      })
      .then(res => {
        if (res.data.status_code == "1001") {
          this.detail =  res.data.data
        }
      })
      .catch({});
      
  },
  mounted() {
    this.getTimeArray();
  },
  methods: {
    getTimeArray(){
      // console.log(this.stoptime)
      this.$axios
      .get("http://mzbao.weiyingjia.org/api/meizubao/technicianTime", {
        params: { id: 1}
      })
      .then(res => {
       console.log(res)
       if (res.data.status_code == "1001") {
       
        }
      })
      .catch({});
    },
    //立即支付
    nextFun(){
    // console.log(111)
    this.$axios.post('http://mzbao.weiyingjia.org/api/meizubao/continuePay',{
      id:this.detail.id
    }).then(res=>{
      console.log(res)
    })
    },
    //确认收货
    confirm(status,uid,id){
     this.$axios.post('http://mzbao.weiyingjia.org/api/meizubao/updateOrderStatus',{
       status:status,
       uid:uid,
       id:this.orderId
     }).then(res=>{
       if(res.data.status_code == '1001'){
         this.detail.status = 6
         console.log(this.detail)
         Toast('确认成功')
       }else{
         Toast('确认失败')
       }
     }).catch(res => {
          console.log(res);
          console.log("查询失败");
        });
    },
    // 退还
    back(status,uid){
      // console.log(status,uid,id)
      this.$axios.post('http://mzbao.weiyingjia.org/api/meizubao/updateOrderStatus',{
        status:status,
        uid:uid,
        id:this.orderId
      }).then(res=>{
       if(res.data.status_code == '1001'){
         this.detail.status = 5
         Toast('退还成功')
       }else{
         Toast("退还失败")
       }
     }).catch(res => {
          console.log(res);
          console.log("查询失败");
        });
    },
    getRenewal(orderId,month,stoptime,totalPrice){
         this.$axios.post('http://mzbao.weiyingjia.org/api/meizubao/rentContinue',{
           id:orderId,
           stage:month,
           total_price:totalPrice,
           stoptime:stoptime
         }).then(res=>{
             console.log(res)
         })
    },
    // 计算价钱
    getPrice(price,month){
       this.allPrice =  price * month
       console.log(this.allPrice)
    },
    renewal(detail){
       console.log(detail)
      //  this.text = '继续续约'
      if(detail.type==1){
          console.log(detail)
          this.getRenewal(this.orderId,this.mounth,this.stoptime,this.allPrice)
          // console.log(this.orderId)
      }
      
    },
    // 加法 
    increase(){
      this.mounth++
     this.getPrice(this.detail.continued,this.mounth)
    },
    // 减法
    decrease(){
      this.mounth--
      if(this.mounth <0){
        this.mounth = 0
        return false
      }
       this.getPrice(this.detail.continued,this.mounth)
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
    <com-orderStatus  :detail="detail"></com-orderStatus>
    <com-addressCard :type="'show'" :detail="detail"></com-addressCard>
    <com-orderCard :type="'technician'" :detail="detail"></com-orderCard>
    <com-orderInformation :detail="detail"></com-orderInformation>
    <com-orderRenewal :detail="detail" :decrease="decrease" :allPrice="allPrice" :increase="increase" :mounth="mounth"></com-orderRenewal>
    <com-orderFooter :detail='detail'  :confirm="confirm" :back="back"  :renewal="renewal" :count="'19700'" :confirm:="confirm" :text="'确认到达'" :nextFun="nextFun"></com-orderFooter>

  </div>
</template>


