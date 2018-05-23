<template>
    <div class="container">
        <div class="list_cont">
            <div class="list_one">
                <p class="goods">
                    <span class="consignee">收货人:
                        <span class="consig_name">
                            王一
                        </span>
                    </span>
                    <span class="consig_num">15711174255</span>
                </p>
                <p class="consig_address">
                    <span class="consig_spec">
                        北京市 北京市 朝阳区 国粹苑a座4278聚通达科技股份有限公司
                    </span>
                </p>
                <p class="give">
                    <span class="give_address">
                        <el-checkbox v-model="checked"
                                     class="give_icon"></el-checkbox>

                        设为默认地址
                    </span>
                    <span class="give_edit">
                        <i class="iconfont icon-yingyongchengxu-xianxing"></i>
                        编辑</span>
                    <span class="give_delete">
                        <i class="iconfont icon-yingyongchengxu-xianxing"></i>
                        删除</span>
                </p>
            </div>
            <div class="list_one">
                <p class="goods">
                    <span class="consignee">收货人:
                        <span class="consig_name">
                            王一
                        </span>
                    </span>
                    <span class="consig_num">15711174255</span>
                </p>
                <p class="consig_address">
                    <span class="consig_spec">
                        北京市 北京市 朝阳区 国粹苑a座4278聚通达科技股份有限公司
                    </span>
                </p>
                <p class="give">
                    <span class="give_address">
                        <el-checkbox v-model="checked"
                                     class="give_icon"></el-checkbox>

                        设为默认地址
                    </span>
                    <span class="give_edit">
                        <i class="iconfont icon-yingyongchengxu-xianxing"></i>
                        编辑</span>
                    <span class="give_delete">
                        <i class="iconfont icon-yingyongchengxu-xianxing"></i>
                        删除</span>
                </p>
            </div>
            <div class="list_one">
                <p class="goods">
                    <span class="consignee">收货人:
                        <span class="consig_name">
                            王一
                        </span>
                    </span>
                    <span class="consig_num">15711174255</span>
                </p>
                <p class="consig_address">
                    <span class="consig_spec">
                        北京市 北京市 朝阳区 国粹苑a座4278聚通达科技股份有限公司
                    </span>
                </p>
                <p class="give">
                    <span class="give_address">
                        <el-checkbox v-model="checked"
                                     class="give_icon"></el-checkbox>

                        设为默认地址
                    </span>
                    <span class="give_edit">
                        <i class="iconfont icon-yingyongchengxu-xianxing"></i>
                        编辑</span>
                    <span class="give_delete">
                        <i class="iconfont icon-yingyongchengxu-xianxing"></i>
                        删除</span>
                </p>
            </div>
        </div>
        <div class="give_good">
            <span class="give_add">添加</span>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      checked: true
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
.list_cont {
  width: 7.1rem;
  height: auto;
  margin: 0.2rem auto 0;
}
.list_one {
  width: 7.1rem;
  height: 2.78rem;
  background: #ffffff;
  box-shadow: 0 0 6px 0 rgba(253, 70, 137, 0.2);
  border-radius: 3px;
  margin: 0.2rem auto 0;
}
.goods {
  width: 7.1rem;
  height: 1rem;
  line-height: 1rem;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
}
.consig_address {
  width: 7.1rem;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
  padding: 0 0.1rem;
  border-bottom: 1px solid #f7f7f7;
}
.give {
  width: 7.1rem;
  height: 1rem;
  line-height: 1rem;
  padding: 0 10px;
  font-size: 14px;
  color: #999999;
  letter-spacing: 0;
}
.give_address {
  font-size: 14px;
  color: #fd4689;
  letter-spacing: 0;
  float: left;
}
.give_edit {
  float: right;
}
.give_delete {
  float: right;
  margin-right: 40px;
}
.give_icon {
  color: #fd4689;
}
.give_good {
  width: 7.1rem;
  height: 1rem;
  line-height: 1rem;
  background-image: linear-gradient(-130deg, #fd4689 0%, #fd82d9 100%);
  box-shadow: 0 0 13px 0 #eeeeee;
  margin: 0.2rem auto 0;
  text-align: center;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
}
.give_add {
  font-size: 16px;
  color: #ffffff;
  letter-spacing: 0;
}
</style>
