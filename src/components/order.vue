<template>
    <!--  item.type  1:代付款2:待确认合同3:代发货4:已发货5:待退还押金6:租赁中7:完成8:取消订单 -->
    <div class="order">
        <!-- quanbu -->
        <div class="payment" v-for="item in orderlist">
            <!-- 仪器 -->
            <div v-if="item.type == 1">
                <div class="paymenttop">
                    <div>{{item.order_num}}</div>
                    <div v-if="item.status == 1">待付款</div>
                    <div v-if="item.status == 2">待确认合同</div>
                    <div v-if="item.status == 3">待发货</div>
                    <div v-if="item.status == 4">已发货</div>
                    <div v-if="item.status == 5">待退还押金</div>
                    <div v-if="item.status == 6">租赁中</div>
                    <div v-if="item.status == 7">完成</div>
                    <div v-if="item.status == 8">取消订单</div>
                </div>
                <!-- :src="item.image" -->
                <div class="paymentcenter" @click="todetail(item.id)">
                    <!-- ../assets/images/icon1.jpg -->
                    <div class="img"><img :src="item.image" alt=""></div>
                    <div class="detail">
                        <p class="name">{{item.goods_name}}</p>
                        <!-- <p class="content">{{item.logistics}}</p> -->
                        <div class="numPrice">
                            <p class="num">数量：{{item.goods_num}}</p>
                            <p class="price">￥：{{item.total_price}}</p>
                        </div>
                    </div>
                </div>
                <div class="paymentbottom">
                    <!-- 确认收货 -->
                    <div class="receipt" v-if="item.status == 4">
                        <div class="logistics">
                            <div>物流公司：{{item.logistics}}</div>
                            <div>物流单号：{{item.number}}</div>
                        </div>
                        <div class="que" @click="receipt(item.type,item.id)">确认收货</div>
                    </div>
                    <!-- 租赁中 -->
                    <div class="zhuang" v-if="item.status == 6">
                        <div class="tuihuan" @click="back(item.id)">退还</div>
                        <div class="jixu" @click="renewal(item.id)">续约</div>
                    </div>
                    <!-- 代付款 -->
                    <div class="waitPay" v-if="item.status == 1">
                        <div class="waitBtn" @click="toPay(item.id)">立即付款</div>
                    </div>
                </div>
            </div>
            <!-- 技师 -->
            <div v-if="item.type == 2">
                <div class="paymenttop">
                    <!-- [1:代付款2:待确认合同3:代发货4:已发货5:待退还押金6:租赁中7:完成8:取消订单] -->
                    <div>{{item.order_num}}</div>
                    <div v-if="item.status == 1">待付款</div>
                    <div v-if="item.status == 2">待确认合同</div>
                    <div v-if="item.status == 3">待技师出发</div>
                    <div v-if="item.status == 4">技师已出发</div>
                    <div v-if="item.status == 5">待退还押金</div>
                    <div v-if="item.status == 6">技师已到达</div>
                    <div v-if="item.status == 7">已完成</div>
                    <div v-if="item.status == 8">取消订单</div>
                </div>
                <div class="paymentcenter" @click="todetail(item.id)">
                    <div class="img"><img :src="item.image" alt=""></div>
                    <div class="detail">
                        <p class="name">{{item.goods_name}}</p>

                        <div class="numPrice">
                            <p class="num">天数：{{item.stage}}</p>
                            <p class="price">￥：{{item.total_price}}</p>
                        </div>
                    </div>
                </div>
                <div class="paymentbottom">
                    <!-- 代付款 -->
                     <div class="waitPay" v-if="item.status == 1">
                        <div class="waitBtn" @click="toPay(item.id)">立即付款</div>
                    </div>
                    <!-- 已发货 -->
                    <div class="receipt" v-if="item.status == 4">
                        <div class="logistics">
                            <div>交通方式：{{item.logistics}}</div>
                            <div>时间：{{item.number}}</div>
                        </div>
                        <div class="que" @click="receipt(item.type,item.id)">确认到达</div>
                    </div>
                    <!-- 待发货 -->
                    <div class='Cancellation' v-if="item.status == 3">
                        <div class="cancel" @click="cancel(item.id)">取消订单</div>
                    </div>
                    <!-- 租赁中 -->
                    <div class="zhuang" v-if="item.status == 6">
                      
                        <div class="complete" @click="complete(item.id)">完成服务</div>
                          <div class="jixu"  @click="renewal(item.id)">续约</div>
                    </div>
                </div>
            </div>
            <!-- 产品 -->
            <div v-if="item.type == 3">
                <div class="paymenttop">
                    <div>{{item.order_num}}</div>
                    <div v-if="item.status == 1">待付款</div>
                    <div v-if="item.status == 2">待确认合同</div>
                    <div v-if="item.status == 3">待发货</div>
                    <div v-if="item.status == 4">已发货</div>
                    <div v-if="item.status == 5">待退还押金</div>
                    <div v-if="item.status == 6">租赁中</div>
                    <div v-if="item.status == 7">完成</div>
                    <div v-if="item.status == 8">取消订单</div>
                </div>
                <div class="paymentcenter" @click="todetail(item.id)">
                    <div class="img"><img :src="item.image" alt=""></div>
                    <div class="detail">
                        <p class="name">{{item.goods_name}}</p>

                        <div class="numPrice">
                            <p class="num">数量：{{item.goods_num}}</p>
                            <p class="price">￥：{{item.total_price}}</p>
                        </div>
                    </div>
                </div>
                <div classs="paymentbottom">
                     <div class="waitPay" v-if="item.status == 1">
                        <div class="waitBtn" @click="toPay(item.id)">立即付款</div>
                    </div>
                    <div class="receipt" v-if="item.status == 4">
                        <div class="logistics">
                            <div>物流公司：{{item.logistics}}</div>
                            <div>物流单号：{{item.number}}</div>
                        </div>
                        <div class="que" @click="receipt(item.type,item.id)">确认收货</div>

                    </div>
                </div>
             
            </div>
            <!-- 视频 -->
            <div v-if="item.type == 4">
                <div class="paymenttop">
                    <div>{{item.order_num}}</div>
                    <div v-if="item.status == 1">待付款</div>
                    <div v-if="item.status == 2">待确认合同</div>
                    <div v-if="item.status == 3">待发货</div>
                    <div v-if="item.status == 4">已发货</div>
                    <div v-if="item.status == 5">待退还押金</div>
                    <div v-if="item.status == 6">租赁中</div>
                    <div v-if="item.status == 7">完成</div>
                    <div v-if="item.status == 8">取消订单</div>
                </div>
                <div class="paymentcenter" @click="todetail(item.id)">
                    <div class="img"><img :src="item.image" alt=""></div>
                    <div class="detail">
                        <p class="name">{{item.goods_name}}</p>

                        <div class="numPrice">
                            <p class="num">数量：{{item.goods_num}}</p>
                            <p class="price">￥：{{item.total_price}}</p>
                        </div>
                    </div>
                </div>
                <div class="payway">
                    <!-- <div class="tuihuan">退换</div> -->
                    <div class="logistics">{{item.logistics}}</div>
                    <div class="single ">{{item.number}}</div>
                </div>
            </div>
            <!-- 合作项目 -->
            <div v-if="item.type == 5">
                <div class="paymenttop">
                    <div>{{item.order_num}}</div>
                    <div v-if="item.status == 1">待付款</div>
                    <div v-if="item.status == 2">待确认合同</div>
                    <div v-if="item.status == 3">待发货</div>
                    <div v-if="item.status == 4">已发货</div>
                    <div v-if="item.status == 5">待退还押金</div>
                    <div v-if="item.status == 6">租赁中</div>
                    <div v-if="item.status == 7">完成</div>
                    <div v-if="item.status == 8">取消订单</div>
                </div>
                <div class="paymentcenter" @click="todetail(item.id)">
                    <div class="img"><img :src="item.image" alt=""></div>
                    <div class="detail">
                        <p class="name">{{item.goods_name}}</p>

                        <div class="numPrice">
                            <p class="num">数量：{{item.goods_num}}</p>
                            <p class="price">￥：{{item.total_price}}</p>
                        </div>
                    </div>
                </div>
                <div class="paymentbottom">
                   <!-- 立即付款 -->
                    <div class="waitPay" v-if="item.status == 1">
                        <div class="waitBtn" @click="toPay(item.id)">立即付款</div>
                    </div>
                    <!--  -->
                  
                </div>
            </div>
        </div>
        <div class="moreData" ref="load" v-show="orderlist.length">
            <div v-if="isload" @click="loadMore">加载更多..</div>
            <div v-else>已全部加载</div>
        </div>
    </div>

