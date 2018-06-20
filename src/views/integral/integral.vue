<template>
  <div class="integralContainer">
    <div class="intege">
      <div class="intege_nav">
        <div class="intege_cent">
          <span class="mine_intege">我的积分</span>
          <span class="num_intege"> {{integral}}</span>
          <span class="intege_inte">积分</span>
        </div>
      </div>
      <div class="intege_city">
        <p class="city_inte">积分商城
        </p>
      </div>
    </div>

    <div class="integralScrolls">
      <div class="list_pull"
           v-masonry
           transition-duration="0.3s"
           ref="masonry"
           item-selector=".item"
           column-width=".item"
           v-if="isNodata">

        <!-- <div class="list_lef"> -->

        <div class="listing item"
             v-masonry-tile
             v-for="(item,index) of dataArr"
             :key="index"
             @click="toTrain(item.id)">
          <div>
            <img :src="item.images"
                 alt="">
          </div>
          <div class="other">
            <p class="aa">
              <span>{{item.name}}</span>
            </p>
            <p>{{item.content}}</p>
            <p>
              <span>
                <a>
                  <i class="iconfont icon-yingyongchengxu-xianxing"></i>{{item.price}}</a>
              </span>
            </p>
          </div>

        </div>
      </div>
      <!-- 加载更多 -->
      <div class=" loadMore"
           ref="load">
        <mt-spinner type="fading-circle"
                    color="#FD4689 "
                    v-if="topStatus"></mt-spinner>

        <div class="add_more"
             @click="loadMore">
          <span>{{loading?'加载更多':'数据全部加载完成'}}</span>
        </div>
      </div>
      <!-- <div class="loadMore"
             ref="load">
         

          <div class="add_more"
               @click="loadMore">
            <span>{{loading?'加载更多':'数据全部加载完成'}}</span>

          </div>
        </div> -->
      <!-- 没有数据 -->
      <div class="noData"
           v-if="showNodata">
        暂无数据
      </div>
    </div>

  </div>
