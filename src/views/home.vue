<template>
  <div class="container">

    <div class="banner">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <!-- <img src="" alt=""> -->
            <img src=""
                 alt=""
                 v-for="(item,index) in url "
                 :src="item.images"
                 name="pic"
                 :key="item.index"
                 @click="updataImg(item.href)">
          </div>
        </div>
      </div>
    </div>
    <div class="list_search">
      <div class="searchs">
        <input type="text"
               placeholder="请输入搜索内容">
        <img src="../assets/icon/search_1.png"
             alt="111"
             @click="pageindustry()">
      </div>
    </div>
    <div ref="scroll"
         class="scrolls">
      <div class="list_ban">
        <div class=" hotrent">
          <span>热租仪器</span>
        </div>
        <div class="hotrents">
          <div></div>
        </div>
        <div class="hotimg">
          <div class="hotimg_lef"
               v-for="item in rentinginstrument"
               :key="item.index">
            <img :src="item.images"
                 alt=""
                 @click="details()">
          </div>
        </div>
        <div class="hotcent">
          <span>热租仪器</span>
          <span>热租仪器</span>
        </div>
        <div class="hot_cent"
             @click="detail()">
          <span>查看更多></span>
        </div>
      </div>
      <div class="list_ban">
        <div class=" hotrent">
          <span>美业菁英</span>
        </div>
        <div class=" hotrents">
          <div></div>
        </div>
        <div class="hotimg">
          <div class="hotimg_lef"
               v-for="item in beautyindustry"
               :key="item.index">
            <img :src="item.images"
                 alt=""
                 @click="essence()">
          </div>
        </div>
        <div class="hotcent">
          <span>热租仪器</span>
          <span>热租仪器</span>
        </div>
        <div class="hot_cent"
             @click="looksee()">
          <span>查看更多></span>
        </div>
      </div>
      <div class="list_ban">
        <div class=" hotrent">
          <span>配套产品</span>
        </div>
        <div class=" hotrents">
          <div></div>
        </div>
        <div class="hotimg">
          <div class="hotimg_lef"
               v-for="item in accessoryproducts"
               :key="item.index">
            <img :src="item.images"
                 alt=""
                 @click="matching()">
          </div>
        </div>
        <div class="hotcent">
          <span>热租仪器</span>
          <span>热租仪器</span>
        </div>
        <div class="hot_cent"
             @click="seemore()">
          <span>查看更多></span>
        </div>
      </div>
      <div class="list_ban">
        <div class=" hotrent">
          <span>培训视频</span>
        </div>
        <div class=" hotrents">
          <div></div>
        </div>
        <div class="hotimg">
          <div class="hotimg_lef"
               v-for="item in visualscreen"
               :key="item.index">
            <img :src="item.images"
                 alt=""
                 @click="train()">
          </div>
        </div>
        <div class="hotcent">
          <span>热租仪器</span>
          <span>热租仪器</span>
        </div>
        <div class="hot_cent"
             @click="clickpay()">
          <span>查看更多></span>
        </div>
      </div>
      <div class="list_ban">
        <div class=" hotrent">
          <span>合作项目</span>
        </div>
        <div class=" hotrents">
          <div></div>
        </div>
        <div class="hotimg">
          <div class="hotimg_lef"
               v-for="item in CooperativeProject"
               :key="item.index">
            <img :src="item.images"
                 alt=""
                 @click="cooperation()">
          </div>
        </div>
        <div class="hotcent">
          <span>热租仪器</span>
          <span>热租仪器</span>
        </div>
        <div class="hot_cent">
          <span @click="project()">查看更多>> </span>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: [], //banner
      CooperativeProject: [], //合作项目
      rentinginstrument: [], //热租仪器
      beautyindustry: [], //美业菁英
      accessoryproducts: [], //配套产品
      visualscreen: [] //首页shiping
    };
  },
  created() {
    let that = this;
    //首页banner查询
    that.$axios
      .get("http://mzbao.weiyingjia.org/api/meizubao/banners", {})
      .then(res => {
        console.log(res);
        if (res.data.status_code == 1001) {
          that.url = res.data.data;
        }
      })
      .catch(() => {
        console.log("查询失败");
      });
    //合作项目查询
    that.$axios
      .get("http://mzbao.weiyingjia.org/api/meizubao/project", {})
      .then(res => {
        console.log(res);
        if (res.data.status_code == 1001) {
          that.CooperativeProject = res.data.data;
        }
      })
      .catch(() => {
        console.log("查询失败");
      });
    //首页热租仪器
    that.$axios
      .get("http://mzbao.weiyingjia.org/api/meizubao/instrument", {})
      .then(res => {
        console.log(res);
        if (res.data.status_code == 1001) {
          that.beautyindustry = res.data.data;
        }
      })
      .catch(() => {
        console.log("查询失败");
      });
    //首页美业菁英
    that.$axios
      .get("http://mzbao.weiyingjia.org/api/meizubao/technician", {})
      .then(res => {
        console.log(res);
        if (res.data.status_code == 1001) {
          that.accessoryproducts = res.data.data;
        }
      })
      .catch(() => {
        console.log("查询失败");
      });
    //首页shipoing
    that.$axios
      .get("http://mzbao.weiyingjia.org/api/meizubao/video", {})
      .then(res => {
        console.log(res);
        if (res.data.status_code == 1001) {
          that.visualscreen = res.data.data;
        }
      })
      .catch(() => {
        console.log("查询失败");
      });
  },
  methods: {},
  components: {},
  updated: function() {},
  mounted: function() {
    var myswiper = new Swiper(".swiper-container", {
      loop: true,
      autoplay: 2000
    });
  },
  methods: {
    updataImg(url) {
      this.$router.push(url);
      console.log("111");
    },
    detail() {
      //点击图片的时候,跳转到对应的详情页面
      this.$router.push({ name: "detail" });
    },
    details() {
      //热租仪器模块,点击图片,跳转到对应的详情页面
      this.$router.push({ name: "details" });
    },
    essence() {
      //美业菁英模块,点击图片,跳转到对应的详情页面
      this.$router.push({ name: "essence" });
    },
    hotcent() {
      //热租仪器
      this.$router.push({ name: "industry" });
    },
    cooperation() {
      //合作项目,点击合作项目模块,跳转到对应的详情页面
      this.$router.push({ name: "cooperation" });
    },
    project() {
      //合作项目模块,点击查看更多的时候,跳转对应的详情页面
      this.$router.push({ name: "project" });
    },
    matching() {
      //配套产品模块,点击图片,跳转到对应详情页面
      this.$router.push({ name: "matching" });
    },
    train() {
      //培训视频模块,点击图片,跳转到对应的详情页面
      this.$router.push({ name: "train" });
    },
    looksee() {
      //在美业菁英模块当中,点击查看更多的时候,跳转对应的页面 looksee
      this.$router.push({ name: "looksee" });
    },
    seemore() {
      //配套产品模块,点击查看更多的时候,跳转到对应的页面
      this.$router.push({ name: "seemore" });
    },
    clickpay() {
      //点击培训视频当中的"查看更多" 跳转到对应的详情页面
      this.$router.push({ name: "clickpay" });
    },
    pageindustry() {
      this.$router.push({ name: "pageindustry" });
    }

    // go_to_search() {
    //   this.$router.push("/search");
    // }
  }
};
</script>
<style scoped>
.container {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.scrolls {
  width: 100%;
  height: auto;
  overflow-y: scroll;
  height: calc(100% - 3.81rem);
  margin-top: 0.4rem;
}
.banner {
  height: 3rem;
}
.banner .swiper-container {
  width: 100%;
  height: 3rem;
}
.banner .swiper-container img {
  width: 100%;
  height: auto;
}
.nav-list ul {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  background: #ffffff;
}
.nav-list ul li {
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 0.2rem;
}
.nav-list ul li span {
  display: block;
  width: 0.84rem;
  height: 0.84rem;
  border-radius: 50%;
  background: #f8c986;
  text-align: center;
  line-height: 0.84rem;
  color: #ffffff;
}
.nav-list ul li span img {
  width: 100%;
  height: 100%;
}
.list_search {
  width: 96%;
  height: 0.81rem;
  border: 1px solid #fff;
  margin-top: 0.2rem;
  text-align: center;
  margin-left: 2%;
  background: #fff;
  border-radius: 0.2rem;
}
.searchs {
  width: 96%;
  height: 0.81rem;
  border: 1px solid #ccc;
  margin-top: 0.2rem;
  text-align: center;
  margin-left: 2%;
  background: #fff;
  border-radius: 0.2rem;
}

.searchs input {
  width: 6rem;
  height: 0.8rem;
  border: 0;
  outline: none;
  padding-left: 1rem;
  box-sizing: border-box;
  float: left;
  margin-left: 0.2rem;
  border-bottom: 1px solid #ccc;
}
.searchs img {
  width: 0.5rem;
  height: 0.5rem;
  margin-top: 0.2rem;
}
.list_ban {
  width: 6.7rem;
  height: 5rem;
  margin: 0.5rem auto 0;
  background: #ffffff;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 3px;
}
.list_ban .hotrent {
  width: 100%;
  height: 1.04rem;
  line-height: 1.04rem;
  text-align: center;
  font-size: 16px;
  color: #000000;
  letter-spacing: 0;
}
.list_ban .hotrents {
  width: 100%;
  height: 5px;
  line-height: 5px;
  text-align: center;
  margin-top: -10px;
}
.list_ban .hotrents div {
  width: 0.81rem;
  height: 2px;
  background: #fd82d9;
  margin-left: 43%;
}
.hotimg {
  width: 100%;
  height: 2.4rem;
}
.hotimg .hotimg_lef {
  width: 3.2rem;
  height: 2.4rem;
  float: right;
}
.hotimg .hotimg_lef img {
  width: 3.2rem;
  height: 2.4rem;
  border-radius: 6px;
}
.hotimg .hotimg_rig {
  width: 3.2rem;
  height: 2.4rem;
  border-radius: 6px;
}
.hotimg .hotimg_rig img {
  width: 3.2rem;
  height: 2.4rem;
}
.hotcent {
  width: 100%;
  height: 0.6rem;
  line-height: 0.6rem;
  margin-top: 0.2rem;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
}
.hot_cent {
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  margin-top: 0.1rem;
  font-size: 12px;
  color: #222;
  text-align: center;
}
.hot_cent span {
  font-size: 0.34rem;
  color: #ccc;
  font-size: 12px;
}
</style>

