<template>
  <canvas id='canvas' width="1920" height='1080'></canvas>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { initWebgl } from './initWebgl'
import { initShader } from './initShader';
/**单节点绘制 */
// import { vertexstring, fragmentstring, init } from './modules/singleNode'
/**多节点绘制 */
import { vertexstring, fragmentstring, init } from './modules/multipleNode'



onMounted(() => {
  const webgl = initWebgl()
  const program = initShader(webgl, vertexstring, fragmentstring)!
  init(webgl, program)
})

</script>


<style lang="less" scoped>
</style>
