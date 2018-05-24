<script>

  //  import finishTime from '../components/finishTime'
  export default {
    data() {
      return {};
    },
    components: {
//      'app-finishTime':finishTime
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

  .address {
    font-size: 14px;
    display: flex;
    flex-direction: row;
    background: #FFFFFF;
    box-shadow: 0 2px 9px 0 #EEEEEE;
    border-radius: 2px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .address-line {
    background-image: linear-gradient(-130deg, #FD4689 0%, #FD82D9 100%);
    border-radius: 2px;
    height: 4px;

  }

  .top {
    margin-bottom: 8px;
  }

  .left {
    display: flex;
  }

  .right, .left {
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .left img {
    width: 20px;
  }

  .right img {
    width: 18px;
  }

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


<template>
  <div class="container">

    <div class="address">
      <div class="left">
        <img src="../assets/icon/address.png" alt="">
      </div>
      <div class="center">
        <div class="top">
          <span class="color666">收货人: <span class="color333">嘿嘿</span></span>
          <span class="color333 text-right">13801231255</span>
        </div>
        <div class="bottom">
          <span class="color666">收货地址: </span><span class="color333">北京朝阳区国粹苑国粹苑国粹苑国粹苑A座4层</span></span>
        </div>
      </div>
      <div class="right">
        <img src="../assets/icon/arrow.png" alt="">
      </div>
    </div>
    <div class="address-line"></div>


    <div class="card">
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


  </div>
</template>


