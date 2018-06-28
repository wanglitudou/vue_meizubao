<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  }
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}

.date-picker-days i {
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
}
</style>
