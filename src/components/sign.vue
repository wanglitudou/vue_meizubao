<template>
  <div class="container">

    <div id="canvasDiv"></div>


    <mt-button size="small" id="btn_clear" type="default">重写签名</mt-button>

    <mt-button size="small" @click="submit" type="default" id="btn_submit">上传协议</mt-button>

    <!--<img id="hiddenImg"-->
         <!--:src="src"-->
         <!--alt="">-->

    <img id="qmimg" />

  </div>
</template>
<script>
  import { Button,Toast } from 'mint-ui';

export default {
  data() {
    return {
      data: []
    };
  },

  props:["src","gid","saveAgreementId"],
  mounted() {
    this.init();
  },


  methods: {


    submit:function(){

//      try {
//        var baseCode=canvas.toDataURL("image/jpg");
//        console.log(baseCode);
//      }catch (err){
//        alert(err);
//      }



      let self= this;
      this.$axios
        .post(window.ajaxSrc + "/api/meizubao/agreement", {
          uid:window.localStorage.id,
          g_id:this.gid,
          img:canvas.toDataURL("image/jpg"),
          type:1,
        })
        .then(res => {
          console.log(res);
          if (res.data.status_code == 1001) {
            Toast('协议保存成功');
            self.saveAgreementId(res.data.data.id);
          }
        })
        .catch((err) => {
          Toast('协议保存失败');
          console.log("http请求错误");
          console.log(err);
        });
    },



    init() {
      let canvasDiv = document.getElementById("canvasDiv");
      let canvas = document.createElement("canvas");

      let screenWidth = document.documentElement.clientWidth;
      var screenHeight = document.documentElement.clientHeight;

      let canvasWidth = screenWidth;
      let canvasHeight = 400;

      var point = {};

      point.notFirst = false;

      canvas.setAttribute("width", canvasWidth);

      canvas.setAttribute("height", canvasHeight);

      canvas.setAttribute("id", "canvas");

      canvasDiv.appendChild(canvas);

      if (typeof G_vmlCanvasManager != "undefined") {
        canvas = G_vmlCanvasManager.initElement(canvas);
      }

      var context = canvas.getContext("2d");

      var img = new Image();

      img.crossOrigin = 'anonymous';
//      img.setAttribute("crossOrigin", "anonymous");
      img.src = this.src;



      let imgWidth;
      let imgHeight;

      img.onload = function() {

        imgWidth=img.width;
        imgHeight=img.height;

        canvas.setAttribute("height", imgHeight*screenWidth/imgWidth);

//        var ptrn = context.createPattern(img, "no-repeat");
//
//        context.fillStyle = ptrn;
//
//        context.fillRect(0, 0, canvas.width, canvas.height);

          context.drawImage(this,0,0,screenWidth,imgHeight*screenWidth/imgWidth);

      };

      console.log(canvas);

      canvas.addEventListener("touchstart", function(e) {
        var mouseX = e.pageX - this.offsetLeft;

        var mouseY = e.pageY - this.offsetTop;

        paint = true;

        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);

        redraw();
      });

      canvas.addEventListener("touchend", function(e) {
        paint = false;
      });

      canvas.addEventListener("touchmove", function(e) {
        if (paint) {
          addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);

          redraw();
        }
      });

      canvas.addEventListener("mousedown", function(e) {
        var mouseX = e.pageX - this.offsetLeft;

        var mouseY = e.pageY - this.offsetTop;

        paint = true;

        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);

        redraw();
      });

      canvas.addEventListener("mousemove", function(e) {
        if (paint) {
          addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);

          redraw();
        }
      });

      canvas.addEventListener("mouseup", function(e) {
        paint = false;
      });

      canvas.addEventListener("mouseleave", function(e) {
        paint = false;
      });

      var clickX = new Array();

      var clickY = new Array();

      var clickDrag = new Array();

      var paint;

//      $(document).on(
//        "touchstart touchmove touchend",
//        $.proxy(function(e) {
//          if (e.target === canvas) {
//            e.preventDefault();
//          }
//        }, this)
//      );

      function addClick(x, y, dragging) {
        clickX.push(x);

        clickY.push(y);

        clickDrag.push(dragging);
      }

      function redraw() {
        //canvas.width = canvas.width; // Clears the canvas

        context.strokeStyle = "#333333";

        context.lineJoin = "round";

        context.lineWidth = 2;

        while (clickX.length > 0) {
          point.bx = point.x;

          point.by = point.y;

          point.x = clickX.pop();

          point.y = clickY.pop();

          point.drag = clickDrag.pop();

          context.beginPath();

          if (point.drag && point.notFirst) {
            context.moveTo(point.bx, point.by);
          } else {
            point.notFirst = true;

            context.moveTo(point.x - 1, point.y);
          }

          context.lineTo(point.x, point.y);

          context.closePath();

          context.stroke();
        }
      }

      var clear = document.getElementById("btn_clear");

      var submit = document.getElementById("btn_submit");


      clear.addEventListener("click", function() {
        canvas.width = canvas.width - 0;
        context.drawImage(img,0,0,screenWidth,imgHeight*screenWidth/imgWidth);
      });

//      submit.addEventListener("click", function() {
//        var img = document.getElementById("qmimg");
//
//        try {
//          img.setAttribute("src", canvas.toDataURL("image/png"));
//        } catch (err) {
//          alert(err);
//        }
//      });

      //        this.$axios
      //          .get(window.ajaxSrc + "/api/meizubao/productDetail", {
      //            params: {'id': 6}
      //          })
      //          .then(res => {
      //            console.log(res);
      //            if (res.data.status_code == 1001) {
      //              this.data = res.data.data;
      //            }
      //          })
      //          .catch(() => {
      //            console.log("http请求错误");
      //          });
    }
  }
};
</script>
<style scoped>
.container {
  position: fixed;
  height:100%;
  width: 100%;
  background: #fff;
  overflow: hidden;
  top:0;
  left:0;
  bottom:0;
  right:0;
  z-index: 9;
}

#hiddenImg {
  height: 0;
  width: 0;
}
#canvasDiv {

}

  #btn_submit{
    position: absolute;
    top:12px;
    left:12px;
  }

  #btn_clear{
    position: absolute;
    top: 12px;
    left:100px;
  }
</style>
