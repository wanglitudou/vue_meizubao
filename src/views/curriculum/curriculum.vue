<template>
    <div class="container">
        <div class="course">
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
        </div>
    </div>
</template>
<script>
export default {};
</script>
<style scoped>
.container {
  width: 100%;
  height: auto;
  height: calc(100% - 0.88rem);
  background: #fff;
}
.course {
  width: 7.3rem;
  margin: 0.2rem auto 0;
}
.searchs {
  border: 1px solid #ccc;
  margin-top: -10px;
}
.list_search {
  width: 96%;
  height: 0.68rem;
  border: 1px solid #fff;
  text-align: center;
  margin-left: 2%;
  background: #fff;
  border-radius: 0.2rem;
}
.searchs input {
  width: 6rem;
  height: 0.68rem;
  border: 0;
  border-radius: 10px;
  outline: none;
  padding-left: 1rem;
  box-sizing: border-box;
  float: left;
  margin-left: 0.1rem;
}
.searchs img {
  width: 0.5rem;
  height: 0.5rem;
  margin-top: 0.3rem;
}
.list_cou {
  width: 7.068rem;
  height: auto;
  margin: 0.2rem auto 0;
  margin-top: 10px;
}
.cou_one {
  width: 7.068rem;
  height: 2.4rem;
  background: #ffffff;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
.cou_lef {
  width: 2.554rem;
  height: 96px;
  margin-top: 10px;
}
.cou_lef img {
  width: 100%;
  height: 100%;
}
.cou_rig {
  width: 4rem;
  height: 96px;
  margin-top: 10px;
}
.cou_name {
  font-size: 16px;
  color: #000000;
  letter-spacing: 0;
  padding: 0.05rem;
}
.cou_cent {
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
  padding: 0.02rem;
}
</style>
  