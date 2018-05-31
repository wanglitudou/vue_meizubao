<template>
  <div class="containerss">
    <div class="cent_list">
      <div class="ban_two">
        <div class="ban_lef">
          <img src="../../assets/images/icon1.jpg"
               alt="">
        </div>
        <div class="ban_rig">
          <p>
            <span>姓 名:</span>
            <span>{{data.name}}</span>
          </p>
          <p>
            <span>语言交流:</span>
            <span>{{data.language}}</span>
          </p>
          <p>
            <span>宗教信仰:</span>
            <span>{{data.faith}}</span>
          </p>
          <p>
            <span>饮食习惯:</span>
            <span>{{data.diet}}</span>
          </p>
          <p>
            <span>住宿标准:</span>
            <span>{{data.live}}</span>
          </p>
          <p>
            <span>交通方案:</span>
            <span>{{data.tarffic}}</span>
          </p>
        </div>
      </div>
      <div class="metting">
        <p class="met_cent">{{data.centetnt}}</p>
      </div>
      <div class="list_app">
        <p class="list_time">
          <span>预约时间:</span>
        </p>
        <p class="list_begin">
          <v-date-picker
            id="datePicker"
            mode='range'
            v-model='selectedDate'
            :disabled-dates='this.disableDate'
            show-caps>
          </v-date-picker>
        </p>


        <p class="list_tech">
          <span>您一共预约了{{during}}天</span>
        </p>

        <p class="list_tech">
          <span>技师最快到达时间：三天 </span>
        </p>
        <p class="list_apvance">
                    <span>预付诚意金：
                        <span>
                            <span class="mon_ery"> ￥{{totalPrice}}</span></span>
                    </span>
        </p>
        <p class="list_rent" @click="showSign">
                    <span>
                        网签租赁协议
                    </span>
        </p>
      </div>

    </div>
    <!--<div class="foot_cent">-->
    <!--<div class="total_foot">-->
    <!--<div class="total_lef">-->
    <!--<span class="add">合计:</span>-->
    <!--<span class="tinct">¥19:000</span>-->
    <!--</div>-->
    <!--<div class="total_rig">-->
    <!--<span>开始预约</span>-->
    <!--</div>-->
    <!--</div>-->

    <!--</div>-->

    <orderFooter :text="'立即下单'" :count="totalPrice" :nextFun="jumpToConfirm"></orderFooter>

    <sign id="componentSign" v-if="showSignTag" :src="data.agreement" :gid="data.id" :saveAgreementId="saveAgreementId"></sign>

  </div>
</template>
<script>
  import orderFooter from '../../components/orderFooter.vue'
  import DateTimePicker from 'date-time-picker';
  import sign from '../../components/sign.vue'
  import { Toast } from 'mint-ui';



  const setUpTime=3;//常量 技师出发准备时间 (从今天开始算 几天后可选);
  export default {
    data() {
      return {
        data: [],
        selectedDate: {
          start: new Date(new Date().getTime() + setUpTime * 24 * 60 * 60 * 1000),
          end: new Date(new Date().getTime() + setUpTime * 24 * 60 * 60 * 1000),
        },
        disableDate: [],
        agreementId:null,
        showSignTag:false,
      };
    },


    mounted(){
      this.init();
    },

    computed: {
      during(){
        return (this.selectedDate.end.getTime() - this.selectedDate.start.getTime()) / (24 * 60 * 60 * 1000)+1
      },
      totalPrice(){
        let temPrice=this.during * this.data.dayprice * 2;
        if(this.during>=5){
          temPrice = temPrice * 0.8
        }
        return temPrice
      },
      startTime(){
       return this.selectedDate.start.Format("yyyy-MM-dd hh:mm:ss")
      },
      endTime(){
        return this.selectedDate.end.Format("yyyy-MM-dd hh:mm:ss")
      }
    },
    components: {
      orderFooter,
      sign
    },


    methods: {
      saveAgreementId:function(agreementId){
        this.showSignTag=false;
        this.agreementId=agreementId;
      },
      showSign:function(){
        this.showSignTag=true
      },


      jumpToConfirm: function () {

        if(!this.agreementId){
          Toast('请网签租赁协议后下单');
          return false
        }



        this.$router.push({
//          path: '/confirm/instrument',
          name: "confirm",
          params: {
            type: 'product',
            g_id:this.$route.query.pid,
            m_type:"1",
            strtime:this.startTime,
            stoptime:this.endTime,
            stage:this.during,
            agreement:this.agreementId,
            image:this.data.images[0],
            goods_num:"1",
            total_price:this.totalPrice,
            goods_name:this.data.name,
            address_id:this.addressId,
            deposit:"",

          }
        })
      },
      init(){

        this.$axios
          .get(window.ajaxSrc + "/api/meizubao/technicianDetail", {
            params: {id: this.$route.query.pid}
          })
          .then(res => {
            console.log(res);
            if (res.data.status_code == 1001) {
              this.data = res.data.data;
              this.createDisableDate();
            }
          })
          .catch((err) => {
            console.log("http请求错误");
            console.log(err);
          });
      },


      createDisableDate: function () {
        for (var arr of this.data.appointmentTime) {
          let temArr = {start: new Date(arr[0]), end: new Date(arr[1])};
          this.disableDate.push(temArr)
        }
        let temArr = {start: null, end: new Date(new Date().getTime() + (setUpTime-1) * 24 * 60 * 60 * 1000)}
        this.disableDate.push(temArr)
      },



    }

  }
</script>
<style scoped>
  @import "./essence.css";
</style>


<style>

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
