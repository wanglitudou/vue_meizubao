<template>
  <div class="main">
    <div class="search_top">
      <search @search="search"></search>
    </div>

    <div class="content">
      <!-- {{filterList}} -->
      <!-- dsdsadsakdlksajdlksajd  -->
      <div class="list"
           v-for="(item,index) in filterList"
           @click="todetails(item.id,item.type)">
        <div class="img">
          <img :src="item.images"
               alt="">
        </div>
        <div class="detail">
          <div class="name">{{item.name}}</div>
          <div class="price">￥{{item.price}}</div>
        </div>
        <div class="pay">
          <span>立即下单</span>
        </div>
      </div>
      <div class='loadData'
           v-if="lists.length">
        <mt-spinner type="fading-circle"
                    color="#FD4689 "
                    v-if="topStatus"></mt-spinner>
        <span v-else>
          <span @click="loadMore"
                v-if="lists.length>limitNum">加载更多</span>
          <span v-else>数据全部加载完成</span>
        </span>
      </div>
      <div class="nodata"
           v-if="noData">
        暂无数据
      </div>
    </div>
  </div>
</template>

<script>
import { Spinner, Toast, Indicator } from "mint-ui";
import search from "../../components/search";
export default {
  data() {
    return {
      lists: [],
      list: [],
      noData: false,
      //   loadMore: false,
      topStatus: false,
      loading: false,
      count: 0,
      limitNum: 15
    };
  },
  computed: {
    filterList: function() {
      this.list = this.lists;
      //   return  this.lists.slice()
      return this.list.slice(0, this.limitNum);
    }
  },
  methods: {
    search(keyword) {
      console.log(keyword);
      this.$axios
        .get(window.ajaxSrc + "/api/meizubao/homeSearch", {
          params: { keywords: keyword }
        })
        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            if (res.data.data.length == 0) {
              this.noData = true;
            } else if (res.data.data.length < this.count) {
              this.noData = false;
              this.topStatus = false;
              this.loading = false;
            } else {
              this.noData = false;
              this.loading = true;
              this.topStatus = false;
            }
            this.lists = res.data.data;
          }
        })
        .catch(res => {});
    },
    loadMore() {
      this.topStatus = true;
      setTimeout(() => {
        this.topStatus = false;
        this.limitNum = this.limitNum + 5;
      }, 500);

      //    console.log(limitNum)
    },
    todetails(id, type) {
      //  console.log(id)

      if (type == 1) {
        // 跳转仪器
        this.$router.replace({
          name: "details",
          query: {
            pid: id
          }
        });
      } else if (type == 2) {
        this.$router.replace({
          name: "essence",
          query: {
            pid: id
          }
        });
        // 跳转技师
      } else if (type == 3) {
        //跳转产品

        this.$router.replace({
          name: "matching",
          query: {
            pid: id
          }
        });
      } else if (type == 4) {
        //跳转视频

        this.$router.replace({
          name: "train",
          query: {
            pid: id
          }
        });
      } else {
        //跳转 合作项目
        //
        this.$router.replace({
          name: "cooperation",
          query: {
            pid: id
          }
        });
      }
    }
  },
  components: {
    search
  }
};
</script>
<style  lang="scss" scoped>
@import "../../styles/helper.scss";
.main {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
}
.searchs {
  width: px2rem(335px);
  height: px2rem(44px);
  border-radius: 10px;
}
.content {
  width: 96%;
  height: 100%;
  margin-left: 2%;
  /* height: auto; */
  padding-top: 1.08rem;
}
.list {
  width: 100%;
  height: 140px;
  box-shadow: 0 2px 9px 0 #cccc;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list .img {
  width: 2.54rem;
  height: 2rem;
  margin-left: 3%;
}
.list .img img {
  width: 100%;
  height: 100%;
}
.list .detail {
  display: flex;
  flex-direction: column;
  height: auto;
  /* align-items: center; */
}
.detail .name {
  width: 100px;
  height: 40px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.detail .price {
  color: #ff272d;
  font-size:14px;
}
.pay span {
  display: block;
  width: 80px;
  height: 30px;
  /* background: #FD4689; */
  background: linear-gradient(to right, #fd4689 0%, #fd82d9 100%);
  text-align: center;
  color: #fff;
  line-height: 30px;
  margin-top: 50px;
  margin-right: 10px;
  border-radius: 0.1rem;
  font-size:14px;
}
.loadData {
  margin-top: 10px;
  width: 100%;
  text-align: center;
  line-height: 30px;
  color: #fd4689;
  font-size: 14px;
}
.nodata {
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 14px;
  color: #fd4689;
  align-items: center;
  justify-content: center;
}
.loadData {
  width: 96%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fd4689;
  font-size: 16px;
}
.search_top {
  width: 100%;
  height: 1.02rem;
  position: fixed;
  top: 0;
  background: #fff;
  z-index: 8;
}
</style>
