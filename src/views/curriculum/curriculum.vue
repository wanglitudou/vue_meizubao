<template>
    <div class="container">

        <!-- 搜索按钮 -->
        <div class="searchTop">
            <search @search="search"></search>
        </div>
        <div class="listContent" v-if="isHaveData">
            <div class="list" v-for="(item,index) in list " @click="todetail(item)">
                <div class="img">
                    <img :src="item.images" alt="">
                </div>
                <div class="textDesc">
                    <p class="name">{{item.name}}</p>
                    <p class="desc">{{item.content}}</p>
                </div>
            </div>
            <!--加载更多和暂无数据 -->

        </div>

        <!-- 暂无数据 -->
        <div class="nodata" v-else>暂无数据</div>
        <div class="loadmore" v-if="list.length">
            <div class="loading" v-if="isload">
                <mt-spinner type="fading-circle" color="#FD4689"></mt-spinner>
            </div>
            <div class="isNodata" v-else>
                <p @click="loadMore" v-if="iSmore">加载更多</p>
                <p v-else>数据已全部加载</p>
            </div>
        </div>
    </div>
</template>
<script>
import search from "../../components/search.vue";
import { Spinner, Toast, Indicator } from "mint-ui";
export default {
  data() {
    return {
      keywords: "",
      page: 1,
      list: [],
      isHaveData: true,
      count: 15,
      isload: false,
      iSmore: false
    };
  },
  created() {
    Indicator.open();
    this.init(this.keywords, this.page);
  },
  methods: {
    search(keywords) {
      if (keywords == "") {
        Toast("搜索不能为空");
        return false;
      }
      this.page = 1;
      this.list = [];
      this.keywords = keywords;
      this.init(keywords, this.page);
      //   this.code =
    },
    init(keywords, page) {
      this.$axios
        .post(window.ajaxSrc + "/api/meizubao/myVideo", {
          keywords: keywords,
          page: page,
          uid: window.localStorage.id
        })
        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            setTimeout(() => {
              Indicator.close()
            },1000)
            if (res.data.data.length == 0) {
              this.isHaveData = false;
            } else if (res.data.data.length < this.count) {
              this.isload = false;
              this.iSmore = false;
              this.isHaveData = true;
            } else {
              this.isload = false;
              this.iSmore = true;
              this.isHaveData = true;
            }
            this.list = this.list.concat(res.data.data);
          }
        })
        .catch(res => {});
    },
    todetail(item) {
      this.$router.push({
        name: "dataBase",
        query: {
          item:item
        }
      });
    },
    loadMore() {
      this.page++;
      this.isload = true;
      setTimeout(() => {
        this.isload = false;
      }, 1000);
      this.init(this.keywords, this.page);
    }
  },
  components: {
    search
  }
};
</script>
<style lang="scss">
@import '../../styles/helper.scss';
.container {
  width: 100%;
  height: 100%;
  /* height: calc(100% - 0.88rem); */
  background: #fff;
  position: relative;
}
/* new 代码 */
.searchTop {
  width: 100%;
  height: px2rem(44px);
  z-index: 4;
  position: fixed;
  background: #fff;
  top: 0;
  box-shadow: 0 2px 9px 0 #eeeeee;
}
.listContent {
  width: 96%;
  margin-left: 2%;
  padding-top: px2rem(44px);
  position: relative;
}
.list {
  width: 100%;
  height: px2rem(120px);
  margin-top: px2rem(15px);
  box-shadow: 0 px2rem(2px) px2rem(9px) 0 #eee;
  border-radius: 6px;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
}
.list .img {
  width: px2rem(122.7px);
  height: px2rem(96px);
  margin-left: px2rem(10px);
}
.list img {
  width: 100%;
  height: 100%;
  display: block;
}
.list .textDesc {
  margin-left: 8.23px;
  flex: 1;
  width: 53.1%;
}
.list .textDesc .name {
  font-size: 16px;
  color: #000;
  font-weight: bold;
  line-height: 22px;
}
.list .textDesc .desc {
  font-size: 14px;
  color: #666;
  line-height: 20px;
  height: 60px;
  width: 100%;
  margin-top: 0.7%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.nodata {
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 16px;
  color: #fd4689;
  justify-content: center;
  align-items: center;
}
.isNodata {
  font-size: 14px;
  color: #00a5ff;
  font-family: PingFangSC-Regular;
}
.loadmore {
  
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* justify-content: center; */
  /* align-items: center; */
}
</style>
  