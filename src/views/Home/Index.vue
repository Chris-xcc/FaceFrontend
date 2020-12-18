<template>
  <div class="index">
    <img src="@/assets/img/finaly.png" alt="" />
    <!-- <img src="../assets/img/2.jpg" alt="" /> -->
    <!-- <img src="../assets/img/1.jpg" alt="" /> -->
    <!-- {{typeof(this.$store.state.is_superuser)}} -->
    <!-- {{(this.$store.state.is_superuser)}} -->
  </div>
</template>
<script>
export default {
  name: "Index",
};
</script>

<style lang="less" scoped>
.index {
  width: 100%;
  background-color: RGB(225, 255, 255);
  // background-color: RGB(12, 3, 128);
  img {
    margin-top: 30px;
    width: 65%;
    // height: 100%;
    // margin-top: 1px;
  }
}
</style>