<template>
    <div>
        <!-- 技师 -->
       <div class="information" v-if="detail.type == 2">
           <div class="orderTime">
              <span>订单编号：{{detail.order_num}}</span>
              <span>下单时间：{{detail.addtime}}</span>     
          </div>       
           <div class="orderTime" v-if="detail.status == 4">
             <span>交通信息：{{detail.logistics}}</span>
             <span>时间：{{detail.number}}</span>
           </div>
       </div>
       <!-- 仪器 -->
      <div class="information" v-else-if="detail.type == 1 || detail.type == 3">
           <div class="orderTime">
              <span>订单编号：{{detail.order_num}}</span>
              <span>下单时间：{{detail.addtime}}</span>     
          </div>       
           <div class="orderTime" v-if="detail.status == 4">
             <span>物流：{{detail.logistics}}</span>
             <span>单号：{{detail.number}}</span>
           </div>
       </div>
       <!--项目  -->
       <div class="information" v-else>
           <div class="orderTime">
              <span>订单编号：{{detail.order_num}}</span>
              <span>下单时间：{{detail.addtime}}</span>     
          </div>       
           
       </div>
    </div>
</template>
<script>
export default {
    props:['detail']
}
</script>
<style scoped>
.information{
    width: 100%;
    height: auto;
    font-size: 14px;
    color: #000;

}
.orderTime{
    width: 100%;
      background: #FFFFFF;
    box-shadow: 0 1px 4.5px 0 #EEEEEE;
    border-radius: 1px;
    margin-top:5px;
    /* height: 50px; */
}
.information span{display: block; padding: 5px;}
</style>
