<template>
  <div class="right">
        <el-menu
          default-active="1"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-menu-item index="/user">
            <i class="el-icon-s-custom"></i>
            <span slot="title">个人中心</span>
          </el-menu-item>
          <el-menu-item index="/sign">
            <i class="el-icon-s-grid"></i>
            <span slot="title">签到管理</span>
          </el-menu-item>
          <el-menu-item index="/stu" v-if="isSuperUser">
            <i class="el-icon-s-order"></i>
            <span slot="title">学生信息</span>
          </el-menu-item>
        </el-menu>
  </div>
</template>


<script>
export default {
  name: "Right",
  methods:{
    isSuperUser(){
      const is_superuser = window.sessionStorage.getItem('is_superuser')
      return is_superuser === 'true';
    }
  }
};
</script>
<style lang="less" scoped>
.right{
  height: 100%;
}
.el-menu {
  height: 100%;
  border-right: 0;
}
</style>
