<template>
  <Menu>
  </Menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Menu from '@/components/Menu.vue';

export default defineComponent({
  name: 'App',
  components: {
    Menu,
  },
});
</script>

<style lang="scss">
@import './styles/colors.scss';

html, body {
  margin: 0;
  padding: 0;
  background-color: $background-tertiary;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $white;
}
</style>
