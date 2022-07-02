<template>
  <canvas id='canvas' width="1920" height='1080'></canvas>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { initWebgl } from './initWebgl'
import { initShader } from './initShader';
/**绘制不穿衣服的正方体 */
// import { vertexstring, fragmentstring, initBuffer } from './modules/cube1'
/**绘制穿简陋衣服的正方体 */
// import { vertexstring, fragmentstring, initBuffer } from './modules/cube2'
/**绘制穿衣服的正方体 */
import { vertexstring, fragmentstring, initBuffer } from './modules/cube3'




onMounted(() => {
  const webgl = initWebgl()
  initShader(webgl, vertexstring, fragmentstring)
  initBuffer(webgl)
})

</script>


<style lang="less" scoped>
</style>
