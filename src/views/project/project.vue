<template>
  <div ref="container" v-bind:class="isRellyShow == true?'containersActive':'container'">

    <header class="clearfix">
      <div class="search_content">
        <form action="javascript:return true;">
          <input @keyup.13=show() type="search" placeholder="请输入搜索内容" v-model="keyword" ref="input1">
        </form>
        <img src="../../assets/icon/search_1.png" alt="111">
      </div>
      <p class="logo" @click="logo"><img src="../../assets/images/menu.png" alt=""></p>
    </header>
    <!-- 瀑布流 -->
    <section>
      <scroller :on-infinite="infinite" style="padding-top:50px" ref="myscroller" :refreshLayerColor="'#000'" v-bind:class="isvoid == true?'empty':''">
        <div v-masonry transition-duration="0.3s" ref="masonry" item-selector=".item" column-width=".item" v-if="isNodata">
          <div v-masonry-tile class="item" v-for="(item, index) in cooperativeproject" @click="details(item.id)">
            <div class="listbox_lef">
              <div class="cent_left">
                <div class="list_img">
                  <img :src="item.images" alt="">
                </div>
                <div class="list_oper">
                  <p class="oper_room">
                    <span>{{item.name}}</span>
                  </p>
                  <p class="content">{{item.content}}</p>
                  <p class="every_pro">
                    <span class="data_pro">
                      <span class="data_mon">￥{{item.price}}</span>/日</span>
                    <span class="pay_add">￥{{item.price}}</span>
                  </p>
                  <p class="cli_app">
                    <span class="cli_ment" @click="cooperation()">点击预约</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- <div class="item loadMore" ref="load">
            <mt-spinner type="fading-circle" color="#FD4689 " v-if="topStatus"></mt-spinner>
            <span v-else>
              <span @click="loadMore" v-if="loading">加载更多</span>
              <span v-else>数据全部加载完成</span>
            </span>
          </div> -->
        </div>
        <div class="void" style="height: 1px;"></div>
      </scroller>
    </section>
    <!-- 侧边栏 -->
    <slider :tabContent="tabs" :num="num" :tab="tab" :isRellyShow="isRellyShow" :hideSide="hideSide"></slider>
    <!-- 暂无数据 -->
    <!-- <div class="noData" v-if="showNodata">
      暂无数据
    </div> -->
  </div>
