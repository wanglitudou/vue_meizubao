<template>
    <div class="container">
        <div class="bund_pay">
            <p class="pay_card">
                <span class="bund_card">绑定银行卡</span>
            </p>
            <p class="pay_wechat">
                <span class="bund_wechat">
                    绑定微信支付
                </span>
            </p>
        </div>
        <div class="next_pay">
            <span class="next_cons">下一步</span>
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
  margin-top: 0.3rem;
}
.bund_pay {
  width: 7.068rem;
  height: 3.8rem;
  background: #ffffff;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 3px;
  margin: 0.2rem auto 0;
}
.pay_card {
  width: 7.068rem;
  height: 1.9rem;
  line-height: 1.9rem;
  text-align: center;
  font-size: 14px;
  color: #00a5ff;
  letter-spacing: 0;
}
.pay_wechat {
  width: 7.068rem;
  height: 1.9rem;
  line-height: 1.9rem;
  text-align: center;
  font-size: 14px;
  color: #fd4689;
  letter-spacing: 0;
}
.next_pay {
  margin-top: 5rem;
  width: 7.068rem;
  text-align: center;
}
.next_cons {
  width: 2.4rem;
  height: 0.72rem;
  line-height: 0.72rem;
  border: 1px solid #fd4689;
  border-radius: 3px;
  font-size: 14px;
  color: #fd4689;
  letter-spacing: 0;
  padding: 10px 30px;
  /* width: 2.4rem;
    height: 0.8rem;
    line-height: 0.8rem;
    border: 1px solid #fd4689;
    padding: 0 10px;
    margin-right: 30px;
    font-size: 14px;
    color: #fd4689;
    letter-spacing: 0;
    border-radius: 5px;
    margin-top: 0.2rem; */
}
</style>

