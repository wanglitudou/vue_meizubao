<template>
  <div class="container" ref="container">
    <!-- <div class="searchs_box">
      <input type="text"
             placeholder="请输入搜索内容">
      <img src="../../assets/icon/search_1.png"
           alt="111">
    </div> -->
    <div class="topSearch">
      <search @search="search"></search>
    </div>
    <!-- 瀑布流 -->

    <div v-masonry transition-duration="0.3s" ref="masonry" item-selector=".item" column-width=".item">
      <div v-masonry-tile class="item" v-for="(item, index) in cooperativeproject">
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
    </div>

    <!-- <div class="list_box">
      <div class="listbox_lef" v-for="item in cooperativeproject" :key="item.index">
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
        </div> -->
    <!-- <div class="cent_left">
          <div class="list_img">
            <img src="../../assets/images/icon2.jpg"
                 alt="">
          </div>
          <div class="list_oper">
            <p class="oper_room">
              <span>项目名称</span>
            </p>
            <p class="content">十点开会覅额回复撒哈斯而后发生符合倒计时</p>
            <p class="every_pro">
              <span class="data_pro">
                <span class="data_mon">￥1500</span>/日</span>
              <span class="pay_add">￥1500</span>
            </p>
            <p class="cli_app">
              <span class="cli_ment"
                    @click="cooperation()">点击预约</span>
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
              <span>项目名称</span>
            </p>
            <p class="content">十点开会覅额回复撒哈斯而后发生符合倒计时</p>
            <p class="every_pro">
              <span class="data_pro">
                <span class="data_mon">￥1500</span>/日</span>
              <span class="pay_add">￥1500</span>
            </p>
            <p class="cli_app">
              <span class="cli_ment"
                    @click="cooperation()">点击预约</span>
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
              <span>项目名称</span>
            </p>
            <p class="content">十点开会覅额回复撒哈斯而后发生符合倒计时</p>
            <p class="every_pro">
              <span class="data_pro">
                <span class="data_mon">￥1500</span>/日</span>
              <span class="pay_add">￥1500</span>
            </p>
            <p class="cli_app">
              <span class="cli_ment"
                    @click="cooperation()">点击预约</span>
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
              <span>项目名称</span>
            </p>
            <p class="content">十点开会覅额回复撒哈斯而后发生符合倒计时</p>
            <p class="every_pro">
              <span class="data_pro">
                <span class="data_mon">￥1500</span>/日</span>
              <span class="pay_add">￥1500</span>
            </p>
            <p class="cli_app">
              <span class="cli_ment"
                    @click="cooperation()">点击预约</span>
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
              <span>项目名称</span>
            </p>
            <p class="content">十点开会覅额回复撒哈斯而后发生符合倒计时</p>
            <p class="every_pro">
              <span class="data_pro">
                <span class="data_mon">￥1500</span>/日</span>
              <span class="pay_add">￥1500</span>
            </p>
            <p class="cli_app">
              <span class="cli_ment"
                    @click="cooperation()">点击预约</span>
            </p>
          </div>
        </div>
      </div> -->
    <!-- <div class="foot_load">
        <span>加载更多 > </span>
      </div> -->
    <div>
      <div class="Loading" v-if="showLoading">
        <mt-spinner type="fading-circle" color="#FD4689" :size="36"></mt-spinner>
      </div>
      <div class="moreData" ref="load" v-if="showLoad">
        <div v-if="load" @click="loadMore">加载更多></div>
        <div v-else>已全部加载</div>
      </div>
    </div>
  </div>
</template>
<script>
import { Spinner } from "mint-ui";
import search from "../../components/search.vue";
export default {
  data() {
    return {
      cooperativeproject: [], //合作项目
      keyword: "",
      pages: 1,
      count: 15,
      showLoad: true,
      load: true,
      code: 1, //
      showLoading: true
    };
  },
  created() {
    this.getData(this.keyword, this.pages);
  },
  methods: {
    cooperation() {
      //合作项目,点击合作项目模块,跳转到对应的详情页面
      this.$router.push({ name: "cooperation" });
    },
    search(keyword) {
      this.keyword = keyword;
      this.pages = 1;
      this.code = 2;
      this.getData(keyword, this.pages);
    },
    getData(keyword, pages) {
      console.log(keyword);
      let that = this;
      //首页banner查询
      that.$axios
        .post("http://mzbao.weiyingjia.org/api/meizubao/projectSearch", {
          keywords: keyword,
          page: pages
        })
        .then(res => {
          console.log(res);
          if (res.data.status_code == "1001") {
            that.showLoading = false;
            if (res.data.data.length == 0) {
              that.load = false;
              this.$refs.load.style = "height:100%";
              this.$refs.container.style = "height:100%";
              this.$refs.masonry.style = "position:relative";
            } else if (res.data.data.length < this.count) {
              that.load = false;
              this.$refs.load.style = "1rem";
              // this.$refs.masonry.style="position:relative"
            } else {
              that.load = true;
              this.$refs.load.style = "height:1rem";
            }

            that.cooperativeproject = that.cooperativeproject.concat(
              res.data.data
            );
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
        this.getData(this.keyword, this.pages);
      } else {
        this.getData("", this.pages);
      }
    }
    // cooperation() {
    //   //点击预约的时候,跳转到对应的详情页面
    //   this.$router({ name: "cooperation" });
    // }
  },
  components: {
    search
  }
};
</script>
<style scoped>
.container {
  width: 100%;
  height: auto;
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
  margin-top: 10px;
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
.pay_add {
  margin-right: 1.2rem;
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
  z-index:1;
}
</style>