</template>
<script>
import { Spinner, Toast, Indicator } from "mint-ui";
import search from "../../components/search.vue";
import slider from "../../components/sliderBar.vue";
export default {
  data() {
    return {
      tabs: [], //热租仪器分类
      num: 100,
      cooperativeproject: [], //合作项目
      keyword: "",
      pages: 1,
      count: 15,
      showLoad: true,
      load: true,
      code: 1, //
      loading: true,
      isNodata: false,
      showNodata: false,
      topStatus: false,
      isRellyShow: false,
      isvoid: false,
      typeId: 0
    };
  },
  created() {
    // console.log(done)
    Indicator.open();
    let that = this;
    that.$axios
      .get(window.ajaxSrc + "/api/meizubao/projectType", {})
      .then(res => {
        console.log(res);
        if (res.data.status_code == 1001) {
          that.tabs = res.data.data;
          this.getData(0, that.keyword, that.pages, "");
        }
      });
  },
  methods: {
    details(id) {
      this.$router.push({
        name: "cooperation",
        query: {
          pid: id
        }
      });
    },
    cooperation() {
      //合作项目,点击合作项目模块,跳转到对应的详情页面
      this.$router.push({ name: "cooperation" });
    },
    infinite(done) {
      setTimeout(() => {
        this.pages++;
        // this.pages++; //每当向上滑动的时候就让页数加1

        this.getData(this.typeId, this.keyword, this.pages, done);
      }, 1000);
    },
    getData(typeId, keyword, pages, done) {

      if (done) {
        let that = this;
        //首页banner查询
        that.$axios
          .post(window.ajaxSrc + "/api/meizubao/projectSearch", {
            typeId: typeId,
            keywords: keyword,
            page: pages
          })
          .then(res => {
            console.log(res);
            if (res.data.status_code == "1001") {
              // setTimeout(() => {
              //   Indicator.close();
              // }, 1000);
              // if (res.data.data.length == 0) {
              //    pages = 0;
              //     done(true);
              //   this.showNodata = true;
              //   this.isNodata = false;
              // } else if (res.data.data.length < this.count) {
              //   this.isNodata = true;
              //   this.loading = false;
              // } else {
              //   this.isNodata = true;
              //   that.topStatus = false;
              //   that.loading = true;
              // }
              if (res.data.data.length < 10) {
                pages = 0;
                done(true);
              } else {
                if (done) done();
              }

              that.cooperativeproject = that.cooperativeproject.concat(
                res.data.data
              );
            }
          })
          .catch(res => {
            console.log(res);
            console.log("查询失败");
          });
      } else {
        let that = this;
        //首页banner查询
        that.$axios
          .post(window.ajaxSrc + "/api/meizubao/projectSearch", {
            typeId: typeId,
            keywords: keyword,
            page: pages
          })
          .then(res => {
            console.log(res);
            if (res.data.status_code == "1001") {
              setTimeout(() => {
                Indicator.close();
              }, 1000);
              if (res.data.data.length == 0) {
                //  pages = 0;
                // done(true);
                this.isvoid = true;
                this.showNodata = true;
                this.isNodata = false;
              } else if (res.data.data.length < this.count) {
                this.isNodata = true;
                this.loading = false;
              } else {
                this.isNodata = true;
                that.topStatus = false;
                that.loading = true;
              }

              that.cooperativeproject = that.cooperativeproject.concat(
                res.data.data
              );
            }
          })
          .catch(res => {
            console.log(res);
            console.log("查询失败");
          });
      }
      // console.log(keyword);
    },
    loadMore() {
      this.pages++;
      // 搜索的加载更多，搜索没有产品的id
      if (this.code != 1) {
        this.getData(this.keyword, this.pages);
      } else {
        this.getData("", this.pages);
      }
    },
    hideSide() {
      this.isRellyShow = false;
    },
    logo() {
      this.isRellyShow = true;
    },
    show() {
      let that = this;
      that.code = 2;
      this.isvoid =  false
      if (that.keyword == "") {
        Toast("搜索不能为空");
        return false;
      }
      that.pages = 1;
      Indicator.open();
      setTimeout(() => {
        that.cooperativeproject = [];
        that.getData("", that.keyword, that.pages,'');
      });
    },
    tab(id, index) {
      this.num = index;
      this.typeId = id;
      this.keyword = "";
      this.isvoid = false;
      this.cooperativeproject = [];
      this.isNodata = false;
      this.showNodata = false;
      this.pages = 1;
      this.isRellyShow = false;
      Indicator.open();
      setTimeout(() => {
        this.getData(id, "", this.pages,''); //传输1  是页数
      }, 1000);
    }
  },
  components: {
    search,
    slider
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/helper.scss";
.container {
  width: 100%;
  height: 100%;
  background: #fff;
}
.containersActive {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
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
.searchs_box {
  width: 96%;
  height: 0.81rem;
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
  height: 0.81rem;
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
  height: calc(100% - 1.2rem);
  overflow: auto;
  margin-top: 1.2rem;
}
.list_box .listbox_lef {
  width: 48%;

  border-radius: 3px;
}
.cent_left {
  background: #fff;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  // margin-top: 1.2rem;
  padding-bottom: 0.4rem;
}
.list_img {
  /* height: 2rem; */
  width: 100%;
  height: auto;
}
.list_img img {
  width: 100%;
  /* height: 100%; */
}
.oper_room {
  margin: px2rem(5px) px2rem(10px);
  font-size: px2rem(15px);
  color: #000;
  font-weight: bold;
}
.content {
  font-size: px2rem(13px);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  color: #999999;
  letter-spacing: 0;
  padding: 0rem 10px;
  margin-top: px2rem(6px);
}
.every_pro {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: px2rem(6px) px2rem(10px);
  color: #999999;
  font-size: px2rem(12px);
  width: 100%;
  .data_mon {
    color: #ff272d;
    font-size: px2rem(14px);
  }
}
.data_mon {
  font-size: 12px;
  color: #f00;
  letter-spacing: 0;
  line-height: 20px;
}
.pay_add {
  margin-right: px2rem(50px);
  text-decoration: line-through;
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
.topSearch {
  position: fixed;
  width: 100%;
  top: 0;
  height: 1.2rem;
  background: #fff;
  z-index: 2;
}
.item {
  width: 46%;
  height: auto;
  padding: 1%;
  margin: 1.5%;
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
  z-index: 1;
}
.noData {
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
.loadMore {
  width: 96%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #00a5ff;
  font-size: px2rem(14px);
  position: absolute;
  bottom: px2rem(20px);
  left: 0;
}
.searchs {
  font-size: 16px;
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
section {
  padding-top: px2rem(50px);
}
.empty {
  display: flex;
  height: 100%;
  align-items: center;
}
</style>
