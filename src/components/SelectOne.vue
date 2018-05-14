<template>
  <Select v-model="value" placeholder="请选择" @on-change="sendMessageToBus">
    <Option
      v-for="item in Plants"
      :key="item.location_geo"
      :value="item.plant_id">
      {{item.plant_name}}
    </Option>
  </Select>
</template>

<script>
  import bus from '@/store/bus'

  export default {
    name: "selectOne",
    data() {
      return {
        Plants: [],
        value: 1200000000002200
      }
    },
    created() {

      this.$store.dispatch('getStations').then(response => {
        this.Plants = this.$store.state.Stations

        this.value = this.$store.state.Stations[0].plant_id
        console.log("[Created-init data] getStations Success: " + response)
      }, error => {
        console.log("[Created-init data] got nothing from the server")
      })
      /*this.$http.get("http://101.201.72.120:1314/api/plant")
        .then((res) => {
          //console.log(res.data)
          this.Plants = res.data
          console.log(this.Plants)

        }, (error) => {
          console.log(error)
        })*/
    },
    methods: {
      sendMessageToBus(value) {
        if (isNaN(value)) {
          console.log("[selected-sendMessageToBus] not number : ", value)
        }
        else {
          console.log("[selected-sendMessageToBus] selected and send to: ", value)
          bus.$emit('selectedPlan', value)
        }
      }
    }

  }
</script>
