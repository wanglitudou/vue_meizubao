<template>
  <div class="searchs">
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
export default {
  data() {
    return {
      keyword: ""
    };
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
.searchs {
  width: px2rem(355px);
  height: px2rem(44px);
  border: 1px solid #eeeeee;
  margin-top: 6px;
  text-align: center;
  margin-left: 4%;
  background: #fff;
  border-radius: 0.2rem;
  position: fixed;
  top: 0px;
  display: inherit;
  z-index: 8;
  background: #fff;
  border: 1px solid #eeeeee;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.searchs input {
  /* width: 6rem; */
  /* height: 0.88rem; */
  border: 0;
  border-radius: 2px;
  outline: none;
  padding-left: 15px;
  box-sizing: border-box;
}
.searchs img {
  width: 23px;
  height: 24px;
  margin-right: 10px;
}
.searchs input {
  font-size: 13px;
}
</style>
