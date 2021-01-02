<template>
  <div class="user">
    <div class="wrapper">
      <div class="user-info">
        <div class="username">姓名：{{ $store.state.username }}</div>
        <div class="number">学号：{{ $store.state.number }}</div>
        <div class="sex">
          <!-- 性别：{{ $store.state.userInfo.sex === "male" ? "男" : "女" }} -->
          性别：{{ this.getsex() }}
        </div>
        <div class="password">
          <el-form
            label-width="0"
            class="login-form"
            :model="PasswordForm"
            ref="PasswordForm"
            :rules="rule"
          >
            <el-form-item prop="new_password">
              <el-input
                v-model="PasswordForm.new_password"
                type="password"
                prefix-icon="el-icon-lock"
                placeholder="新密码"
              >
              </el-input>
            </el-form-item>
            <el-form-item prop="check_password">
              <el-input
                v-model="PasswordForm.check_password"
                type="password"
                prefix-icon="el-icon-lock"
                placeholder="确认密码"
              >
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="danger" class="submitBtn" @click="submit" round
                >修改密码
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!-- <div class="user-face">
      <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :on-change="getFile"
        :limit="1"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :auto-upload="false"
      >
        <img
          v-if="getFace()"
          :src="`http://localhost:8000/media/` + userImg"
          class="avatar"
        />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div class="title">人脸图片</div>
    </div> -->
    <div class="user-face" v-if="getFace()">
      <img
        v-if="getFace()"
        :src="`http://localhost:8000/media/` + userImg"
        class="avatar"
      />
    </div>
    <div class="face" v-else>
      <div class="see">
        <video id="myVideo" muted loop playsinline></video>
        <canvas id="myCanvas" />
      </div>
      <div class="option">
        <div class="btn">
          <!-- <label>面板操作：</label> -->
          <el-button type="primary" @click="fnOpen">启动摄像头</el-button>
          <el-button type="primary" @click="fnClose">关闭摄像头</el-button>
        </div>
        <div class="upload">
          <el-button class="up" type="success" @click="fnSign">上传</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, put } from "../utils/request";
import { getCookie } from "../utils/cookie";

