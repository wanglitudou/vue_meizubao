<template>
  <div class="container">
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
            <el-radio v-model="checked"
                      class="give_icon"></el-radio>

            设为默认地址
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
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      checked: true,
      list: [],
      consignee: "",
      telephone: "",
      address: ""
    };
  },
  created() {
    this.getAdd();
    console.log("111");
    let that = this;
    that.$axios
      .get(
        "http://mzbao.weiyingjia.org/api/meizubao/addressInfo?id=" +
          localStorage.id
      )
      .then(res => {
        console.log(res);
        if (res.data.status_code == 1001) {
          console.log(res.data.data);
          console.log("666");
          that.consignee = res.data.data.user_name;
          that.telephone = res.data.data.mobile;
          that.address = res.data.data.address;
          console.log(that.consignee);
          console.log(that.telephone);
          console.log(that.address);
        }
      })
      .catch(() => {
        console.log("查询失败");
      });
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
                that.getAdd();
              })
              .catch(() => {
                console.log("查询失败");
              });
          }
        }
      });
    },
    getAdd() {
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
  min-height: 0.8rem;
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
  height: 0.8rem;
  line-height: 0.8rem;
  background-image: linear-gradient(-130deg, #fd82d9 0%, #fd4689 100%);
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
