<template>
    <div class="containers">
        <div class="list_list">
            <div class="list_search">
                <!-- 头部导航 -->
                <div class="sortMenu clearfix" v-show="slideShow">
                    <ul class="sortMenu-ul">
                        <div v-for="(item,index) in tabs" :ley="index" @click="tab(item.id,index)">
                            <tab :item="item" :index="index" :num="num"></tab>
                            <!-- <li class="cell"   :class="num == index ?'dora':''">
                            {{item.name}}
                            </li> -->
                        </div>
                    </ul>
                    <!-- 搜索按钮 -->
                    <div class="sousuo" @click="aaa()">
                        <img src="../../assets/icon/search_1.png" alt="">
                    </div>
                </div>
                <div class="topSearch" v-if="flog">
                    <search @search="search"></search>
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

        <div v-masonry transition-duration="0.3s" ref="masonry" item-selector=".item" column-width=".item">
            <div v-masonry-tile class="item" v-for="(item, index) in imgsArr" @click="details(item.id)">
                <!-- block item markup -->
                <div class="box listing">
                    <div>
                        <img :src="item.images" alt="">
                    </div>
                    <div class="other">
                        <p class="name">
                            <span>{{item.name}}</span>
                            <span class="paice">￥{{item.price}}</span>
                        </p>
                        <p class="meeting">
                            {{item.centent}}
                        </p>
                        <p class="date">
                            <span>
                                <a>￥{{item.firstrent}}</a>/月
                            </span>
                            <span class="count">
                                <i class="iconfont icon-yingyongchengxu-xianxing"></i>
                                {{item.created}}
                            </span>
                        </p>
                        <p class="rent"> 起租期:{{item.num}}个月</p>
                        <p class="orders">
                            <span class="order">
                                立即下单
                            </span>
                        </p>
                    </div>
                </div>
                  <!-- <div class="box listing">
                    <div>
                        <img src="" alt="">
                    </div>
                    <div class="other">
                        <p class="name">
                            <span>热租仪器</span>
                            <span class="paice">￥20000</span>
                        </p>
                        <p class="meeting">
                           
                            十点开会你们都得到，周末不加班其他的都好说能打开的的卡萨丁 第三节活动空间撒打卡机三大
                        </p>
                        <p class="date">
                            <span>
                                <a>￥123</a>/月
                            </span>
                            <span class="count">
                                <i class="iconfont icon-yingyongchengxu-xianxing"></i>
                              
                            </span>
                        </p>
                        <p class="rent"> 起租期:12323个月</p>
                        <p class="orders">
                            <span class="order">
                                立即下单
                            </span>
                        </p>
                    </div>
                </div> -->

            </div>
        </div>
        <!-- <div class="Loading" v-if="showLoading">
            <mt-spinner type="fading-circle" color="#FD4689" :size="36"></mt-spinner>
        </div> -->
        <!-- 点击加载 -->
        <div class="moreData" ref="load">
            <!--  -->
            <div>
                <div v-if="load" @click="loadMore">加载更多></div>
                <div v-else>已全部加载</div>
            </div>

        </div>

    </div>
</template>
<script>
import { Spinner } from "mint-ui";
import qs from "qs";
import tab from "../../components/tabBar.vue";
import search from "../../components/search.vue";

