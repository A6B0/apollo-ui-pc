<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="10" :offset="3">
          <select-one></select-one>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <echarts></echarts>
    </el-main>
  </el-container>
</template>

<script>
  import echarts from "@/components/Echarts"
  import selectOne from "@/components/SelectOne"
  export default {
    name: 'Weather',
    components: {
        echarts,
      selectOne
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-header {
    text-align: left;
    line-height: 60px;
  }
</style>

