<template>
  <div class="container">
    <div class="bg_cent">
      <!-- <img src="../../assets/images/bg.jpg" alt=""> -->
      <div class="con_cent">
        <div class="cen_left">
          <img src="../../assets/images/bg.jpg"
               alt="">
        </div>
        <div class="cen_right">
          <p class="title_head">
            <span class="title">后台管理系统</span>
          </p>
          <p>
            <el-input class="ple_con"
                      placeholder="请输入内容"
                      prefix-icon="el-icon-search"
                      v-model="input21">
            </el-input>
          </p>
          <p>
            <el-input class="ple_cons"
                      placeholder="请输入内容"
                      prefix-icon="el-icon-search"
                      v-model="input21">
            </el-input>
          </p>
          <p class="login_cen">
            <span class="login_con">
              登录
            </span>
          </p>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      input21: ""
    };
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
.bg_cent {
  width: 100%;
  height: 1000px;
  margin: 10px auto 0;
  background: #dec;
  position: relative;
}
.con_cent {
  width: 50%;
  height: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  background: #fff;
  display: flex;
  justify-content: space-between;
}
.cen_left {
  width: 50%;
  height: 100%;
}
.cen_right {
  width: 50%;
  height: 100%;
}
.cen_left img {
  width: 100%;
  height: 100%;
}
.title_head {
  width: 100%;
  height: 10px;
  text-align: center;

  margin-top: 20px;
}
.title {
  width: 32px;
  font-size: 16px;
  margin: 0 auto;
  margin-top: 50px;
}
.ple_con {
  margin-top: 60px;
  width: 60%;
  margin-left: 100px;
}
.ple_cons {
  margin-top: 30px;
  width: 60%;
  margin-left: 100px;
}
.login_cen {
  width: 60%;
  height: 40px;
  line-height: 40px;

  border: 1px solid #ccc;
  margin-left: 100px;
  margin-top: 20px;
  text-align: center;
  background: #3d95a9;
  border-radius: 3px;
}
.login_con {
  font-size: 16px;
  color: #fff;
  display: inherit;
}
</style>
