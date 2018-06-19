<template>
  <div v-bind:class="isRellyShow == true?'containersActive':'containers'" >
    <!-- <div class="list_list">
            <div class="list_search">
                头部导航
                <div class="sortMenu clearfix" v-show="slideShow">
                    <ul class="sortMenu-ul">
                        <div v-for="(item,index) in tabs" :ley="index" @click="tab(item.id,index)">
                            <tab :item="item" :index="index" :num="num"></tab>
                           
                        </div>
                    </ul>
                    搜索按钮
                    <div class="sousuo" @click="aaa()">
                        <img src="../../assets/icon/search_1.png" alt="">
                    </div>
                </div>
                <div class="topSearch" v-if="flog">
                    
                </div>
            </div>
        </div> -->
    <header class="clearfix">
      <div class="search_content">
        <form action="javascript:return true;">
          <input @keyup.13=show() type="search" placeholder="请输入搜索内容" v-model="keyword" ref="input1">
        </form>
        <img src="../../assets/icon/search_1.png" alt="111">
      </div>
      <p class="logo" @click="logo"><img src="../../assets/images/menu.png" alt=""></p>
    </header>
    <section>

      <div v-masonry transition-duration="0.3s" ref="masonry" item-selector=".item" column-width=".item" v-if="isNodata">
        <div v-masonry-tile class="item" v-for="(item, index) in imgsArr" @click="details(item.id)">

          <div class="boxs listing">
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

        </div>
        <div class="item loadMore" ref="load">
          <mt-spinner type="fading-circle" color="#FD4689 " v-if="topStatus"></mt-spinner>
          <span v-else>
            <span @click="loadMore" v-if="loading">加载更多</span>
            <span v-else>数据全部加载完成</span>
          </span>
        </div>
      </div>
    </section>
    <!-- 侧边栏 -->
    <slider :tabContent="tabs" :num="num" :tab="tab" :isRellyShow="isRellyShow" :hideSide="hideSide"></slider>

    <div class="nodata" v-if="showNodata">
      暂无数据
    </div>

  </div>
</template>
<script>
import { Spinner, Toast, Indicator } from "mint-ui";
import qs from "qs";
import tab from "../../components/tabBar.vue";
import search from "../../components/search.vue";
import slider from "../../components/sliderBar.vue";
import $ from "jquery";
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
      message: "",
      imgsArr: [],
      showLoading: true,
      group: 0, // request param
      isScroll: true,
      pages: 1,
      keyword: "",
      noData: false,
      slideShow: true,
      load: true,
      showLoad: true,
      count: 15,
      code: 1,
      typeId: 0,
      loading: true,
      topStatus: false,
      isNodata: true,
      showNodata: false,
      showTab: true,
      isRellyShow: false
    };
  },

  created() {
    Indicator.open();
    let that = this;
    //热租仪器分类
    that.$axios
      .get(window.ajaxSrc + "/api/meizubao/instrumentType", {})
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
    logo() {
      this.isRellyShow = true;
    },
    hideSide() {
      this.isRellyShow = false;
    },

    //搜索
    show() {
      let that = this;
      // that.$refs.contain.style="over:"
      that.code = 2
      // console.log(this.keyword)
      //  this.keyword = keyword;
      if (this.keyword == "") {
        Toast("搜索不能为空");
        return false;
      }
      this.pages = 1;
      Indicator.open();
      setTimeout(() => {
        this.imgsArr = [];
        this.getData("", that.keyword, that.pages);
      },500);
    },
    // search(keyword) {
    //   //   console.log(word)

    //   if (this.keyword == "") {
    //     Toast("搜索不能为空");
    //     return false;
    //   }
    //   this.imgsArr = [];
    //   this.keyword = keyword;
    //   this.pages = 1;
    //   setTimeout(() => {
    //     this.getData("", keyword, this.pages);
    //   });
    // },
    loadMore() {
      this.topStatus = true;
      this.pages++;
      if (this.code != 1) {
        setTimeout(() => {
          this.getData("", this.keyword, this.pages);
        }, 1000);
      } else {
        setTimeout(() => {
          this.getData(this.uid, "", this.pages);
        }, 1000);
      }
    },
    details(id) {
      this.$router.push({
        name: "details",
        query: {
          pid: id
        }
      });
    },
    tab(id, index) {
      // console.log(id);
  
      this.num = index;
      this.typeId = id;
      this.keyword =  ''
      this.imgsArr = [];
      this.isNodata = false;
      this.showNodata = false;
      this.pages = 1;
      this.isRellyShow = false
      Indicator.open();
      setTimeout(() => {
        this.getData(id, "", this.pages); //传输1  是页数
      }, 2000);
    },
    getData(name, keyword, page) {
      let that = this;
      that.$axios
        .post(window.ajaxSrc + "/api/meizubao/instrumentSearch", {
          typeId: name,
          keywords: keyword,
          page: page
        })
        .then(res => {
          if (res.data.status_code == 1001) {
            Indicator.close();
            this.topStatus = false;
            if (res.data.data.length == 0) {
              this.isNodata = false;
              this.showNodata = true;
            } else if (res.data.data.length < this.count) {
              this.loading = false;
              this.isNodata = true;
            } else {
              this.isNodata = true;
              that.topStatus = false;
              that.loading = true;
            }

            this.imgsArr = this.imgsArr.concat(res.data.data);
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
    search,
    slider
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/helper.scss";
@import "./detail.css";
.containersActive{
  width: 100%;
  height: 100%;
 overflow: hidden;
}
.containers{
  width: 100%;
  height: 100%;
}
.clearfix {
  width: 100%;
  height: px2rem(44px);
  box-shadow: 0 2px 9px #eee;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  background: #fff;
  // padding: 7px 15px;
  .logo {
    width: px2rem(25px);
    height: px2rem(25px);

    img {
      width: 100%;
      display: inline-block;
    }
  }
  .search_content {
    width: px2rem(270px);
    height: px2rem(30px);
    border: 1px solid #ccc;
    border-radius: px2rem(5px);
    display: flex;
    justify-content: space-between;
    font-size: px2rem(13px);
    align-items: center;
    color: #000;
    span {
      display: inline-block;
      margin-left: (5px);
    }
    img {
      display: inline-block;
      width: 20px;
      margin-right: px2rem(5px);
    }
    form {
      display: block;
      width: 100%;
      height: 80%;
      input {
        border: none;
        outline: none;
        width: 100%;
        height: 100%;
        padding-left: px2rem(8px);
      }
    }
  }
}

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

.list_tab {
  width: auto;
  padding: 5px;
}
.item {
  width: 46.1%;
  height: auto;
  // padding: 1%;
  /* margin:3% */
  margin: 0.6% 2%;
}

.boxs {
  width: 100%;
  height: 100%;
  // margin: 2%;
}
.boxs img {
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
.name {
  font-size: 15px;
  color: #000000;
  padding: 0 0.3rem;
}
.name .prace {
}
.date {
  padding: 0 0.3rem;
  display: flex;
  justify-content: space-between;
}
.loadMore {
  width: 96%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-size: px2rem(14px);
  color: #00a5ff;
  box-shadow: none;
}
.nodata {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #00a5ff;
  font-size: px2rem(14px);
  position: absolute;
  top: 0;
}
section {
  padding-top: px2rem(44px);
}
</style>
