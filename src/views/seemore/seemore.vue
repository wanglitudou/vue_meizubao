<template>
  <div class="containers"
       :class="isRellyShow?'activeContainers':'containers'">

    <!-- <div class="list_list">
      <div class="list_search">
        <div class="sortMenu clearfix"
             v-show="slideShow">
          <ul class="sortMenu-ul">

            <div v-for="(item,index) in tabs"
                 :ley="index"
                 @click="tab(item.id,index)">
              <tab :item="item"
                   :index="index"
                   :num="num"></tab>
              <!-- <li class="cell"   :class="num == index ?'dora':''">
                            {{item.name}}
        Search"
             v-if="flog">-->

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
      <!-- 瀑布流布局 -->
      <div v-masonry
           transition-duration="0.3s"
           ref="masonry"
           item-selector=".item"
           column-width=".item"
           v-if="isNodata">
        <!-- v-for="(item, index) in accessoryproducts -->
        <div v-masonry-tile
             class="item"
             v-for="(item, index) in accessoryproducts"
             @click="details(item.id)">
          <div class="cent_left">
            <div class="list_img">
              <img :src="item.images"
                   alt="666">
            </div>
            <div class="list_oper">
              <p class="oper_room">
                <span>{{item.name}}</span>
              </p>

              <p class="every_pro">
                <span class="data_pro">
                  <span class="data_mon">￥{{item.price}}</span>
                </span>
              </p>
              <p class="cli_app">
                <span class="cli_ment">立即下单</span>
              </p>
            </div>
          </div>
        </div>
        <!-- 店家加载更多 -->
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
    <!-- 暂无数据 -->
    <div class="noData"
         v-if="showNodata">
      赞无数据
    </div>
  </div>
</template>
<script>
import { Spinner, Toast, Indicator } from "mint-ui";
import slider from "../../components/sliderBar.vue";
import tab from "../../components/tabBar.vue";
import search from "../../components/search.vue";
import { VueMasonryPlugin } from "vue-masonry";
export default {
  data() {
    return {
      tabs: [], // 热租仪器分类
      accessoryproducts: [], //产品配套筛选
      num: 0,
      pages: 1,
      flog: false,
      url: [],
      message: "",
      slideShow: true,
      showLoad: true,
      isRellyShow: false,
      load: true,
      keyword: "",
      code: 1, //这个是不搜索的
      count: 15,
      topStatus: false,
      showNodata: false,
      isNodata: false,
      loading: false,
      typeid: 0
    };
  },
  created() {
    Indicator.open();
    let that = this;
    //热租仪器分类
    that.$axios
      .get(window.ajaxSrc + "/api/meizubao/productType", {})
      .then(res => {
        console.log(res);
        if (res.data.status_code == 1001) {
          that.tabs = res.data.data;
          this.getData(res.data.data[0].id, "", this.pages);
        }
      })
      .catch(() => {
        setTimeout(() => {
          Indicator.close();
        }, 1000);
        Toast("加载失败");
        console.log("查询失败");
      });
  },
  methods: {
    // 隐藏slider
    hideSide() {
      this.isRellyShow = false;
    },
    logo() {
      this.isRellyShow = true;
    },
    details(id) {
      this.$router.push({
        name: "matching",
        query: {
          pid: id
        }
      });
      console.log(id);
    },
    getData(name, keyword, pages) {
      let that = this;
      //热租仪器筛选
      that.$axios
        .post(window.ajaxSrc + "/api/meizubao/productSearch", {
          typeId: name,
          keywords: keyword,
          page: pages
        })

        .then(res => {
          console.log(res);
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

            that.accessoryproducts = that.accessoryproducts.concat(
              res.data.data
            );
          }
        })
        .catch(() => {
          console.log("查询失败");
        });
    },
    show() {
      if (this.keyword == "") {
        Toast("搜索不能为空");
        return false;
      }
      this.accessoryproducts = [];
      this.showNodata = false;
      this.isNodata = false;
      this.pages = 1;
      this.code = 2;
      this.getData("", this.keyword, this.pages);
    },

    // aaa() {
    //   this.flog = true;
    //   this.accessoryproducts = [];
    //   this.showNodata = false;
    //   this.isNodata = false;
    //   this.code = 2; //点击搜索 不传 产品id
    //   //  console.log(this.$refs.masonry)
    //   // this.$refs.masonry.style = "position:relative";
    // },

    // search(keyword) {
    //   // console.log(word)
    //   this.getData("", keyword, this.pages);
    // },
    tab(id, index) {
      this.typeid = id;
      console.log(id);
      this.num = index;
      this.accessoryproducts = [];
      this.isRellyShow = false;
      this.pages = 1;
      this.isNodata = false;
      this.showNodata = false;
      Indicator.open();
      setTimeout(() => {
        this.getData(id, "", this.pages); //传输1
      }, 2000);
      //   this.getData(id, "", 1); //传输1 是页数 为了和搜索区分开 提示暂无数据区分开
      //   this.$refs.masonry.style="position:relative"
    },
    // },
    loadMore() {
      this.topStatus = true;
      this.pages++;
      // 搜索的加载更多，搜索没有产品的id
      if (this.code != 1) {
        setTimeout(() => {
          this.getData("", this.keyword, this.pages);
        });
      } else {
        setTimeout(() => {
          this.getData(this.typeid, "", this.pages);
        });
      }
    }
  },
  components: {
    tab,
    search,
    slider
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/helper.scss";
.activeContainers {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.containers {
  width: 100%;
  height: 100%;
  background: #fff;
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
.list_box {
  width: 100%;
  height: calc(100% - 1.2rem);
  overflow: auto;
  margin-top: 0.2rem;
}
.searchs_box img {
  width: 0.5rem;
  height: 0.5rem;
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
  width: 100%;
  height: auto;
}
.list_img img {
  width: 100%;
  /* height: 100%; */
}
.oper_room {
  padding: 0.2rem;
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
.item {
  width: 48%;
  height: auto;
  padding: 1%;
  margin: 1%;
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
.loadMore {
  width: 96%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-size: px2rem(14px);
  color: #00a5ff;
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
section {
  padding-top: px2rem(45px);
}
</style>
