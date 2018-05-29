<template>
    <div>
        <!-- 仪器 -->
        <div class="status_top" v-if="detail.type == 1">
            <div v-if="detail.status == 1">待付款</div>
            <div v-if="detail.status == 2">待确认合同</div>
            <div v-if="detail.status == 3">待发货</div>
            <div v-if="detail.status == 4">已发货</div>
            <div v-if="detail.status == 5">待退还押金</div>
            <div v-if="detail.status == 6">租赁中</div>
            <div v-if="detail.status == 7">完成</div>
            <div v-if="detail.status == 8">取消订单</div>
        </div>
        <!-- 技师 -->
        <div class="status_top" v-if="detail.type == 2">
            <div v-if="detail.status == 1">待付款</div>
            <div v-if="detail.status == 2">待确认合同</div>
            <div v-if="detail.status == 3">技师待出发</div>
            <div v-if="detail.status == 4">技师已经出发</div>
            <div v-if="detail.status == 5">待退还押金</div>
            <div v-if="detail.status == 6">技师已到达</div>
            <div v-if="detail.status == 7">完成</div>
            <div v-if="detail.status == 8">取消订单</div>
        </div>
        <!-- 产品 -->
        <div class="status_top" v-if="detail.type == 3">
           <div v-if="detail.status == 1">待付款</div>
            <div v-if="detail.status == 2">待确认合同</div>
            <div v-if="detail.status == 3">待发货</div>
            <div v-if="detail.status == 4">已发货</div>
            <div v-if="detail.status == 5">待退还押金</div>
            <div v-if="detail.status == 6">租赁中</div>
            <div v-if="detail.status == 7">完成</div>
            <div v-if="detail.status == 8">取消订单</div>
        </div>
        <!-- 项目 -->
        <div class="status_top" v-if="detail.type == 5">
          <div v-if="detail.status == 1">待付款</div>
            <div v-if="detail.status == 2">待确认合同</div>
            <div v-if="detail.status == 3">待发货</div>
            <div v-if="detail.status == 4">已发货</div>
            <div v-if="detail.status == 5">待退还押金</div>
            <div v-if="detail.status == 6">租赁中</div>
            <div v-if="detail.status == 7">完成</div>
            <div v-if="detail.status == 8">取消订单</div>
        </div>
    </div>

</template>
<script>
export default {
  props: ["detail"]
};
</script>
<style>
.status_top {
  display: flex;
  font-size: 16px;
  justify-content: flex-end;
  padding: 10px;
  /* border: 1px solid #ccc; */
  background: #ffffff;
  box-shadow: 0 1px 4.5px 0 #eeeeee;
  color: #000;
}
</style>
