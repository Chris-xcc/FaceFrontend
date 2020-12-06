<template>
  <el-container class="home-container">
    <el-header>
      <Header></Header>
    </el-header>

    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- 侧边栏菜单区域 -->
        <right />
      </el-aside>

      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "@/components/Header";
import Right from "@/components/Right.vue";

export default {
  name: "Home",
  components: {
    Header,
    Right,
  },
  data() {
    return {
      isCollapse: false,
      activePath: "",
    };
  },
  created() {
    // this.getMenuList()
    // this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    // logout() {
    //   window.sessionStorage.clear();
    //   this.$router.push("/login");
    // },
    // async getMenuList() {
    //   const { data: res } = await this.$http.get('menus')
    //   console.log(res);
    //   if(res.meta.stauts!==200) return this.$message.error(res.meta.msg)
    //   this.menuList = res.data
    // }
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
  },
};
</script>

<style lang='less' scoped>
.home-container {
  height: 100%;
}

.el-header{
  z-index: 100;
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
    padding: 0;

}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
