import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

const store = new Vuex.Store({
  state: {
    Stations: [
    ],
    CurStation:{
      Latitude:0,
      Longtitude:0,
      Times:[],
      GHIs: [],
      DNIs: [],
      WindSpeed: []
    },
    Times: [],
    GHIs: [],
    DNIs: [],
    WindSpeed: []
  },

  getters: {
    Times: state => state.Times
  },

  actions: {
    getStations(context, data) {
      return new Promise((resolve, reject) => {
        const URL = 'http://101.201.72.120:1314/api/project'
        axios.get(URL).then(response => {
          context.commit('setStations', {res: response.data})
          resolve(response)
        }, error => {
          reject(error)
        })
      })
    },
    getWindForcast(context, data) {
      return new Promise((resolve, reject) => {
        const URL = 'http://101.201.72.120:1314/api/windForcast'
        axios.get(URL, {
          params: {
            plantId: data
          }
        }).then(response => {
          context.commit('setWindForcast', {res: response.data})
          resolve(response)
        }, error => {
          reject(error)
        })
      })
    },
    getSolarForcast(context, data) {
      return new Promise((resolve, reject) => {
          const URL = 'http://101.201.72.120:1314/api/solarForcast'
          axios.get(URL, {
            params: {
              plantId: data
            }
          }).then(response => {
            context.commit('setSolarForcast', {res: response.data})
            resolve(response)
          }, error => {
            reject(error)
          })
        }
      )
    }
  },
  mutations: {
    setSolarForcast(state, {res}) {
      state.Times = res.forecasts1Hour.time
      state.GHIs = res.forecasts1Hour.ghi
      state.DNIs = res.forecasts1Hour.dni
    },
    setWindForcast(state, {res}) {
      state.WindSpeed = res.forecasts1Hour.wind_speed
    },
    setStations(state, {res}) {
      state.Stations = res
      console.log("receive data and set rudux: " + res)
    }
  },
  modules: {}
})

export default store
