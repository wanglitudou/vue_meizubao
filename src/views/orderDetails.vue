<script>
import { Toast } from "mint-ui";
import orderFooter from "../components/orderDetailFooter.vue";
import addressCard from "../components/addressCard.vue";
import orderCard from "../components/orderDetailCard.vue";
import orderStatus from "../components/statusTop.vue";
import orderInformation from "../components/information.vue";
// import orderRenewalVue from '../components/orderRenewal.vue';
import orderRenewal from "../components/orderRenewal.vue";
import "v-calendar/lib/v-calendar.min.css";
export default {
  data() {
    return {
      orderId: this.$route.params.id,
      renewalShow: false,
      text: "续约",
      showRenewal: false,
      // address: {
      //   user_name: "",
      //   mobile: "",
      //   province: "",
      //   city: "",
      //   area: "",
      //   address: ""
      // }
      detail: {},
      mounth: 0,
      allPrice: 0,
      stoptime: "",
      allTime: [],
      disableDate: [],
      selectedDate: {
        start: new Date(),
        end: new Date(),
      },
      price:0,
    };
  },
  components: {
    "com-orderFooter": orderFooter,
    "com-addressCard": addressCard,
    "com-orderCard": orderCard,
    "com-orderStatus": orderStatus,
    "com-orderInformation": orderInformation,
    "com-orderRenewal": orderRenewal
  },
  created() {
    this.$axios
      .get("http://mzbao.weiyingjia.org/api/meizubao/orderDetail", {
        params: { id: this.orderId }
      })
      .then(res => {
        if (res.data.status_code == "1001") {
          this.detail = res.data.data;
        }
      })
      .catch({});
  },
  mounted() {
    this.getTimeArray();
  },
  computed:{
     during(){

       if(((this.selectedDate.end.getTime() - this.selectedDate.start.getTime()))/(24 * 60 * 60 *1000 == 0)){
         return    ((this.selectedDate.end.getTime() - this.selectedDate.start.getTime() + (24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000))
       }else{
          return  ((this.selectedDate.end.getTime() - this.selectedDate.start.getTime()) / (24 * 60 * 60 * 1000))
       }

     },
     endTime(){
      //  return this.selectedDate.end
        var date = new Date(this.selectedDate.end);
    return  (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds())
     },
     renprice(){
       console.log(this.during)
       if(this.during > 4){
          // return  parseInt(this.detail.continued) * parseInt(this.during)
         return (this.detail.dayprice* parseInt(this.during)*0.8).toFixed(2)
       }else{
         console.log(21322121)
            return  (this.detail.dayprice * parseInt(this.during)).toFixed(2)
       }
     },
     getPrice(){
       return (this.mounth * this.detail.continued).toFixed(2)
     }

  },
  methods: {
    getTimeArray() {
      // console.log(this.stoptime)
      this.$axios
        .get("http://mzbao.weiyingjia.org/api/meizubao/technicianTime", {
          params: { id: 1 }
        })
        .then(res => {
          console.log(res);
          if (res.data.status_code == "1001") {
            this.allTime = res.data.data;
            var appointmentTime = [];

            //
            let nowTimeStamp = new Date().getTime();

            let minDateStamp = nowTimeStamp;

            //

            for (timeArr of allTime){
              let thisTimeStamp=new Date(timeArr[0]).getTime();
              if(thisTimeStamp> nowTimeStamp){
                if(thisTimeStamp<minDateStamp){
                  minDateStamp=thisTimeStamp;
                }
              }
            }



            var beforeDate = new Date(minDateStamp - 24 * 60 * 60 * 1000);
            console.log(beforeDate);
            let temArr = { start: new Date(beforeDate), end: null };
            this.disableDate.push(temArr);
//            for (var arr of this.allTime) {
//              // console.log(arr)
//              let temArr = { start: new Date(arr[0]), end: new Date(arr[1]) };
//              // let temArr = { start: null, end: new Date(arr[2]) };
//              this.disableDate.push(temArr);
//            }
          }
        })
        .catch({});
    },
    //立即支付
    nextFun() {
      // console.log(111)
        var openid = window.localStorage.getItem('openid')
      this.$axios
        .post("http://mzbao.weiyingjia.org/api/meizubao/continuePay", {
          id: this.orderId,
          open_id:openid
        })
        .then(res => {
          console.log(res);
          if(res.data.status_code == 1001){
           window.location.href=res.data.data.url;
          }else{
            Toast("支付失败");
          }
        });
    },
    //确认收货
    confirm(uid) {
      console.log(uid)
      this.$axios
        .post("http://mzbao.weiyingjia.org/api/meizubao/updateOrderStatus", {
          status: 6,
          uid: uid,
          id: this.orderId
        })
        .then(res => {
          if (res.data.status_code == "1001") {
            this.detail.status = 6;
            console.log(this.detail);
            Toast("确认成功");
          } else {
            Toast("确认失败");
          }
        })
        .catch(res => {
          console.log(res);
          console.log("查询失败");
        });
    },
    // 退还
    back( uid) {
      // console.log(status,uid,id)
      this.$axios
        .post("http://mzbao.weiyingjia.org/api/meizubao/updateOrderStatus", {
          status: 5,
          uid: uid,
          id: this.orderId
        })
        .then(res => {
          if (res.data.status_code == "1001") {
            this.detail.status = 5;
            Toast("退还成功");
          } else {
            Toast("退还失败");
          }
        })
        .catch(res => {
          console.log(res);
          console.log("查询失败");
        });
    },
    getRenewal(orderId, month, stoptime, totalPrice,openid) {
      this.$axios
        .post("http://mzbao.weiyingjia.org/api/meizubao/rentContinue", {
          id: orderId,
          stage: month,
          total_price: totalPrice,
          stoptime: stoptime,
          open_id:openid
        })
        .then(res => {
          // console.log(res);
        if(res.data.status_code == 1001){
          window.location.href=res.data.data.url
        }else{
          Toast('续约失败')
        }
        });
    },
    // 计算价钱
    // getPrice(price, month) {
    //   this.allPrice = price * month;
    //   console.log(this.allPrice);
    // },
    renewal(detail) {
      console.log(detail);
     var openid = window.localStorage.getItem('openid')
      //  this.text = '继续续约'

      if (detail.type == 1) {
        if(this.mounth == 0){
       Toast('请选择您的时间')
       return false
      }
      this.allPrice =  this.getPrice
        console.log(detail);
        this.getRenewal(
          this.orderId,
          this.mounth,
          this.stoptime,
          this.allPrice,
          openid
        );
        // console.log(this.orderId)
      }else if(detail.type ==2){
        if(this.during == 0){
          Toast('请选择您的时间')
          return false
        }
      // console.log(during)
      //  console.log(this.renprice)
      this.price =  this.renprice

           this.getRenewal(
          this.orderId,
          '',
          this.endTime,
          this.price,
          openid
       );

      }
    },
    // 加法
    increase() {
      this.mounth++;
      console.log(this.mounth)
      console.log(this.getPrice)
      console.log(this.detail.continued)
      // this.getPrice(this.detail.continued, this.mounth);
    },
    // 减法
    decrease() {
      this.mounth--;
      if (this.mounth < 0) {
        this.mounth = 0;
        return false;
      }
      // this.getPrice(this.detail.continued, this.mounth);
    }
  }
};
</script>

<style scoped>
.container {
  padding: 11px;
}
#datePicker
  .c-header
  .c-title-layout
  .c-title-popover
  .c-title-anchor
  .c-title {
  font-size: 0.32rem;
}

#datePicker .c-weekdays {
  font-size: 0.28rem;
}

