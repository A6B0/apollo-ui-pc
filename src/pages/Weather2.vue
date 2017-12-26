<template>
  <div>
    <select-one></select-one>
    <ve-line :data="chartData" :settings="chartSettings"></ve-line>
    <echarts></echarts>
  </div>
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
    created: function () {
      this.chartData = {
        columns: ['日期', '成本', '利润', '占比', '其他'],
        rows: [
          {'日期': '1月1日', '成本': 1523, '利润': 1523, '占比': 0.12, '其他': 100},
          {'日期': '1月2日', '成本': 1223, '利润': 1523, '占比': 0.345, '其他': 100},
          {'日期': '1月3日', '成本': 2123, '利润': 1523, '占比': 0.7, '其他': 100},
          {'日期': '1月4日', '成本': 4123, '利润': 1523, '占比': 0.31, '其他': 100},
          {'日期': '1月5日', '成本': 3123, '利润': 1523, '占比': 0.12, '其他': 100},
          {'日期': '1月6日', '成本': 7123, '利润': 1523, '占比': 0.65, '其他': 100}
        ]
      }
      this.chartSettings = {
        stack: {'售价': ['成本', '利润']},
        area: true
      }
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

</style>

