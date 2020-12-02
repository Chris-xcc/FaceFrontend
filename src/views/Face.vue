<template>
  <div class="face">
    <div class="see">
      <video
        id="myVideo"
        muted
        loop
        poster="./1.gif"
        playsinline
        @loadedmetadata="fnRun"
      ></video>
      <canvas id="myCanvas" />
    </div>
    <div class="option">
      <div class="btn">
        <label>面板操作：</label>
        <button @click="fnOpen">启动摄像头</button>
        <button @click="fnClose">签到</button>
      </div>
    </div>
  </div>
</template>

<script>
import * as faceapi from "face-api.js";
import { post, put } from "../utils/request";
import { getCookie } from "../utils/cookie";
export default {
  name: "Face",
  data() {
    return {
      nets: "tinyFaceDetector", // 模型
      options: null, // 模型参数
      withBoxes: true, // 框or轮廓
      detectFace: "detectSingleFace", // 单or多人脸
      detection: "landmark",
      videoEl: null,
      canvasEl: null,
      timeout: 0,
      // 视频媒体参数配置
      constraints: {
        audio: false,
        video: {
          // ideal（应用最理想的）
          width: {
            min: 320,
            ideal: 800,
            max: 1920,
          },
          height: {
            min: 240,
            ideal: 500,
            max: 1080,
          },
          // frameRate受限带宽传输时，低帧率可能更适宜
          frameRate: {
            min: 15,
            ideal: 30,
            max: 60,
          },
          // 显示模式前置后置
          facingMode: "environment",
        },
      },
    };
  },
  watch: {
    nets(val) {
      this.nets = val;
      this.fnInit();
    },
    detection(val) {
      this.detection = val;
      this.videoEl.pause();
      setTimeout(() => {
        this.videoEl.play();
        setTimeout(() => this.fnRun(), 300);
      }, 300);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.fnInit();
    });
  },
  methods: {
    // 初始化模型加载
    async fnInit() {
      await faceapi.nets[this.nets].loadFromUri("/models"); // 算法模型
      await faceapi.loadFaceLandmarkModel("/models"); // 轮廓模型

      // 根据算法模型参数识别调整结果

      this.options = new faceapi.TinyFaceDetectorOptions({
        inputSize: 512, // 160 224 320 416 512 608
        scoreThreshold: 0.5, // 0.1 ~ 0.9
      });

      // 节点属性化
      this.videoEl = document.getElementById("myVideo");
      this.canvasEl = document.getElementById("myCanvas");
    },
    // 人脸面部勘探轮廓识别绘制
    async fnRunFaceLandmark() {
      console.log("RunFaceLandmark");
      if (this.videoEl.paused) return clearTimeout(this.timeout);
      // 识别绘制人脸信息
      const result = await faceapi[this.detectFace](
        this.videoEl,
        this.options
      ).withFaceLandmarks();
      if (result && !this.videoEl.paused) {
        const dims = faceapi.matchDimensions(this.canvasEl, this.videoEl, true);
        const resizeResult = faceapi.resizeResults(result, dims);
        this.withBoxes
          ? faceapi.draw.drawDetections(this.canvasEl, resizeResult)
          : faceapi.draw.drawFaceLandmarks(this.canvasEl, resizeResult);
      } else {
        this.canvasEl
          .getContext("2d")
          .clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
      }
      this.timeout = setTimeout(() => this.fnRunFaceLandmark());
    },

    // 执行检测识别类型
    fnRun() {
      if (this.detection === "landmark") {
        this.fnRunFaceLandmark();
        return;
      }
    },
    // 启动摄像头视频媒体
    fnOpen() {
      if (typeof window.stream === "object") return;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        clearTimeout(this.timeout);
        navigator.mediaDevices
          .getUserMedia(this.constraints)
          .then(this.fnSuccess)
          .catch(this.fnError);
      }, 300);
    },
    // 成功启动视频媒体流
    fnSuccess(stream) {
      window.stream = stream; // 使流对浏览器控制台可用
      this.videoEl.srcObject = stream;
      this.videoEl.play();
    },
    // 失败启动视频媒体流
    fnError(error) {
      console.log(error);
      alert("视频媒体流获取错误" + error);
    },
    // 结束摄像头视频媒体
    fnClose() {
      // this.canvasEl
      //   .getContext("2d")
      //   .clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
      this.canvasEl.getContext("2d").drawImage(this.videoEl, 0, 0, 800, 500);
      // 获取图片base64链接
      const image = this.canvasEl.toDataURL("image/jpg").split(",")[1];

      // console.log(image);
      put({
        url: `/sign_stu/${this.$store.state.signId}/`,
        data: { face: image },
        headers: { "X-CSRFToken": getCookie("csrftoken") },
      }).then((res) => {
        if(res.status === 200){
          this.$confirm(res.data, "提示", {
            confirmButtonText: "确定",
            type: "success",
          });
        }
       else if(res.status === 202){
         this.$confirm(res.data, "提示", {
           confirmButtonText: "确定",
           type: "error",
         });
       }
       else {
          this.$confirm('服务器错误', "提示", {
            confirmButtonText: "确定",
            type: "error",
          });
        }
        // console.log(res);
      });

      this.videoEl.pause();
      clearTimeout(this.timeout);
      if (typeof window.stream === "object") {
        window.stream.getTracks().forEach((track) => track.stop());
        window.stream = "";
        this.videoEl.srcObject = null;
      }
    },
  },
  beforeDestroy() {
    // this.fnClose();
  },
};
</script>
<style lang="less" scoped>
.face {
  margin: 20px auto;
}
button {
  height: 30px;
  border: 2px #42b983 solid;
  border-radius: 4px;
  background: #42b983;
  color: white;
  margin: 10px;
}
.see {
  position: relative;
  // background-color: red;
  margin: 10px auto;
  width: 800px;
  height: 500px;
  canvas {
    width: 800px;
    height: 500px;
    position: absolute;
    top: 0;
    display: block;

    // background-color: #42b983;
  }
  video {
    width: 800px;
    height: 500px;
    display: block;
    // background-color: black;
  }
}
</style>
