<template>
<div class="stu-info">
  <el-button type="primary" @click="trainModel" class="btn">更新学生信息</el-button>

  <el-table
    stripe
    :data="stuData"
    style="width: 95%"
    :header-cell-style="headClass"
    align="center"
    :cell-style="rowClass"
    :highlight-current-row='true'
    border
  >
    <el-table-column prop="id" label="序号"> </el-table-column>
    <el-table-column prop="number" label="学号"> </el-table-column>
    <el-table-column prop="username" label="姓名"> </el-table-column>
    <el-table-column label="性别">
      <template slot-scope="scope">
        {{ scope.row.sex === "male" ? "男" : "女" }}
      </template>
    </el-table-column>
    <el-table-column label="人脸图片">
      <template slot-scope="scope">
        <!-- <img :src="require('http:localhost:8000/media/'+scope.row.face)" alt="" style="width:60px" /> -->
        <!-- <img src="http://localhost:8000/media/face_img/2017127249/2020120112062773.jpg" alt="" style="width:60px" /> -->
        <img
          :src="'http://localhost:8000/media/' + scope.row.face"
          alt=""
          style="width: 60px"
        />
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import { get } from "../utils/request";
import { getCookie } from "../utils/cookie";

export default {
  name: "StuInFo",
  data() {
    return {
      stuData: [],
      stu_face: [],
    };
  },
  methods: {
    headClass() {
      //表头居中显示
      return "text-align:center";
    },
    rowClass() {
      //表格数据居中显示
      return "text-align:center";
    },
    getStuInfo() {
      get({
        url: "/user/",
        headers: { "X-CSRFToken": getCookie("csrftoken") },
      }).then((res) => {
        // console.log(res.data);

        this.stuData = res.data;
      }).catch((err)=>{
        console.log(err)
      })
    },
    trainModel(){
      get({
        url:'/train/',
        headers: { "X-CSRFToken": getCookie("csrftoken") },
      }).then((res)=>{
        console.log(res)
        this.$message({
                  message: res.data,
                  type: "success",
                });
      }).catch((err)=>{
        console.log(err)
      })
    }
  },
  mounted() {
    this.getStuInfo();
  },
};
</script>
<style lang="less" scoped>
@import url('../style/tabel.css');

  .btn{
    float: left;
    margin: 20px auto;
    margin-left: 40px;
  }
</style>
