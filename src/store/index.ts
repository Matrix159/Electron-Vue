import { createStore } from 'vuex';

export default createStore({
  state: {
    count: 0,
    loggedIn: false,
  },
  mutations: {
    increment(state) {
      state.count += 1;
    },
    login(state) {
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
    },
  },
  actions: {
  },
  modules: {
  },
});
