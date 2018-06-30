<template>
  <div ref="container"
       :class="isRellyShow?'containersActive':'container'">

    <!-- <div class="nav_pic">
                <span class="list_tab"
                      v-for="(item,index) in tabs"
                      :key="index"
                      :class="num==index?'dora':''"
                      @click="tab(index)">{{item.name}}</span>
                <span class="sousuo"
                      @click="aaa()">
                    <img src="../../assets/icon/search_1.png" alt=""> 
                </span>
            </div> -->
    <!-- <div class="sortMenu clearfix" v-show="slideShow">
        <ul class="sortMenu-ul">
          <div v-for="(item,index) in tabs" :ley="index" @click="tab(item.id,index)">
            <tab :item="item" :index="index" :num="num"></tab>
          </div>
        </ul> -->
    <!-- 搜索按钮 -->
    <!-- <div class="sousuo" @click="aaa()"> -->
    <!-- <img src="../../assets/icon/search_1.png" alt=""> -->
    <!-- </div> -->
    <!-- </div> -->
    <!-- <div class="topSearch" v-if="flog">
        <search @search="search"></search>
      </div> -->

    <!-- <div class="slider" v-show="slideShow">
        <div class="slider_item" v-for="(value,index) in sliders">
          <div class="slider_tab" @click="slider(index)">
            <p>{{value.item}}</p>
            <div class="img">
              <img v-bind:src="index== number?Highlight:gray" alt="">
              <img v-bind:src="index== number?Highlight:gray" alt="" class="rotate">
            </div>
          </div>
     
          <ul class="slider_ul" v-if="ulnum ==  index">
            <li class="slider_li" v-for="(i,subscript) in value.arr" @click="itemli(i,subscript,value.item,value.id)">
              <span class="span1" :class="linum ==  subscript?'actives':''">
              </span>
              <span style="margin-left:10px;">{{i.item}}</span>
            </li>
          </ul>
        </div>
      </div> -->
    <header class="clearfix">
      <div class="search_content">
        <form action="javascript:return true;">
          <input @keyup.13=show()
                 type="search"
                 placeholder="请输入搜索内容"
                 v-model="keyword"
                 ref="input1">
        </form>
        <img src="../../assets/icon/search_1.png"
             alt="111">
      </div>
      <p class="logo"
         @click="logo"><img src="../../assets/images/menu.png"
             alt=""></p>

    </header>
    <section>
      <div v-masonry
           transition-duration="0.3s"
           ref="masonry"
           item-selector=".item"
           column-width=".item"
           v-if="isNodata">
        <div v-masonry-tile
             class="item"
             v-for="(item, index) in thebeautyindustry"
             @click="details(item.id)">
          <div class="cent_left">
            <div class="list_img">
              <img :src="item.images"
                   alt="">
            </div>
            <div class="list_oper">
              <p class="oper_room">
                <span class="eliteName">{{item.name}}</span>
                <!-- <span>{{item.level}}</span> -->
                <span class="eliteStar">
                  <span v-for="val in item.level"><img src="../../assets/images/star.png"
                         alt=""></span>
                </span>

              </p>
              <p class="content">{{item.centetnt}}</p>
              <p class="every_pro">
                <span class="data_pro">
                  <span class="data_mon">{{item.dayprice}}</span>/日</span>
                <span class="week_pro">
                  <span class="week_mon">{{item.price}}</span>/周</span>
              </p>
              <p class="cli_app">
                <span class="cli_ment">点击预约</span>
              </p>
            </div>
          </div>
        </div>
        <!-- 加载更多 -->
        <div class="item loadMore"
             ref="load">
          <mt-spinner type="fading-circle"
                      color="#FD4689 "
                      v-if="topStatus"></mt-spinner>
          <span v-else>
            <span @click="loadMore"
                  v-if="loading">加载更多</span>
            <span v-else>数据全部加载完成</span>
          </span>
        </div>

      </div>

    </section>
    <slider :tabContent="tabs"
            :num="num"
            :tab="tab"
            :isRellyShow="isRellyShow"
            :hideSide="hideSide"></slider>
    <!-- 没有数据 -->
    <div class="nodata"
         v-if="showNodata">
      暂无数据
    </div>
  </div>

