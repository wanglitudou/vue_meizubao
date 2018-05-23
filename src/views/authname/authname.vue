<template>
    <div class="container">
        <div class="auth_name">
            <div class="id_num">
                <p class="id_name">
                    <span>身份证号码:</span>
                    <span class="id_txt">
                        <input type="text"
                               placeholder="请输入身份证号码">
                    </span>
                </p>
            </div>
            <div class="up_data">
                <span class="updata_lef"></span>
                <span class="updata_rig"></span>
            </div>
            <div class="id_num id_number">
                <p class="id_name">
                    <span>家庭住址:</span>
                    <span class="id_txt">
                        <input type="text"
                               placeholder="请输入家庭住址">
                    </span>
                </p>
            </div>
            <div class="id_num">
                <p class="id_name">
                    <span>店院地址：</span>
                    <span class="id_txt">
                        <input type="text"
                               placeholder="请输入店院地址">
                    </span>
                </p>
            </div>
            <div class="up_data up_dataimg">
                <span class="updata_lef"></span>
                <span class="updata_rig"></span>
            </div>
            <div class="relation">
                <p class="credit">
                    <span class="sesame">关联芝麻信用</span>
                </p>
            </div>
        </div>
        <div class="next_up">
            <span class="next_nex">下一步</span>
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
  height: calc(100% - 1.5rem);
  background: #fff;
}
.auth_name {
  width: 7.068rem;
  height: 7.8rem;
  background: #ffffff;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 3px;
  margin: 0.2rem auto 0;
}

.id_num {
  width: 7.068rem;
  height: 0.88rem;
  line-height: 0.88rem;
  border-bottom: 1px solid #f7f7f7;
}
.id_name {
  margin-left: 20px;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
}
.id_txt {
  margin-left: 10px;
  font-size: 14px;
  color: #cccccc;
  letter-spacing: 0;
}
.id_txt input {
  width: 4rem;
  height: 0.88rem;
  line-height: 0.88rem;
  border: 0;
  outline: none;
  border-bottom: 1px solid #f7f7f7;
  border-right: 0;
}
.up_data {
  width: 7.068rem;
  height: 1.48rem;
  line-height: 1.48rem;
  margin-top: 0.22rem;
  display: flex;
  justify-content: space-between;
  padding: 0 50px;
}
.updata_lef {
  width: 115px;
  height: 1.48rem;
  line-height: 72px;
  background: #eeeeee;
  border-radius: 3px;
}
.updata_rig {
  width: 115px;
  height: 1.48rem;
  line-height: 72px;
  background: #eeeeee;
  border-radius: 3px;
}
.id_number {
  margin-top: 10px;
}
.up_dataimg {
  margin-top: 10px;
}
.relation {
  width: 7.068rem;
  height: 1.6rem;
  line-height: 1.6rem;
}
.credit {
  width: 7.068rem;
  height: 1.6rem;
  line-height: 1.6rem;
  text-align: center;
  font-size: 14px;
  color: #fd4689;
  letter-spacing: 0;
}
.next_up {
  margin-top: 1rem;
  text-align: center;
}
.next_nex {
  width: 120px;
  height: 36px;
  line-height: 36px;
  padding: 10px 35px;
  background: #ffffff;
  border: 1px solid #fd4689;
  border-radius: 3px;
  font-size: 14px;
  color: #fd4689;
  letter-spacing: 0;
}
</style>
