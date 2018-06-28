<template>

  <div>
<!-- 技师 -->
  <div class="card" v-if='detail.type == 2'>
    <div class="head">
      <img :src="detail.image" alt="">
    </div>
    <div class="right-info">
      <p class="big">{{detail.goods_name}}</p>
      <div>
        <span class="color666">薪水：</span><span>￥{{detail.weekprice}}/月</span>
        <span class="text-right">预约时间:{{detail.stage}}日</span>
        <!--  -->
        <!-- <span class="text-right color666">：{{detail.strtime}}</span> -->
      </div>
      <div class="bottom-text">
        <span class="color666">诚意金：</span>￥<span class="big red">{{detail.total_price}}</span>
      </div>
    </div>
  </div>
<!-- 仪器 -->
  <div class="card" v-if='detail.type ==1 '>  
    <div class="head">
      <img :src="detail.image" alt="">
    </div>
    <div class="right-info">
      <p class="big">{{detail.goods_name}}</p>
      <div>
        <span class="color666">租赁押金：</span><span>￥{{detail.deposit}}</span>
        <span class="text-right color666">租期：{{detail.stage}}月</span>
      </div>
      <div class="bottom-text">
        <span class="color666">首租租金：</span>￥{{detail.firstrent}}<span class="big red"></span>/月
      </div>
    </div>
  </div>
 



<!-- 产品 -->
  <div class="card" v-if='detail.type==3'>
    <div class="head">
      <img :src="detail.image" alt="">
    </div>
    <div class="right-info">
      <p class="big">{{detail.goods_name}}</p>
      <div>
        <span class="color666">价格：</span><span class="big red"> {{detail.productprice}}</span>
        <span class="text-right">x {{detail.number}}</span>
      </div>
      <div class="bottom-text">
      </div>
    </div>
  </div>
<!-- 项目 -->
 <div class="card" v-if='detail.type==5'>
    <div class="head">
      <img :src="detail.image" alt="">
    </div>
    <div class="right-info">
      <p class="big">{{detail.goods_name}}</p>
      <div>
        <span class="color666">诚意金：</span><span class="big red"> {{detail.deposit}}</span>
        <!-- <span class="text-right">x {{number}}</span> -->
      </div>
      <div class="bottom-text">
      </div>
    </div>
  </div>

  </div>


</template>

<script>
export default {
  name: 'addressCard',
  props:[
    'detail',
    'type',
    'name',
    'price',
    'during',
    'month',
    'deposit',
    'number',
    
  ],
  data () {
    return {
    
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



  .color333 {
    color: #333;
  }

  .color666 {
    color: #666;
    font-weight: 400;
  }

  .text-right {
    float: right;
  }

  .card {
    height: 100px;
    background: #FFFFFF;
    box-shadow: 0 1px 4.5px 0 #EEEEEE;
    border-radius: 1px;
    padding: 10px;
    margin-top: 20px;
    font-size: 12px;
    display: flex;

  }

  .card .head {
    height: 80px;
    width: 80px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    overflow: hidden;
  }

  .card .head img {
    height: 100%;
    width: 100%;
  }

  .right-info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 10px;
  }

  .big {
    font-size: 16px;
  }
  .red {
    color: #ff272d;

  }
</style>
