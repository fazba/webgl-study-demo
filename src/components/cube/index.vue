<template>
  <canvas id='canvas' width="1920" height='1080'></canvas>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { initWebgl } from './initWebgl'
import { initShader } from './initShader';
/**绘制正方体 */
// import { vertexstring, fragmentstring, initBuffer } from './modules/cube1'
/**绘制包含颜色的的正方体 */
// import { vertexstring, fragmentstring, initBuffer } from './modules/cube2'
/**绘制有纹理的正方体 */
// import { vertexstring, fragmentstring, initBuffer } from './modules/cube3'
/**让正方体动起来 */
import { vertexstring, fragmentstring, initBuffer, initEvent } from './modules/liveCube'




onMounted(() => {
  const webgl = initWebgl()
  initShader(webgl, vertexstring, fragmentstring)
  initBuffer(webgl)
  //鼠标事件
  initEvent(webgl)
})

</script>


<style lang="less" scoped>
</style>
