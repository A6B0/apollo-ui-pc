<template>
  <el-select v-model="value" placeholder="请选择" @change="sendMessageToBus(value)">
    <el-option
      v-for="item in Plants"
      :key="item.plant_id"
      :label="item.plant_name"
      :value="item.location_geo">
    </el-option>
  </el-select>
</template>

<script>
  import bus from '@/store/bus'
  export default {
    name: "selectOne",
    data() {
      return {
        Plants: [],
        value: '选择电站'
      }
    },
    created() {
      this.$http.get("http://localhost:1314/api/plant")
        .then((res) => {
          //console.log(res.data)
          this.Plants = res.data
          console.log(this.Plants)

        }, (error) => {
          console.log(error)
        })
    },
    methods: {
      sendMessageToBus(value){
        bus.$emit('selectedPlan',value)
      }

    }

  }
</script>
