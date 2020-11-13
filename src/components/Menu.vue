<template>
  <div class="menu">
    <h5>The Electric Boogaloo</h5>
    <div class="menu-buttons">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 13H5v-2h14v2z"/></svg>
      </div>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M18 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H6V6h12v12z"/></svg>
      </div>
      <div class="exit">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

// @ts-ignore
window.ipcRenderer.invoke('get-os').then((result) => console.log(result));

export default defineComponent({
  name: 'Menu',
  props: {
    msg: String,
  },
});
</script>
<style scoped lang="scss">
  @import '../styles/colors.scss';

  .menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: $background-primary;
    height: 24px;
    padding: 0 0 0 10px;

    h5 {
      margin: 0;
    }

    .menu-buttons {
      display: flex;
      align-items: stretch;
      min-height: 100%;

      div {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 36px;

        &:hover {
          background-color: $background-secondary;
        }

        &.exit:hover {
          background-color: red;
        }

        svg {
          fill: white;
          height: 18px;
          width: auto;
        }
      }
    }
  }
</style>