import { VueMasonryPlugin } from "vue-masonry";
import { isClassBody } from "babel-types";
export default {
  data() {
    return {
      tabs: [], // 热租仪器分类
      immediatelyorder: [], //热租仪器筛选
      num: 0,
      flog: false,
      url: [],
      aaaa: "寄杂志",
      message: "",
      imgsArr: [],
      showLoading: true,
      group: 0, // request param
      //   a:require('../../assets/images/icon6.jpg'),
      //   c:require('../../assets/images/icon9.jpg'),
      //   b:require('../../assets/images/a.jpg')
      isScroll: true,
      pages: 1,
      keyword: "",
      noData: false,
      slideShow: true,
      load: true,
      showLoad: true,
      count: 15,
      code: 1,
      uid: 0
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
          console.log(res.data.data);
          that.tabs = res.data.data;
          this.getData(res.data.data[0].id, "", this.pages);
        }
      })
      .catch(() => {
        console.log("查询失败");
      });
  },

  methods: {
    loadMore() {
      this.pages++;
      // 搜索的加载更多，搜索没有产品的id
      if (this.code != 1) {
        this.getData("", this.keyword, this.pages);
      } else {
        this.getData(this.uid, "", this.pages);
      }
    },
    aaa() {
      this.flog = true;
      this.imgsArr = [];
      this.showLoad = false;
      this.code = 2; //点击搜索 不传 产品id
      //  console.log(this.$refs.masonry)
      this.$refs.masonry.style = "position:relative";
    },
    search(keyword) {
      // console.log(word)
      this.keyword = keyword;
      this.pages = 1;
      this.getData("", keyword, this.pages);
    },
    details(id) {
      this.$router.push({
        name: "details",
        query: {
          pid: id
        }
      });
      console.log(id);
    },
    tab(id, index) {
      this.showLoading = true;
      this.num = index;
      this.uid = id;
      this.getData(id, "", 1); //传输1  是页数   是为了和搜索区分开 提示暂无数据区分开
    },
    getData(name, keyword, page) {
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
          typeId: 6,
          keywords: keyword,
          page: page
        })

        .then(res => {
          console.log(res);
          let arr = [];
          if (res.data.status_code == 1001) {
            // arr.push(res.data.data);
            this.showLoading = false;
            if (res.data.data.length == 0) {
              that.load = false;
              this.$refs.load.style = "height:100%";
              this.$refs.masonry.style = "position:relative";
            } else if (res.data.data.length < this.count) {
              that.load = false;
              this.$refs.load.style = "1rem";
              // this.$refs.masonry.style="position:relative"
            } else {
              that.load = true;
              this.$refs.load.style = "height:1rem";
            }

            // this.imgsArr = this.imgsArr.concat(arr);
            // console.log(this.imgsArr)
            this.imgsArr = this.imgArr.concat(res.data.data);
          }
        })
        .catch(res => {
          console.log(res);
          console.log("查询失败");
        });
    }
  },
  components: {
    // vueWaterfallEasy,
    tab,
    search
  }
};
</script>
<style scoped>
@import "./detail.css";
.topSearch {
  position: fixed;
  width: 100%;
  top: 0;
  height: 1.2rem;
  background: #fff;
  z-index: 2;
}
.searchs {
  width: 96%;
  height: auto;
  border: 1px solid #ccc;
  margin-top: 0.2rem;
  text-align: center;
  margin-left: 2%;
  background: #fff;
  border-radius: 0.2rem;
  position: fixed;
  top: 0px;
  display: inherit;
  z-index: 8;
}
.sousuo {
  width: 16%;
  height: 0.88rem;
  line-height: 44px;
  background: #ffffff;
  box-shadow: 0 2px 9px 0 #eeeeee;
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pic_view {
  width: 7.1rem;
  height: auto;
  margin: 0.2rem auto 0;
}
.sousuo img {
  width: 24px;
  height: 24px;
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
  height: 100%;
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
  display: flex;
}
.sortMenu-ul {
  /* min-width: px2rem(320px); */
  width: 86%;
  height: 0.88rem;
  margin-left: 2%;
  overflow-x: scroll;
  box-shadow: 0 2px 9px 0 #eeeeee;
  display: -webkit-box;
  justify-content: flex-start;
  animation: moveTo 0.5s ease both;
}

.noData {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
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
.Loading {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ccc;
  opacity: 0.5;
}
.name{
    font-size: 15px;
    color: #000000;
        padding: 0 0.3rem;
}
.name .prace{

}
.date{
    padding: 0 0.3rem;
    display: flex;
    justify-content:space-between;
}
</style>