#datePicker .c-day-content {
  width: 0.5rem;
  height: 0.5rem;
  font-size: 0.28rem;
}

#datePicker .c-day-background {
  width: 0.7rem !important;
  height: 0.7rem !important;
}
</style>
<style>
.instrument {
  margin-top: 10px;
}
.begin_rent {
  width: 7.068rem;
  height: 1rem;
  line-height: 1rem;
  box-shadow: 0 2px 9px 0 #eeeeee;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}
.spinner {
  display: inline-block;
}
.begin_rent span {
  font-size: 14px;
  color: #000;
}

.decrease,
.value,
.increase {
  height: 26px;
  width: 26px;
  display: inline-block;
  vertical-align: middle;
}
.value {
  width:30px;
  font: 16px Arial;
  line-height: 26px;
  text-align: center;
  background-color: #f96198;
  border: none;
  color: #fff;
}
.decrease,
.value,
.increase {
  height: 26px;
  width: 26px;
  display: inline-block;
  vertical-align: middle;
}
.decrease,
.increase {
  display: inline-block;
  vertical-align: middle;
  -moz-box-shadow: 0 0 2px #999 inset; /* For Firefox3.6+ */
  -webkit-box-shadow: 0 0 2px #999 inset; /* For Chrome5+, Safari5+ */
  box-shadow: 0 0 2px #999 inset;
  color: #e5312a;
  line-height: 26px;
  text-align: center;
}

.decrease {
  border-bottom-left-radius: 3px;
  border-top-left-radius: 3px;
}
.extension {
  line-height: 40px;
  font: 16px Arial;
}
.xuyues {
  width: 100%;
  box-shadow:0 2px 9px #ccc;
  line-height:30px;
  font-size: 16px;
  margin-top:10px;
  color: #FD4689;
}
 #datePicker .c-header .c-title-layout .c-title-popover .c-title-anchor .c-title {
    font-size: 0.32rem;
  }

  #datePicker .c-weekdays {
    font-size: 0.28rem;
  }

  #datePicker .c-day-content {

    width: .5rem;
    height: .5rem;
    font-size: .28rem;
  }

  #datePicker .c-day-background {
    /*width:.7rem !important;*/
    height: .7rem !important;
  }
