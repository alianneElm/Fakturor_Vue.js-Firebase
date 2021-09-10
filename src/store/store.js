import { createStore } from 'vuex'

export default createStore({
  state: {
    billModel : null,
  },
  mutations: {
    TOGGLE_BILL(state){
      state.billModel = !state.billModel;
    }
  },
  actions: {
  },
  modules: {
  }
})
