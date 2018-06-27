<template>
  <div class="homecontainer">
    <div class="slider-box">

      <div class="banner">
        <mt-swipe :auto="4000">

          <mt-swipe-item v-for="(item,index) in url"
                         :key="index">
            <a target='_blank'
               :href='item.url'>
              <img :src="item.images"
                   alt="">
            </a>
            <!-- <a href=""></a> -->
          </mt-swipe-item>
        </mt-swipe>

      </div>
      <!-- 搜索 -->
      <div class="search_contents">
        <div class="list_search"
             ref="search"
             @click="toSearch">
          <div style="margin-left:20px;">请输入搜索</div>
          <img src="../assets/icon/search_1.png"
               alt="111">
        </div>
      </div>
      <div class="list_btn">
        <!-- title -->
        <div class="hotrent">
          <span>热租仪器</span>
        </div>
        <div class="hotrents">
          <div></div>
        </div>
        <!-- 内容-->
        <div class="hotimg">
          <div class="hotimg_lef"
               v-for="item in rentinginstrument"
               :key="item.index">
            <img :src="item.images"
                 alt=""
                 @click="details(item.id)">
            <span class="item_name">{{item.name}}</span>
          </div>
        </div>
        <!-- 查看更多 -->
        <div class="hot_cent"
             @click="detail()">
          <span>查看更多></span>
        </div>
      </div>

      <!-- 美业菁英 -->
      <div class="list_btn">
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
                 @click="essence(item.id)">
            <span class="item_name">{{item.name}}</span>
          </div>
        </div>
        <div class="hot_cent"
             @click="looksee()">
          <span>查看更多></span>
        </div>
      </div>

      <div class="list_btn">
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
                 @click="matching(item.id)">
            <span class="item_name">{{item.name}}</span>

          </div>

        </div>
        <div class="hot_cent"
             @click="seemore()">
          <span>查看更多></span>
        </div>
      </div>

      <div class="list_btn">
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
                 @click="train(item.id)">
            <span class="item_name">{{item.name}}</span>

          </div>
        </div>
        <div class="hot_cent"
             @click="seemore()">
          <span>查看更多></span>
        </div>
      </div>

      <div class="list_btn worktogether">
        <div class=" hotrent">
          <span>合作项目</span>
        </div>
        <div class=" hotrents">
          <div></div>
        </div>
        <div class="hotimg">
          <div class="hotimg_lef"
               v-for="item in cooperativeProject"
               :key="item.index">
            <img :src="item.images"
                 alt=""
                 @click="cooperation(item.id)">
            <span class="item_name">{{item.name}}</span>

          </div>
        </div>
        <div class="hot_cent"
             @click="clickpay()">
          <span>查看更多></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js "></script>
