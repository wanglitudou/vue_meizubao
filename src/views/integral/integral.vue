<template>
    <div class="container">
        <div class="intege">
            <div class="intege_nav">
                <div class="intege_cent">
                    <span class="mine_intege">我的积分</span>
                    <span class="num_intege"> 10</span>
                    <span class="intege_inte">积分</span>
                </div>
            </div>
            <div class="intege_city">
                <p class="city_inte">积分商城
                </p>
            </div>
        </div>
        <div class="scrolls">
            <div class="list_cent">
                <div class="list_lef">
                    <div class="listing">
                        <div>
                            <img src="../../assets/images/icon6.jpg"
                                 alt="">
                        </div>
                        <div class="other">
                            <p>
                                <span>热租仪器</span>
                            </p>
                            <p class="meeting">十点开会覅额回复撒哈斯而后发生符合倒计时</p>
                            <p>
                                <span>
                                    <a>
                                        <i class="iconfont icon-yingyongchengxu-xianxing"></i>1500</a>
                                </span>
                            </p>
                        </div>

                    </div>
                    <div class="listing">
                        <div>
                            <img src="../../assets/images/icon1.jpg"
                                 alt="">
                        </div>
                        <div class="other">
                            <p>
                                <span>热租仪器</span>
                            </p>
                            <p class="meeting">十点开会覅额回复撒哈斯而后发生符合倒计时</p>
                            <p>
                                <span>
                                    <a>
                                        <i class="iconfont icon-yingyongchengxu-xianxing"></i>1500</a>
                                </span>
                            </p>
                        </div>

                    </div>
                    <div class="listing">
                        <div>
                            <img src="../../assets/images/icon6.jpg"
                                 alt="">
                        </div>
                        <div class="other">
                            <p>
                                <span>热租仪器</span>
                            </p>
                            <p class="meeting">十点开会覅额回复撒哈斯而后发生符合倒计时</p>
                            <p>
                                <span>
                                    <a>
                                        <i class="iconfont icon-yingyongchengxu-xianxing"></i>1500</a>
                                </span>
                            </p>
                        </div>

                    </div>

                    <div>

                    </div>
                </div>
                <div class="list_rig">
                    <div class="listing">
                        <div>
                            <img src="../../assets/images/icon1.jpg"
                                 alt="">
                        </div>
                        <div class="other">
                            <p>
                                <span>热租仪器</span>
                            </p>
                            <p class="meeting">
                                十点开会覅额回复撒哈斯而后发生符合倒计时
                            </p>
                            <p>
                                <span>
                                    <a>
                                        <i class="iconfont icon-yingyongchengxu-xianxing"></i>1500</a>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div class="listing">
                        <div>
                            <img src="../../assets/images/icon6.jpg"
                                 alt="">
                        </div>
                        <div class="other">
                            <p>
                                <span>热租仪器</span>
                            </p>
                            <p class="meeting">
                                十点开会覅额回复撒哈斯而后发生符合倒计时
                            </p>
                            <p>
                                <span>
                                    <a>
                                        <i class="iconfont icon-yingyongchengxu-xianxing"></i>1500</a>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div class="listing">
                        <div>
                            <img src="../../assets/images/icon1.jpg"
                                 alt="">
                        </div>
                        <div class="other">
                            <p>
                                <span>热租仪器</span>
                            </p>
                            <p class="meeting">
                                十点开会覅额回复撒哈斯而后发生符合倒计时
                            </p>
                            <p>
                                <span>
                                    <a>
                                        <i class="iconfont icon-yingyongchengxu-xianxing"></i>1500</a>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  mounted(){
    this.$axios
      .get(window.ajaxSrc + "/api/meizubao/productDetail", {
        params: { id: this.$route.query.pid }
      })
      .then(res => {
        console.log(res);
        if (res.data.status_code == 1001) {
          this.data = res.data.data;
        }
      })
      .catch(() => {
        console.log("http请求错误");
      });
  },



};
</script>
<style scoped>
.container {
  width: 100%;
  height: auto;
  height: calc(100% - 0.88rem);
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  background: #fff;
}
.intege {
  width: 7.068rem;
  height: auto;
  margin-top: 10px;
  margin: 0.2rem auto 0;
}
.intege_nav {
  height: 1.8rem;
  line-height: 1.8rem;
  margin: 0.2rem auto 0;
}
.intege_cent {
  width: 166px;
  height: 45px;
  line-height: 45px;
  margin: 0 auto;
  margin-top: 22.5px;
}
.mine_intege {
  font-size: 17px;
  color: #000000;
  letter-spacing: 0;
}
.num_intege {
  margin-left: 10px;
  font-size: 32px;
  color: #fd4689;
  letter-spacing: 0;
  line-height: 24px;
}
.intege_inte {
  font-size: 17px;
  color: #fd4689;
  letter-spacing: 0;
}
.intege_city {
  height: 0.6rem;
  line-height: 0.6rem;
}
.city_inte {
  font-size: 17px;
  color: #333333;
  letter-spacing: 0;
  margin: 0.2rem 0.1rem;
}
.city_intege {
  width: 7.068rem;
  height: auto;
  margin: 0.2rem auto 0;
  border: 1px solid #ccc;
}
.scrolls {
  width: 100%;
  height: auto;
  overflow-y: scroll;
  height: calc(100% - 0.68rem);
}
.list_cent {
  width: 7.12rem;
  margin: 0.2rem auto 0;
}
.list_lef {
  width: 3.46rem;
  float: right;
  border-radius: 3px;
  margin-top: -10px;
}
.list_lef .listing {
  border-radius: 3px;
  background: #fff;
  padding-bottom: 0.2rem;
  margin-top: 10px;
  background: #ffffff;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.12);
  border-radius: 3px;
}
.list_rig .listing {
  border-radius: 3px;
  background: #fff;
  padding-bottom: 0.2rem;
  margin-top: 10px;
  background: #ffffff;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.12);
  border-radius: 3px;
}
.list_lef img {
  width: 3.36rem;
  height: 3.46rem;
}
.list_rig {
  width: 3.46rem;
  /* border: 1px solid #ccc; */
  /* box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.12); */
  border-radius: 3px;
}
.list_rig img {
  width: 3.44rem;
}

