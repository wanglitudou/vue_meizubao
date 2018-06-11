<template>
    <div class="container">
        <!-- <div class="course">
            <div class="list_search">
                <div class="searchs">
                    <input type="text"
                           placeholder="请输入搜索内容">
                    <img src="../../assets/icon/search_1.png"
                         alt="">
                </div>
            </div>
            <div class="list_cou">
                <div class="cou_one">
                    <div class="cou_lef">
                        <img src="../../assets/images/icon1.jpg"
                             alt="">
                    </div>

                    <div class="cou_rig">
                        <p class="cou_name">仪器名称</p>
                        <p class="cou_cent">十点开会覅额回复撒哈斯而后发生符合倒计时十点开会覅额符合倒计时十点开会覅额…</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="list_cou">
            <div class="cou_one">
                <div class="cou_lef">
                    <img src="../../assets/images/icon2.jpg"
                         alt="">
                </div>

                <div class="cou_rig">
                    <p class="cou_name">仪器名称</p>
                    <p class="cou_cent">十点开会覅额回复撒哈斯而后发生符合倒计时十点开会覅额符合倒计时十点开会覅额…</p>
                </div>
            </div>
        </div>
        <div class="list_cou">
            <div class="cou_one">
                <div class="cou_lef">
                    <img src="../../assets/images/icon3.jpg"
                         alt="">
                </div>
                <div class="cou_rig">
                    <p class="cou_name">仪器名称</p>
                    <p class="cou_cent">十点开会覅额回复撒哈斯而后发生符合倒计时十点开会覅额符合倒计时十点开会覅额…</p>
                </div>
            </div>
        </div> -->
        <!-- 搜索按钮 -->
        <div class="searchTop">
            <search @search="search"></search>
        </div>
        <div class="listContent" v-if="isHaveData">
            <div class="list" v-for="(item,index) in list " @click="todetail(item.id)" >
                <div class="img">
                    <img :src="item.images" alt="">
                </div>
                <div class="textDesc">
                    <p class="name">{{item.name}}</p>
                    <p class="desc">{{item.content}}</p>
                </div>
            </div>
            <!--加载更多和暂无数据 -->
            <div class="loadmore">
                <div class="loading">正在加载</div>  
                <div class="isNodata">
                    <p>加载更多</p>
                </div>
            </div>
        </div>
          <!-- 暂无数据 -->
        <div class="nodata" v-else>暂无数据</div>
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
      isHaveData:true,
      count:15,
    };
  },
  created() {
    this.init(this.keywords, this.page);
  },
  methods: {
    search(keywords) {
        if(keywords == ''){
            Toast('搜索不能为空')
            return false
        }
        this.init(keywords,this.page)
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
              if(res.data.data.length == 0){
                  this.isHaveData = false
              }else if(res.data.data.length<this.count){
                   
              }else{

              }
            this.list = this.list.concat(res.data.data);
          }
        })
        .catch(res => {});
    },
    todetail(id){
      
    }
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
  height: calc(100% - 0.88rem);
  background: #fff;
}
/* new 代码 */
.searchTop {
  width: 100%;
  height: 44px;
  position: fixed;
  background: #fff;
  top: 0;
  box-shadow: 0 2px 9px 0 #eeeeee;
}
.listContent {
  width: 96%;
  margin-left: 2%;
  padding-top: 44px;
  position: relative;
}
.list {
  width: 100%;
  height: 120px;
  margin-top: 15px;
  box-shadow: 0 2px 9px 0 #eee;
  border-radius: 6px;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
}
.list .img {
  width: 122.7px;
  height: 96px;
  margin-left: 10px;
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
.nodata{
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 16px;
  color: #FD4689;
  justify-content: center;
  align-items: center;
}
.isNodata{
    font-size: 14px;
    color: #00A5FF;
    font-family: PingFangSC-Regular;
}
.loadmore{
 position: absolute;
 bottom: 20px;
 width: 100%;
 justify-content: center;
 align-items: center;
}
</style>
  