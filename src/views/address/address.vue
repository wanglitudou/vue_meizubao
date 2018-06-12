<template>
  <div class="addressContainer">
    <div class="list_cont">

      <div class="list_one"
           v-for="item in list"
           :key="item.index">
        <p class="goods">
          <span class="consignee">收货人:
            <span class="consig_name">
              {{item.user_name}}
            </span>
          </span>
          <span class="consig_num">{{item.mobile}}</span>
        </p>
        <p class="consig_address">
          <span class="consig_spec">
            {{item.address}}
          </span>
        </p>
        <p class="give">
          <span class="give_address">
            <input type="radio"
                   v-model="selectedNumber"
                   :value="item.id"
                   class="give_icon" /> 设为默认地址
          </span>
          <span class="give_edit"
                @click="edittheaddress(item.id)">
            <i class="iconfont icon-yingyongchengxu-xianxing"></i>
            编辑</span>
          <span class="give_delete"
                @click="del(item.id)">
            <!-- @click="del(item.id)"> -->
            <i class="iconfont icon-yingyongchengxu-xianxing"></i>
            删除</span>
        </p>
      </div>
      <div style="clear:both;height:2rem;"></div>
    </div>
    <div class="give_good">
      <span class="give_add"
            @click="addtheaddress()">添加</span>
    </div>
  </div>
</template>
<script>
import { MessageBox, Toast } from "mint-ui";
export default {
  data() {
    return {
      list: [],
      selectedNumber: 1
      // radio2: ""
    };
  },
  watch: {
    selectedNumber: function(e) {
      console.log(e);

      this.$axios
        .post("http://mzbao.weiyingjia.org/api/meizubao/updateDefaultAddress", {
          is_default: 1,
          uid: window.localStorage.id,
          id: e
        })
        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            Toast("设置默认地址成功");
          }
        })
        .catch(() => {
          console.log("查询失败");
        });
    }
  },

  mounted() {
    this.getList();
  },
  methods: {
    del(id) {
      let that = this;
      MessageBox({
        title: "提示",
        message: "确定执行操作吗?",
        showCancelButton: true,
        callback: function(action) {
          console.log(action);
          if (action == "confirm") {
            console.log("666");
            that.$axios
              .get(
                "http://mzbao.weiyingjia.org/api/meizubao/delAddress?id=" + id,
                {}
              )
              .then(res => {
                that.getList();
              })
              .catch(() => {
                console.log("查询失败");
              });
          }
        }
      });
    },
    getList() {
      let that = this;
      that.$axios
        .get(
          "http://mzbao.weiyingjia.org/api/meizubao/addressList?uid=" +
            localStorage.id,
          {
            // id: localStorage.id,
            // consignee: that.$router.consignee,
            // telephone: that.$router.telephone,
            // address: that.$router.address
          }
        )
        .then(res => {
          console.log(res);
          that.list = res.data.data;

          for (var i = 0; i < that.list.length; i++) {
            if (that.list[i].is_default_address) {
              that.selectedNumber = that.list[i].id;
              return false;
            }
          }
        })
        .catch(() => {
          console.log("查询失败");
        });
    },
    //路由跳转,到新增地址页面
    addtheaddress() {
      this.$router.push({ name: "addtheaddress" }); //调节其他页面时的跳转(完善信息页面)
    },
    edittheaddress(id) {
      this.$router.push({
        path: "/addtheaddress",
        query: {
          type: "edit",
          id: id,
          consignee: this.consignee,
          telephone: this.telephone,
          address: this.address
        }
      });

      // this.$router.push({ name: "addtheaddress" }); //调节其他页面时的跳转(完善信息页面)
    }
  }
};
</script>
<style lang="scss">
@import '../../styles/helper.scss';
.addressContainer {
  width: 100%;
  height: auto;
  height: calc(100% - 0.88rem);
  background: #fff;
}
.list_cont {
  width: 94.7%;
  height: auto;
  /* margin: 0.2rem auto 0; */
  margin-left: 2.7%;
}
.list_one {
  width: 100%;
  height: px2rem(139px);
  background: #ffffff;
  box-shadow: 0 0 6px 0 rgba(253, 70, 137, 0.2);
  border-radius: 3px;
  margin-top: px2rem(15px);
  &:nth-child(1){
    margin-top: px2rem(10px);
  }
}
.goods {
  width: 100%;
  height: px2rem(45px);
  line-height: px2rem(45px);
  display: flex;
  justify-content: space-between;
  padding: 0 px2rem(10px);
  font-size: px2rem(14px);
  color: #333333;
  letter-spacing: 0;
}
.consig_address {
  width:100%;
  min-height: px2rem(40px);
  font-size: px2rem(14px);
  color: #333333;
  letter-spacing: 0;
  padding: 0 px2rem(10px);
  border-bottom: 1px solid #f7f7f7;
}
.give {
  width: 100%;
  height: px2rem(46px);
  line-height: px2rem(55px);
  padding: 0 px2rem(10px);
  font-size: px2rem(14px);
  color: #999999;
  letter-spacing: 0;
}
.give_address {
  font-size: px2rem(14px);
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
  width: 100%;
  height: px2rem(48px);
  line-height: px2rem(48px);
  background-image: linear-gradient(-130deg, #fd82d9 0%, #fd4689 100%);
  box-shadow: 0 0 13px 0 #eeeeee;
  // margin: 0.2rem auto 0;
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
