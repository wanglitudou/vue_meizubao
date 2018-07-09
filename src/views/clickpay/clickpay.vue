<template>
  <div class="containers">
    <div class="topSearch">
      <search @search="search"></search>
    </div>
    <div v-masonry
         transition-duration="0.3s"
         ref="masonry"
         item-selector=".item"
         column-width=".item"
         style="margin-top:0.88rem"
         v-if="isNodata">
      <div v-masonry-tile
           class="item"
           v-for="(item, index) in screenscreening"
           @click="details(item.id)">
        <div class="listbox_lef">
          <div class="cent_left">
            <div class="list_img">
              <img :src="item.images
                        "
                   alt="">
            </div>
            <div class="list_oper">
              <p class="oper_room">
                <span>{{item.name}}</span>
              </p>
              <p class="content">{{item.credit}}</p>
              <p class="every_pro">
                <span class="data_pro">
                  <span class="data_mon">￥{{item.price}}</span>/日</span>
              </p>
              <p class="cli_app" v-if="item.is_play == 2">
                <span class="cli_ment">点击购买</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- 点击加载更多 -->
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
    <!-- <div class="dsad" @click="toQian">去签协议</div> -->

    <!-- 暂无数据 -->
    <div class="nodata"
         v-if="showNodata">
      暂无数据
    </div>
  </div>
</template>
<script>
import { Spinner, Toast, Indicator } from "mint-ui";
import search from "../../components/search.vue";
export default {
  data() {
    return {
      screenscreening: [], //视频筛选
      pages: 1,
      keyword: "",
      showLoad: true,
      load: true,
      count: 15,
      showLoading: true,
      topStatus: false,
      showNodata: false,
      isNodata: false,
      loading: false
    };
  },
  created() {
    Indicator.open();
    //首页banner查询
    this.getData(this.keyword, this.pages);
  },
  methods: {
    details(id) {
      this.$router.push({
        name: "train",
        query: {
          pid: id
        }
      });
    },
    toQian() {
      this.$router.push("/qian");
    },
    search(keyword) {
      if (keyword == "") {
        Toast("不能为空");
        return false;
      }
      console.log(keyword);
      this.keyword = keyword;
      this.pages = 1;
      this.screenscreening =[]
      setTimeout(() => {
        this.getData(keyword, this.pages);
      }, 1000);
    },
    //请求数据
    getData(word, pages) {
      let that = this;
      that.$axios
        .post(window.ajaxSrc + "/api/meizubao/videoSearch", {
          uid: window.localStorage.getItem("id"),
          keywords: word,
          page: pages
        })
        .then(res => {
          console.log(res);

          if (res.data.status_code == 1001) {
            console.log(11);
            this.showLoading = false;
            setTimeout(() => {
              Indicator.close();
            }, 1000);
            // if (res.data.data.length == 0) {
            //   that.load = false;
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
            if (res.data.data.length == 0) {
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
            that.screenscreening = that.screenscreening.concat(res.data.data);
          }
        })
        .catch(res => {
          console.log(res);
          console.log("查询失败");
        });
    },
    loadMore() {
      this.pages++;
      // 搜索的加载更多，搜索没有产品的id
      if (this.code != 1) {
        this.getData(this.keyword, this.pages);
      } else {
        this.getData("", this.pages);
      }
    }
  },
  components: {
    search
  }
};
</script>
<style scoped>
.topSearch {
  position: fixed;
  width: 100%;
  top: 0;
  height: 1.2rem;
  background: #fff;
  z-index: 2;
}
.containers {
  width: 100%;
  /* height: calc(100% - 0.81rem); */
  background: #fff;
}

.list_box {
  width: 100%;
  height: calc(100% - 1.2rem);
  overflow: auto;
  margin-top: 1rem;
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
/* .list_img {
  height: 2rem;
}
.
.list_img img {
  width: 100%;
  height: 100%;
} */
.list_img {
  width: 100%;
  height: auto;
}
.list_img img {
  width: 100%;
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
/* .week_mon {
  font-size: 12px;
  color: #000;
  letter-spacing: 0;
  line-height: 20px;
} */
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
  width: 47%;
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
.nodata {
   width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #00a5ff;
  font-size: 14px;
  position: absolute;
  top: 0;
}
.loadMore {
  width: 96%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #00A5FF;
  font-size: 16px;
}
.searchs {
  font-size: 14px;
}
</style>
