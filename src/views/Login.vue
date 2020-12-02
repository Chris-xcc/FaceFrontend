<template>
  <div class="login">
    <el-form
      :model="LoginForm"
      ref="LoginForm"
      :rules="rule"
      label-width="0"
      class="login-form"
    >
      <div class="title">用户登录</div>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="LoginForm.username"
          prefix-icon="el-icon-s-custom"
          placeholder="学号"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="LoginForm.password"
          prefix-icon="el-icon-lock"
          placeholder="密码"
        >
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="danger"
          class="submitBtn"
          round
          @click.native.prevent="submit"
          :loading="loading"
          >登录
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="resetBtn"
          round
          @click.native.prevent="reset"
          >重置
        </el-button>
      </el-form-item>

      <hr />
      <span> 还没有账号,马上去 </span>
      <span class="to" @click="toregister">注册</span>
      <!-- </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
import { post } from "../utils/request";
import { SET_TOKEN } from "../store/mutations-types";
import { getCookie } from "../utils/cookie";

export default {
  name: "Login",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 6 || value.length > 14) {
        callback(new Error("密码的长度为6-14位!"));
      } else {
        callback();
      }
    };
    const validateNumber = (rule, value, callback) => {
      if (value.length < 7 || value.length > 20) {
        callback(new Error("学号的长度为7-20位!"));
      } else {
        callback();
      }
    };
    return {
      LoginForm: {
        username: "2017127249",
        password: "123456",
      },
      loading: false,
      rule: {
        username: [
          {
            required: true,
            max: 20,
            min: 7,
            message: "学号是必须的，长度为7-20位",
            trigger: "blur",
          },
          { validator: validateNumber, trigger: "blur" },
        ],
        password: [
          {
            max: 14,
            min: 6,
            required: true,
            message: "密码是必须的，长度为6-14位",
            trigger: "blur",
          },
          { validator: validatePass, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.LoginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          post({
            url: "/login/",
            data: this.LoginForm,
            headers: { "X-CSRFToken": getCookie("csrftoken") },
          })
            .then((response) => {
              this.loading = false;
              console.log(response.data);
              if (response !== undefined) {
                window.sessionStorage.setItem(
                  "token",
                  "Token " + response.data.token
                );
                window.sessionStorage.setItem("id", response.data.user.id);
                window.sessionStorage.setItem("username", response.data.user.username);
                window.sessionStorage.setItem("sex", response.data.user.sex);
                window.sessionStorage.setItem("number", response.data.user.number);
                window.sessionStorage.setItem("face", response.data.user.face);
                window.sessionStorage.setItem("is_superuser", response.data.user.is_superuser);
               
                this.$store.commit({
                  type: SET_TOKEN,
                  token: "Token " + response.data.token,
                  id: response.data.user.id,
                  username: response.data.user.username,
                  sex: response.data.user.sex,
                  number: response.data.user.number,
                  face: response.data.user.face,
                  is_superuser: response.data.user.is_superuser,
                });

                this.$message({
                  message: "登录成功！",
                  type: "success",
                });
                setTimeout(() => {
                  //需要延迟的代码 :3秒后延迟跳转到首页，可以加提示什么的
                  this.$router.push({
                    name: "Home",
                  });
                  // 延迟时间：0.2秒
                }, 200);
                // this.$router.push({ path: "/" });
              } else {
                this.$confirm("学号或密码错误", "提示", {
                  confirmButtonText: "确定",
                  type: "error",
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
        }
      });
    },
    reset() {
      this.$refs.LoginForm.resetFields();
    },
    toregister() {
      this.$router.push("/register");
    },
  },
};
</script>


<style lang="less" scoped>
.login {
  margin: 50px auto;
}

.login-form {
  margin: 50px auto;
  width: 300px;
  background: #fff;
  box-shadow: 0 0 35px #b4bccc;
  padding: 30px;
  border-radius: 25px;

  .title {
    margin-bottom: 20px;
  }
}

.submitBtn,
.resetBtn {
  width: 100%;
}

span {
  margin-bottom: 20px;
}

.to {
  color: #67c23a;
  cursor: pointer;
}
</style>
