<template>
  <div class="homeSearch">
    <form action="javascript:return true;">
      <input @keyup.13=show()
             type="search"
             placeholder="请输入搜索内容"
             v-model="keyword"
             ref="input1">
    </form>
    <img src="../assets/icon/search_1.png"
         alt="111">
  </div>

</template>
<script>
import { Toast, Indicator } from "mint-ui";
export default {
  data() {
    return {
      keyword: ""
    };
  },
  created() {
    Indicator.open();
    setTimeout(() => {
      Indicator.close();
    }, 500);
  },
  methods: {
    show() {
      // console.log(this.keyword)
      this.$refs.input1.blur();
      //   console.log(this.keyword);
      this.$emit("search", this.keyword);
    }
  }
};
</script>

<style  lang="scss" scoped>
@import "../styles/helper.scss";
.homeSearch {
  width: 92%;
  height: px2rem(34px);
  border: 1px solid #eeeeee;
  margin-top: px2rem(6px);

  text-align: center;
  margin-left: 4%;
  background: #fff;
  border-radius: px2rem(3px);
  position: fixed;
  top: 0px;
  display: inherit;
  z-index: 8;
  background: #fff;
  border: 1px solid #eeeeee;
  border-radius: px2rem(3px);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.homeSearch form {
  width: 80%;
}
.homeSearch input {
  width: 100%;
  display: block;
  /* height: 0.88rem; */
  border: 0;
  border-radius: px2rem(2px);
  outline: none;
  padding-left: px2rem(15px);
  box-sizing: border-box;
}
.homeSearch img {
  width: px2rem(13px);
  height: px2rem(14px);
  margin-right: px2rem(14px);
}
.homeSearch input {
  font-size: px2rem(13px);

  padding-left: 15px;
  box-sizing: border-box;
}
</style>
