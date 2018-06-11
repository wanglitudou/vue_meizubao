<template>
    <div class="main">
        <div class="content">
            <div class="video">
                <video id="video" autoplay poster="../../assets/images/icon7.jpg" controls width="100%" height="100%">
                    <source :src="item.url" type="video/mp4"> 您的浏览器不支持 video 标签。
                </video>
            </div>
            <div class="desc">
                <div class="title">课程标题</div>
                <div class="text">
                    {{item.content}}
                </div>
            </div>
            <div class="price">
                <div class="title">支付方式</div>
                <div class="price_desc">
                    <div class="price_title">{{item.m_type == 1?'微信支付':"积分兑换"}}</div>
                    <div class="total_price">{{item.total_price}}</div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
  data() {
    return {
      item: this.$route.query.item
    };
  },
  created() {
    // this.init();
  },
  methods: {
    // init() {
    //   console.log(this.id);
    //   this.$axios.get(window.ajaxSrc+'/api/meizubao/orderDetail',{
    //   params:{id:this.id}
    //    /   }).then(res=>{
    //   console.log(res)
    //   }).catch(()=>{
    //   console.log("请求失败")
    //   })
    // }
  }
};
</script>
<style scoped>
.mian {
  width: 100%;
  height: auto;
}
.content {
  width: 94.7%;
  margin-left: 2.6%;
  height: auto;
}
.video {
  width: 100%;
  /* margin-left: 2.6%; */
  height: 250px;
  border-radius: 6px;
}
.desc {
  width: 97.4%;
  height: auto;
  margin-left: 1.2%;
  box-shadow: 0 2px 9px #eee;
}
.title {
  font-size: 16px;
  margin-left: 2.7%;
  color: #000;
  font-weight: bold;
  line-height: 44px;
}
.text {
  width: 94.6%;
  height: auto;
  font-size: 13px;
  line-height: 18px;
  margin-left: 2.7%;
  color: #666;
  font-family: PingFangSC-Regular;
  padding-bottom: 10px;
}
.price {
  /* border:  */
  width: 97.4%;
  margin-left: 1.2%;
  margin-top: 5px;
  height: auto;
  box-shadow: 0 2px 9px 0px #eee;
  /* display: flex; */
  /* justify-content: space-between; */
  /* line-height: 44px; */
  font-size: 16px;
}
.price_desc{
    display: flex;
    justify-content: space-between;
}
.price_title{
     margin-left: 2.7%;
}
.total_price{
  margin-right: 2.7%;
}
</style>
