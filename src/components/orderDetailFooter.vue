<template>    
    <div class="order_foot">
      <div class="total_foot">
        <div class="total_lef" v-if="during >0">
          <span class="add">合计：</span>
          <span class="tinct">¥{{renprice}}</span>
        </div>
         <div class="total_lef" v-else>
          <span class="add">合计：</span>
          <span class="tinct">¥{{detail.total_price}}</span>
        </div>
        <template v-if="detail.status == 1">
          <div class="total_rig" @click="nextFun">
            <span>立即付款</span>
          </div>
        </template>
        <template v-if="detail.status == 4">
          <div class="total_rig" @click="confirm(detail.uid,detail.type)" v-if="detail.type != 5">
            <span>确认收货</span>
          </div>
        </template>
        <template v-if="detail.status == 6">
          <div class="total_rig" @click="back(detail.uid)">
            <span v-if="detail.type != 2">退还</span>
            <span v-else>完成服务</span>
          </div>
          <div class="total_rig" @click="renewal(detail)">
            <span>续约</span>
          </div>
        </template>

      </div>
    </div>
</template>

<script>
export default {
  name: "orderFooter",
  props: ["count", "nextFun", "detail", "confirm", "back", "renewal",'during','renprice'],
  mounted() {
    this.countNum = this.toThousands(this.count);
  },
  computed: {
    finalCount: function() {
      return (this.countNum = this.toThousands(this.count));
    }
  },
  data() {
    return {
      countNum: ""
    };
  },
  methods: {
    toThousands(num) {
      var num = (num || 0).toString(),
        result = "";
      while (num.length > 3) {
        result = "," + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
      }
      if (num) {
        result = num + result;
      }
      return result;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.order_foot {
  width: 100%;
  margin-top: 20px;
  background: #fff;
  /*box-shadow: 0 2px 9px 0 #eeeeee;*/
  margin: 0.2rem auto 0;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
}
.total_foot {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  box-shadow: 0 1px 9px 0 #eeeeee;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  margin: 0.2rem auto 0;
}

.total_lef {
  width: 70%;
  height: 1rem;
  line-height: 1rem;
  line-height: 1rem;
}
.add {
  margin-left: 10px;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
}
.tinct {
  font-size: 17px;
  color: rgba(253, 70, 137, 0.9);
  letter-spacing: 0;
  line-height: 20px;
  font-weight: 300;
}
.total_rig {
  width: 40%;
  text-align: center;
  font-size: 15px;
  color: #ffffff;
  letter-spacing: 0;
  background-image: linear-gradient(-130deg, #fd4689 0%, #fd82d9 100%);
  box-shadow: 0 1px 4px 0 rgba(253, 70, 137, 0.58);
  font-weight: 300;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
</style>
