<template>
  <el-row class="header">
    <!-- 左边Logo -->
    <el-col :span="4" class="logo">
      <div class="img">
      <img @click="tohome" src="../assets/img/logo.png" alt="" />
      </div>
    </el-col>
    <!-- 中间导航区域 -->
    <el-col class="main" :span="16">
      <el-menu
        :default-active="$route.path"
        class="menu"
        router
        mode="horizontal"
        @select="handleSelect"
        active-text-color="#000"
      >
        <!-- 循环写的路由，其中路由中有  hidden：true 的就不加入循环 -->
      </el-menu>
    </el-col>

    <!-- 右边用户信息以及登陆注册 -->
    <el-col class="user" :span="4">
      <!-- 根据logined值的真假来判断是显示登录按钮还是用户信息
      以后根据登录状态来改变 -->
      <div v-if="!$store.state.token">
        <el-button
          class="button login"
          @click.native="tologin"
          type="danger"
          size="small"
          round
          >login</el-button
        >
        <el-button
          class="button register"
          @click.native="toregister"
          type="success"
          size="small"
          round
          >register</el-button
        >
      </div>
      <div v-else>
        <el-dropdown @command="handleCommand">
          <!-- <img src="" alt="" class="avatar"> -->
          <div class="username">
            {{ $store.state.username }}
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            <el-dropdown-item
              command="admin"
              v-if="isSuperUser()"
              >后台系统</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>


<script>
import { REMOVE_TOKEN } from "../store/mutations-types";

export default {
  name: "Header",
  data() {
    return {
      login: true,
    };
  },
  methods: {
    handleSelect() {},
    tohome() {
      this.$router.push("/");
    },
    tologin() {
      this.$router.push("/login");
    },
    toregister() {
      this.$router.push("/register");
    },
    handleCommand(command) {
      // console.log(this.$store.state.userInfo)
      if (command === "logout") {
        this.$store.commit({
          type: REMOVE_TOKEN,
        });
        window.sessionStorage.clear()
        this.$router.push({
          name: "Login",
        });
      } else {
        window.open("http://localhost:8000/admin/", "_blank");
      }
      // console.log(this.$store.state.userInfo)
    },
    isSuperUser(){
      const is_superuser = window.sessionStorage.getItem('is_superuser')
      return is_superuser === 'true';
    }
  },
  mounted() {
    // console.log(this.$store.state.userInfo.username);
  },
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 60px;
  margin: 0;
  background:	#b6e2f3;
  // background: black;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0 0 25px #666;
}

.logo {
  .img{
    width: 200px;
    img {
      width: 60px;
      height: 60px;
      cursor: pointer;
    }
  }

}
.user{
  .button {
    margin: 15px 0;
  }
  .login {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .register {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .username {
    margin-top: 20px;
    font-size: 20px;
  }
}


</style>
