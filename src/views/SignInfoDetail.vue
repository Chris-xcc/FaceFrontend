<template>
<div class="sign-info-detail">
    <div class="title">{{this.title}}签到情况</div>
  <el-table
    stripe
    :data="detailData"
    style="width:95%"
    :header-cell-style="headClass"
    align="center"
    :cell-style="rowClass"
    :highlight-current-row='true'
    border
  >
    <el-table-column label="序号">
      <template scope="scope"
        ><span>{{ scope.$index + 1 }} </span></template
      >
    </el-table-column>
    <el-table-column prop="number" label="学号"> </el-table-column>
    <el-table-column prop="username" label="姓名"> </el-table-column>
    <el-table-column prop="" label="性别">
      <template scope="scope"
        ><span>{{ getUserSex(scope.row.sex) }} </span></template
      >
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import { get } from "../utils/request";
import { getCookie } from "../utils/cookie";

export default {
  name: "SignInfoDetail",
  data() {
    return {
      title: '',
      detailData: [],
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
    getSignInfoDetail() {
      get({
        url: `/sign_info/${this.$route.params.id}/`,
        headers: { "X-CSRFToken": getCookie("csrftoken") },
      })
        .then((response) => {
          console.log(response);
          this.detailData = response.data.user;
          this.title = response.data.title
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getUserSex(sex){
        if (sex === 'male') {
            return '男'
        }
        else if (sex === 'female') {
            return '女'
        }
        return ' '
    }
  },
  mounted() {
    this.getSignInfoDetail();
  },
};
</script>

<style lang="less" scoped>
@import url('../style/tabel.css');
.title{
  margin-top: 50px;
  font-size: 30px;
  font-weight: bolder;
}
</style>