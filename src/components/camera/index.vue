<template>
  <canvas id='canvas' width="1920" height='1080'></canvas>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';

/**视点改变影响三维展示效果 */
import { init } from './modules/changeEyes'





onMounted(() => {
  init()
})




</script>


<style lang="less" scoped>
</style>
