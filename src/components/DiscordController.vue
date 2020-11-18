<template>
  <div class="discord-controller">
    <div class="pause" v-if="playing" @click="buttonClick()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
    </div>
    <div class="play" v-else @click="buttonClick()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M8 5v14l11-7z"/></svg>
    </div>
    <input type="range" min="1" max="100" value="50" class="slider" id="myRange" @input="volumeChange($event.target.value)">
    <WatchList/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import io from 'socket.io-client';
import WatchList from '@/components/WatchList.vue';
import IOEvents from '@/models/events';

export default defineComponent({
  name: 'DiscordController',
  components: {
    WatchList,
  },
  data() {
    return {
      // socket: io('eldridge-pi.ddns.net:3000'),
      socket: io(process.env.VUE_APP_SOCKET_DOMAIN as string, {
        query: `token=${localStorage.getItem('token')}`,
      }).on('error', (error: SocketIOClient.Manager) => {
        console.error(`IO Error: ${JSON.stringify(error)}`);
      }),
    };
  },
  computed: {
    playing() {
      return this.$store.state.musicController.playing;
    },
  },
  methods: {
    buttonClick() {
      console.log('button click');
      this.socket.emit(IOEvents.PLAY_PAUSE, { playing: this.playing });
      this.$store.commit('playing', !this.playing);
    },
    volumeChange(volume: number) {
      console.log(volume);
      this.socket.emit(IOEvents.VOLUME_CHANGE, volume);
    },
  },
  mounted() {
    this.socket.on(IOEvents.MESSAGE, (info: any) => {
      console.log('message');
      console.log(info);
    });
    this.socket.on(IOEvents.MUSIC_START, () => {
      console.log('music-start');
      this.$store.commit('playing', true);
    });
    console.log('mounted');
  },
});
</script>

<style scoped lang="scss">
  @import '../styles/colors.scss';

  .discord-controller {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: $background-secondary;

    .play, .pause {
      border: solid 1px #a5a9a9;
      border-radius: 50%;
      padding: 4px;
      color: rgb(0, 0, 0, 0.4);

      cursor: pointer;

      &:hover {
        transform: scale(1.05);
        border-color: #FFFFFF;
      }
    }

    svg {
      display: block;
      height: 24px;
      width: auto;
    }
  }
</style>
