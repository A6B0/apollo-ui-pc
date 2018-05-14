<template>
  <div class="layout">



    <Layout>
      <Header style="height: 50px">
        <div class="layout-nav">
        <select-one></select-one>
        </div>
      </Header>
      <Content>

        <Row :gutter="16">
          <Col span="15">
            <Card style="background:#0d1933;margin-left: 10px" :bordered="false">
              <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                辐照度
              </p>
              <a href="#" slot="extra" @click.prevent="changeLimit">
                <Icon type="ios-loop-strong"></Icon>
              </a>
              <echarts></echarts>
            </Card>
          </Col>
          <Col span="9">
          <Card style="background:#0d1933;margin-right: 10px;height: 285px" :bordered="false">
            <barecharts></barecharts>
          </Card>
          <Card style="background:#0d1933;margin-right: 10px; margin-top:10px; height: 300px" :bordered="false">
            <mapecharts></mapecharts>
          </Card>
          </Col>

        </Row>


        <mapecharts></mapecharts>
      </Content>
      <Footer style="text-align: center;margin-top: 20px">IBM Support</Footer>
    </Layout>

  </div>
</template>

<script>
  import echarts from "@/components/Echarts"
  import selectOne from "@/components/SelectOne"
  import barecharts from "@/components/BarEcharts"
  import mapecharts from "@/components/MapEcharts"

  export default {
    name: 'Weather',
    components: {
        echarts,
      barecharts,
      mapecharts,
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
  .layout-nav{
    width: 250px;
    margin-top: 20px;
    margin-left: 10px;
  }
</style>

