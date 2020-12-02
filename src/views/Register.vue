<template>
  <div class="login">
    <el-form
      :model="RegisterForm"
      ref="RegisterForm"
      :rules="rule"
      label-width="0"
      class="register-form"
    >
      <div class="title">用户注册</div>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="RegisterForm.username"
          prefix-icon="el-icon-s-custom"
          placeholder="姓名"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="number">
        <el-input
          type="text"
          v-model="RegisterForm.number"
          prefix-icon="el-icon-s-custom"
          placeholder="学号"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="sex">
        <el-select v-model="RegisterForm.sex" placeholder="性别">
          <el-option label="男" value="male"></el-option>
          <el-option label="女" value="female"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="RegisterForm.password"
          prefix-icon="el-icon-lock"
          placeholder="密码"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="check_password">
        <el-input
          type="password"
          v-model="RegisterForm.check_password"
          prefix-icon="el-icon-lock"
          placeholder="确认密码"
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
          >注册
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
      <span> 已有账号,马上去 </span>
      <span class="to" @click="tologin">登录</span>
      <!-- </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
import { post } from "../utils/request";
import { getCookie } from "../utils/cookie";

export default {
  name: "Register",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length > 20) {
        callback(new Error("姓名是必须的，最大长度为20位!"));
      } else {
        callback();
      }
    };
    const validateNumber = (rule, value, callback) => {
      if (value.length < 7 || value.length > 20) {
        callback(new Error("学号是必须的，长度为7-20位!"));
      } else {
        callback();
      }
    };
    const validateSex = (rule, value, callback) => {
      // console.log(value);
      if (value === "") {
        callback(new Error("请选择性别"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value !== this.RegisterForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      RegisterForm: {
        username: "admin1",
        number: "20171272100",
        password: "123456",
        check_password: "123456",
        sex: "",
      },
      loading: false,
      rule: {
        username: [
          {
            required: true,
            max: 20,
            message: "姓名是必须的，最大长度为20位",
            trigger: "blur",
          },
          { validator: validateUsername, trigger: "blur" },
        ],
        number: [
          {
            required: true,
            max: 20,
            min: 7,
            message: "学号是必须的，长度为7-20位",
            trigger: "blur",
          },
          { validator: validateNumber, trigger: "blur" },
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "blur",
          },
          { validator: validateSex, trigger: "blur" },
        ],
        password: [
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
    };
  },
  methods: {
    submit() {
      this.$refs.RegisterForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          post({
            url: "/user/",
            data: this.RegisterForm,
            headers: { "X-CSRFToken": getCookie("csrftoken") },
          })
            .then((response) => {
              this.loading = false;
              // console.log(response);

              if (response !== undefined) {
                this.$message({
                  message: "注册成功！",
                  type: "success",
                });
                setTimeout(() => {
                  //需要延迟的代码 :3秒后延迟跳转到首页，可以加提示什么的
                  this.$router.push({
                    name: "Home",
                  });
                  //延迟时间：0.2秒
                }, 200);
              } else {
                this.$confirm("姓名或学号已存在", "错误", {
                  confirmButtonText: "确定",
                  type: "error",
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          return false;
        }
      });
    },
    reset() {
      this.$refs.RegisterForm.resetFields();
    },
    tologin() {
      this.$router.push("/login");
    },
  },
};
</script>


<style lang="less" scoped>
.login {
  margin: 50px auto;
}

.register-form {
  margin: 50px auto;
  width: 300px;
  background: #fff;
  box-shadow: 0 0 35px #b4bccc;
  padding: 30px;
  border-radius: 25px;

  .title {
    margin-bottom: 20px;
  }

  .el-select {
    width: 100%;
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
