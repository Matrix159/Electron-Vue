<template>
  <div class="discord-controller">
    <div class="guild-image-container" >
      <img class="guild-image" v-for="value of creeperInfo.guilds" :key="value.id" :src="value.guildImage" alt="Guild image" @click="selectedGuildId = value.id"/>
    </div>
    <div class="user-container">
      <div class="user" v-for="user of sortedUsers" :key="user.snowflake">
        <img class="user-image" :src="user.avatarURL" alt="User image"/>
        <span>{{user.username}}</span>
      </div>
    </div>
    <div class="queue-container">
      <label>
        Queue
        <input type="text" v-model="queueInput"/>
      </label>
      <button @click="queueSong(queueInput)">Submit</button>
    </div>
    <div v-if="selectedGuildId" class="music-container">
      <div class="pause" v-if="playing" @click="musicButtonClick()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
      </div>
      <div class="play" v-else @click="musicButtonClick()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M8 5v14l11-7z"/></svg>
      </div>
      <input type="range" min="1" max="100" :value="$store.state.musicController[selectedGuildId]?.volume ?? 100" @input="volumeChange($event.target.value)">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import io from 'socket.io-client';
import IOEvents from '@/models/events';
import { CreeperInfo, Guild, User } from '@/models/models';

export default defineComponent({
  name: 'DiscordController',
  components: {},
  data() {
    return {
      // socket: io('eldridge-pi.ddns.net:3000'),
      socket: io(process.env.VUE_APP_SOCKET_DOMAIN as string, {
        query: `token=${localStorage.getItem('token')}`,
      }).on('error', (error: SocketIOClient.Manager) => {
        console.error(`IO Error: ${JSON.stringify(error)}`);
      }),
      creeperInfo: {} as CreeperInfo,
      selectedGuildId: '' as string,
      queueInput: '',
    };
  },
  computed: {
    playing(): boolean {
      return this.$store.state.musicController[this.selectedGuildId]?.playing ?? false;
    },
    selectedGuild(): Guild | undefined {
      return this.creeperInfo.guilds?.find((guild) => guild.id === this.selectedGuildId);
    },
    sortedUsers(): User[] | undefined {
      return this.selectedGuild?.users.sort((user1, user2) => user1.username.localeCompare(user2.username));
    },
  },
  methods: {
    musicButtonClick() {
      console.log('button click');
      this.socket.emit(IOEvents.PLAY_PAUSE, { guildId: this.selectedGuildId, playing: this.playing });
      this.$store.commit('playing', { guildId: this.selectedGuildId, playing: !this.playing });
    },
    volumeChange(volume: number) {
      console.log(volume);
      this.socket.emit(IOEvents.VOLUME_CHANGE, { guildId: this.selectedGuildId, volume });
    },
    queueSong(input: string) {
      this.socket.emit('queue', { guildId: this.selectedGuildId, songName: input });
      this.queueInput = '';
    },
  },
  mounted() {
    this.socket.on(IOEvents.MESSAGE, (creeperInfo: CreeperInfo) => {
      this.creeperInfo = creeperInfo;
      console.log(creeperInfo);
      console.log('message');
    });
    this.socket.on(IOEvents.MUSIC_START, (guildId: string) => {
      console.log('music-start');
      this.$store.commit('musicStart', { guildId });
    });
    console.log('mounted');
  },
});
</script>

<style scoped lang="scss">
  @import '../styles/colors.scss';

  .discord-controller {
    display: grid;
    grid-auto-rows: 1fr min-content;
    grid-template-columns: min-content 1fr 1fr;
    height: 100%;
    background-color: $background-secondary;

    .guild-image-container {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      grid-row: span 2;
      grid-column: 1;
      background-color: $background-tertiary;

      .guild-image {
        width: 56px;
        height: auto;
        margin: 4px 12px 4px 12px;
        border-radius: 50%;
        cursor: pointer;

        &:hover {
          transform: scale(1.05);
          box-shadow: 0 0 6px 0 rgba(255, 255, 255, 0.6);
        }
      }
    }

    .user-container {
      grid-row: 1;
      grid-column: 2;
      overflow-y: auto;
      padding-left: 12px;
      background-color: $background-primary;

      .user {
        display: flex;
        align-items: center;
        margin: 12px 0;

        span {
          margin-left: 8px;
        }
      }

      .user-image {
        border-radius: 50%;
        width: 40px;
        height: auto;
      }
    }

    .music-container {
      grid-row: 2;
      grid-column: 2 / 4;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 12px 0;

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
    }

    .queue-container {
      grid-row: 1;
      grid-column: 3;
    }

    svg {
      display: block;
      height: 24px;
      width: auto;
    }
  }
</style>
