<template>
  <div id="myChart2" :style="{height: '250px'}"></div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import 'echarts/theme/macarons.js'
  import bus from '@/store/bus'

  export default {
    name: "echarts",
    data() {
      return {
        Time: [],
        GHI: [],
        DNI: [],
        PlantGeo: "39.15,101.18",
        PlantId: "1200000000002201",
        Status: false,
        EchartOpt: {}
      }
    },
    created() {
      console.log("[bar chart] created")
      bus.$on('selectedPlan', function (msg) {
        console.log(msg)
        this.PlantId = msg
        this.Status = true
        //this.getWeather(msg)
        this.getData(msg)
      }.bind(this))
    },
    mounted() {
      //this.getWeather(this.PlantId)
      // this.draw()
      this.getData(1200000000002200)

    },
    methods: {
      getData(stationId) {
        this.$store.dispatch('getWindForcast', stationId).then(response => {
          this.draw()
          console.log("[bar chart init data] getWindForcast Success and run draw a picture" + stationId)
        }, error => {
          console.error("got wind forcast nothing from the server")
        })
      },
      draw() {
        let myCharts = echarts.init(document.getElementById('myChart2'), 'macarons')
        //console.log("drow"+this.$store.state.Times)
        myCharts.setOption({
            title: {
              //text: '风速预测',
              subtext: '风速预测',
              left: 'left'
            },
            toolbox: {},
            tooltip: {
              trigger: 'axis',
              position: function (pt) {
                return [pt[0], '10%'];
              }
            },
            legend: {
              align: 'right',
              right: 125,
              selectedMode: 'single',
            },
            xAxis: {
              type: 'category',
              //boundaryGap: false,
              axisLine: {
                show: false
              },

              axisTick: {
                alignWithLabel: true
              },
              data: this.$store.state.Times
            },
            yAxis: [
              {
                type: 'value',
                axisLine: {
                  show: false
                }
              },
              {
                type: 'value',
                axisTick: {
                  show: false
                },
                axisLine: {
                  show: false
                },
                splitLine: {
                  show: false
                }
              }
            ],
            dataZoom: [
              {
                type: 'inside',
                start: 0,
                end: 4
              }],
            series: [
              {
                name: '风速',
                type: 'bar',
                yAxisIndex: 1,
                itemStyle: {
                  normal: {
                    color: '#0084d7'
                  }
                },
                data: this.$store.state.WindSpeed
              }]
          }
        )
      }
    }
  }
</script>
<style scoped>
</style>
