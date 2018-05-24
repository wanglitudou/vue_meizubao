<template>
    <div class="container">
        <div class="list_bans">
            <div class="banners">
                <img src="../../assets/images/icon1.jpg"
                     alt="">
            </div>
            <div class="pro_name">
                <span class="pro_names">产品名称</span>
            </div>
            <div class="list_coor">
                <p class="cate_pro">
                    <span>配合产品: </span>
                    <span>产品1 </span>
                    <span>产品2</span>
                    <span>产品3</span>
                </p>
                <p class="cate_cen">
                    <span>配合产品:</span>
                    <span>422266522335118</span>
                </p>
            </div>
            <div class="price_cent">
                <p class="pri_cen pri_common">
                    <span class="zro">零售价</span>
                    <span>￥450</span>
                </p>
                <p class="pri_lis pri_common">
                    <span class="zro">折扣价</span>
                    <span class="pri_mon">￥150</span>
                </p>
                <p class="pri_common">
                    <span class="zro">购买数量</span>
                    <span>- 10 +</span>
                </p>
                <p class="pri_common">
                    <span class="zro">总金额</span>
                    <span class="price_con">￥4500</span>
                </p>
            </div>
            <div class="pro_detail">
                <p class="pro_det">产品详情</p>
                <p class="pro_beg">开始三年前、五年前、八年前，在博鳌，习主席三次演讲。心系世界难题，提出解决方案。</p>
            </div>
        </div>
        <div class="foot_pri">
            <p class="foot_tot">
                <span class="foot_total">合计</span> ：
                <span class="foot_pr">¥4，500</span>
            </p>
            <p class="foot_tol">立即下单</p>
        </div>
    </div>
</template>
<script>
export default {

  mounted(){
    this.init();
  },
  methods: {
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
        .get(window.ajaxSrc + "/api/meizubao/instrumentDetail", {
          params: {'id': 6}
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


  },
};
</script>
<style scoped>
.container {
  width: 100%;
  height: auto;
  height: calc(100% - 0.88rem);
  background: #fff;
}
.list_bans {
  width: 7.068rem;
  margin: 0.2rem auto 0;
  overflow-y: scroll;
}
.banners {
  width: 7.068rem;
  height: 5rem;
  margin: 0.2rem auto 0;
}
.banners img {
  width: 100%;
  height: 100%;
}
.pro_name {
  height: 1rem;
  line-height: 1rem;
  border: 1px solid #f7f7f7;
  margin-left: 2px;
}
.pro_names {
  margin-left: 20px;
  font-size: 16px;
  color: #000000;
  letter-spacing: 0;
}
.list_coor {
  width: 7.068rem;
  height: 1.8rem;
  margin-top: 0.1rem;
  border-radius: 2px;
}
.cate_pro {
  width: 7.068rem;
  height: 0.9rem;
  line-height: 0.9rem;
  border: 1px solid #f7f7f7;
}
.cate_pro span {
  margin-left: 20px;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
}
.cate_cen {
  width: 7.068rem;
  height: 0.9rem;
  line-height: 0.9rem;
  border: 1px solid #f7f7f7;
}
.cate_cen span {
  margin-left: 20px;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
}
.price_cent {
  width: 7.068rem;
  height: 3.8rem;
  background: #ffffff;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 2px;
  margin-top: 5px;
}
.pri_common {
  width: 7.068rem;
  height: 0.91rem;
  line-height: 0.91rem;
  border-bottom: 1px solid #f7f7f7;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
.pri_mon {
  font-size: 14px;
  color: #ff272d;
  letter-spacing: 0;
}
.price_con {
  font-size: 14px;
  color: #fd4689;
  letter-spacing: 0;
}
.zro {
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
}
.pro_detail {
  width: 7.068rem;
  height: 2rem;
  background: #ffffff;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 3px;
  margin-top: 5px;
  margin-bottom: 0.6rem;
}
.pro_det {
  padding: 0.2rem;
  font-size: 14px;
  color: #000000;
  letter-spacing: 0;
}
.pro_beg {
  padding: 0.1rem;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
}
.foot_pri {
  width: 7.068rem;
  height: 0.88rem;
  margin: 0.2rem auto 0;
  line-height: 0.88rem;
  position: fixed;
  bottom: 0;
  background: #ddeecc;
  margin-left: 2%;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 1px 9px 0 #eeeeee;
}
.foot_tot {
  width: 70%;
  background: #fff;
}
.foot_total {
  margin-left: 10px;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
}
.foot_tol {
  width: 30%;
  background-image: linear-gradient(-130deg, #fd4689 0%, #fd82d9 100%);
  box-shadow: 0 1px 4px 0 rgba(253, 70, 137, 0.58);
  border-radius: 3px;
  font-size: 14px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
}
.foot_pr {
  font-size: 17px;
  color: #fd4689;
  letter-spacing: 0;
  line-height: 20px;
}
</style>
