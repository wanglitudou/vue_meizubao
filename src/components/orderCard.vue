<template>

  <div>

  <div class="card" v-if='type=="technician"'>
    <div class="head">
      <img src="../assets/images/timg.jpeg" alt="">
    </div>
    <div class="right-info">
      <p class="big">精英名字</p>
      <div>
        <span class="color666">薪水：</span><span>￥10000/月</span>
        <span class="text-right">3日</span><span class="text-right color666">预约时间：</span>
      </div>
      <div class="bottom-text">
        <span class="color666">诚意金：</span>￥<span class="big red">1500</span>/月
      </div>
    </div>
  </div>


  <div class="card" v-if='type=="instrument"'>
    <div class="head">
      <img src="../assets/images/timg.jpeg" alt="">
    </div>
    <div class="right-info">
      <p class="big">精英名字</p>
      <div>
        <span class="color666">薪水：</span><span>￥10000/月</span>
        <span class="text-right">3日</span><span class="text-right color666">预约时间：</span>
      </div>
      <div class="bottom-text">
        <span class="color666">诚意金：</span>￥<span class="big red">1500</span>/月
      </div>
    </div>
  </div>





  <div class="card" v-if='type=="product"'>
    <div class="head">
      <img src="../assets/images/timg.jpeg" alt="">
    </div>
    <div class="right-info">
      <p class="big">产品名字</p>
      <div>
        <span class="color666">价格：</span><span class="big red"> 1223</span>
        <span class="text-right">x 1</span>
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
  props:['type'],
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
