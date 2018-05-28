<template>

  <div>
    <div class="address" @click="">
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
      <div class="right" v-if="type=='button'">
        <img src="../assets/icon/arrow.png" alt="">
      </div>
      <div class="right" v-else> </div>
    </div>
    <div class="address-line"  v-if="type=='button'"></div>
  </div>
</template>

<script>
export default {
  name: 'addressCard',

  props: ["type"],
  mounted(){
    this.init();
  },
  methods:{


    jumpToAddress(){

      alert("暂时没有address页面,有了在这改 label");
//      this.$router.push({
//        name:"confirm",
//
//      })
    },



    init(){


      console.log("初始化地址");
      this.$axios
        .get(window.ajaxSrc + "/api/meizubao/addressList", {
          params: {'id': 1}
        })
        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            this.address = res.data.data;
          }
        })
        .catch(() => {
          console.log("http请求错误");
        });
    }
  },
  data () {
    return {
      address:[]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .address {
    font-size: 14px;
    display: flex;
    flex-direction: row;
    background: #FFFFFF;
    box-shadow: 0 2px 9px 0 #EEEEEE;
    border-radius: 2px;
    padding-top: 10px;
    padding-bottom: 10px;
    justify-content: space-between;
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

</style>