</template>
<script>
import { Spinner, Toast, Indicator } from "mint-ui";
export default {
  data() {
    return {
      page: 1,
      dataArr: [],
      // dataArrs:['1','2','3','4','5','6','1','2','3','4','5','6','1','2','3','4','5','6','1','2','3','4','5','6','1','2','3','4','5','6'],
      integral: "",
      count: 15,
      isNodata: true,
      showNodata: false,
      topStatus: false,
      loading: false
    };
  },
  mounted() {
    // this.$axios
    //   .get(window.ajaxSrc + "/api/meizubao/productDetail", {
    //     params: { id: this.$route.query.pid }
    //   })
    //   .then(res => {
    //     console.log(res);
    //     if (res.data.status_code == 1001) {
    //       this.data = res.data.data;
    //     }
    //   })
    //   .catch(() => {
    //     console.log("http请求错误");
    //   });
    this.init();
  },
  methods: {
    init() {
      let that = that;
      this.$axios
        .get(window.ajaxSrc + "/api/meizubao/integralShop", {
          params: { uid: window.localStorage.id, page: this.page }
        })
        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            if (res.data.data.data.length == 0) {
              this.showNodata = true;
              this.isNodata = false;
            } else if (res.data.data.data.length < this.count) {
              this.topStatus = false;
              this.showNodata = false;
              this.loading = false;
            } else {
              this.topStatus = false;
              this.loading = true;
              this.showNodata = false;
            }

            this.integral = this.integral.concat(res.data.data.integral);
            this.dataArr = res.data.data.data;
          }
        });
    },
    toTrain(id) {
      this.$router.push({ name: "train", query: { pid: id } });
    },
    loadMore() {
      this.page++;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/helper.scss";
.integralContainer {
  width: 100%;
  // height: 100%;
  height: auto;
  /* box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.12); */
  /* border-radius: 3px; */
  background: #fff;
  overflow: hidden;
  position: relative;
}
.intege {
  width: 100%;
  height: auto;
  margin-top: 10px;
  margin: 0.2rem auto 0;
}
.intege_nav {
  height: px2rem(50px);
  line-height: px2rem(50px);
  display: flex;
  justify-content: center;
  /* margin: 0.2rem auto 0; */
}

.mine_intege {
  font-size: px2rem(17px);
  color: #000000;
  letter-spacing: 0;
}
.num_intege {
  margin-left: 10px;
  font-size: 32px;
  color: #fd4689;
  letter-spacing: 0;
  line-height: 24px;
}
.intege_inte {
  font-size: 17px;
  color: #fd4689;
  letter-spacing: 0;
}
.intege_city {
  font-size: px2rem(17px);
  margin-top: px2rem(10px);
}
.city_inte {
  font-size: 17px;
  color: #333333;
  letter-spacing: 0;
  margin: 0.2rem 0.1rem;
}

.integralScrolls {
  width: 100%;
  height: 100%;
  overflow-y: auto;

  /* height: calc(100% - 0.68rem); */
}

.list_lef {
  width: 3.46rem;
  /* float: right; */
  border-radius: 3px;
  margin-top: -10px;
}
.list_lef .listing {
  border-radius: 3px;
  background: #fff;
  padding-bottom: 0.2rem;
  margin-top: 10px;
  background: #ffffff;
  // box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.12);
  // border-radius: 3px;
}
.list_rig .listing {
  border-radius: 3px;
  background: #fff;
  padding-bottom: 0.2rem;
  margin-top: 10px;
  background: #ffffff;
  // box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.12);
  // border-radius: 3px;
}
.list_lef img {
  width: 100%;
}

// .list_rig {
//   width: 3.46rem;
//   border-radius: 3px;
// }
// .list_rig img {
//   width: 3.44rem;
// }

// .list_rig .other span {
// padding: 0.2rem;
// font-size: 15px;
// color: #000000;
// letter-spacing: 0;
// }
// .list_lef .other span {
//   padding: 0.2rem;
//   font-size: 15px;
//   color: #000000;
//   letter-spacing: 0;
// }
// .paice {
//   font-size: 13px;
//   color: #666666;
//   letter-spacing: 0;
// }
// .paice {
//   font-size: 13px;
//   color: #666666;
//   letter-spacing: 0;
// }
// .meeting {
//   padding: 0 0.3rem;
//   font-size: 13px;
//   color: #999999;
//   letter-spacing: 0;
// }
// .count {
//   font-size: 14px;
//   color: #00a5ff;
//   letter-spacing: 0;
// }
// .other a {
//   font-size: 14px;
//   color: #ff272d;
//   letter-spacing: 0;
// }
/* .rent {
  font-size: 12px;
  color: #999999;
  letter-spacing: 0;
  padding: 0 0.2rem;
} */
// .list_lef .other .orders {
//   width: 2.4rem;
//   height: 0.72rem;
//   line-height: 0.72rem;
//   border: 1px solid #ccc;
//   margin: 0 auto;
//   text-align: center;
//   background-image: linear-gradient(-130deg, #fd4689 0%, #fd82d9 100%);
//   box-shadow: 0 1px 4px 0 rgba(253, 70, 137, 0.58);
//   border-radius: 3px;
//   margin-top: 10px;
//   margin-bottom: 15px;
// }
// .list_lef .other p .order {
//   font-size: 14px;
//   color: #ffffff;
//   letter-spacing: 0;
// }
// .list_cent .list_rig .other .orders {
//   width: 2.4rem;
//   height: 0.72rem;
//   line-height: 0.72rem;
//   margin: 0 auto;
//   text-align: center;
//   background-image: linear-gradient(-130deg, #fd4689 0%, #fd82d9 100%);
//   box-shadow: 0 1px 4px 0 rgba(253, 70, 137, 0.58);
//   border-radius: 3px;
//   margin-top: 10px;
//   margin-bottom: 15px;
// }
// .list_cent .list_rig .other p .order {
//   font-size: 14px;
//   color: #ffffff;
//   letter-spacing: 0;
// }
.list_pull {
  overflow: hidden;
}

.list_pull {
  width: 100%;
  overflow: auto;
  margin-bottom: px2rem(50px);
}

.list_pull .item {
  width: 46.1%;
  height: auto;
  padding: 1%;
  /* margin:3% */
  margin-left: 2.7%;
  // border: 1px solid #ccc;
  box-shadow: 0 2px 9px 0 #eee;
  background: #fff;
  border-radius: 3px;
  margin-top: px2rem(10px);
}
.list_pull .item img {
  width: 100%;
}
.list_pull .item .other {
  width: 94%;
  margin-left: 2.4%;
}
.list_pull .item .other p {
  width: 100%;
  border: none;
  &:nth-child(1) {
    font-size: px2rem(15px);
    color: #000;
    font-weight: bold;
  }
  &:nth-child(2) {
    height: auto;
    font-size: px2rem(13px);
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-top: px2rem(6px);
  }
  &:nth-child(3) {
    font-size: px2rem(16px);
    color: #fd4689;
    margin-top: px2rem(6px);
  }
}
.noData {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loadMore {
  width: 100%;
  position: absolute;
  bottom: px2rem(0px);
  height: px2rem(40px);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  font-size: px2rem(14px);
  line-height: px2rem(40px);
  border: none;
  box-shadow: none;
  color: #00a5ff;
}
</style>
