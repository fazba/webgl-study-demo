<template>
  <canvas id='canvas' width="1920" height='1080'></canvas>
</template>
<script setup lang="ts">
import { onMounted, } from 'vue';
import { initShader } from './initShader'
import { initWebgl } from './initWebgl'
// 绘制点
// import { initBuffer, draw, vertexstring, fragmentstring } from './module/point'

//绘制动态点并根据详细自定义颜色
// import { initBuffer, draw, vertexstring, fragmentstring } from './module/customPoint'

//绘制线、三角形
import { initBuffer, draw, vertexstring, fragmentstring } from './module/line'

//绘制多个三角形
// import { initBuffer, draw, vertexstring, fragmentstring } from './module/multipleTriangle'
//绘制多边形
// import { initBuffer, draw, vertexstring, fragmentstring } from './module/polygon.js'

//旋转
// import { initBuffer, draw, vertexstring, fragmentstring } from './module/rotate'






/**投影矩阵 */
onMounted(() => {
  const webgl = initWebgl();  //webgl初始化
  const program = initShader(webgl, vertexstring, fragmentstring); //着色器初始化
  initBuffer(webgl, program!); //数据缓冲区初始化
  draw(webgl); //绘制
})



</script>


<style lang="less" scoped>
</style>
