<template>
  <canvas id='canvas' width="1920" height='1080'></canvas>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { initWebgl } from './initWebgl'
import { initShader } from './initShader';
/**平行光 */
// import { vertexstring, fragmentstring, initBuffer } from './modules/parallel'
/**点光源 */
// import { vertexstring, fragmentstring, initBuffer } from './modules/point'
/**环境光 */
// import { vertexstring, fragmentstring, initBuffer } from './modules/ambient'
/**逐顶点光照 */
// import { vertexstring, fragmentstring, initBuffer } from './modules/byVertex'
/**逐片元光照 */
import { vertexstring, fragmentstring, initBuffer } from './modules/byFragment'



onMounted(() => {
  const webgl = initWebgl()
  const program = initShader(webgl, vertexstring, fragmentstring)!
  initBuffer(webgl, program)
})

</script>


<style lang="less" scoped>
</style>
