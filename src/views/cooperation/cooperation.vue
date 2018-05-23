<template>
  <div class="container">
    <div class="con_cents">
      <div class="con_pro">
        <div class="conpro_img">
          <img src="../../assets/images/icon1.jpg"
               alt="">
        </div>
        <div class="conpro_name">
          <p class="conpro_pro">
            <span class="conname_name">项目名称</span>
            <span class="conmoney">￥5000</span>
          </p>
        </div>
      </div>
      <div class="cent_cate">
        <p class="pro_cate">
          <span>项目类别</span>
          <span>XXXX</span>
        </p>
        <p class="pro_cate">
          <span>适合人群</span>
          <span>XXXX</span>
        </p>
        <p class="pro_cate">
          <span>操作周期</span>
          <span>XXXX</span>
        </p>
        <p class="pro_cate">
          <span>项目禁忌</span>
          <span>XXXX</span>
        </p>
        <p class="pro_cate">
          <span>分成比例</span>
          <span>XXXX</span>

        </p>
      </div>
      <div class="pro_intro">
        <p class="pro_introduce">项目介绍</p>
        <p class="pro_int">开始三年前、五年前、八年前，在博鳌，习主席三次演讲。心系世界难题，提出解决方案。</p>
      </div>
      <div class="order_name">
        <p class="order_time">
          <span class="order_tim">预约时间</span>
        </p>
        <p class="begin_str">
          <span>开始日期 20180808
            <i class="iconfont icon-yingyongchengxu-xianxing"></i>
          </span>
          <span>结束日期 20180808
            <i class="iconfont icon-yingyongchengxu-xianxing"></i>
          </span>
        </p>
        <p class="good_fail">
          <span>预付诚意金：</span>
          <span>￥5000</span>
        </p>
        <p class="net_sign">
          <span>网签租赁协议</span>
        </p>

      </div>
    </div>
    <div class="name_foot">
      <div class="total_foot">
        <div class="total_lef">
          <span class="add">合计:</span>
          <span class="tinct">¥19:000</span>
        </div>
        <div class="total_rig">
          <span>开始预约</span>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped>
.container {
  width: 100%;
  height: auto;
  height: calc(100% - 1rem);
  background: #fff;
}
.con_cents {
  width: 7.1rem;
  height: auto;
  overflow-y: scroll;
  margin: 0.2rem auto 0;
}
.con_pro {
  width: 7.1rem;
  height: 6rem;
  background: #ffffff;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 2px;
  margin: 0.2rem auto 0;
}
.conpro_img {
  width: 7.1rem;
  height: 5rem;
}
.conpro_img img {
  width: 100%;
  height: 100%;
}
.conpro_pro {
  width: 7.1rem;
  height: 1rem;
  line-height: 1rem;
}
.conname_name {
  font-size: 16px;
  color: #000000;
  letter-spacing: 0;
  margin-left: 0.2rem;
}
.conmoney {
  font-size: 18px;
  color: #fd4689;
  letter-spacing: 0;
  line-height: 17px;
}
.cent_cate {
  width: 7.1rem;
  height: 4.56rem;
  margin: 0.2rem auto 0;
}
.pro_cate {
  width: 7.1rem;
  height: 0.8rem;
  line-height: 0.8rem;
  border-bottom: 1px solid #f7f7f7;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
}
.pro_intro {
  width: 7.1rem;
  height: 2rem;
  margin-top: 0.2rem;
  margin: 0.2rem auto 0;
  background: #ffffff;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 3px;
}
.pro_introduce {
  margin: 0.08rem;
}
.pro_int {
  padding: 0 10px;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
}
.order_name {
  width: 7.1rem;
  height: 3.42rem;
  margin: 0.2rem auto 0;
  margin-bottom: 20px;
  background: #ffffff;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 2px;
}
.order_time {
  width: 7.1rem;
  height: 0.6rem;
  line-height: 0.6rem;
}
.order_tim {
  margin: 0.2rem;
  font-size: 14px;
  color: #000000;
  letter-spacing: 0;
}
.begin_str {
  width: 7.1rem;
  height: 1rem;
  line-height: 1rem;
  border-bottom: 1px solid #f7f7f7;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
}
.good_fail {
  width: 7.1rem;
  height: 0.8rem;
  line-height: 0.8rem;
  padding: 0 15px;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
  border-bottom: 1px solid #f7f7f7;
}
.net_sign {
  width: 7.1rem;
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 14px;
  color: #fd4689;
  letter-spacing: 0;
  text-align: center;
}
.name_foot {
  width: 100%;
  margin-top: 20px;
  background: #fff;
  box-shadow: 0 2px 9px 0 #eeeeee;
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
  color: rgba(253, 70, 137, 0.58);
  letter-spacing: 0;
  line-height: 20px;
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
