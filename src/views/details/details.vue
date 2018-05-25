<template>
    <div class="container">
        <div class="list_list">
            <div class="banner">
                <img src="../../assets/images/icon1.jpg"
                     alt="">
            </div>
            <div class="ban_cent">
                <p class="name_cent">
                    <span class="name">{{data.name}}</span>
                    <span class="dollar">￥ {{data.price}}元</span>
                </p>
                <p class="name_rent">
                    <span class="monthly">
                        <a>￥{{data.firstrent}}</a>/月</span>
                    <span class="renewal">续租 :
                        <a>￥{{data.continued}}</a>
                    </span>
                    <span></span>
                </p>
                <p class="name_words">
                    <span>{{data.centent}}</span>
                </p>
                <p class="name_cate">
                    <span>起租期:{{data.num}}个月</span>
                    <span>租赁押金:￥{{data.deposit}}</span>
                    <span>{{data.place}}</span>
                </p>
            </div>
            <div class="product">
                <p class="name_pro">
                    <span>配合产品 ：</span>
                    <span>
                    {{data.match_product}}
                    </span>
                </p>

            </div>
            <div class="data_name">
                <p class="begin_rent">
                    <span v-on:click="datePicker('date1')"> 起租日期 <span>{{date1}}</span>
                        <i class="iconfont icon-xiaoxizhongxin"></i>
                    </span>
                    <span v-on:click="datePicker('date2',14)"> 终止日期 {{date2}}
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
                        <router-link to="/confirm/technician">立即下单</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>


import DateTimePicker from 'date-time-picker';
export default {
  mounted(){
    this.init();
  },
  methods:{
    init(){
      Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      }

      this.$axios
        .get(window.ajaxSrc+"/api/meizubao/instrumentDetail", {
          params: { 'id': 6 }
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


    datePicker(str,addMonth){
      let self=this;
      var defaultDate
      if(str=='date2'){
        defaultDate=self.date1;
      }
      let options;
      if(str=='date1'){
        options={
          lang: 'zh-CN', // 语言，默认 'EN' ，默认 'EN', 'zh-CN' 可选
          format: 'yyyy-MM-dd', // 格式， 'yyyy-MM-dd'
          default: self.date1 || new Date(), // 默认值 `new Date()`。 如果`default`有值且是字符串的话就会根据`format`参数来将其转化为一个`Date`实例。当然可以选择传入一个日期实例。
          min: new Date().Format('yyyy-MM-dd'),
          max:'2040-05-30',
        };
      }else if(str=='date2'){
        var minDate;
        if(self.date1&&addMonth){

          var year,month,day,addYear=0;

          year=new Date(self.date1).getFullYear();
          month=new Date(self.date1).getMonth()+1;
          day=new Date(self.date1).getDate();

          month+=addMonth;
          while(month>=12){
            addYear++;
            month-=12;
          }
          year+=addYear;

          console.log('year:'+year);
          console.log('month:'+month);
          console.log('day:'+day);


          var dateStr=year+'-'+month+'-'+day;
          minDate=new Date(dateStr).Format('yyyy-MM-dd');
        }
        options={
          lang: 'zh-CN', // 语言，默认 'EN' ，默认 'EN', 'zh-CN' 可选
          format: 'yyyy-MM-dd', // 格式， 'yyyy-MM-dd'
          default: self.date2 || defaultDate || new Date(), // 默认值 `new Date()`。 如果`default`有值且是字符串的话就会根据`format`参数来将其转化为一个`Date`实例。当然可以选择传入一个日期实例。
          min: minDate,
          max:'2040-05-30',
        };
      }
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
        console.log(formatDate);
        str=="date1" && (self.date1=formatDate);
        str=='date2' && (self.date2=formatDate);
      })
      datePicker.on('cleared', function () {

        str=="date1" && (self.date1='');
        str=='date2' && (self.date2='');
      })
    },



  },
  data() {
    return {
      data:[],
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
  @import "./details.css";
</style>
