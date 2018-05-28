<template>
  <div class="container">
    <div class="cent_list">
      <div class="list_lists">
        <div class="banner">
          <img :src="data.images" alt="">
        </div>
        <div class="name_project">
          <p>
            <span class="name_pro">{{data.name}}</span>
            <span class="name_col">￥{{data.price}}</span>
          </p>
        </div>
      </div>

      <div class="name_intro">
        <p class="intro_con">
          {{data.content}}
        </p>
      </div>
      <div class="bes_time">
      </div>
    </div>


    <orderFooter :text="'开始预约'" :count="data.price" :nextFun="buy"></orderFooter>



  </div>
</template>
<script>


  import orderFooter from '../../components/orderFooter.vue'
  export default {



    methods: {
      init(){
        this.$axios
          .get(window.ajaxSrc + "/api/meizubao/videoDetail", {
            params: {'id': 1}
          })
          .then(res => {
            console.log(res);
            if (res.data.status_code == 1001) {
              this.data = res.data.data;
            }
          })
          .catch(() => {
            console.log("http请求错误");
          });
      },

      buy(){
        alert("在这写预约下单支付");
      }
    },

    mounted(){
      this.init();
    },
    data() {
      return {
        data: [],

      };
    }


  };
</script>
<style scoped>
  .container {
    width: 100%;
    background-color: #fff;
    height: calc(100% - 1rem);
  }

  .cent_list {
    height: auto;
    overflow-y: scroll;
  }

  .list_lists {
    height: 5.58rem;
  }

  .banner {
    width: 7.068rem;
    height: 5rem;
    margin: 0.2rem auto 0;
    box-shadow: 0 2px 9px 0 #eeeeee;
    border-radius: 2px;
  }

  .banner img {
    width: 100%;
    height: 100%;
  }

  .name_project {
    width: 7.06rem;
    height: 0.58rem;
    line-height: 0.58rem;
    margin: 0rem auto 0;
    background: #ffffff;
    box-shadow: 0 2px 9px 0 #eeeeee;
    border-radius: 2px;
  }

  .name_pro {
    font-size: 16px;
    color: #000000;
    letter-spacing: 0;
    margin: 0.2rem 0.2rem;
  }

  .name_col {
    font-size: 18px;
    color: #f00;
    letter-spacing: 0;
    line-height: 17px;
  }

  .name_cate {
    width: 7.068rem;
    height: 4.56rem;
    background: #ffffff;
    box-shadow: 0 2px 9px 0 #eeeeee;
    border-radius: 2px;
    margin: 0.2rem auto 0;
    margin-top: 20px;
  }

  .pro_cate {
    width: 7.068rem;
    height: 0.912rem;
    line-height: 0.912rem;
    border: 1px solid #f7f7f7;
    display: flex;
    justify-content: space-between;
    /* padding: 0 20px; */
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
  }

  .name_intro {
    width: 7.068rem;
    height: 2rem;
    background: #ffffff;
    box-shadow: 0 2px 9px 0 #eeeeee;
    border-radius: 3px;
    margin: 0.2rem auto 0;
  }

  .intro_pro {
    margin: 0.2rem;
    font-size: 14px;
    color: #000000;
    letter-spacing: 0;
  }

  .intro_con {
    margin: 0.2rem;
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
  }

  .bes_time {
    /* width: 7.068rem; */
    height: 3rem;
    margin: 0.1rem auto 0;
    background: #ffffff;
    box-shadow: 0 2px 9px 0 #eeeeee;
    border-radius: 2px;
  }

  .agree_foot {
    width: 100%;
    height: 1rem;
    background: #fff;
    margin: 0.2rem auto 0;
    margin-top: 2rem;
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .total_foot {
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    display: flex;
    justify-content: space-between;
  }

  .total_lef {
    width: 70%;
    background: #fff;
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    margin-left: 10px;
  }

  .add {
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
  }

  .tinct {
    font-size: 17px;
    color: #fd4689;
    letter-spacing: 0;
  }

  .total_rig {
    width: 30%;
    text-align: center;
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 0;
    background-image: linear-gradient(-130deg, #fd4689 0%, #fd82d9 100%);
    box-shadow: 0 1px 4px 0 rgba(253, 70, 137, 0.58);
  }
</style>
