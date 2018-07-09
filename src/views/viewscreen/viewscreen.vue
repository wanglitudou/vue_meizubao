<template>
  <div class="container">
    <div class="list_conta">
      <div class="view_vi">
        <img src="../../assets/images/tuwen_1jpg.jpg"
             alt="">
      </div>
      <div class="view_name">
        <span>仪器名称仪器</span>
        <span class="download">

          <img src="../../assets/images/download.jpg"
               alt="">
        </span>
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
  height: 100%;
  overflow: hidden;
  background: #fff;
  /* height: calc(100% - 0.88rem); */
}
.list_conta {
  width: 7.5rem;
  height: 6rem;
  margin: 0.2rem auto 0;
  background: #ffffff;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.12);
  border-radius: 3px;
}
.view_vi {
  width: 7.1rem;
  height: 4.8rem;
  margin: 0.2rem auto 0;
}
.view_vi img {
  width: 100%;
  height: 100%;
}
.view_name {
  width: 7.5rem;
  height: 1rem;
  line-height: 1rem;
  display: flex;
  justify-content: space-between;
  padding: 0 0.4rem;
  font-size: 16px;
  color: #000;
}
.download {
  width: 0.6rem;
  height: 0.6rem;
  line-height: 0.6rem;
  margin-top: 10px;
}
.download img {
  width: 18.4px;
  height: 18.4px;
  /* margin-bottom: 0.2rem; */
}
</style>
