<template>
  <div class="sign">
    <el-table
      :data="signData"
      border
      style="width: 95%"
      stripe
      :header-cell-style="headClass"
      align="center"
      :cell-style="rowClass"
      :highlight-current-row='true'
    >
      <el-table-column label="标题">
        <template slot-scope="scope">
          <span>
            {{ scope.row.title }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">
          <span>
            {{ scope.row.description }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="  ">
        <template slot-scope="scope">
          <el-button @click="openDetails(scope.row.id)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { get } from "../utils/request";
import { getCookie } from "../utils/cookie";
import { GET_SIGNID } from "../store/mutations-types";

export default {
  name: "Sign",
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
    getSign() {
      get({
        url: "/sign/",
        headers: { "X-CSRFToken": getCookie("csrftoken") },
      }).then((res) => {
        // console.log(res.data);

        this.signData = res.data;
      });
    },
    openDetails(row) {
      window.sessionStorage.setItem("signId", row.id);
      this.$store.commit({
        type: GET_SIGNID,
        signId: row,
      });
      this.$router.push({
        name: "Face",
      });
    },
  },
  mounted() {
    this.getSign();
  },
};
</script>

<style scoped>
@import url('../style/tabel.css');

span {
  cursor: pointer;
}
</style>
