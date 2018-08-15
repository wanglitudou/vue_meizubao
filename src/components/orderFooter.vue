<template>
  <div class="order_foot">
    <div class="total_foot">
      <div class="total_lef">
        <span class="add">合计：</span>
        <span class="tinct">¥{{finalCount}}</span>
      </div>
      <template v-if="nextFun">
        <div class="total_rig" @click="nextFun">
          <span>{{text}}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'orderFooter',
    props: ["count", "text", 'nextFun'],
    mounted(){
      this.countNum = this.toThousands(this.count)
   
    },
    computed: {
      finalCount: function () {
        return this.countNum = this.toThousands(this.count)
      }
    },
    data () {
      return {
        countNum: ''
      }
    },
    methods: {


      toThousands(num) {
        console.log(num)
        return (num+"").replace(/(\d)(?=(\d{3})+(\.|$))/g, '$1,');
//        var flag = 1;
//        if (num < 0) {
//          flag = 0;
//          num = -num;
//        }
//        var str = num.toString();
//        var n = str.slice(str.lastIndexOf('.'))
//        if (n.indexOf('.') == -1) {
//          n = "";
//        }
//        var str = parseInt(num).toString();
//        var list =
//          str.split("").reverse();
//        for (var i = 0; i < list.length; i++) {
//          if (i % 4 == 3) {
//            list.splice(i,
//              0, ",");
//          }
//        }
//        if (flag == 1) {
//          return list.reverse().join("") + n;
//        } else {
//          return "-" + list.reverse().join("") + n;
//        }
      }
    }
  }
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

