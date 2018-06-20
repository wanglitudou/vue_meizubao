<template>
    <div>
        <transition name="fade" @touchmove.stop.prevent>
            <div class="mask" v-show="isRellyShow" @click="hideSide"></div>
        </transition>
        <transition name="slide-fade">
            <div class="rightContent" v-show="isRellyShow">
                <div class="tabTitle">全部分类</div>
                <div class="tabItem">
                    <div :class="num == index?'active':'tabChird'" v-for="(item,index) in tabContent" :key="index" @click="tab(item.id,index)">{{item.name}}</div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
  props: ["tabContent", "tab",'isRellyShow','hideSide','num'],
  data() {
    return {
     
    };
  }
};
</script>
<style lang="scss">
@import "../styles/helper.scss";
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000000;
  z-index:2;
}
.rightContent {
  width: px2rem(280px);
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  background: #fff;
  z-index: 2;
}
.rightContent .tabItem {
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  margin-top: px2rem(6px);
}
.rightContent .tabTitle {
  font-size: px2rem(15px);
  color: #333;
  font-weight: bold;
  margin: px2rem(15px);
}
.rightContent .tabChird {
  width: auto;
  height: px2rem(28px);
  background: #f4f4f4;
  margin: px2rem(7px) px2rem(10px);
  text-align: center;
  padding: px2rem(5px);
  // padding: 
  // line-height: px2rem(28px);
  font-size: 13px;
}
.rightContent .active {
  background: #fedae7;
  color: #fd4689;
  width: auto;
  height: px2rem(28px);
  // background: #f4f4f4;
  margin: px2rem(7px) px2rem(10px);
  text-align: center;
  // line-height: px2rem(28px);
  font-size: px2rem(13px);
  padding: px2rem(5px);
  border: 1px solid #fd4689;
  border-radius: px2rem(3px);
}
.fade-enter-to,
.fade-leave-to {
  transition: opacity 0.8s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.slide-fade-enter-to, .slide-fade-leave-to{
transition: transform 0.3s;
transform:translate(0px,0px);
}
.slide-fade-enter, .slide-fade-leave-to{
  opacity: 0;
  -webkit-transform:translate(300px,0px);
  transform:translate(300px,0px);
  -webkit-transition:opacity 0.3s ease-in-out 0.3s,-webkit-transform 0.3s ease-in-out;
  transition: opacity 0.3s ease-in-out 0.3s,transform 0.3s ease-in-out;
}
</style>