.list_rig .other span {
  padding: 0.2rem;
  font-size: 15px;
  color: #000000;
  letter-spacing: 0;
}
.list_lef .other span {
  padding: 0.2rem;
  font-size: 15px;
  color: #000000;
  letter-spacing: 0;
}
.paice {
  font-size: 13px;
  color: #666666;
  letter-spacing: 0;
}
.paice {
  font-size: 13px;
  color: #666666;
  letter-spacing: 0;
}
.meeting {
  padding: 0 0.3rem;
  font-size: 13px;
  color: #999999;
  letter-spacing: 0;
}
.count {
  font-size: 14px;
  color: #00a5ff;
  letter-spacing: 0;
}
.other a {
  font-size: 14px;
  color: #ff272d;
  letter-spacing: 0;
}
/* .rent {
  font-size: 12px;
  color: #999999;
  letter-spacing: 0;
  padding: 0 0.2rem;
} */
.list_lef .other .orders {
  width: 2.4rem;
  height: 0.72rem;
  line-height: 0.72rem;
  border: 1px solid #ccc;
  margin: 0 auto;
  text-align: center;
  background-image: linear-gradient(-130deg, #fd4689 0%, #fd82d9 100%);
  box-shadow: 0 1px 4px 0 rgba(253, 70, 137, 0.58);
  border-radius: 3px;
  margin-top: 10px;
  margin-bottom: 15px;
}
.list_lef .other p .order {
  font-size: 14px;
  color: #ffffff;
  letter-spacing: 0;
}
.list_cent .list_rig .other .orders {
  width: 2.4rem;
  height: 0.72rem;
  line-height: 0.72rem;
  margin: 0 auto;
  text-align: center;
  background-image: linear-gradient(-130deg, #fd4689 0%, #fd82d9 100%);
  box-shadow: 0 1px 4px 0 rgba(253, 70, 137, 0.58);
  border-radius: 3px;
  margin-top: 10px;
  margin-bottom: 15px;
}
.list_cent .list_rig .other p .order {
  font-size: 14px;
  color: #ffffff;
  letter-spacing: 0;
}
</style>
