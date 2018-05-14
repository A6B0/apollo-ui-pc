<template>
  <div id="myChart" :style="{height: '510px'}"></div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import 'echarts/theme/macarons.js'
  import 'echarts/map/js/world'
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
      console.log("[create-echarts]")
      bus.$on('selectedPlan', function (msg) {
        console.log("[Created-receive message from event bus]", msg)
        this.PlantId = msg
        this.Status = true
        //this.getWeather(msg)
        this.getData(msg)
      }.bind(this))
    },
    mounted() {
      //this.getWeather(this.PlantId)
      // this.draw()
      console.log("[Mounted-init charts default]")
      this.getData(1200000000002200)


    },
    methods: {
      getData(stationId) {
        this.$store.dispatch('getSolarForcast', stationId).then(response => {
          this.draw()
          console.log("[line chart init data ] getSolarForcast Success and run draw a picture: " + stationId)
        }, error => {
          alert("got nothing from the server")
        })
      },
      draw() {
        let myCharts = echarts.init(document.getElementById('myChart'), 'macarons')
        //console.log("drow"+this.$store.state.Times)
        myCharts.setOption({
            title: {
              //text: '微气象预报',
              left: 'left'
            },
            toolbox: {
              show: true,
              feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
              }
            },
            tooltip: {
              trigger: 'axis',
              position: function (pt) {
                return [pt[0], '10%'];
              }
            },
            legend: {
              data: ['总辐照度', '直接辐照'],


              textStyle: {
                color: '#fff'
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              axisLine: {
                show: false
              },
              data: this.$store.state.Times
            },
            yAxis: [
              {
                type: 'value',
                axisLine: {
                  show: false
                },
                axisTick: {
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
                end: 10
              }],
            series: [{
              name: '总辐照度',
              type: 'line',
              smooth: true,
              itemStyle: {
                normal: {
                  color: '#e94e54'
                }
              },
              areaStyle: {normal: {}},
              data: this.$store.state.GHIs
            }, {
              name: '直接辐照',
              type: 'line',
              smooth: true,
              itemStyle: {
                normal: {
                  color: '#ff74ac'
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#FF9E44'
                  }, {
                    offset: 1,
                    color: '#FF4683'
                  }])
                }
              },
              data: this.$store.state.DNIs
            }]
          }
        )
      },
      getWeather(data) {
        this.$http.get("http://101.201.72.120:1314/api/solarForcast", {
          params: {
            plantId: data
          }
        })
          .then((res) => {
            //console.log(res.data)
            this.Time = res.data.forecasts1Hour.time
            this.GHI = res.data.forecasts1Hour.ghi
            this.DNI = res.data.forecasts1Hour.dni
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
                  data: res.data.forecasts1Hour.time
                },
                yAxis: [
                  {
                    type: 'value'
                  },
                  {
                    name: "风速（m/s）",
                    type: 'value',
                    inverse: true
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
                  data: res.data.forecasts1Hour.ghi
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
                  data: res.data.forecasts1Hour.dni
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
