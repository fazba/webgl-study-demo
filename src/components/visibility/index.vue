<template>
  <canvas id='canvas' width="1920" height='1080'></canvas>
  <!-- <div id="text" style="font-size: 40px;">近裁切面:{{ near }} 远裁切面:{{ far }}</div> -->
  <div id="text" style="font-size: 40px;">视角为:{{ angle }}</div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { initWebgl } from './initWebgl'
import { initShader } from './initShader';
import { mat4 } from 'gl-matrix';

/**
 * 动态改变可视域范围
 *
 */
let webgl: WebGLRenderingContext
const near = ref(0)
const far = ref(50)
const angle = ref(160)

const vertexstring =/* glsl */ `
        attribute vec4 a_position;
        uniform mat4 u_formMatrix;
        uniform mat4 proj;
        attribute vec4 a_color;
        varying vec4 color;
        void main(void){
            gl_Position =  u_formMatrix * a_position;
            color = a_color;
        } `;
const fragmentstring = `
        precision mediump float;
        varying vec4 color;
        void main(void){
          gl_FragColor =color;
        }
        `;
function initBuffer(webgl: WebGLRenderingContext) {
  const ProjMatrix = mat4.create();
  mat4.identity(ProjMatrix);
  /**
   * 修改可视域范围
   */
  //正射投影
  // mat4.ortho(ProjMatrix, -100, 100, -100, 100, near.value, far.value)
  //透视投影
  const webglDiv = document.getElementById('canvas')
  mat4.perspective(ProjMatrix, angle.value * Math.PI / 180, webglDiv!.clientWidth / webglDiv!.clientHeight, 1, 100)



  const arr = [
    0.0, 70, -40, 1, 1, 0, 0, 1,
    -50, -30, -40, 1, 1, 0, 0, 1, // 绿色
    50, -30, -40, 1, 1, 0, 0, 1,

    50, 40, -20, 1, 1.0, 1.0, 0.4, 1,
    -50, 40, -20, 1, 1.0, 1.0, 0.4, 1,
    0.0, -60, -20, 1, 1.0, 1.0, 0.4, 1,// 黄色

    0.0, 50, 0.0, 1, 0.4, 0.4, 1.0, 1,
    -50, -50, 0.0, 1, 0.4, 0.4, 1.0, 1,
    50, -50, 0.0, 1, 0.4, 0.4, 1.0, 1, // 蓝色
  ]
  //
  let pointPosition = new Float32Array(arr);
  let aPsotion = webgl.getAttribLocation(webgl.program, "a_position");
  let triangleBuffer = webgl.createBuffer();
  webgl.bindBuffer(webgl.ARRAY_BUFFER, triangleBuffer);
  webgl.bufferData(webgl.ARRAY_BUFFER, pointPosition, webgl.STATIC_DRAW);
  webgl.enableVertexAttribArray(aPsotion);
  webgl.vertexAttribPointer(aPsotion, 4, webgl.FLOAT, false, 8 * 4, 0);
  let aColor = webgl.getAttribLocation(webgl.program, "a_color");
  webgl.enableVertexAttribArray(aColor);
  webgl.vertexAttribPointer(aColor, 4, webgl.FLOAT, false, 8 * 4, 4 * 4);
  let uniformMatrix1 = webgl.getUniformLocation(webgl.program, "u_formMatrix");
  //赋值
  webgl.uniformMatrix4fv(uniformMatrix1, false, ProjMatrix)
}
function handleKeyDown(event: KeyboardEvent) {
  //正射投影
  // if (String.fromCharCode(event.keyCode) == 'W') {
  //   near.value += 1;
  // }
  // else if (String.fromCharCode(event.keyCode) == 'S') {
  //   near.value -= 1;
  // }
  // else if (String.fromCharCode(event.keyCode) == 'A') {
  //   far.value -= 1;
  // }
  // else if (String.fromCharCode(event.keyCode) == 'D') {
  //   far.value += 1;
  // }
  //透视投影
  if (String.fromCharCode(event.keyCode) == 'W') {
    angle.value += 1;
  }
  else if (String.fromCharCode(event.keyCode) == 'S') {
    angle.value -= 1;
  }
  initBuffer(webgl);
  draw(webgl);

}

function draw(webgl: WebGLRenderingContext) {
  webgl.clearColor(0.0, 1.0, 0.0, 1.0);
  webgl.clear(webgl.COLOR_BUFFER_BIT);
  webgl.drawArrays(webgl.TRIANGLES, 0, 9);
}
onMounted(() => {
  webgl = initWebgl()
  initShader(webgl, vertexstring, fragmentstring)
  initBuffer(webgl)
  draw(webgl);
  document.onkeydown = handleKeyDown;
})

</script>


<style lang="less" scoped>
</style>
