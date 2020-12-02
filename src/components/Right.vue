<template>
  <div class="right">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"

          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-menu-item index="/user">
            <i class="el-icon-setting"></i>
            <span slot="title">个人中心</span>
          </el-menu-item>
          <el-menu-item index="/sign">
            <i class="el-icon-setting"></i>
            <span slot="title">签到管理</span>
          </el-menu-item>
          <el-menu-item index="/stu" v-if="this.$store.state.is_superuser === true">
            <i class="el-icon-setting"></i>
            <span slot="title">学生信息</span>
          </el-menu-item>
        </el-menu>
  </div>
</template>


<script>
export default {
  name: "Right",
};
</script>
<style lang="less" scoped>
.right{
  height: 100%;
}
.el-menu {
  height: 100%;
}
</style>
