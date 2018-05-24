<template>
    <div class="containers">
        <div class="list_list">
            <div class="list_search">
                <!-- <div class="pic_view">
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
                </div> -->
                <!-- 头部导航 -->
                 <div class="sortMenu clearfix">
                    <ul class="sortMenu-ul">
                        <div v-for="(item,index) in tabs"
                        :ley="index"
                      
                          @click="tab(index)">
                        <!-- <tab :tab="tab"
                            :index="index"
                            :active="active" @click="toggle(index)"></tab> -->
                              <li class="cell"   :class="num == index ?'dora':''">
                            {{item.name}}
                            </li>
                        </div>
                    </ul>
                    <!-- 搜索按钮 -->
                    <div class="sousuo" @click="aaa()">
                        <img src="../../assets/icon/search_1.png" alt="">
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

        <!-- <div> -->
         

        <!-- <div class="scrolls"> -->
            <!-- <div class="list_cent"> -->
                <!-- <div class="list_lef" -->
                     <!-- v-for="item in immediatelyorder"
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

                    </div> -->
                <!-- </div> -->
                <!-- <div class="list_rig" -->
                     <!-- v-for="item in immediatelyorder"
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
                    </div> -->
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
                <!-- </div> -->
            <!-- </div> -->

        <!-- </div> -->
       
    
        <!-- <div class="addmore">
            <span class="more_add">加载更多</span>
        </div> -->
      
<!-- <vue-waterfall-easy :imgsArr="imgsArr" ></vue-waterfall-easy> -->

<div v-masonry transition-duration="0.3s" item-selector=".item" column-width=".item">
    <div v-masonry-tile class="item" v-for="(item, index) in imgsArr"  >
       <!-- block item markup -->
       <div class="box listing">
           <div>
 <img :src="item.images" alt="">

           </div>
         
          <div class="other">
                            <p>
                                <span>{{item.name}}</span>
                                <span class="paice">￥{{item.price}}</span>
                            </p>
                            <p class="meeting">
                              {{item.centent}}
                            </p>
                            <p>
                                <span>
                                    <a>￥{{item.firstrent}}</a>/月
                                </span>
                                <span class="count"
                                      @click="details()">
                                    <i class="iconfont icon-yingyongchengxu-xianxing"></i>
                                    {{item.created}}
                                </span>
                            </p>
                            <p class="rent"> 起租期:{{item.num}}个月</p>
                            <p class="orders"
                               @click="details()">
                                <span class="order">
                                    立即下单
                                </span>
                            </p>
                        </div>
       </div>
    </div>
</div>

    </div>
</template>
<script>
import qs from "qs";
import "./detail.css";
import vueWaterfallEasy from "vue-waterfall-easy";
import { VueMasonryPlugin } from "vue-masonry";
export default {
  data() {
    return {
      tabs: [], // 热租仪器分类
      immediatelyorder: [], //热租仪器筛选
      num: 1,
      flog: false,
      url: [],
      message: "",
      imgsArr: [],
      group: 0 // request param
      //   a:require('../../assets/images/icon6.jpg'),
      //   c:require('../../assets/images/icon9.jpg'),
      //   b:require('../../assets/images/a.jpg')
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
    // this.getData()
    this.getData();
  },
  methods: {
    type(name) {
      console.log(name);
      let that = this;
      //热租仪器筛选
      that.$axios
        .post("http://mzbao.weiyingjia.org/api/meizubao/instrumentSearch", {
          typeId: name,
          keywords: "",
          page: 1
        })

        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            that.imgsArr = res.data.data;
          }
          console.log(this.imgsArr);
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
      // let that  = this
      this.num = index;
      //   console.log(index)
      this.type(this.num);
    },
    getData() {
      //     let that =  this
      //   that.$axios
      //   .get("http://mzbao.weiyingjia.org/api/meizubao/instrumentType", {})
      //   .then(res => {
      //     console.log(res);
      //     if (res.data.status_code == 1001) {
      //       that.tabs = res.data.data;
      //       that.type(res.data.data[0].id);
      //     }
      //   })
      //   .catch(() => {
      //     console.log("查询失败");
      //   });
      let that = this;
      that.$axios
        .post("http://mzbao.weiyingjia.org/api/meizubao/instrumentSearch", {
          typeId: 0,
          keywords: "",
          page: 1
        })

        .then(res => {
          console.log(res);
          let arr = [];

          if (res.data.status_code == 1001) {
            arr.push(res.data.data);
            this.imgsArr = arr;
          }
        })
        .catch(() => {
          console.log("查询失败");
        });
    }
  },
  components: {
    vueWaterfallEasy
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
  width: 20%;
  height: 0.88rem;
  line-height: 44px;
  background: #ffffff;
  box-shadow: 0 2px 9px 0 #eeeeee;
  position: absolute;
  right: 0;
}
.dora {
    color: #000 !important;
  border-bottom: 2px solid #fd4689;
  font-size: 18px !important;
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
  /* width: 6.2rem;
   */
  width: 6.2rem;
  height: 0.88rem;
  overflow-x: scroll;
  line-height: 0.88rem;
  box-shadow: 0 2px 9px 0 #eeeeee;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #000;
}
.list_tab {
  width: auto;
  padding: 5px;
}
.item {
  width: 48%;
  height: auto;
  padding: 1%;
  /* margin:3% */
}
.box {
  width: 100%;
  height: auto;
  margin: 2%;
}
.box img {
  width: 100%;
}

.sortMenu {
  z-index: 1;
  width: 100%;
  /* margin-top: px2rem(48px); */
  position: fixed;
  background-color: #ffffff;
  box-shadow: 0 2px 4px 0 #ebeced;
  display:flex;
  
}
.sortMenu-ul {
  /* min-width: px2rem(320px); */ 
  width: 88%;
  height: 0.88rem;
  margin-left: 2%;
  overflow-x: scroll;
  box-shadow: 0 2px 9px 0 #eeeeee;
  display: -webkit-box;
  justify-content: flex-start;
  animation: moveTo 0.5s ease both;
}
.sortMenu .cell {
  display: block;
  font-size: 16px;
  height: 0.88rem;
  line-height: 0.88rem;
  padding: 0 28px 0 28px;

  color: #bbbdbf;
  text-align: center;
  position: relative;
  text-overflow: ellipsis;
  word-break: keep-all;
}
</style>
