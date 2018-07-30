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
      <div class="list_pull" v-masonry transition-duration="0.3s" ref="masonry" item-selector=".item" column-width=".item" v-if="isNodata">
        <!-- <div class="list_lef"> -->
        <div class="listing item" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10"    v-masonry-tile v-for=" (item,index) of dataArr " :key="index " @click="toTrain(item.id) ">
          <div>
            <img :src="item.images " alt=" ">
          </div>
          <div class="other ">
            <p class="aa ">
              <span>{{item.name}}</span>
            </p>
            <p>{{item.content}}</p>
            <p>
              <span>
                <a>
                  <i class="iconfont icon-yingyongchengxu-xianxing "></i>{{item.price}}</a>
              </span>
            </p>
          </div>

        </div>
      </div>
      <!-- 加载更多 -->
      <div class=" loadMore " ref="load "  v-show="!queryLoading">
        <mt-spinner type="fading-circle " color="#FD4689 " v-if="topStatus"></mt-spinner>
       <span v-show="allLoaded">已全部加载</span>
      </div>
      <!-- 没有数据 -->
      <div class="noData " v-if="showNodata ">
        暂无数据
      </div>
    </div>

  </div>
</template>
<script>
import { Spinner, Toast, Indicator, InfiniteScroll } from "mint-ui";
export default {
  data() {
    return {
      page: 1,
      dataArr: [],
      // dataArrs:['1','2','3','4','5','6','1','2','3','4','5','6','1','2','3','4','5','6','1','2','3','4','5','6','1','2','3','4','5','6'],
      integral: "",
      count: 15,
      moreLoading: false,
      isNodata: true,//没有数据时候隐藏 列表页
      showNodata: false,//列表为显示全局没有数据 
      topStatus: false,//显示正在加载loading
      loading: false,//滚动加载loading  是否需要加载
      allLoaded:false,//全部加载完成后显示 数据全部加载
      queryLoading:false,//控制是否显示loading
    };
  },
  mounted() {
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
              this.queryLoading = true
            } else if (res.data.data.data.length < this.count) {
              this.topStatus = false;
              this.showNodata = false;
              // this.loading = false;
              this.allLoaded =  true
            } else {
              this.topStatus = true;
              // this.loading = true;
              this.showNodata = false;
               this.allLoaded =  false
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
       if(this.allLoaded){
          this.moreLoading = true;
          return;
        }
        if(this.queryLoading){
          return;
        }
          this.moreLoading = !this.queryLoading;

           this.page++;
      // if(this.queryLoading){

      // }
      //  this.moreLoading = true;;
      //  if(this.allLoaded){
      //     this.moreLoading = true;
      //     return;
      //   }
      //    if(this.queryLoading){
      //     return;
      //   }
      //    this.moreLoading = !this.queryLoading;
      // // console.log(111)
      // this.page++;
      this.init()
      // console.log(11)
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/helper.scss";
.integralContainer {
  width: 100%;
  // height: 100%;
  height: 100%;
  /* box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.12); */
  /* border-radius: 3px; */
  background: #fff;
  // overflow: hidden;
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

.list_pull {
  // overflow: hidden;
}

.list_pull {
  width: 100%;
  // overflow: auto;
  // margin-bottom: px2rem(50px);
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
  // position: absolute;
  // bottom: px2rem(0px);
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
