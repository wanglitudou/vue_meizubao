<template>
  <div class="container" ref="container">
    <div class="pic_view">

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
      <div class="sortMenu clearfix" v-show="slideShow">
        <ul class="sortMenu-ul">
          <div v-for="(item,index) in tabs" :ley="index" @click="tab(item.id,index)">
            <tab :item="item" :index="index" :num="num"></tab>
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

      <div class="slider" v-show="slideShow">
        <div class="slider_item" v-for="(value,index) in sliders">
          <div class="slider_tab" @click="slider(index)">
            <p>{{value.item}}</p>
            <div class="img">
              <img v-bind:src="index== number?Highlight:gray" alt="">
              <img v-bind:src="index== number?Highlight:gray" alt="" class="rotate">
            </div>
          </div>
          <!-- 下拉框 -->
          <ul class="slider_ul" v-if="ulnum ==  index">
            <li class="slider_li" v-for="(i,subscript) in value.arr" @click="itemli(i,subscript,value.item,value.id)">
              <span class="span1" :class="linum ==  subscript?'actives':''">
              </span>
              <span style="margin-left:10px;">{{i.item}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-masonry transition-duration="0.3s" ref="masonry" item-selector=".item" column-width=".item" style="margin-top:1.9rem" v-if="isNodata">
      <div v-masonry-tile class="item" v-for="(item, index) in thebeautyindustry" @click="details(item.id)">
        <div class="cent_left">
          <div class="list_img">
            <img :src="item.images" alt="">
          </div>
          <div class="list_oper">
            <p class="oper_room">
              <span>{{item.name}}</span>
              <span>{{item.level}}</span>
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
      <div class="item loadMore" ref="load">
        <mt-spinner type="fading-circle" color="#FD4689 " v-if="topStatus"></mt-spinner>
        <span v-else>
          <span @click="loadMore" v-if="loading">加载更多</span>
          <span v-else>数据全部加载完成</span>
        </span>
      </div>

    </div>
    <!-- 没有数据 -->
    <div class="nodata" v-if="showNodata">
      暂无数据
    </div>
  </div>

</template>
<script>
import { Spinner, Toast, Indicator } from "mint-ui";
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
      ulnum: 4,
      linum: 4,
      message: "",
      Highlight: require("../../assets/images/jian2.png"),
      gray: require("../../assets/images/jian.png"),
      number: 4,
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
          arr: [{ num: 1, item: "从低到高" }, { num: 2, item: "从高到低" }]
        }
      ],
      grade: "", //等级
      dayprice: "", //日薪资
      // arr:[{tab:ites,tabs:['']}],
      keywords: "",
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
      .get(window.ajaxSrc+"/api/meizubao/technicianType", {})
      .then(res => {
        console.log(res);
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
        Toast('加载失败')
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
    getData(name, keywords, star, dayprice, page) {
      console.log(name, keywords, star, dayprice, page);
      let that = this;
      //热租仪器筛选
      that.$axios
        .post(window.ajaxSrc+"/api/meizubao/technicianSearch", {
          typeId: name,
          keywords: keywords,
          page: page,
          // level: "",
          star: star,
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

            // if (res.data.data.length == 0) {
            //   that.load = false;
            //   that.$refs.container.style = "height:100%;";
            //   this.$refs.load.style = "height:100%";
            //   this.$refs.masonry.style = "position:relative";
            // } else if (res.data.data.length < this.count) {
            //   that.load = false;
            //   this.$refs.load.style = "1rem";
            //   // this.$refs.masonry.style="position:relative"
            // } else {
            //   that.load = true;
            //   this.$refs.load.style = "height:1rem";
            // }
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
    aaa() {
      this.flog = true;
      this.imgsArr = [];
      this.slideShow = false;
      this.showLoad = false;
      this.thebeautyindustry = [];
      this.code = 2;
      // this.itemshow = false;
      //点击搜索 不传 产品id
      //  console.log(this.$refs.masonry)
      // this.$refs.masonry.style = "position:relative,margin-top:1.2rem";
    },
    details() {
      this.$router.push({ name: "details" });
    },
    tab(id, index) {
      this.num = index;
      this.typeId = id;
      Indicator.open();
      this.pages = 1;
      this.isNodata = false;
      this.showNodata = false;
      this.thebeautyindustry = [];

      // that.getData(res.data.data[0].id,this.keywords,this.grade,this.dayprice,this.page);
      setTimeout(() => {
        this.getData(id, this.keywords, this.grade, this.dayprice, this.pages); //传输1  是页数   是为了和搜索区分开 提示暂无数据区分开
      },1000);
    },
    search(keyword) {
      if (keyword == "") {
        Toast("搜索不能为空");
        return false;
      }
      this.keywords = keyword;
      this.pages = 1;
      setTimeout(() => {
        this.getData("", keyword, this.grade, this.dayprice, this.pages);
      });
    },
    // 点击筛选tab
    slider(index) {
      this.ulnum = index;
      console.log(index);
    },
    // 点击下拉菜单
    itemli(item, index, value, id) {
      // console.log(id)
      this.linum = index;
      if (id == 1) {
        var result = find(this.sliders, { id: 1 });
        result.item = item.item;
        this.grade = item.num;
        console.log("1");
      }
      if (id == 2) {
        var result2 = find(this.sliders, { id: 2 });
        result2.item = item.item;
        this.dayprice = item.num;
        console.log(2);
      }

      this.thebeautyindustry = [];
      this.ulnum = 4;
      this.pages = 1;
      Indicator.open();
      setTimeout(() => {
        this.getData(this.typeId, "", this.grade, this.dayprice, this.pages);
      }, 1000);
      // console.log(this.grade)
      // console.log(this.dayprice)
    }
  },
  components: {
    tab,
    search
  }
};
</script>
<style scoped>
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
.list_box {
  width: 100%;
  height: auto;
  margin-top: 0.2rem;
  overflow-y: scroll;
  margin-top: 0.2rem;
}
.list_box .listbox_lef {
  width: 48%;
  float: right;
  border-radius: 3px;
}
.cent_left {
  background: #fff;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  margin-top: 10px;
  padding-bottom: 0.4rem;
}
.list_img {
  /* height: 2rem; */
  width: 100%;
}
.list_img img {
  width: 100%;
  height: 100%;
}
.oper_room {
  padding: 0.2rem;
}
.content {
  font-size: 13px;
  color: #999999;
  letter-spacing: 0;
  padding: 0rem 10px;
}
.every_pro {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
.data_mon {
  font-size: 12px;
  color: #f00;
  letter-spacing: 0;
  line-height: 20px;
}
.week_mon {
  font-size: 12px;
  color: #000;
  letter-spacing: 0;
  line-height: 20px;
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
.item {
  width: 47%;
  height: auto;
  padding: 1%;
  margin: 1.2%;
  box-shadow: 0 2px 9px #ccc;
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
.topSearch {
  position: fixed;
  height: 1.2rem;
  top: 0;
  width: 100%;
  /* height: 1.2rem; */
  background: #fff;
  z-index: 2;
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
}
</style>
