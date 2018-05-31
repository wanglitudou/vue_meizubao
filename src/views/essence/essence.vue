<template>
    <div class="containerss">
        <div class="cent_list">
            <div class="ban_two">
                <div class="ban_lef">
                    <img src="../../assets/images/icon1.jpg"
                         alt="">
                </div>
                <div class="ban_rig">
                    <p>
                        <span>姓 名:</span>
                        <span>{{data.name}}</span>
                    </p>
                    <p>
                        <span>语言交流:</span>
                        <span>{{data.language}}</span>
                    </p>
                    <p>
                        <span>宗教信仰:</span>
                        <span>{{data.faith}}</span>
                    </p>
                    <p>
                        <span>饮食习惯:</span>
                        <span>{{data.diet}}</span>
                    </p>
                    <p>
                        <span>住宿标准:</span>
                        <span>{{data.live}}</span>
                    </p>
                    <p>
                        <span>交通方案:</span>
                        <span>{{data.tarffic}}</span>
                    </p>
                </div>
            </div>
            <div class="metting">
                <p class="met_cent">{{data.centetnt}}</p>
            </div>
            <div class="list_app">
                <p class="list_time">
                    <span>预约时间</span>
                </p>
                <p class="list_begin">
                  <v-date-picker
                    id="datePicker"
                    mode='range'
                    v-model='selectedDate'
                    show-caps>
                  </v-date-picker>
                </p>
                <p class="list_tech">
                    <span>预约操作师工作天数为：3天（五天为一周）</span>
                </p>
                <p class="list_apvance">
                    <span>预付诚意金：
                        <span>
                            <span class="mon_ery"> ￥1500</span> /月</span>
                    </span>
                </p>
                <p class="list_rent">
                    <span>
                        网签租赁协议
                    </span>
                </p>
            </div>

        </div>
        <!--<div class="foot_cent">-->
            <!--<div class="total_foot">-->
                <!--<div class="total_lef">-->
                    <!--<span class="add">合计:</span>-->
                    <!--<span class="tinct">¥19:000</span>-->
                <!--</div>-->
                <!--<div class="total_rig">-->
                    <!--<span>开始预约</span>-->
                <!--</div>-->
            <!--</div>-->

        <!--</div>-->
      <orderFooter :text="'立即下单'" :count="19700" :nextFun="buy"></orderFooter>



    </div>
</template>
<script>
import orderFooter from '../../components/orderFooter.vue'
import DateTimePicker from 'date-time-picker';



export default {
  mounted(){
    this.init();
  },
  components:{
    orderFooter,
  },
  methods:{

    buy:function(){
      this.$router.push('/confirm/technician')
    },


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
        .get(window.ajaxSrc+"/api/meizubao/technicianDetail", {
          params: { id: this.$route.query.pid }
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
      selectedDate: {
        start: new Date(),
        end: new Date(2018, 5, 18)
      }
    };
  }
};
</script>
<style scoped>
  @import "./essence.css";
</style>


<style>

  #datePicker .c-header .c-title-layout .c-title-popover .c-title-anchor .c-title{
    font-size:0.32rem;
  }
  #datePicker .c-weekdays{
    font-size:0.28rem;
  }

  #datePicker .c-day-content {

    width: .5rem;
    height: .5rem;
    font-size: .28rem;
  }
  #datePicker .c-day-background{
    /*width:.7rem !important;*/
    height:.7rem !important;
  }
</style>
