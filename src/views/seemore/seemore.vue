<template>
    <div class="containers">
        <!-- <div class="pic_view">
            <div class="nav_pic"> -->
        <!-- <span class="list_tab"
                      v-for="(item,index) in tabs"
                      :key="index"
                      :class="num==index?'dora':''"
                      @click="tab(index)">{{item.name}}</span>
                <span class="sousuo"
                      @click="aaa()">
                    <img src="../../assets/icon/search_1.png"
                         alt="">
                </span> -->
        <!-- </div> -->
        <!-- </div> -->
        <div class="list_list">
            <div class="list_search">
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
                <!--  -->
                <div class="topSearch" v-if="flog">
                    <search @search="search"></search>
                </div>

            </div>
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
        <!-- <div class="list_box"> -->
        <!-- <div class="listbox_lef" v-for="item in accessoryproducts" :key="item.index
                     ">
                <div class="cent_left">
                    <div class="list_img">
                        <img :src="item.images" alt="666">
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
                </div> -->
        <!-- <div class="cent_left">
                    <div class="list_img">
                        <img src="../../assets/images/icon2.jpg"
                             alt="">
                    </div>
                    <div class="list_oper">
                        <p class="oper_room">
                            <span>仪器操作室</span>
                        </p>
                        <p class="every_pro">
                            <span class="data_pro">
                                <span class="data_mon">￥1500</span>
                            </span>
                        </p>
                        <p class="cli_app">
                            <span class="cli_ment">立即下单</span>
                        </p>
                    </div>
                </div> -->
        <!-- <div class="cent_left">
                    <div class="list_img">
                        <img src="../../assets/images/icon2.jpg"
                             alt="">
                    </div>
                    <div class="list_oper">
                        <p class="oper_room">
                            <span>仪器操作室</span>

                        </p>
                        <p class="every_pro">
                            <span class="data_pro">
                                <span class="data_mon">￥1500</span>
                            </span>
                        </p>
                        <p class="cli_app">
                            <span class="cli_ment">立即下单</span>
                        </p>
                    </div>
                </div> -->
        <!-- </div> -->

        <!-- <div class="listbox_rig">
                <div class="cent_left">
                    <div class="list_img">
                        <img src="../../assets/images/icon2.jpg"
                             alt="">
                    </div>
                    <div class="list_oper">
                        <p class="oper_room">
                            <span>仪器操作室</span>

                        </p>
                        <p class="every_pro">
                            <span class="data_pro">
                                <span class="data_mon">￥1500</span>
                            </span>
                        </p>
                        <p class="cli_app">
                            <span class="cli_ment">立即下单</span>
                        </p>
                    </div>
                </div>
                <div class="cent_left">
                    <div class="list_img">
                        <img src="../../assets/images/icon2.jpg"
                             alt="">
                    </div>
                    <div class="list_oper">
                        <p class="oper_room">
                            <span>仪器操作室</span>

                        </p>
                        <p class="every_pro">
                            <span class="data_pro">
                                <span class="data_mon">￥1500</span>
                            </span>
                        </p>
                        <p class="cli_app">
                            <span class="cli_ment">立即下单</span>
                        </p>
                    </div>
                </div>
                <div class="cent_left">
                    <div class="list_img">
                        <img src="../../assets/images/icon2.jpg"
                             alt="">
                    </div>
                    <div class="list_oper">
                        <p class="oper_room">
                            <span>仪器操作室</span>
                        </p>
                        <p class="every_pro">
                            <span class="data_pro">
                                <span class="data_mon">￥1500</span>
                            </span>
                        </p>
                        <p class="cli_app">
                            <span class="cli_ment">立即下单</span>
                        </p>
                    </div>
                </div>
            </div> -->
        <!-- </div> -->
        <!-- <div class="foot_load">
            <span>加载更多 > </span>
        </div> -->

        <!-- 瀑布流布局 -->
        <div v-masonry transition-duration="0.3s" ref="masonry" item-selector=".item" column-width=".item">
            <!-- v-for="(item, index) in accessoryproducts -->
            <div v-masonry-tile class="item" v-for="(item, index) in accessoryproducts">
                <div class="cent_left">
                    <div class="list_img">
                        <img :src="item.images" alt="666">
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
        </div>
        <!-- 加载更多 -->
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
      accessoryproducts: [], //产品配套筛选
      num: 1,
      pages: 1,
      flog: false,
      url: [],
      message: "",
      slideShow: true,
      showLoad: true,
      load: true,
      keyword: "",
      code: 1,//这个是不搜索的
      count:15
    };
  },
  created() {
    let that = this;
    //热租仪器分类
    that.$axios
      .get("http://mzbao.weiyingjia.org/api/meizubao/productType", {})
      .then(res => {
        console.log(res);
        if (res.data.status_code == 1001) {
          that.tabs = res.data.data;
          this.getData(res.data.data[0].id, "", this.pages);
        }
      })
      .catch(() => {
        console.log("查询失败");
      });
  },
  methods: {
    getData(name, keyword, pages) {
      let that = this;
      //热租仪器筛选
      that.$axios
        .post("http://mzbao.weiyingjia.org/api/meizubao/productSearch", {
          typeId: 6,
          keywords: keyword,
          page: pages
        })

        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            if (res.data.data.length == 0) {
              that.load = false;
              this.$refs.load.style = "height:100%";
              this.$refs.masonry.style = "position:relative";
            } else if (res.data.data.length < this.count) {
              that.load = false;
              this.$refs.load.style = "100%";
              // this.$refs.masonry.style="position:relative"
            } else {
              that.load = true;
              this.$refs.load.style = "height:1rem";
            }
            that.accessoryproducts = res.data.data;
          }
        })
        .catch(() => {
          console.log("查询失败");
        });
    },
    search(keyword) {
      console.log(keyword);
      this.keyword = keyword;
      this.pages = 1;
      this.getData("", keyword, this.pages);
    },
    loseblur() {
      alert("666");
    },
    // aaa() {
    //   //   this.flog = true;
    //   this.flog = true;
    //   this.imgsArr = [];
    //   this.slideShow = false;
    // },
    aaa() {
      this.flog = true;
      this.accessoryproducts = [];
      this.showLoad = false;
      this.code = 2; //点击搜索 不传 产品id
      //  console.log(this.$refs.masonry)
      this.$refs.masonry.style = "position:relative";
    },
    search(keyword) {
      // console.log(word)
      this.getData("", keyword, this.pages);
    },
    details() {
      this.$router.push({ name: "details" });
    },
    tab(id, index) {
      this.num = index;
      this.getData(id, "", 1); //传输1 是页数 为了和搜索区分开 提示暂无数据区分开
      //   this.$refs.masonry.style="position:relative"
    },
    // },
    loadMore() {
      this.pages++;
      // 搜索的加载更多，搜索没有产品的id
      if (this.code != 1) {
        this.getData("", this.keyword, this.pages);
      } else {
        this.getData(this.uid, "", this.pages);
      }
    }
  },
  components: {
    tab,
    search
  }
};
</script>
<style scoped>
.containers {
  width: 100%;
  height: calc(100% - 0.81rem);
  background: #fff;
}

.list_list {
  width: 100%;
  height: auto;
}
.list_search {
  width: 100%;
  height: 0.88rem;
  /* border: 1px solid #fff; */
  /* margin-top: 0.2rem; */
  text-align: center;
  /* margin-left: 2%; */
  background: #fff;
  border-radius: 0.1rem;
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
  width: 14%;
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
</style>
