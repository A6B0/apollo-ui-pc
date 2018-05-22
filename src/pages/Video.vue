<template>
  <div class="layout">


    <Layout>
      <Header style="height: 10px">
      </Header>
      <Content>

        <Row :gutter="16">
          <Col span="10">
          <Row>
            <Card style="background:#0d1933;margin-left: 10px" :bordered="true">
              <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                视频1
              </p>
              <a href="#" slot="extra" @click.prevent="changeLimit">
                <Icon type="ios-loop-strong"></Icon>
              </a>
              <player style="clear:both;display:block;margin:auto"></player>
            </Card>
          </Row>
          <Row>
            <Card style="background:#0d1933;margin-left: 10px;margin-top: 10px" :bordered="true">
              <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                视频3
              </p>
              <a href="#" slot="extra" @click.prevent="changeLimit">
                <Icon type="ios-loop-strong"></Icon>
              </a>
              <player2 style="clear:both;display:block;margin:auto"></player2>
            </Card>
          </Row>
          </Col>

          <Col span="10">
          <Row>
            <Card style="background:#0d1933;margin-left: 10px" :bordered="true">
              <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                视频2
              </p>
              <a href="#" slot="extra" @click.prevent="changeLimit">
                <Icon type="ios-loop-strong"></Icon>
              </a>
              <player1 style="clear:both;display:block;margin:auto"></player1>
            </Card>
          </Row>
          <Row>
            <Card style="background:#0d1933;margin-left: 10px;margin-top: 10px" :bordered="true">
              <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                视频4
              </p>
              <a href="#" slot="extra" @click.prevent="changeLimit">
                <Icon type="ios-loop-strong"></Icon>
              </a>
              <player3 style="clear:both;display:block;margin:auto"></player3>
            </Card>
          </Row>
          </Col>

          <Col span="4">
          <Card style="background:#0d1933;margin-right: 10px;height: 200px" :bordered="true">
            <p slot="title">固阳20WM光伏电站</p>
            <p>1.厂区-大门口</p>
            <p>2.设备区-主变</p>
            <p>3.设备区-东边</p>
            <p>4.配电室-西北</p>
          </Card>
          </Col>

        </Row>

      </Content>
    </Layout>

  </div>
</template>

<script>
  import player from "@/components/Player"
  import player1 from "@/components/Player1"
  import player2 from "@/components/Player2"
  import player3 from "@/components/Player3"

  export default {
    name: 'Video',
    components: {
      player,
      player1,
      player2,
      player3

    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        height: document.documentElement.clientHeight
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .layout-nav {
    width: 250px;
    margin-top: 20px;
    margin-left: 10px;
  }
</style>

