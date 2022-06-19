<template>
  <router-view></router-view>
</template>
<script setup lang="ts">

</script>
<style lang="less">
@import './assets/css/index.less';

.webgl-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  background-color: rgb(101, 145, 158);
  position: relative;
}

html,
body {
  width: 100%;
  height: 100%;
}
</style>
