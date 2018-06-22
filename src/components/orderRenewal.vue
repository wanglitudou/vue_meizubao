<template>
  <div>
    <!-- 仪器续约 -->
    <div class="instrument" v-if="detail.type == 1">
      <!-- <div class="extension">续约</div> -->
      <div class="begin_rent">
        <span>选择你续约的时长(月):</span>
        <div class="spinner">
          <div class="decrease" @click="decrease">-</div>
          <input type="number" class="value" maxlength="3" v-model="mounth" />
          <div class="increase" @click="increase">+</div>
        </div>
      </div>
      <div class="xuyue" v-show="mounth>0">
        <span>续约金额：￥{{allPrice}}</span>

      </div>
    </div>
    <!-- 技师续约 -->
    <div class="technician" v-if="detail.type == 2">
      <v-date-picker
            id="datePicker"
            mode='range'
            v-model='selectedDate'
            :disabled-dates='disableDate'
            show-caps>
          </v-date-picker>
    </div>
    {{during}}
    <!-- @click="decrease" -->
    <!-- @click="increase" -->
    <!-- v-bind:class="{ disable: month==data.num }" -->
  </div>
</template>
<script>
// import VCalendar from "v-calendar";
// import{datePicker} from 'VCalendar'
import "v-calendar/lib/v-calendar.min.css";
export default {
  props: ["detail", "mounth", "increase", "decrease", "allPrice","disableDate",'selectedDate','during'],
  data() {
        return {

        // disableDate: []
        };
      },
      mounted(){
          console.log(this.disableDate)
      }

};
</script>
<style scoped>
.instrument {
  margin-top: 10px;
}
.begin_rent {
  width: 7.068rem;
  height: 1rem;
  line-height: 1rem;
  box-shadow: 0 2px 9px 0 #eeeeee;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}
.spinner {
  display: inline-block;
}
.begin_rent span {
  font-size: 14px;
  color: #000;
}

.decrease,
.value,
.increase {
  height: 26px;
  width: 26px;
  display: inline-block;
  vertical-align: middle;
}
.value {
  width:30px;
  font: 16px Arial;
  line-height: 26px;
  text-align: center;
  background-color: #f96198;
  border: none;
  color: #fff;
}
.decrease,
.value,
.increase {
  height: 26px;
  width: 26px;
  display: inline-block;
  vertical-align: middle;
}
.decrease,
.increase {
  display: inline-block;
  vertical-align: middle;
  -moz-box-shadow: 0 0 2px #999 inset; /* For Firefox3.6+ */
  -webkit-box-shadow: 0 0 2px #999 inset; /* For Chrome5+, Safari5+ */
  box-shadow: 0 0 2px #999 inset;
  color: #e5312a;
  line-height: 26px;
  text-align: center;
}

.decrease {
  border-bottom-left-radius: 3px;
  border-top-left-radius: 3px;
}
.extension {
  line-height: 40px;
  font: 16px Arial;
}
.xuyue {
  width: 100%;
  height: 1rem;
  display: flex;
  align-items: center;
  font-size: 16px;
  color: red;
}
 #datePicker .c-header .c-title-layout .c-title-popover .c-title-anchor .c-title {
    font-size: 0.32rem;
  }

  #datePicker .c-weekdays {
    font-size: 0.28rem;
  }

  #datePicker .c-day-content {

    width: .5rem;
    height: .5rem;
    font-size: .28rem;
  }
  #datePicker .c-day-background {
    /*width:.7rem !important;*/
    height: .7rem !important;
  }

</style>