</template>
<script>
import { Spinner, Toast, Indicator } from "mint-ui";
import slider from "../../components/sliderBar.vue";
import tab from "../../components/tabBar.vue";
import search from "../../components/search.vue";
import { filter, forEach, find } from "lodash";
export default {
  data() {
    return {
      tabs: [], // 热租仪器分类
      thebeautyindustry: [], //技师筛选
      num: 0,
      flog: false,
      url: [],
      message: "",
      Highlight: require("../../assets/images/jian2.png"),
      gray: require("../../assets/images/jian.png"),
      number: 4,
      isRellyShow: false,
      sliders: [
        {
          id: 1, // 为1 是等级
          item: "级别",
          arr: [
            { num: 3, item: "三级" },
            { num: 4, item: "四级" },
            { num: 5, item: "五级" }
          ]
        },
        {
          id: 2, //为2 是日薪资
          item: "日薪资",
          arr: [{ num: 1, item: "从高到低" }, { num: 2, item: "从低到高" }]
        }
      ],
      grade: "", //等级
      dayprice: "", //日薪资
      // arr:[{tab:ites,tabs:['']}],
      keywords: "",
      keyword: "",
      code: 1,
      typeId: 0,
      slideShow: true,
      itemshow: true,
      load: true,
      pages: 1,
      count: 15,
      topStatus: false,
      loading: false,
      showNodata: false,
      isNodata: false
    };
  },
  created() {
    //
    // require('../../assets/images/jian.png')
    // this.gray  = require('../../assets/images/jian.png')
    let that = this;
    Indicator.open();
    //热租仪器分类
    that.$axios
      .get(window.ajaxSrc + "/api/meizubao/technicianType", {})
      .then(res => {
        // console.log(res);
        if (res.data.status_code == 1001) {
          that.tabs = res.data.data;
          that.typeId = res.data.data[0].id;
          that.getData(
            res.data.data[0].id,
            this.keywords,
            this.grade,
            this.dayprice,
            this.pages
          );
        }
      })
      .catch(() => {
        setTimeout(() => {
          Indicator.close();
        }, 1000);
        Toast("加载失败");
      });
  },
  methods: {
    details(id) {
      this.$router.push({
        name: "essence",
        query: {
          pid: id
        }
      });
    },
    // 搜索回车事件
    show() {
      console.log(11);
      this.code = 2;
      if (this.keyword == "") {
        Toast("搜索框不能为空");
        return false;
      }
       Indicator.open();
      this.pages = 1;
     
      setTimeout(() => {
         this.thebeautyindustry =[]
        // this.getData('')
        this.getData("", this.keyword, this.grade, this.dayprice, this.pages);
      }, 500);
    },
    //   search(keyword) {
    //   if (keyword == "") {
    //     Toast("搜索不能为空");
    //     return false;
    //   }
    //   this.keywords = keyword;
    //   this.pages = 1;
    //   setTimeout(() => {
    //     this.getData("", keyword, this.grade, this.dayprice, this.pages);
    //   });
    // },
    // 点击右侧滑出
    logo() {
      this.isRellyShow = true;
    },
    // 隐藏右侧栏
    hideSide() {
      this.isRellyShow = false;
    },
    getData(name, keywords, star, dayprice, page) {
      // console.log(name, keywords, star, dayprice, page);
      // console.log(dayprice)
      // return false
      let that = this;
      //热租仪器筛选
      that.$axios
        .post(window.ajaxSrc + "/api/meizubao/technicianSearch", {
          typeId: name,
          keywords: keywords,
          page: page,
          // level: "",
          level: star,
          dayprice: dayprice
          // price: ""
        })
        .then(res => {
          // console.log(res.data.data.length);
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

            that.thebeautyindustry = that.thebeautyindustry.concat(
              res.data.data
            );
          }
        })
        .catch(() => {
          console.log("查询失败");
        });
    },
    loadMore() {
      this.topStatus = true;
      this.pages++;
      // 搜索的加载更多，搜索没有产品的id
      // that.getData(res.data.data[0].id,this.keywords,this.grade,this.dayprice,this.page);
      if (this.code != 1) {
        setTimeout(() => {
          this.getData("", this.keywords, "", "", this.pages);
        }, 1000);
      } else {
        setTimeout(() => {
          this.getData(this.typeId, "", this.grade, this.dayprice, this.pages);
        }, 1000);
      }
    },
    loseblur() {
      alert("666");
    },
    slider(index) {
      this.number = index;
    },

    // details() {
    //   this.$router.push({ name: "details" });
    // },
    tab(id, index) {
      this.num = index;
      this.keyword = "";
      this.isRellyShow = false;
      this.typeId = id;
      Indicator.open();
      this.pages = 1;
      this.isNodata = false;
      this.showNodata = false;
      this.thebeautyindustry = [];

      // that.getData(res.data.data[0].id,this.keywords,this.grade,this.dayprice,this.page);
      setTimeout(() => {
        this.getData(id, this.keywords, this.grade, this.dayprice, this.pages); //传输1  是页数   是为了和搜索区分开 提示暂无数据区分开
      }, 1000);
    }
  },
  components: {
    tab,
    slider,
    search
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/helper.scss";
.containersActive {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.container {
  width: 100%;
  height: 100%;
  background: #fff;
}
.list_container {
  width: 100%;
  height: calc(100% - 1.2rem);
  overflow: auto;
  margin-top: 0.2rem;
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
  width: 100%;
  height: auto;
  margin: auto 0;
  position: fixed;
  top: 0;
  background: #fff;
  z-index: 4;
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
.searchs_box {
  width: 96%;
  height: 0.9rem;
  border: 1px solid #ccc;
  margin-top: 0.2rem;
  text-align: center;
  margin-left: 2%;
  background: #fff;
  border-radius: 0.2rem;
  position: absolute;
  top: 0px;
  display: inherit;
}
.searchs_box input {
  width: 6rem;
  height: 0.9rem;
  border: 0;
  outline: none;
  padding-left: 1rem;
  box-sizing: border-box;
  float: left;
  margin-left: 0.2rem;
  border-bottom: 1px solid #ccc;
}
.searchs_box img {
  width: 0.5rem;
  height: 0.5rem;
  margin-top: 0.2rem;
}
.item {
  width: 46.1%;
  height: auto;
  // padding: 1%;
  margin: 0.6% 2%;
  box-shadow: 0 2px 9px #ccc;
}

.cent_left {
  background: #fff;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  // margin-top: 10px;
  padding-bottom: px2rem(15px);
}
.list_img {
  /* height: 2rem; */
  width: 100%;
}
.list_img img {
  width: 100%;
  height: 100%;
}
.list_oper {
  margin-left: px2rem(10px);
}
.oper_room {
  // padding: 0.2rem;
}
.oper_room .eliteName {
  font-size: px2rem(15px);
  color: #000;
  font-weight: bold;
}
.oper_room .eliteStar {
  margin-left: px2rem(17px);

  img {
    width: px2rem(12px);
    height: px2rem(12px);
  }
}
.content {
  font-size: px2rem(13px);
  color: #999999;
  letter-spacing: 0;
  // padding: 0rem 10px;
  margin-top: px2rem(6px);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.every_pro {
  display: flex;
  justify-content: space-between;
  // padding: 0 10px;
  margin-top: px2rem(6px);
}
.data_pro {
  font-size: px2rem(12px);
  color: #3f3f3f;
}
.data_mon {
  font-size: px2rem(12px);
  color: #ff272d;
  letter-spacing: 0;
  line-height: 20px;
}
.week_pro {
  margin-right: px2rem(8.2px);
  font-size: px2rem(12px);
  color: #3f3f3f;
  line-height: px2rem(17px);
}
.week_mon {
  color: #000;
  letter-spacing: 0;
  // line-height: 20px;
}
.cli_app {
  width: 2rem;
  height: 0.8rem;
  line-height: 0.8rem;
  margin: 0 auto;
  text-align: center;
  margin-top: 10px;
  background-image: linear-gradient(-130deg, #fd4689 0%, #fd82d9 100%);
  box-shadow: 0 1px 4px 0 rgba(253, 70, 137, 0.58);
  border-radius: 3px;
  font-size: 14px;
  color: #ffffff;
  letter-spacing: 0;
}
.listbox_rig {
  width: 49%;
}
.foot_load {
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  margin-top: 10px;
  background: #fff;
  text-align: center;
}
.foot_load span {
  height: 1.5rem;
  line-height: 1.5rem;
  font-size: 14px;
  color: #00a5ff;
  letter-spacing: 0;
}
.slider {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  background: #fff;
}
.slider_item {
  width: 40%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.slider_tab {
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 16px;
  color: #333;
}
.slider_ul {
  position: absolute;
  top: 30px;
  background: #fff;
  display: flex;
  flex-direction: column;
  /* justify-content: center;
   */
  width: 80%;
  margin-left: 10%;
  text-align: center;
  /* border: 1px solid # */
  box-shadow: 0 2px 4px 0 #fd4689;
  z-index: 3;
}
.slider_li {
  font-size: 14px;
  color: #555555 100%;
  line-height: 30px;
  font-size: PingFangSC-Regular;
  display: flex;
  align-items: center;
}
.slider_li span {
  display: block;
  /* width: 5px; */
  /* height: 20px */
}
.slider_li .actives {
  width: 5px;
  height: 20px;
}
.img {
  display: flex;
  flex-direction: column;
}
.img img {
  margin-left: 3px;
  width: 10px;
  display: block;
}
.rotate {
  transform: rotate(180deg);
}
.sortMenu {
  z-index: 1;
  width: 100%;
  /* margin-top: px2rem(48px); */

  background-color: #ffffff;
  box-shadow: 0 2px 4px 0 #ebeced;
  display: flex;
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
.actives {
  /* border-left:2px solid  #FD82D9
   */
  width: 8px;
  height: 20px;
  background: radial-gradient(
    ellipse farthest-corner,
    #fd4689 100%,
    #fd82d9 100%
  );
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
.nodata {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #00a5ff;
  font-size:px2rem(14px);
}
.loadMore {
  width: 96%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #00a5ff;
  font-size: px2rem(14px);
  box-shadow: none;
}
// 头部样式
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
    img {
      display: inline-block;
      width: 20px;
      margin-right: px2rem(5px);
    }
  }
}
section {
  padding-top: px2rem(50px);
}
</style>
