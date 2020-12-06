<template>
  <el-table
    stripe
    :data="signData"
    style="width: 95%"
    :header-cell-style="headClass"
    align="center"
    :cell-style="rowClass"
    :highlight-current-row='true'
    border
  >
    <el-table-column prop="title" label="标题"> </el-table-column>
    <el-table-column prop="description" label="描述"> </el-table-column>
    <el-table-column label="详情">
      <template slot-scope="scope">
        <el-button @click="showDetail(scope.row.id)">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { get } from "../utils/request";
import { getCookie } from "../utils/cookie";

export default {
  name: "SignInfo",
  data() {
    return {
      signData: [],
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
    getStuSignInfo() {
      get({
        url: "/sign_info/",
        headers: { "X-CSRFToken": getCookie("csrftoken") },
      })
        .then((response) => {
          // console.log(response);
          this.signData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showDetail(id) {
      console.log(id);
         this.$router.push({
          path: `/sign_info/${id}`,
        })
    },
  },

  mounted() {
    this.getStuSignInfo();
  },
};
</script>

<style scoped>
@import url('../style/tabel.css');
</style>
