<template>
  <div class="watch-list">
    <div>
      <p>test</p>
      <p>test</p>
      <p>test</p>
    </div>
    <div class="separator"></div>
    <div>
      <p>test</p>
      <p>test</p>
      <p>test</p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WatchList',
  data() {
    return {};
  },
});
</script>

<style scoped lang="scss">
@import "~@/styles/colors.scss";

.watch-list {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr min-content 1fr;
  height: 400px;
  width: 600px;
  padding: 10px 20px;

  border: 1px solid $white;
  border-radius: 4px;

  .separator {
    width: 1px;
    margin: 10px 20px;
    background-color: $white;
  }
}
</style>
