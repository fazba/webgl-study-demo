<template>
  <canvas id='canvas' width="1920" height='1080'></canvas>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { initWebgl } from './initWebgl'
import { initShader } from './initShader';
import { initBuffer } from './initBuffer';

/**
 * 1. 隐藏面消除
 * 2. 深度冲突
 */

const vertexstring = `
        attribute vec4 a_position;
        uniform mat4 u_formMatrix;
        uniform mat4 proj;
        attribute vec4 a_color;
        varying vec4 color;
        void main(void){
            gl_Position =   u_formMatrix * a_position;
            color = a_color;
        }
        `;
const fragmentstring = `
        precision mediump float;
        varying vec4 color;
        void main(void){
          gl_FragColor =color;
        }
        `;

/** 测试隐藏面消除*/
const arr = [
  0.0, 100, -35.0, 1, 0.4, 0.4, 1.0, 1,
  -50, -100, -35.0, 1, 0.4, 0.4, 1.0, 1,
  50, -100, -35.0, 1, 0.4, 0.4, 1.0, 1, // 蓝色


  0, 100, -60, 1, 1.0, 1.0, 0.4, 1,
  -50, -100, -60, 1, 1.0, 1.0, 0.4, 1,
  50, -100, -60, 1, 1.0, 1.0, 0.4, 1,// 黄色


  0.0, 100, -80, 1, 1, 0, 0, 1,
  -50, -100, -80, 1, 1, 0, 0, 1, // 红色
  50, -100, -80, 1, 1, 0, 0, 1,
]
/**测试深度冲突 */
const arr_Z = [
  0.0, 50, -60.0, 1, 0.4, 0.4, 1.0, 1,
  -50, -100, -60.0, 1, 0.4, 0.4, 1.0, 1,
  50, -100, -60.0, 1, 0.4, 0.4, 1.0, 1, // 蓝色


  0, 60, -60.0, 1, 1.0, 1.0, 0.4, 1,
  -50, -100, -60.0, 1, 1.0, 1.0, 0.4, 1,
  50, -100, -60.0, 1, 1.0, 1.0, 0.4, 1,// 黄色
]

function draw(webgl: WebGLRenderingContext) {
  webgl.clearColor(0.0, 1.0, 0.0, 1.0);
  webgl.clear(webgl.COLOR_BUFFER_BIT);

  /** 开启隐藏面消除，解决画家算法问题*/
  webgl.clear(webgl.DEPTH_BUFFER_BIT);
  webgl.enable(webgl.DEPTH_TEST);
  // webgl.drawArrays(webgl.TRIANGLES, 0, 9);

  /**开启深度冲突偏移 */
  // webgl.enable(webgl.POLYGON_OFFSET_FILL); //启用多边形偏移
  webgl.drawArrays(webgl.TRIANGLES, 0, 3);
  // webgl.polygonOffset(1.0, 1.0);   //偏移量参数
  webgl.drawArrays(webgl.TRIANGLES, 3, 6);

}
onMounted(() => {
  const webgl = initWebgl()
  initShader(webgl, vertexstring, fragmentstring)
  //
  // initBuffer(webgl, arr)
  initBuffer(webgl, arr_Z)
  draw(webgl)
})

</script>


<style lang="less" scoped>
</style>
