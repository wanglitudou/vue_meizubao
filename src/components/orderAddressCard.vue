<template>

  <div>
    <div class="address"
         @click="jumpToAddress" v-if="type">
      <div class="left">
        <img src="../assets/icon/address.png"
             alt="">
      </div>
      <div class="center">
        <div class="top">
          <span class="color666">收货人:
            <span class="color333">{{data.user_name}}</span>
          </span>
          <span class="color333 text-right">{{data.mobile}}</span>
        </div>
        <div class="bottom">
          <span class="color666">收货地址: </span>
          <span class="color333">{{data.province}}{{data.city}}{{data.area}}{{data.address}}</span>
        </div>
      </div>
      <div class="right"
           v-if="type=='button'">
        <img src="../assets/icon/arrow.png"
             alt="">
      </div>
      <div class="right"
           v-else> </div>
    </div>
    <div class="noAddress" v-else  @click="jumpToAddress">
       <img src="../assets/images/jia.png" alt="">
    </div>
    <!-- <div class="address-line"  v-if="type=='button'"></div> -->
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
export default {
  data() {
    return {
      data:{}
    };
  },
  props: ["type", "saveAddressId", "userInfo"],
  mounted() {
    if (localStorage.siteId) {
      // alert("有值");
      this.changes();
    } else {
      // alert("无值");
      this.init();
    }
  },
  created() {
    Indicator.open();
    setTimeout(() => {
      Indicator.close();
    }, 1000);
  },
  methods: {
    init() {
      this.$axios
        .get(window.ajaxSrc + "/api/meizubao/addressList", {
          params: {
            uid: window.localStorage.id
          }
        })
        .then(res => {
          if (res.data.status_code == 1001) {
            //							this.data = res.data.data[0];

            for (var i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].is_default_address == 1) {
                this.data = res.data.data[i];
              }else{
                
              }
            }
            console.log(this.data);
            // this.userInfo(this.data)
            this.saveAddressId(this.data);
          }
        })
        .catch(err => {
          console.log("http请求错误");
          console.log(err);
        });
    },
    jumpToAddress() {
      this.$router.push({
        path: "/addresssite"
        // query: {
        //   data_data: 1
        // }
      });
      // this.$router.push({ name: "mine" });

      // alert("暂时没有address页面,有了在这改 label");
      // alert("66666");
    },
    changes() {
      console.log(11);
      this.$axios({
        method: "get",
        url: window.ajaxSrc + "/api/meizubao/addressInfo",
        params: {
          id: localStorage.siteId
        }
      }).then(res => {
        if (res.data.status_code == 1001) {
          this.data = res.data.data;
          console.log(this.data);
          this.saveAddressId(res.data.data);
        }else{
          console.log("没有地址")
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.address {
  font-size: 14px;
  display: flex;
  flex-direction: row;
  background: #ffffff;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 2px;
  padding-top: 10px;
  padding-bottom: 10px;
  justify-content: space-between;
}
.noAddress{
  height:80px;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  background: #ffffff;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 2px;
  padding-top: 10px;
  padding-bottom: 10px;
  justify-content: center;
  align-items: center;
}
.noAddress img{
  width:50px;
  height:50px;
}
.address-line {
  background-image: linear-gradient(-130deg, #fd4689 0%, #fd82d9 100%);
  border-radius: 2px;
  height: 4px;
}

.top {
  margin-bottom: 8px;
}

.left {
  display: flex;
}

.right,
.left {
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.left img {
  width: 20px;
}

.right img {
  width: 18px;
}

.color333 {
  color: #333;
}

.color666 {
  color: #666;
  font-weight: 400;
}

.text-right {
  float: right;
}
</style>