export default {
  name: "User",
  data() {
    const validatePass = (rule, value, callback) => {
      // 确认密码
      if (value.length < 6 || value.length > 14) {
        callback(new Error("密码的长度为6-14位!"));
      }
      if (value !== this.PasswordForm.new_password) {
        // console.log(value);
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      imageUrl: "http://localhost:8000/media/",
      userImg: "",
      PasswordForm: {
        new_password: "",
        check_password: "",
      },
      rule: {
        new_password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 14,
            message: "长度在 6 到 14 个字符",
            trigger: "blur",
          },
        ],
        check_password: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 14,
            message: "长度在 6 到 14 个字符",
            trigger: "blur",
          },
          { validator: validatePass, trigger: "blur" },
        ],
      },
      actionsUrl: "/api/user/1/",
      headers: {
        "X-CSRFToken": getCookie("csrftoken"),
        allow: "PUT, OPTIONS",
      },
      valueUrl: "",
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
            ideal: 250,
            max: 1920,
          },
          height: {
            min: 240,
            ideal: 200,
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
    this.getUserImg();
    this.$nextTick(() => {
      this.fnInit();
    });
  },
  methods: {
    getsex() {
      if (this.$store.state.sex === "male") {
        return "男";
      } else if (this.$store.state.sex === "female") {
        return "女";
      } else {
        return "未设置";
      }
    },
    submit() {
      this.$refs.PasswordForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          put({
            url: "/user/1/",
            data: this.PasswordForm,
            headers: { "X-CSRFToken": getCookie("csrftoken") },
          })
            .then((response) => {
              this.loading = false;
              // console.log(response);

              this.$message({
                message: "修改密码成功！",
                type: "success",
              });
              this.$refs.PasswordForm.resetFields();
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // console.log(res);
      console.log(this.imageUrl);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      console.log(222222);
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    getFile(file, fileList) {
      let fileName = file.name;
      let regex = /(.jpg|.jpeg|.png)$/;
      // console.log(fileName);
      if (regex.test(fileName.toLowerCase())) {
        this.imageUrl = URL.createObjectURL(file.raw);
      } else {
        this.$message.error("请选择后缀名为.jpg.jpeg.png的图片");
      }

      this.getBase64(file.raw).then((res) => {
        const image = res.split(",")[1];
        put({
          url: "/user/1/",
          data: { face: image },
          headers: { "X-CSRFToken": getCookie("csrftoken") },
        })
          .then((response) => {
            // console.log(response);
            get({
              url: "/user/1/",
              headers: { "X-CSRFToken": getCookie("csrftoken") },
            })
              .then((response) => {
                console.log(response);
                window.sessionStorage.setItem("face", response.data.face);
                this.imageUrl = response.data.face;
                this.userImg = response.data.face;
                // this.getFace()
                console.log(this.imageUrl);
                // return response.data.face
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
            this.$confirm("图片不符合要求,请刷新页面重试", "提示", {
              confirmButtonText: "确定",
              type: "error",
            });
          });
      });
    },
    getBase64(file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function () {
          imgResult = reader.result;
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.onloadend = function () {
          resolve(imgResult);
        };
      });
    },
    imgPreview(file, fileList) {
      console.log(file, fileList);
      let fileName = file.name;
      let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
      if (regex.test(fileName.toLowerCase())) {
        this.formMovie.posterURL = file.url;
      } else {
        this.$message.error("请选择图片文件");
      }
    },
    getUserImg() {
      get({
        url: "/user/1/",
        headers: { "X-CSRFToken": getCookie("csrftoken") },
      }).then((response) => {
        this.imageUrl = this.imageUrl + response.data.face;
        this.userImg = response.data.face;
      });
    },
    getFace() {
      return this.imageUrl !== "http://localhost:8000/media/";
    },

    // 初始化模型加载
    async fnInit() {
      // 根据算法模型参数识别调整结果

      // 节点属性化
      this.videoEl = document.getElementById("myVideo");
      this.canvasEl = document.getElementById("myCanvas");
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
    fnSign() {
      // this.canvasEl
      //   .getContext("2d")
      //   .clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
      this.canvasEl.height = 220
      this.canvasEl.getContext("2d").drawImage(this.videoEl, 0, 0,this.canvasEl.width, this.canvasEl.height);
      // 获取图片base64链接
      const image = this.canvasEl.toDataURL("image/jpg").split(",")[1];
      console.log(this.canvasEl.width, this.canvasEl.height);

       put({
          url: "/user/1/",
          data: { face: image },
          headers: { "X-CSRFToken": getCookie("csrftoken") },
        }).then((response)=>{
          console.log(response);
        })
         
     

      this.videoEl.pause();
      clearTimeout(this.timeout);
      if (typeof window.stream === "object") {
        window.stream.getTracks().forEach((track) => track.stop());
        window.stream = "";
        this.videoEl.srcObject = null;
      }
    },
    fnClose() {
      this.canvasEl
        .getContext("2d")
        .clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
      this.videoEl.pause();
      clearTimeout(this.timeout);
      if (typeof window.stream === "object") {
        window.stream.getTracks().forEach((track) => track.stop());
        window.stream = "";
        this.videoEl.srcObject = null;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.user {
  margin: 100px;
  height: 400px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  border: 1px solid black;

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // background: olive;

    .user-info {
      padding: 20px;
      margin: 40px;
      // display: flex;
      // flex-direction: column;
      // justify-content: space-evenly;
      .username,
      .number,
      .sex,
      .password {
        margin: 15px;
      }

      .password {
        margin-left: 20px;
      }
    }
  }

  .user-face {
    margin: 50px;
    margin-top: 100px;

    .title {
      margin-top: 20px;
    }

    .avatar-uploader {
      border: 1px dashed #c0c0c0;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .avatar-uploader:hover {
      border-color: #409eff;
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }

    .avatar {
      // width: 250px;
      height: 220px;
      display: block;
    }
  }
}

.face {
  width: 250px;
  height: 200px;
  // margin: 20px auto;
}

.see {
  position: relative;
  // background-color: red;
  margin: 50px auto;
  width: 250px;
  height: 200px;
  #myCanvas {
    width: 250px;
    height: 200px;
    position: absolute;
    top: 0;
    display: block;
    // background-color: #42b983;
  }
  #myVideo {
    width: 250px;
    height: 200px;
    display: block;
    background-color: black;
  }
}
.option {
  margin-top: -40px;
  .btn {
    display: flex;
    justify-content: space-around;
  }
  .upload {
    display: flex;
    justify-content: center;
    margin-top: 5px;
    .up {
      width: 95%;
    }
  }
}
</style>
