<template>
  <div class="order_foot">
    <div class="total_foot">
      <div class="total_lef">
        <span class="add">合计：</span>
        <span class="tinct">¥19,000</span>
      </div>
      <div class="total_rig">
        <span>立即下单</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .order_foot {
    width: 100%;
    margin-top: 20px;
    background: #fff;
    /*box-shadow: 0 2px 9px 0 #eeeeee;*/
    margin: 0.2rem auto 0;
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .total_foot {
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    box-shadow: 0 1px 9px 0 #eeeeee;
    border-radius: 3px;
    display: flex;
    justify-content: space-between;
    margin: 0.2rem auto 0;
  }

  .total_lef {
    width: 70%;
    height: 1rem;
    line-height: 1rem;
    line-height: 1rem;
  }
  .add {
    margin-left: 10px;
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
  }
  .tinct {
    font-size: 17px;
    color: rgba(253, 70, 137, 0.9);
    letter-spacing: 0;
    line-height: 20px;
    font-weight:300;
  }
  .total_rig {
    width: 40%;
    text-align: center;
    font-size: 15px;
    color: #ffffff;
    letter-spacing: 0;
    background-image: linear-gradient(-130deg, #fd4689 0%, #fd82d9 100%);
    box-shadow: 0 1px 4px 0 rgba(253, 70, 137, 0.58);
    font-weight:300;
  }

</style>