</style>


<template>
  <div class="container">
    <com-orderStatus :detail="detail"></com-orderStatus>
    <com-addressCard :type="'show'" :detail="detail" v-if="detail.type == 1 ||detail.type == 2 "></com-addressCard>
    <com-orderCard :type="'technician'" :detail="detail"></com-orderCard>
    <com-orderInformation :detail="detail"></com-orderInformation>
    <!-- <com-orderRenewal :detail="detail" :disableDate="disableDate"  :decrease="decrease" :allPrice="allPrice" :increase="increase" :mounth="mounth" :selectedDate="selectedDate" :during="during"></com-orderRenewal> -->
    <!-- <div> -->
    <!-- 仪器续约 -->
    <!-- <div class="instrument" v-if="detail.type == 1"> -->
    <!-- <div class="extension">续约</div> -->
    <!-- <div class="begin_rent"> -->
    <!-- <span>选择你续约的时长(月):</span> -->
    <!-- <div class="spinner"> -->
    <!-- <div class="decrease" @click="decrease">-</div> -->
    <!-- <input type="number" class="value" maxlength="3" v-model="mounth" /> -->
    <!-- <div class="increase" @click="increase">+</div> -->
    <!-- </div> -->
    <!-- </div> -->
    <!-- <div class="xuyue" v-show="mounth>0"> -->
    <!-- <span>续约金额：￥{{allPrice}}</span> -->
    <!--  -->
    <!-- </div> -->
    <!-- </div> -->
    <!-- 技师续约 -->
    <!-- <div class="technician" v-if="detail.type == 2"> -->
    <!-- <v-date-picker id="datePicker" mode='range' v-model='selectedDate' :disabled-dates='disableDate' show-caps> -->
    <!-- </v-date-picker> -->
    <!-- </div> -->

    <!-- </div> -->
    <div>
    <!-- 仪器续约 -->
    <div class="instrument" v-if="detail.type == 1">
      <div v-if="detail.status == 6">
      <!-- <div class="extension">续约</div> -->
      <div class="begin_rent">
        <span>选择你续约的时长(月):</span>
        <div class="spinner">
          <div class="decrease" @click="decrease">-</div>
          <input type="number" class="value" maxlength="3" v-model="mounth" />
          <div class="increase" @click="increase">+</div>
        </div>
      </div>
      <div class="xuyue" v-show="mounth>0">
        <span>续约金额：￥{{getPrice}}</span>

      </div>
      </div>
    </div>
    <!-- 技师续约 -->
    <div class="technician" v-if="detail.type == 2">
      <div v-if="detail.status == 6">
      <v-date-picker
            id="datePicker"
            mode='range'
            v-model='selectedDate'
            :disabled-dates='disableDate'
            show-caps>
          </v-date-picker>
    </div>
     <div class="xuyues" v-show="during>0">
        <span>续约天数：{{during}}</span>
        <p>续约金额：{{renprice}}</p>
      </div>
    <!-- @click="decrease" -->
    <!-- @click="increase" -->
    <!-- v-bind:class="{ disable: month==data.num }" -->
    </div>
  </div>
    <com-orderFooter :detail='detail' :confirm="confirm" :back="back" :renewal="renewal" :during="during"  :renprice="renprice" :count="'19700'" :confirm:="confirm" :text="'确认到达'" :nextFun="nextFun"></com-orderFooter>
  </div>
</template>


