<template>
  <div id="myChart" :style="{height: '500px'}"></div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import bus from '@/store/bus'

  export default {
    name: "echarts",
    data() {
      return {
        Time: [],
        GHI: [],
        DNI: [],
        PlantGeo: "39.15,101.18",
        Status: false,
        EchartOpt: {}

      }
    },

    created() {
      bus.$on('selectedPlan', function (msg) {
        console.log(msg)
        this.PlantGeo = msg
        this.Status = true
        this.getWeather(msg)
      }.bind(this))
    },
    mounted() {
      this.getWeather(this.PlantGeo)
    },
    methods: {
      getWeather(data) {
        this.$http.get("http://localhost:1314/api/weather", {
          params: {
            plantGeo: data
          }
        })
          .then((res) => {
            //console.log(res.data)
            this.Time = res.data.time
            this.GHI = res.data.GHI
            this.DNI = res.data.DNI
            //console.log(res.data.DNI)
            let myCharts = echarts.init(document.getElementById('myChart'))
            myCharts.setOption({
                title: {
                  text: '微气象预报',
                  subtext: '由IBM和E云共同研发',
                  left: 'center'
                },
                toolbox: {},
                tooltip: {
                  trigger: 'axis',
                  position: function (pt) {
                    return [pt[0], '10%'];
                  }
                },
                legend: {
                  data: ['总辐照度', '直接辐照'],
                  align: 'right',
                  right: 125
                },
                xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  data: res.data.time
                },
                yAxis: [
                  {
                    type: 'value'
                  }
                ],
                dataZoom: [
                  {
                    type: 'inside',
                    start: 0,
                    end: 10
                  }],
                series: [{
                  name: '总辐照度',
                  type: 'line',
                  smooth: true,
                  areaStyle: {normal: {}},
                  data: res.data.GHI
                }, {
                  name: '直接辐照',
                  type: 'line',
                  smooth: true,
                  areaStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgb(255, 158, 68)'
                      }, {
                        offset: 1,
                        color: 'rgb(255, 70, 131)'
                      }])
                    }
                  },
                  data: res.data.DNI
                }]
              }
            )

          }, (error) => {
            console.log(error)

          })
      }

    }

  }
</script>

<style scoped>

</style>