<script>
import { Indicator } from "mint-ui";
import { Swipe, SwipeItem } from "mint-ui";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      url: [], //banner
      rentinginstrument: [], //热租仪器
      beautyindustry: [], //美业菁英
      accessoryproducts: [], //配套产品
      cooperativeProject: [], //合作项目 //培训视屏

      dataList: {
        appId: "",
        nonceStr: "",
        timestamp: null,
        dataUrl: "",
        signature: ""
      },
      userId: null,
      visualscreen: [], //培训视屏
      dqurl: ""
    };
  },
  computed: {
    ...mapGetters(["hasPhoneNum"])
  },
  created() {
    Indicator.open();
    setTimeout(() => {
      Indicator.close();
    }, 1000);
    let that = this;
    var str = window.location.href;
    var code = that.GetQueryString("code");
    if (!sessionStorage.aaa) {
      // console.log("666");
      if (code) {
        that.getXlogin(code); //再次调用这个方法
      } else {
        that.getXlogin(""); //获取xlogin
      }
    }
    // that.achieve(); //获取token
    that.banner(); //首页banner查询
    that.getInstrument(); // 首页热租仪器
    that.getTechnician(); //首页美业菁英
    that.getProduct(); //配套产品
    that.getVideo(); //培训视屏
    that.getProject(); //合作项目查询
    this.getUser();
  },
  mounted: function() {
    //微信分享
    this.wxshare();
    //获取userid
    this.userId = localStorage.getItem("id");
    //获取当前浏览器的地址
    this.dqurl = window.location.href;
  },
  watch: {},
  methods: {
    getUser() {
      if (localStorage.id) {
        this.$axios
          .get(window.ajaxSrc + "/api/meizubao/userInfo", {
            params: { uid: localStorage.id }
          })
          .then(res => {
            console.log(res);
            if (!res.data.data.tel) {
              this.$router.push({ path: `/phone/${1}` });
              return false;
            }
            localStorage.tel = res.data.data.tel;
          });
      }
    },
    ...mapActions(["setPhoneNum"]),
    //微信分享
    wxshare() {
      let that = this;
      that.$axios
        .get("http://mzbao.weiyingjia.org/api/meizubao/wxSign", {
          params: {
            http: location.href
          }
        })
        .then(res => {
          if (res.data.status_code == 1001) {
            console.log(res.data.data);
            that.dataList.appId = res.data.data.appId;
            that.dataList.nonceStr = res.data.data.nonceStr;
            that.dataList.timestamp = res.data.data.timestamp;
            that.dataList.dataUrl = res.data.data.dataUrl;
            that.dataList.signature = res.data.data.signature;
            wx.config({
              debug: false,
              appId: that.dataList.appId,
              timestamp: that.dataList.timestamp,
              nonceStr: that.dataList.nonceStr,
              signature: that.dataList.signature,
              jsApiList: [
                //需要使用的网页服务接口
                //									"checkJsApi", //判断当前客户端版本是否支持指定JS接口
                "onMenuShareTimeline", //分享给好友
                "onMenuShareAppMessage" //分享到朋友圈
              ]
            });
            wx.ready(function() {
              // 分享朋友圈
              wx.onMenuShareTimeline({
                title: "美租宝", // 分享标题
                desc: "秀出你的美丽", // 分享描述
                link: that.dqurl, // 分享链接
                imgUrl:
                  "http://mzbadmin.weiyingjia.org/upload/1528440075_4193.png", // 分享图标
                type: "link", // 分享类型,music、video或link，不填默认为link
                dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
                success: function(data) {
                  //							layer.msg("分享成功");
                  //										alert("1111");
                  that.$axios
                    .get("http://mzbao.weiyingjia.org/api/meizubao/addPoint", {
                      params: {
                        uid: that.userId
                      }
                    })
                    .then(res => {
                      console.log(res);
                      console.log(11111);
                    });
                },
                cancel: function() {
                  //							layer.msg("已取消分享");
                  //										alert("1111");
                }
              });
              // 分享朋友
              wx.onMenuShareAppMessage({
                title: "美租宝", // 分享标题
                desc: "秀出你的美丽", // 分享描述
                link: that.dqurl, // 分享链接
                imgUrl:
                  "http://mzbadmin.weiyingjia.org/upload/1528440075_4193.png", // 分享图标
                type: "link", // 分享类型,music、video或link，不填默认为link
                dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
                success: function(data) {
                  //							layer.msg("分享成功");
                  //										alert("1111");
                  that.$axios
                    .get("http://mzbao.weiyingjia.org/api/meizubao/addPoint", {
                      params: {
                        uid: that.userId
                      }
                    })
                    .then(res => {
                      console.log(res);
                    });
                },
                cancel: function() {
                  //							layer.msg("已取消分享");
                  //										alert("1111");
                }
              });
            });
          }
        })
        .catch(res => {
          console.log(res);
        });
    },

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
          console.log(res, "23");
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
          //						console.log(res);
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
          //						console.log(res);
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
          //						console.log(res);
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
          //						console.log(res);
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
          //						console.log(res);
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
          console.log(res);
          if (res.data.status_code == 400) {
            console.log(res.data.status_code);
            //后台的地址
            var _url = res.data.message + "?url=" + window.location.href;
            console.log(res.data.message + "?url=" + window.location.href);
            window.location.href = _url;
            var str = window.location.href;
          } else if (res.data.status_code == "1001") {
            // if (!res.data.data.tel) {
            localStorage.openid = res.data.data.openid;
            localStorage.tel = res.data.data.tel;
            localStorage.id = res.data.data.id;
            sessionStorage.token = res.data.data.token;
            localStorage.headimg = res.data.data.headimg;
            console.log(localStorage.headimg);
            sessionStorage.bbb = true;
            this.setPhoneNum(res.data.data.tel);
            if (!res.data.data.tel) {
              this.$router.push({
                path: `/phone/${1}`
              });
            }
            if (code) {
              sessionStorage.aaa = true;
            }
            // localStorage.name=res.data.data

            //判断tel是否存在,不存在跳到对应填写页面
            //that.$router.push({ name: "mine" });
            // }else{
            sessionStorage.bbb = true;
            // }
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
      this.$router.push({
        name: "detail"
      }); //点击图片的时候,跳转到对应的详情页面
    },
    details(pid) {
      this.$router.push({
        name: "details",
        query: {
          pid: pid
        }
      }); //热租仪器模块,点击图片,跳转到对应的详情页面
    },
    essence(pid) {
      this.$router.push({
        name: "essence",
        query: {
          pid: pid
        }
      }); //美业菁英模块,点击图片,跳转到对应的详情页面
    },
    hotcent() {
      this.$router.push({
        name: "industry"
      }); //热租仪器
    },
    cooperation(pid) {
      this.$router.push({
        name: "cooperation",
        query: {
          pid: pid
        }
      }); //合作项目,点击合作项目模块,跳转到对应的详情页面
    },
    project() {
      this.$router.push({
        name: "project"
      }); //合作项目模块,点击查看更多的时候,跳转对应的详情页面
    },
    matching(pid) {
      this.$router.push({
        name: "matching",
        query: {
          pid: pid
        }
      }); //配套产品模块,点击图片,跳转到对应详情页面
    },
    train(pid) {
      this.$router.push({
        name: "train",
        query: {
          pid: pid
        }
      }); //培训视频模块,点击图片,跳转到对应的详情页面
    },
    looksee() {
      this.$router.push({
        name: "looksee"
      }); //在美业菁英模块当中,点击查看更多的时候,跳转对应的页面 looksee
    },
    seemore() {
      this.$router.push({
        name: "seemore"
      }); //配套产品模块,点击查看更多的时候,跳转到对应的页面
    },
    clickpay() {
      this.$router.push({
        name: "clickpay"
      }); //点击培训视频当中的"查看更多" 跳转到对应的详情页面
    },
    toSearch() {
      this.$router.push({
        name: "search"
      });
    }
    // addtheaddress() {
    //   this.$router.push({ name: "addtheaddress" }); //调节其他页面时的跳转(完善信息页面)
    // }
    // address() {
    //   this.$router.push({ name: "address" }); //调节其他页面时的跳转(完善信息页面)
    // }
    // information() {
    //   //完善信息
    //   this.$router.push({ name: "information" });
    // },
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/helper.scss";
.homecontainer {
  height: 100%;
  overflow: auto;
  padding-bottom: 50px;
  background: #fff;
}

.scrolls {
  width: 100%;
}

.banner {
  height: px2rem(150px);
}

.banner .swiper-container {
  width: 100%;
  height: px2rem(150px);
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
  object-fit: fill;
}

.search_contents {
  width: 100%;
  height: px2rem(64px);
  box-shadow: 0 2px 9px #eee;
  display: flex;
  align-items: center;
}

.search_contents .list_search {
  width: 94.7%;
  height: px2rem(44px);
  margin-left: 2.6%;
  border-radius: 3px;
  border: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search_contents .list_search img {
  width: 23px;
  height: 24px;
  margin-right: 5.3%;
}

.search_contents .list_search div {
  font-size: 13px;
  color: #666;
}

.mint-swipe-item img {
  width: 100%;
  height: 100%;
}

.list_btn {
  // width: 94.7%;
  width: px2rem(355px);
  height: px2rem(253px);
  margin-left: 2.6%;
  box-shadow: 0 2px 9px #eee;
  margin-top: px2rem(10px);
  overflow: hidden;
  // margin-bottom: 30px;
}

.list_btn .hotrent {
  width: 100%;
  text-align: center;
  font-size: px2rem(16px);
  margin-top: px2rem(10px);
  color: #000;
  font-weight: bold;
}

.worktogether {
  // margin-bottom: px2rem(10px);
}

.hotrent span {
  width: px2rem(64px);
  height: px2rem(22px);
}

.hotrents {
  width: 100%;
  height: px2rem(2px);
  display: flex;
  justify-content: center;
  margin-top: px2rem(2px);
}

.hotrents div {
  width: px2rem(42px);
  height: px2rem(2px);
  background-image: linear-gradient(-130deg, #fd82d9 0%, #fd4689 100%);
}

.hotimg {
  width: 100%;
  height: auto;
  display: flex;
}

.hotimg_lef {
  display: flex;
  width: px2rem(160px);
  height: auto;
  flex-direction: column;
  align-items: center;
  margin-left: px2rem(10px);
  margin-top: px2rem(15px);
  &:nth-child(2) {
    margin-left: px2rem(15px);
  }
}

.hotimg_lef img {
  width: px2rem(160px);
  height: px2rem(120px);
}

.hotimg_lef .item_name {
  display: block;
  height: px2rem(20px);
  color: #666;
  margin-top: px2rem(10px);
  font-size: px2rem(14px);
}

.hot_cent {
  width: 100%;
  height: auto;
  text-align: center;
  font-size: px2rem(12px);
  color: #ccc;
  margin-top: px2rem(10px);
}
</style>