<template>
  <div class="container">

    <div id="canvasDiv"></div>

    <button id="fixed">固定画布</button>

    <button id="btn_clear">清除</button>

    <button id="btn_submit">提交</button>

    <img id="hiddenImg"
         src="https://sfault-image.b0.upaiyun.com/236/838/2368380853-5b06b6892b27a"
         alt="">

    <img id="qmimg" />

  </div>
</template>
<script>
export default {
  data() {
    return {
      data: []
    };
  },

  mounted() {
    this.init();
  },
  methods: {
    init() {
      var canvasDiv = document.getElementById("canvasDiv");
      var canvas = document.createElement("canvas");

      var screenWidth = document.documentElement.clientWidth;
      var screenHeight = document.documentElement.clientHeight;

      var canvasWidth = screenWidth;
      var canvasHeight = 300;

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

      img.src =
        "https://sfault-image.b0.upaiyun.com/236/838/2368380853-5b06b6892b27a";

      img.setAttribute("crossOrigin", "Anonymous");

      img.onload = function() {
        var ptrn = context.createPattern(img, "no-repeat");

        context.fillStyle = ptrn;

        context.fillRect(0, 0, canvas.width, canvas.height / 2);
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

      $(document).on(
        "touchstart touchmove touchend",
        $.proxy(function(e) {
          if (e.target === canvas) {
            e.preventDefault();
          }
        }, this)
      );

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

      var fixed = document.getElementById("fixed");

      clear.addEventListener("click", function() {
        canvas.width = canvas.width - 0;
      });

      submit.addEventListener("click", function() {
        var img = document.getElementById("qmimg");

        try {
          img.setAttribute("src", canvas.toDataURL("image/png"));
        } catch (err) {
          alert(err);
        }
      });

      fixed.addEventListener("click", function() {
        document.body.addEventListener(
          "touchstart touchmove touchend",
          function(e) {
            if (e.target === canvas) {
              e.preventDefault();
            }
          }
        );
      });

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
  width: 100%;
  background: #fff;
}

#hiddenImg {
  height: 0;
  width: 0;
}
#canvasDiv {
  border: 1px solid #ddd;
}
</style>
