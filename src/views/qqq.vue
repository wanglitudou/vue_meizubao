<template>
  <div class="conatinerner">
    <!-- <h1 class="page-title">Action Sheet</h1> -->
    <div class="page-actionsheet-wrapper">
      <button class="mint-button mint-button--default mint-button--large"
              @click="actionSheet">
        <label class="mint-button-text">点击上拉 action sheet</label>
      </button>

    </div>

    <mt-actionsheet :actions="data"
                    v-model="sheetVisible">
    </mt-actionsheet>

  </div>
</template>
<script>
import { Popup, picker } from "mint-ui";
import { Toast } from "mint-ui";
import { Picker } from "mint-ui";
import { Actionsheet } from "mint-ui";
import "mint-ui/lib/style.css";
export default {
  name: "conatinerner",
  data() {
    return {
      // action sheet 选项内容
      data: [
        {
          name: "拍照",
          method: this.getCamera // 调用methods中的函数
        },
        {
          name: "从相册中选择",
          method: this.getLibrary // 调用methods中的函数
        }
      ],
      // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏
      sheetVisible: false
    };
  },
  methods: {
    actionSheet: function() {
      // 打开action sheet
      this.sheetVisible = true;
    },
    getCamera: function() {
      console.log("打开照相机");
    },
    getLibrary: function() {
      console.log("打开相册");
    }
  }

  // name: "",
  // components: {},
  // props: {},
  // data() {
  //   return {};
  // },
  // computed: {},
  // created() {},
  // methods: {}
};
</script>
<style scoped>
</style>
