<template>
  <div class="container">
    <div class="banner">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img alt="" v-for="item in url" :src="item.images" name="pic" :key="item.index" @click="updataImg(item.href)">
          </div>
        </div>
      </div>
    </div>
    <div class="list_search">
      <!-- <div class="searchs">
        <input type="text"
               placeholder="请输入搜索内容">
        <img src="../assets/icon/search_1.png"
             alt="111"
             @click="address()">
      </div> -->
      <div style="margin-left:20px;">请输入搜索</div>
      <img src="../assets/icon/search_1.png" alt="111">

    </div>
    <div ref="scroll" class="scrolls">
      <div class="list_ban">
        <div class="hotrent">
          <span>热租仪器</span>
        </div>
        <div class="hotrents">
          <div></div>
        </div>
        <div class="hotimg">
          <div class="hotimg_lef" v-for="item in rentinginstrument" :key="item.index">
            <img :src="item.images" alt="" @click="details(item.id)">
            <span class="item_name">{{item.name}}</span>
          </div>
        </div>
        <div class="hot_cent" @click="detail()">
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
          <div class="hotimg_lef" v-for="item in beautyindustry" :key="item.index">
            <img :src="item.images" alt="" @click="essence(item.id)">
            <span class="item_name">{{item.name}}</span>
          </div>
        </div>
        <div class="hot_cent" @click="looksee()">
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
          <div class="hotimg_lef" v-for="item in accessoryproducts" :key="item.index">
            <img :src="item.images" alt="" @click="matching(item.id)">
            <span class="item_name">{{item.name}}</span>

          </div>
        </div>
        <div class="hot_cent" @click="seemore()">
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
          <div class="hotimg_lef" v-for="item in visualscreen" :key="item.index">
            <img :src="item.images" alt="" @click="train(item.id)">
            <span class="item_name">{{item.name}}</span>

          </div>
        </div>
        <div class="hot_cent" @click="clickpay()">
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
          <div class="hotimg_lef" v-for="item in cooperativeProject" :key="item.index">
            <img :src="item.images" alt="" @click="cooperation(item.id)">
            <span class="item_name">{{item.name}}</span>

          </div>
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
      rentinginstrument: [], //热租仪器
      beautyindustry: [], //美业菁英
      accessoryproducts: [], //配套产品
      cooperativeProject: [], //合作项目
      visualscreen: [] //培训视屏
    };
  },
  created() {
    let that = this;
    var str = window.location.href;
    var arr = str.split("?");
    if (arr.length > 1) {
      var code = that.GetQueryString("code"); //调用"获取地址栏参数的方法"
      console.log(code);
      that.getXlogin(code); //再次调用这个方法
    } else {
      that.getXlogin(""); //获取xlogin
    }
    that.banner(); //首页banner查询
    that.getInstrument(); // 首页热租仪器
    that.getTechnician(); //首页美业菁英
    that.getProduct(); //配套产品
    that.getVideo(); //培训视屏
    that.getProject(); //合作项目查询
  },
  mounted: function() {
    var myswiper = new Swiper(".swiper-container", {
      loop: true,
      autoplay: 2000
    });
  },
  methods: {
    //获取地址栏参数
    GetQueryString(name) {
      var reg = new RegExp("(^|&?)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURIComponent(r[2]);
      return null;
    },

    //获取banner
    banner() {
      let that = this;
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
    },
    //获取热租仪器
    getInstrument() {
      let that = this;
      that.$axios
        .get("http://mzbao.weiyingjia.org/api/meizubao/instrument", {})
        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            that.rentinginstrument = res.data.data;
          }
        })
        .catch(() => {
          console.log("查询失败");
        });
    },
    //获取美业菁英
    getTechnician() {
      let that = this;
      that.$axios
        .get("http://mzbao.weiyingjia.org/api/meizubao/technician", {})
        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            that.beautyindustry = res.data.data;
          }
        })
        .catch(() => {
          console.log("查询失败");
        });
    },
    //获取配套产品
    getProduct() {
      let that = this;
      that.$axios
        .get("http://mzbao.weiyingjia.org/api/meizubao/product", {})
        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            that.accessoryproducts = res.data.data;
          }
        })
        .catch(() => {
          console.log("查询失败");
        });
    },
    //获取培训视频
    getVideo() {
      let that = this;
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
    //获取合作项目查询
    getProject() {
      let that = this;
      that.$axios
        .get("http://mzbao.weiyingjia.org/api/meizubao/project", {})
        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            that.cooperativeProject = res.data.data;
          }
        })
        .catch(() => {
          console.log("查询失败");
        });
    },

    //获取xlogin
    getXlogin(code) {
      var str = "http://mzbao.weiyingjia.org/api/meizubao/wlogin";
      if (code) {
        str = "http://mzbao.weiyingjia.org/api/meizubao/wlogin?code=" + code;
      }
      let that = this;
      that.$axios
        .get(str, {})
        .then(res => {
          if (res.data.status_code == 400) {
            console.log(222);
            //后台的地址
            var _url = res.data.message + "?url=" + window.location.href;
            console.log(res.data.message + "?url=" + window.location.href);
            window.location.href = _url;
            var str = window.location.href;
          } else if (res.data.status_code == "1001") {
            if (!res.data.data.tel) {
              localStorage.openid = res.data.data.openid;
              localStorage.tel = res.data.data.tel;
              localStorage.id = res.data.data.id;
              localStorage.headimg = res.data.data.headimg;
              //判断tel是否存在,不存在跳到对应填写页面
              // that.$router.push({ name: "mine" });
            }
          }
          console.log(res);
        })
        .catch(() => {
          console.log("查询失败");
        });
    },
    updataImg(url) {
      this.$router.push(url); //轮播用到
    },
    detail() {
      this.$router.push({ name: "detail" }); //点击图片的时候,跳转到对应的详情页面
    },
    details(pid) {
      this.$router.push({ name: "details", query: { pid: pid } }); //热租仪器模块,点击图片,跳转到对应的详情页面
    },
    essence(pid) {
      this.$router.push({ name: "essence", query: { pid: pid } }); //美业菁英模块,点击图片,跳转到对应的详情页面
    },
    hotcent() {
      this.$router.push({ name: "industry" }); //热租仪器
    },
    cooperation(pid) {
      this.$router.push({ name: "cooperation", query: { pid: pid } }); //合作项目,点击合作项目模块,跳转到对应的详情页面
    },
    project() {
      this.$router.push({ name: "project" }); //合作项目模块,点击查看更多的时候,跳转对应的详情页面
    },
    matching(pid) {
      console.log(pid)
      this.$router.push({ name: "matching", query: { pid: pid } }); //配套产品模块,点击图片,跳转到对应详情页面
    },
    train(pid) {
      this.$router.push({ name: "train", query: { pid: pid } }); //培训视频模块,点击图片,跳转到对应的详情页面
    },
    looksee() {
      this.$router.push({ name: "looksee" }); //在美业菁英模块当中,点击查看更多的时候,跳转对应的页面 looksee
    },
    seemore() {
      this.$router.push({ name: "seemore" }); //配套产品模块,点击查看更多的时候,跳转到对应的页面
    },
    clickpay() {
      this.$router.push({ name: "clickpay" }); //点击培训视频当中的"查看更多" 跳转到对应的详情页面
    },
    // addtheaddress() {
    //   this.$router.push({ name: "addtheaddress" }); //调节其他页面时的跳转(完善信息页面)
    // }
    // address() {
    //   this.$router.push({ name: "address" }); //调节其他页面时的跳转(完善信息页面)
    // }
    // information() {
    //   //完善信息
    //   this.$router.push({ name: "information" });
    // }
  }
};
</script>
<style scoped>
.container {
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.scrolls {
  width: 100%;
  height: auto;
  /* overflow-y: scroll; */
  height: calc(100% - 3.81rem);
  /* margin-top: 0.4rem; */
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
  border: 1px solid #ccc;
  margin-top: 0.2rem;
  text-align: center;
  margin-left: 2%;
  background: #fff;
  border-radius: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.list_search img {
  display: block;
  width: 20px;
  height: 20px;
  margin-right: 10px;
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
.item_name {
  display: block;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 10px;
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
  display: flex;
  justify-content: center;
}
.hotimg .hotimg_lef {
  width: 3.2rem;
  height: 2.4rem;
  padding: 5px;
}
.hotimg .hotimg_lef img {
  display: block;
  width: 100%;
  height: 100%;
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
.hot_cent {
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  margin-top: 0.8rem;
  font-size: 12px;
  color: #222;
  text-align: center;
}
.hot_cent span {
  color: #ccc;
  font-size: 12px;
}
</style>
