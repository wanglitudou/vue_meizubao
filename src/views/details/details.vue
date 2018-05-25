<template>
    <div class="container">
        <div class="list_list">
            <!-- <div class="banner">
                <img src="../../assets/images/icon1.jpg"
                     alt="">
            </div> -->
            <div class="banner">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <!-- <img src=""
                                 alt=""
                                 v-for="(item,index) in url "
                                 :src="item.images"
                                 name="pic"
                                 :key="item.index"
                                 @click="updataImg(item.href)"> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="ban_cent"
                 v-for="item in instrumentdetails"
                 :key="item.index">
                <p class="name_cent">
                    <span class="name">{{item.name}}</span>
                    <span class="dollar">￥ {{item.price}}</span>
                </p>
                <p class="name_rent">
                    <span class="monthly">
                        <a>￥{{item.firstrent}}</a>/月</span>
                    <span class="renewal">续租 :
                        <a>￥{{item.continued}}</a>
                    </span>
                    <span></span>
                </p>
                <p class="name_words">
                    <span>{{item.centent}}</span>
                </p>
                <p class="name_cate">
                    <span>起租期:{{item.num}}</span>
                    <span>租赁押金:￥{{item.deposit}}</span>
                    <span>{{item.plac}}</span>
                </p>
            </div>
            <div class="product">
                <p class="name_pro">
                    <span>{{item.match_product}}：</span>
                    <!-- <span>产品1 </span>
                    <span>产品2</span>
                    <span>产品3</span> -->
                </p>

            </div>
            <div class="data_name">
                <p class="begin_rent">
                    <span> 起租日期 {{item.start}}
                        <!-- <i class="iconfont icon-xiaoxizhongxin"></i> -->
                    </span>
                    <span> 终止日期 {{item.end}}
                        <!-- <i class="iconfont icon-xiaoxizhongxin"></i> -->
                    </span>
                </p>
                <p class="name_credit">
                    <span class="sesame">验证芝麻信用</span>
                    <span class="sign">网签租赁协议</span>
                </p>
            </div>
            <div class="name_foot">
                <div class="total_foot">
                    <div class="total_lef">
                        <span class="add">合计:</span>
                        <span class="tinct">¥19,000</span>
                    </div>
                    <div class="total_rig">
                        <span>立即下单</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import "./details.css";
export default {
  data() {
    return {
      url: [], //banner
      instrumentdetails: [] //仪器详情
    };
  },
  created() {
    let that = this;
    //仪器详情
    that.$axios
      .get("http://mzbao.weiyingjia.org/api/meizubao/instrumentDetail", {
        id: 1
      })
      .then(res => {
        console.log(res);

        // if (res.data.status_code == 1001) {
        //   that.instrumentdetails = res.data.data;
        // }
      })
      .catch(() => {
        console.log("查询失败");
      });
  },
  methods: {},
  components: {},
  mounted: function() {
    var myswiper = new Swiper(".swiper-container", {
      loop: true,
      autoplay: 2000
    });
  }
};
</script>
<style scoped>
.banner {
  height: 3rem;
}
.banner .swiper-container {
  width: 100%;
  height: 3rem;
}
.banner .swiper-container img {
  width: 100%;
  height: auto;
}
</style>
