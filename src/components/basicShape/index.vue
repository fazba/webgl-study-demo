<template>
  <canvas id='canvas' width="1920" height='1080'></canvas>
</template>
<script setup lang="ts">
import { mat4 } from "gl-matrix";
import { onMounted, } from 'vue';
import { initShader } from './initShader'
import { initWebgl } from './initWebgl'
// 绘制点
import { initBuffer, draw, vertexstring, fragmentstring } from './module/point'

//绘制动态点
// import {   initBuffer, draw, vertexstring, fragmentstring } from './module/dynamicPoint.js'

//动态绘制点并根据详细自定义颜色
// import { initBuffer, draw, vertexstring, fragmentstring } from './module/customColorPoint.js'

//绘制线、三角形
// import { initBuffer, draw, vertexstring, fragmentstring } from './module/line.js'

//绘制多个三角形
// import { initBuffer, draw, vertexstring, fragmentstring } from './module/multipleTriangle'
//绘制多边形
// import { initBuffer, draw, vertexstring, fragmentstring } from './module/polygon.js'

//旋转
// import { initBuffer, draw, vertexstring, fragmentstring } from './module/rotate'






/**投影矩阵 */
onMounted(() => {
  const webgl = initWebgl();  //webgl初始化
  initShader(webgl, vertexstring, fragmentstring); //着色器初始化
  initBuffer(webgl); //数据缓冲区初始化
  draw(webgl); //绘制
})



</script>


<style lang="less" scoped>
</style>
