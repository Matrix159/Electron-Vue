import { createStore } from 'vuex';

interface State {
  count: number;
  loggedIn: boolean;
  musicController: {
    volume: number;
    playing: boolean;
  };
}

export default createStore({
  state() {
    return {
      count: 0,
      loggedIn: false,
      musicController: {
        volume: 100,
        playing: false,
      },
    };
  },
  mutations: {
    login(state: State) {
      state.loggedIn = true;
    },
    logout(state: State) {
      state.loggedIn = false;
    },
    playing(state: State, playing: boolean) {
      state.musicController.playing = playing;
    },
  },
  actions: {
  },
  modules: {
  },
});
