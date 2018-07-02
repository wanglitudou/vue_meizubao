<template>
  <div class="photoContainer">
    <div class="photo_pic_view">
      <div class="nav_pic">
        <div class="nav_div"
             v-for="(item,index) in tabs"
             :key="index"
             @click="tab(index)">
          <span :class="num==index?'dora':''">{{item}}</span>
        </div>
      </div>

      <div class="pic_ture">
        <!--图片切换时展示的内容-->`
        <div v-show="num==0">
          <div class="cent_cents">
            <div class="pic_center">
              <div class="pic_name"
                   v-for="(item,index) in imageData ">
                <div class="picleft_img"
                     @click="jumpToDetails('image',item.images,item.name)">
                  <img :src="item.images"
                       alt="">
                </div>
                <p class="name_ins">
                  <span class="ins_name">{{item.name}}</span>
                  <span class="ins_img button"
                        :data-clipboard-text="item.images">
                    <img src="../../assets/images/download.jpg">
                  </span>
                </p>
              </div>
            </div>
            <div class="add_more"
                 @click="loadMoreImage">
              <span>{{imageNoMore?'已全部显示':'加载更多'}}</span>
            </div>
          </div>

        </div>
        <!--视屏切换时展示的内容-->
        <div v-show="num==1">
          <div class="cent_cents">
            <div class="pic_center">
              <!--图片切换时展示的内容 左边-->
              <div class="pic_name"
                   v-for="(item,index) in videoData">
                <div class="picleft_img"
                     @click="jumpToDetails('video',item.images,item.name)">
                  <img src="../../assets/images/icon7.jpg"
                       alt="">
                </div>
                <p class="name_ins">
                  <span class="ins_name">{{item.name}}</span>
                  <span class="ins_img">
                    <!-- @click="down(item.id,item.url)" -->
                    <!-- <a :href="item.url" download="video"> -->
                    <!-- <img src="../../assets/images/download.jpg" alt=""> -->

                    <!-- </a> -->

                    <span class="ins_img button"
                          :data-clipboard-text="item.images">
                      <img src="../../assets/images/download.jpg"
                           alt="">
                    </span>
                  </span>
                </p>
              </div>
              <!--图片切换时展示的内容 右边-->
            </div>

            <div class="add_more"
                 @click="loadMoreVideo">
              <span>{{videoNoMore?'已全部显示':'加载更多'}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="view_vie">
          666
      </div> -->

    </div>
  </div>
</template>

<script>
import ClipboardJS from "clipboard";
import { MessageBox, Toast } from "mint-ui";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      tabs: ["图片", "视频"],
      num: Number,
      imageData: [],
      videoData: [],
      imageNoMore: false,
      videoNoMore: false,
      imagePage: 1,
      videoPage: 1
    };
  },
  computed: {
    ...mapGetters(["typeCode"])
  },
  created() {
    if (this.typeCode == null) {
      this.typeCode = 0;
    } else {
      console.log("22");
    }
    console.log(this.typeCode);
    this.num = this.typeCode;
  },
  mounted() {
    this.getImage();
    this.getVideo();
    // console.log(this.num)

    // console.log(this.typeCode)
    //  var clipboard=new ClipboardJS('.right-button');
    // //  console.log(clipboard)
    // clipboard.on('success', function(e) {
    //   // console.log(e)
    //   Toast({
    //     message: '下载链接已复制到剪切板,请通过外部浏览器打开',
    //     position: 'middle',
    //     duration: 4000
    //   });
    // });

    // clipboard.on('error', function(e) {
    //   // console.log(e)
    //   Toast({
    //     message: '自动复制到剪切板失败。',
    //     position: 'middle',
    //     duration: 4000
    //   });
    // });
  },

  methods: {
    ...mapActions(["setTypeCode"]),
    bindCopy() {
      var btns = document.querySelectorAll(".button");
      console.log(btns);
      var clipboard = new ClipboardJS(btns);
      clipboard.on("success", function(e) {
        // console.log(e)
        Toast({
          message: "下载链接已复制到剪切板,请通过外部浏览器打开",
          position: "middle",
          duration: 4000
        });
      });

      clipboard.on("error", function(e) {
        // console.log(e)
        Toast({
          message: "自动复制到剪切板失败。",
          position: "middle",
          duration: 4000
        });
      });
    },

    tab(index) {
      this.num = index;

      if (index == 1) {
        this.status_code = 2;
      }
      this.setTypeCode(index);
    },

    loadMoreImage() {
      if (this.imageNoMore) {
        return false;
      } else {
        this.getImage();
      }
    },
    loadMoreVideo() {
      if (this.videoNoMore) {
        return false;
      } else {
        this.getVideo();
      }
    },

    jumpToDetails: function(type, images, name) {
      this.$router
        .push({
          //          path: '/confirm/instrument',
          name: "mediaDetails",
          query: {
            type: type,
            images: images,
            name: name
          }
        })
        .catch(err => {
          console.log("http请求错误");
          console.log(err);
        });
    },
    // down(id, url) {
    //   console.log(id);
    //   console.log(url);
    //   MessageBox("请复制此链接去下载", url);

    // },
    // 加载更多

    down() {
      console.log(111);
      download(
        "hello world",
        "http://mzbadmin.weiyingjia.org/upload/1527501986451.mp4",
        "text/plain"
      );
    },

    // 获取图片
    getImage() {
      this.$axios
        .get(window.ajaxSrc + "/api/meizubao/imagesData", {
          params: { page: this.imagePage }
        })
        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            if (res.data.data.length == 0) {
              this.videoNoMore = true;
              return false;
            }
            this.imageData = this.imageData.concat(res.data.data);
            this.imagePage++;
            console.log(res);
            this.bindCopy();
          }
        })
        .catch(() => {
          console.log("http请求错误");
          console.log(err);
        });
    },
    // 获取视频
    getVideo() {
      this.$axios
        .get(window.ajaxSrc + "/api/meizubao/videoData", {
          params: { page: this.videoPage }
        })
        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            if (res.data.data.length == 0) {
              this.videoNoMore = true;
              return false;
            }
            this.videoData = this.videoData.concat(res.data.data);
            this.videoPage++;
            console.log(res);
            this.bindCopy();
          }
        })
        .catch(() => {
          console.log("http请求错误");
          console.log(err);
        });
    }
    // down(id, url) {
    //   console.log(id);
    //   console.log(url);
    //   MessageBox("请复制此链接去下载", url);
    // },
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/helper.scss";
.dora {
  border-bottom: 2px solid #fd4689;
}
.cent_cents {
  overflow-x: hidden;
}
.photoContainer {
  width: 100%;
  height: auto;
  background: #fff;
}

/* .pic_view {
    width: 7.5rem;
    height: auto;
    margin: 0.2rem auto 0;
  } */
.cent_cents {
  width: 100%;
  // overflow-y: scroll;
  height: calc(100% - 0.88rem);
}

.nav_pic {
  width: 100%;
  height: px2rem(44px);
  line-height: px2rem(44px);
  box-shadow: 0 2px 9px 0 #eeeeee;

  display: flex;
  justify-content: center;
  // padding: 0 1.54rem;-y

  font-size: 16px;
  color: #000;
  .nav_div {
    width: 50%;
    display: flex;
    justify-content: center;
    span {
      display: block;
      width: px2rem(42px);
      height: px2rem(44px);
    }
  }
}

.pic_center {
  width: 100%;
  height: auto;
  margin: 0.2rem auto 0;
  display: flex;
  /* justify-content: space-between; */
  // padding: 0 10px;
  flex-wrap: wrap;
  /* overflow-y: scroll;
    height: calc(100% - 0.88rem); */
}

.picten_lef {
  width: 3.46rem;
}

.picten_rig {
  width: 3.46rem;
}

.pic_name {
  width: px2rem(173px);
  background: #ffffff;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  margin-top: 10px;
  
  float: left;
  // padding: 5px;
  margin-left:px2rem(10px);
}

.picleft_img {
  width: px2rem(173px);
  height: px2rem(113px);
  overflow: hidden;
}

.picleft_img img {
 width: 100%;
}

.name_ins {
  display: flex;
  width: 100%;
  height: px2rem(33.7px);
  line-height: px2rem(33.7px);
  justify-content: space-between;
  // padding: 0 2px;
  align-items: center;
  font-size: px2rem(15px);
  color: #000000;
  letter-spacing: 0;
  font-weight: 400;
}
.ins_name{
  margin-left:px2rem(10px);
}
.ins_img {
  display:block;
  vertical-align: middle;
  width: px2rem(28px);
  height: px2rem(28px);
}
.ins_img img {

  width: px2rem(14px);
  height: px2rem(14px);
}

.add_more {
  width: 7.5rem;
  height: 1.4rem;
  line-height: 1.4rem;
  margin: 0.2rem auto 0;
  text-align: center;
  font-size: 14px;
  color: #00a5ff;
}
.add_more span {
  display: block;
}
</style>
