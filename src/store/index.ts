import { createStore } from 'vuex';

interface State {
  count: number;
  loggedIn: boolean;
  musicController: {
    [guildId: string]: {
      volume: number;
      playing: boolean;
    };
  };
}

export default createStore({
  state() {
    return {
      count: 0,
      loggedIn: false,
      musicController: {},
    };
  },
  mutations: {
    login(state: State) {
      state.loggedIn = true;
    },
    logout(state: State) {
      state.loggedIn = false;
    },
    playing(state: State, event: { guildId: string; playing: boolean }) {
      const guildState = { ...state.musicController[event.guildId], playing: event.playing };
      state.musicController = { ...state.musicController, [event.guildId]: guildState };
    },
    musicStart(state: State, event: { guildId: string }) {
      state.musicController = {
        ...state.musicController,
        [event.guildId]: {
          playing: true,
          volume: 100,
        },
      };
    },
  },
  actions: {
  },
  modules: {
  },
});
