<template>
  <div id="myChart3" :style="{height: '350px'}"></div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import 'echarts/theme/macarons.js'
  import bus from '@/store/bus'

  export default {
    name: "echarts",
    data() {
      return {
        Latitude:39.15,
        Longtitude:101.18,
        Dot:0.05,
        PlantDot:[],
        PlantName: "乌尔禾",
      }
    },
    created() {
      console.log("[map chart init] created... ")
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
        for(var value of this.$store.state.Stations){
          if (value.plant_id == stationId){
            this.Latitude = value.location_n
            this.Longtitude = value.location_e
            this.PlantName = value.plant_name
          }

        }

        this.draw()
      },
      draw() {
        let myCharts = echarts.init(document.getElementById('myChart3'), 'macarons')
        //console.log("drow"+this.$store.state.Times)

        var latlong = {};
        latlong.ZW = {'latitude': this.Latitude, 'longitude': this.Longtitude};

        var mapData = [
          {'code': 'ZW', 'name': this.PlantName, 'value': 0, 'color': '#39edf4'}];

        var max = -Infinity;
        var min = Infinity;
        mapData.forEach(function (itemOpt) {
          if (itemOpt.value > max) {
            max = itemOpt.value;
          }
          if (itemOpt.value < min) {
            min = itemOpt.value;
          }
        });

        var option = {

          title: {
            //subtext: '地理位置',
            left: 'left',
            top: 'top',
            textStyle: {
              color: '#fff'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              var value = (params.value + '').split('.');
              value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')
                + '.' + value[1];
              return params.name;
            }
          },
          visualMap: {
            show: false,
            min: 0,
            max: max,
            inRange: {
              symbolSize: [3, 30]
            }
          },
          geo: {
            name: 'Plant',
            type: 'map',
            map: 'world',
            roam: true,
            label: {
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                //#323c48
                areaColor: '#4c7db5',
                //#303b48
                borderColor: '#4c7db5'
              },
              emphasis: {
                areaColor: '#2a333d'
              }
            }
          },
          series: [
            {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: mapData.map(function (itemOpt) {
                return {
                  name: itemOpt.name,
                  value: [
                    latlong[itemOpt.code].longitude,
                    latlong[itemOpt.code].latitude,
                    itemOpt.value
                  ],

                  label: {
                    emphasis: {
                      position: 'right',
                      show: true
                    }
                  },
                  showEffectOn: 'render',
                  rippleEffect: {
                    brushType: 'stroke'
                  },
                  hoverAnimation: true,
                  itemStyle: {
                    normal: {
                      color: itemOpt.color,

                    }
                  }
                };
              })
            }
          ]
        };

        myCharts.setOption(option)

      }
    }
  }
</script>
<style scoped>
</style>