</template>
<script>
export default {
  props: [
    "orderlist",
    "btn",
    "receipt",
    "todetail",
    "loadMore",
    "load",
    "toPay",
    'complete',
    "back",
    "renewal",
    'cancel'

    // orderlist: {
    //   type: Array
    // },
    // btn:{
    //     type:Function
    // }
  ],
  data() {
    return {};
  },
  methods: {},
  created() {
    console.log(this.load);
  },
  computed: {
    isload() {
      return this.load;
      consoel.log(this.load);
    }
  }
};
</script>
<style  lang="scss" scoped>
@import '../styles/helper.scss';
.order {
  padding-bottom: 50px;
  padding-top: px2rem(48px);
  height: 100%;
  overflow: auto;
}
.payment {
  width: 96%;
  height: px2rem(181px);
  border-radius: px2rem(3px);
  box-shadow: 0 2px 9px 0 #eeeeee;

  margin-left: 2%;
  margin-top: px2rem(10px);
   &:nth-child(1){
    margin-top: px2rem(15px);
  }
}
.paymenttop {
  width: 100%;
  height: px2rem(36px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: px2rem(14px);
  font-family: PingFangSC-Regular;
 color: #FF272D;

}
.paymenttop div {
  margin: px2rem(10px);
}
.paymentcenter {
  width: 100%;
  height: px2rem(86px);
  background: #fbfbfb 100%;
  display: flex;
//   justify-content: space-around;
  align-items: center;
}

.paymentcenter .img {
  width:px2rem(87.5px);
  margin-left:px2rem(10px); 
}
.paymentcenter img {
  /* width: 100%;
   */
  width: 100%;
  height: px2rem(66px);
}
.paymentcenter .detail {
  width: 50%;
  height: auto;
  margin-left: px2rem(15.2px);
}
.detail .name {
  font-size: px2rem(16px);
  color: #000;
  font-weight: bold;
}
.detail .content {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  color: #666666;
  font-size: 13px;
  -webkit-font-smoothing: antialiased;
}
.detail .numPrice {
  font-size: px2rem(13px);
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  color: #FF272D;
}
.num {
  color: #666666;
}
.price {
  color: #ff272d;
}
.paymentbottom {
  width: 100%;
  height: px2rem(59px);
}
.zhuang {
  width: 100%;
  height: 100%;
 display: flex;
  justify-content: flex-end;
  align-items: center;
}
.tuihuan {
  /* width: ; */
  width: 48px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  font-size: 14px;
  /* padding: 0 10px; */
  border: 1px solid #cccccc;
  margin-right: 0.5rem;
  border-radius: 0.1rem;
  color: #cccccc;
}
.jixu {
  width: px2rem(48px);
  height: px2rem(36px);
  line-height: px2rem(36px);
  text-align: center;
  font-size: px2rem(14px);
    margin-right:px2rem(10px);
  border: 1px solid #fd4689;
  border-radius: 0.1rem;
  color: #fd4689;
}
.complete{
    
  /* width: ; */
  width: px2rem(80px);
  height: px2rem(36px);
  line-height: px2rem(36px);
  text-align: center;
  font-size: px2rem(14px);
  margin-right:px2rem(10px);
  border: 1px solid #fd4689;
   background-image: linear-gradient(130deg, #fd4689 0%, #fd82d9 100%);
  border-radius: 0.1rem;
  color: #fff;

}
.payway {
  width: 100%;
  height: auto;
}
.logistics {
  line-height: 1rem;
  font-size: px2rem(14px);
}
.single {
  line-height: 1rem;
  font-size: px2rem(14px);
}
.receipt {
  width: 100%;
  height: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.que {
  /* padding: 5px; */
  width: 80px;
  height: 36px;
  font-size: 16px;
  color: #fd4689;
  border: 1px solid #fd4689;
  border-radius: 0.1rem;
  line-height: 36px;
  text-align: center;
  margin-right: 10px;
}
.logistics {
  line-height: 0.6rem;
  font-size: 14px;
  color: #000;
  margin-left: 10px;
}
.Cancellation {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.cancel {
  font-size: 16px;
  width: 80px;
  height: 36px;
  color: #fd4689 100%;
  color: #fd4689;
  border: 1px solid #fd4689;
  text-align: center;
  line-height: 36px;
  margin-right: 10px;
  border-radius: 0.1rem;
}
.moreData {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 1rem;
  font-size: 14px;
  color: #00a5ff;
}
.waitPay {
  width: 100%;
  height:100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.waitBtn {
  width: px2rem(80px);
  height: px2rem(36px);
  line-height: px2rem(36px);
  margin-right: px2rem(10px);
  text-align: center;
  border-radius: 0.1rem;
  color: #fd4689;
  border: 1px solid #fd4689;
  font-size: px2rem(14px);
}

</style>
