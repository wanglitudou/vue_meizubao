<template>
    <div>
        <!-- 技师 -->
       <div class="information" v-if="detail.type == 2">
           <div class="orderTime">
              <span>订单编号：<span class="other_color">{{detail.order_num}}</span></span>
              <span>下单时间：<span class="other_color">{{detail.addtime}}</span></span>     
          </div>       
           <div class="orderTime" v-if="detail.status == 4">
             <span>交通信息：<span class="other_color">{{detail.logistics}}</span></span>
             <span>时间：<span class="other_color">{{detail.number}}</span></span>
           </div>
       </div>
       <!-- 仪器 -->
      <div class="information" v-else-if="detail.type == 1 || detail.type == 3">
           <div class="orderTime">
              <span>订单编号：<span class="other_color">{{detail.order_num}}</span></span>
              <span>下单时间：<span class="other_color">{{detail.addtime}}</span></span>     
          </div>       
           <div class="orderTime" v-if="detail.status == 4">
             <span>物流：<span class="other_color">{{detail.logistics}}</span></span>
             <span>单号：<span class="other_color">{{detail.number}}</span></span>
           </div>
       </div>
       <!--项目  -->
       <div class="information" v-else>
           <div class="orderTime">
              <span>订单编号：<span class="other_color">{{detail.order_num}}</span></span>
              <span>下单时间：<span class="other_color">{{detail.addtime}}</span></span>     
          </div>       
           
       </div>
    </div>
</template>
<script>
export default {
    props:['detail']
}
</script>
<style lang="scss" scoped>
@import '../styles/helper.scss';
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
    font-size: px2rem(12px);
    color:#666666;
    
    
}
.information span{ display: block; display:flex;padding:px2rem(5px);;align-items: center; color:#666;}
.other_color{
    color:#151515;
}
</style>
