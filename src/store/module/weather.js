const weather = {
  state: {
    Times: [],
    GHIs: [],
    DNIs: []
  },
  mutations: {
    getters: {
      Times: state => state.Times,
      GHIs: state => state.GHIs,
      DNIs: state => state.DNIs
    }
  }
}
export default weather
