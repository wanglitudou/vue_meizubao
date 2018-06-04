<template>
  <div class="container">
      <div class="top-wrapper">
        <video id="video"
               autoplay
               poster="../../assets/images/icon7.jpg"
               v-if="$route.query.type=='video'"
               controls
               width="320"
               height="240"
        >
          <source :src="$route.query.images" type="video/mp4">
          您的浏览器不支持 video 标签。
        </video>


        <img :src="$route.query.images" alt="" v-if="$route.query.type=='image'">
      </div>
      <div class="bottom-wrapper">
        <div class="des-wrapper">
          <span class="text">{{$route.query.name}}</span>
          <img class="right-button" src="../../assets/images/download.jpg" alt="" @click="down($route.query.images)">
        </div>
      </div>

  </div>
</template>
<script>



  import {MessageBox} from "mint-ui";
  export default {
    methods:{
      down(url) {
        console.log(url);
        MessageBox("请复制此链接去下载", url);
      },
    }
  }

</script>

<style scoped>


  #video{
    width:100%;

  }
  .container{

  }
  .top-wrapper{
    width:100%;
  }
  .top-wrapper img{
    width:100%;
  }
  .des-wrapper{
    padding-left:12px;
    padding-right:12px;
    margin-top: 12px;
  }
  .text{
    font-size:16px;
    line-height:24px;
  }
  .right-button{
    height:24px;
    float:right;
  }

</style>
