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
                    <span v-on:click="datePicker"> 起租日期 <span>{{date1}}</span>
                        <i class="iconfont icon-xiaoxizhongxin"></i>
                    </span>
                    <span> 终止日期 {{date2}}
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
import DateTimePicker from 'date-time-picker';
export default {
  methods:{



    datePicker(){
      let options={
        lang: 'zh-CN', // 语言，默认 'EN' ，默认 'EN', 'zh-CN' 可选
        format: 'yyyy-MM-dd', // 格式， 'yyyy-MM-dd'
        default: new Date(), // 默认值 `new Date()`。 如果`default`有值且是字符串的话就会根据`format`参数来将其转化为一个`Date`实例。当然可以选择传入一个日期实例。
      };
      let config={
        day: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        shortDay: ['日', '一', '二', '三', '四', '五', '六'],
        MDW: 'M月d日D', // 主面板标题部分 月日星期
        YM: 'yyyy年M月', // 日期部分标题显示
        OK: '确定', // 确定按钮
        CANCEL: '取消' // 取消按钮
      };


      var datePicker = new DateTimePicker.Date(options, config);
      datePicker.on('selected', function (formatDate, now) {
        // formatData = 2016-10-19
        // now = Date instance -> Wed Oct 19 2016 20:28:12 GMT+0800 (CST)
      })
      datePicker.on('cleared', function () {
        // clicked clear btn
      })
    },



  },
  data() {
    return {
      date1:"",
      date2:"",


    };
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
