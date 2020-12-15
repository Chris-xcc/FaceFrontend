<template>
  <div class="right">
        <el-menu
          default-active="1"
          
          text-color="#000000"
          active-text-color="#FF0000"
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

          <el-menu-item index="/stu" v-if="isSuperUser()">
            <i class="el-icon-s-order"></i>
            <span slot="title">学生信息</span>
          </el-menu-item>

          <el-menu-item index="/sign">
            <i class="el-icon-s-grid"></i>
            <span slot="title">考勤管理</span>
          </el-menu-item>
          
          <el-menu-item index="/sign_info" v-if="isSuperUser()">
            <i class="el-icon-s-management"></i>
            <span slot="title">考勤情况</span>
          </el-menu-item>

          <el-menu-item index="/sign_create" v-if="isSuperUser()">
            <i class="el-icon-s-order"></i>
            <span slot="title">考勤任务发布</span>
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
  background: rgb(216, 228, 235);
}
</style>
