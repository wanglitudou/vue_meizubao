<template>
  <div class="container">
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

      <!-- <div class="searchs_box"
             v-if="flog">
            <input type="text"
                   placeholder="请输入搜索内容"
                   v-model="message"
                   @blur="loseblur()">
            <img src="../../assets/icon/search_1.png"
                 alt="111">
        </div> -->
      <div class="slider" v-show="itemshow">
        <div class="slider_item" v-for="(item,index) in sliders" @click="slider(index)">
          <p>{{item}}</p>
          <div class="img">
            <img v-bind:src="index== number?Highlight:gray" alt="">
            <img v-bind:src="index== number?Highlight:gray" alt="" class="rotate">
          </div>
          <!-- 下拉框 -->
        </div>
      </div>

    </div>

    <!-- <div class="list_container"> -->

    <!--导航,点击搜索滑动-->

    <!-- <div class="list_box">
        <div class="listbox_lef" v-for="item in thebeautyindustry" :key="item.index">
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

      </div>
      <div class="foot_load">
        <span>加载更多 > </span>
      </div> -->
    <div v-masonry transition-duration="0.3s" ref="masonry" item-selector=".item" column-width=".item">
      <div v-masonry-tile class="item" v-for="(item, index) in thebeautyindustry">
        <!-- block item markup -->
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
    </div>
    <div class="moreData" ref="load" v-show="showLoad">
      <div v-if="load" @click="loadMore">加载更多></div>
      <div v-else>已全部加载</div>
    </div>
  </div>

</template>
<script>
import tab from "../../components/tabBar.vue";
import search from "../../components/search.vue";
export default {
  data() {
    return {
      tabs: [], // 热租仪器分类
      thebeautyindustry: [], //技师筛选
      num: 1,
      flog: false,
      url: [],
      message: "",
      Highlight: require("../../assets/images/jian2.png"),
      gray: require("../../assets/images/jian.png"),
      number: 4,
      sliders: ["级别", "日薪资", "周薪"],
      keyword: "",
      code: 1,
      uid: 0,
      slideShow: true,
      itemshow: true,
      showLoad: true,
      load: true
    };
  },
  created() {
    //
    // require('../../assets/images/jian.png')
    // this.gray  = require('../../assets/images/jian.png')
    let that = this;
    //热租仪器分类
    that.$axios
      .get("http://mzbao.weiyingjia.org/api/meizubao/technicianType", {})
      .then(res => {
        console.log(res);
        if (res.data.status_code == 1001) {
          that.tabs = res.data.data;
          that.getData(res.data.data[0].id);
        }
      })
      .catch(() => {
        console.log("查询失败");
      });
  },
  methods: {
    getData(name) {
      let that = this;
      //热租仪器筛选
      that.$axios
        .post("http://mzbao.weiyingjia.org/api/meizubao/technicianSearch", {
          typeId: 6,
          keywords: "",
          page: 1,
          level: "",
          star: "",
          dayprice: "",
          price: ""
        })
        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            that.thebeautyindustry = res.data.data;
          }
        })
        .catch(() => {
          console.log("查询失败");
        });
    },
    loadMore() {
      this.pages++;
      // 搜索的加载更多，搜索没有产品的id
      if (this.code != 1) {
        this.getData("", this.keyword, this.pages);
      } else {
        this.getData(this.uid, "", this.pages);
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
      this.showLoad = false;
      this.itemshow = false;
      this.code = 2; //点击搜索 不传 产品id
      //  console.log(this.$refs.masonry)
      this.$refs.masonry.style = "position:relative";
    },
    details() {
      this.$router.push({ name: "details" });
    },
    tab(id, index) {
      this.num = index;
      this.uid = id;
      this.getData(id, "", 1); //传输1  是页数   是为了和搜索区分开 提示暂无数据区分开
    },
    search(keyword) {
      this.keyword = keyword;
      this.pages = 1;
      this.getData("", keyword, this.pages);
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
  width: 7.1rem;
  height: 2rem;
  margin: auto 0;
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
  position: fixed;
  top: 0.8rem;
  background: #fff;
  z-index: 2;
}
.slider_item {
  width: 33.3%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #333;
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
</style>
