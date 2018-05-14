import Vue from 'vue'
import Router from 'vue-router'
import Weather from '@/pages/Weather'
import Video from '@/pages/Video'
import Echarts from '@/components/Echarts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Weather',
      component: Weather
    }, {
      path: '/e',
      name: 'Echarts',
      component: Echarts
    },
    {
      path: '/video',
      name: 'Video',
      component: Video
    },

  ]})
