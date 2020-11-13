<template>
  <div class="discord-controller">
    <div class="pause" v-if="playing" @click="buttonClick()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
    </div>
    <div class="play" v-else @click="buttonClick()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M8 5v14l11-7z"/></svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import io from 'socket.io-client';

export default defineComponent({
  name: 'DiscordController',
  data() {
    return {
      playing: false,
      socket: io('eldridge-pi.ddns.net:3000'),
    };
  },
  methods: {
    buttonClick() {
      console.log('button click');
      this.socket.emit('play-pause', { playing: this.playing });
      this.playing = !this.playing;
    },
  },
  mounted() {
    this.socket.on('message', (info: any) => {
      console.log('message');
      console.log(info);
    });
    this.socket.on('music-start', () => {
      console.log('music-start');
      this.playing = true;
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
    height: 200px;
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
