<template>
    <div class="containers">
        <div class="list_list">
            <div class="list_search">
                <div class="pic_view">
                    <div class="nav_pic">
                        <span class="list_tab"
                              v-for="(item,index) in tabs"
                              :key="index"
                              :class="num==index?'dora':''"
                              @click="tab(index)">{{item.name}}</span>
                        <span class="sousuo"
                              @click="aaa()">
                            <img src="../../assets/icon/search_1.png"
                                 alt="">
                        </span>
                    </div>
                </div>
                <div class="searchs"
                     v-if="flog">
                    <input type="text"
                           placeholder="请输入搜索内容"
                           v-model="message"
                           @blur="loseblur()">

                    <img src="../../assets/icon/search_1.png"
                         alt="111">
                </div>
            </div>
        </div>
        <div class="scrolls">
            <div class="list_cent">
                <div class="list_lef"
                     v-for="item in immediatelyorder"
                     :key="item.index">
                    <div class="listing">
                        <div>
                            <img :src="item.images"
                                 alt=""
                                 @click="details()">
                        </div>
                        <div class="other">
                            <p>
                                <span>{{item.name}}</span>
                                <span class="paice">{{item.price}}</span>
                            </p>
                            <p class="meeting">{{item.centent}}</p>
                            <p>
                                <span>
                                    <a>{{item.num}}</a>/月
                                </span>
                                <span class="count"
                                      @click="details()">
                                    <i class="iconfont icon-yingyongchengxu-xianxing"></i>
                                    {{item.credit}}
                                </span>
                            </p>
                            <p class="rent"> 起租期:{{item.firstrent}}</p>
                            <p class="orders"
                               @click="details()">
                                <span class="order">
                                    立即下单
                                </span>
                            </p>
                        </div>

                    </div>

                    <div>

                    </div>
                </div>
                <div class="list_rig"
                     v-for="item in immediatelyorder"
                     :key="item.index">
                    <div class="listing">
                        <div>
                            <img :src="item.images"
                                 alt=""
                                 @click="details()">
                        </div>
                        <div class="other">
                            <p>
                                <span>{{item.name}}</span>
                                <span class="paice">{{item.price}}</span>
                            </p>
                            <p class="meeting">
                                {{item.centent}}
                            </p>
                            <p>
                                <span>
                                    <a>{{item.num}}</a>/月
                                </span>
                                <span class="count"
                                      @click="details()">
                                    <i class="iconfont icon-yingyongchengxu-xianxing"></i>
                                    {{item.credit}}
                                </span>
                            </p>
                            <p class="rent"> 起租期:{{item.firstrent}}</p>
                            <p class="orders"
                               @click="details()">
                                <span class="order">
                                    立即下单
                                </span>
                            </p>
                        </div>
                    </div>
                    <!-- <div class="listing">
                        <div>
                            <img src="../../assets/images/icon6.jpg"
                                 alt=""
                                 @click="details()">
                        </div>
                        <div class="other">
                            <p>
                                <span>热租仪器</span>
                                <span class="paice">￥20000元</span>
                            </p>
                            <p class="meeting">
                                十点开会覅额回复撒哈斯而后发生符合倒计时
                            </p>
                            <p>
                                <span>
                                    <a>￥1500</a>/月
                                </span>
                                <span class="count"
                                      @click="details()">
                                    <i class="iconfont icon-yingyongchengxu-xianxing"></i>
                                    700
                                </span>
                            </p>
                            <p class="rent"> 起租期:6个月</p>
                            <p class="orders"
                               @click="details()">
                                <span class="order">
                                    立即下单
                                </span>
                            </p>
                        </div>
                    </div> -->
                    <!-- <div class="listing">
                        <div>
                            <img src="../../assets/images/icon1.jpg"
                                 alt=""
                                 @click="details()">
                        </div>
                        <div class="other">
                            <p>
                                <span>热租仪器</span>
                                <span class="paice">￥20000元</span>
                            </p>
                            <p class="meeting">
                                十点开会覅额回复撒哈斯而后发生符合倒计时
                            </p>
                            <p>
                                <span>
                                    <a>￥1500</a>/月
                                </span>
                                <span class="count"
                                      @click="details()">
                                    <i class="iconfont icon-yingyongchengxu-xianxing"></i>
                                    700
                                </span>
                            </p>
                            <p class="rent"> 起租期:6个月</p>
                            <p class="orders"
                               @click="details()">
                                <span class="order">
                                    立即下单
                                </span>
                            </p>
                        </div>
                    </div> -->
                </div>
            </div>

        </div>
        <!-- <div class="addmore">
            <span class="more_add">加载更多</span>
        </div> -->
    </div>
</template>
<script>
import qs from "qs";
import "./detail.css";
export default {
  data() {
    return {
      tabs: [], // 热租仪器分类
      immediatelyorder: [], //热租仪器筛选
      num: 1,
      flog: false,
      url: [],
      message: ""
    };
  },
  created() {
    let that = this;
    //热租仪器分类
    that.$axios
      .get("http://mzbao.weiyingjia.org/api/meizubao/instrumentType", {})
      .then(res => {
        console.log(res);
        if (res.data.status_code == 1001) {
          that.tabs = res.data.data;
          that.type(res.data.data[0].id);
        }
      })
      .catch(() => {
        console.log("查询失败");
      });
  },
  methods: {
    type(name) {
      let that = this;
      //热租仪器筛选
      that.$axios
        .post("http://mzbao.weiyingjia.org/api/meizubao/instrumentSearch", {
          typeId: 6,
          keywords: "",
          page: 1
        })

        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            that.immediatelyorder = res.data.data;
          }
        })
        .catch(() => {
          console.log("查询失败");
        });
    },
    loseblur() {
      alert("666");
    },
    aaa() {
      this.flog = true;
    },
    details() {
      this.$router.push({ name: "details" });
    },
    tab(index) {
      this.num = index;
    }
  }
};
</script>
<style scoped>
.searchs {
  position: absolute;
  top: 22px;
  display: inherit;
}
.sousuo {
  width: 58px;
  height: 44px;
  line-height: 44px;
  background: #ffffff;
  box-shadow: 0 2px 9px 0 #eeeeee;
  position: absolute;
  right: 0;
}
.dora {
  border-bottom: 2px solid #fd4689;
  font-size: 18px;
}
.pic_view {
  width: 7.1rem;
  height: auto;
  margin: 0.2rem auto 0;
}
.sousuo img {
  width: 24px;
  height: 24px;
  line-height: 24px;
  margin-top: 10px;
}
.nav_pic {
  width: 6.2rem;
  height: 0.88rem;
  line-height: 0.88rem;
  box-shadow: 0 2px 9px 0 #eeeeee;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #000;
}
</style>
