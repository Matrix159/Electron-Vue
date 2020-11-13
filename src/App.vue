<template>
  <DiscordController/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Menu from '@/components/Menu.vue';
import DiscordController from '@/components/DiscordController.vue';

export default defineComponent({
  name: 'App',
  components: {
    DiscordController,
  },
});
</script>

<style lang="scss">
@import './styles/colors.scss';

html, body {
  margin: 0;
  padding: 0;
  background-color: $background-tertiary;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $white;
  height: 100%;
}
</style>
