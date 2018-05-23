<template>
    <div class="container">
        <div class="list_list">
            <div class="banner">
                <img src="../../assets/images/icon1.jpg"
                     alt="">
            </div>
            <div class="ban_cent">
                <p class="name_cent">
                    <span class="name">仪器名称</span>
                    <span class="dollar">￥ 200000元</span>
                </p>
                <p class="name_rent">
                    <span class="monthly">
                        <a>￥1500</a>/月</span>
                    <span class="renewal">续租 :
                        <a>￥4500</a>
                    </span>
                    <span></span>
                </p>
                <p class="name_words">
                    <span>十点开会覅额回复撒哈斯而后发生符合倒计时十点开会覅额回复撒哈斯而后发生符合倒计时</span>
                </p>
                <p class="name_cate">
                    <span>起租期:6个月</span>
                    <span>租赁押金:￥10000</span>
                    <span>上海</span>
                </p>
            </div>
            <div class="product">
                <p class="name_pro">
                    <span>配合产品 ：</span>
                    <span>产品1 </span>
                    <span>产品2</span>
                    <span>产品3</span>
                </p>

            </div>
            <div class="data_name">
                <p class="begin_rent">
                    <span> 起租日期 20180808
                        <i class="iconfont icon-xiaoxizhongxin"></i>
                    </span>
                    <span> 终止日期 20180808
                        <i class="iconfont icon-xiaoxizhongxin"></i>
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
    return {};
  }
  // created() {
  // let that = this;
  // //首页banner查询
  // that.$axios
  //   .get("http://mzbao.weiyingjia.org/api/meizubao/instrumentDetail/?id="+)
  //   .then(res => {
  //     console.log(res);
  //     if (res.data.status_code == 1001) {
  //       that.url = res.data.data;
  //     }
  //   })
  //   .catch(() => {
  //     console.log("查询失败");
  //   });
  // }
};
</script>
<style scoped>
</style>
