<template>
  <canvas id='canvas' width="1920" height='1080'></canvas>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { initWebgl } from './initWebgl'
import { initShader } from './initShader';
/**平行光 */
import { vertexstring, fragmentstring, initBuffer } from './modules/parallel'
/**平行光 */
// import { vertexstring, fragmentstring, initBuffer } from './modules/point'



onMounted(() => {
  const webgl = initWebgl()
  initShader(webgl, vertexstring, fragmentstring)
  initBuffer(webgl)
})

</script>


<style lang="less" scoped>
</style>
