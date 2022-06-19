<template>
  <canvas id='canvas' width="1920" height='1080'></canvas>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { initWebgl } from './initWebgl'
import { initShader } from './initShader';
/**平移 */
// import initBuffer from './modules/move'
/**缩放 */
// import initBuffer from './modules/scale'
/**旋转 */
// import initBuffer from './modules/rotate'
/**模拟时钟 */
import { initBuffer1, initBuffer2, initBuffer3 } from './modules/bell'


const vertexstring = `
  attribute vec4 a_position;
  uniform mat4 u_formMatrix;
  void main(void){
    gl_Position =u_formMatrix * a_position;
  }
  `;
const fragmentstring = `
  precision mediump float;
  void main(void){
    gl_FragColor =vec4(1.0,1.0,0.0,1.0);
  }
  `;
let count = 0;
//实现bell
function tick(webgl: WebGLRenderingContext) {
  setTimeout(() => tick(webgl), 1000);

  initBuffer1(webgl, count);
  initBuffer2(webgl, count);
  initBuffer3(webgl, count);
  count = count + 1;
};
//其他变化
// function tick(webgl: WebGLRenderingContext) {
//   requestAnimationFrame(() => tick(webgl))
//   draw(webgl);
// };
function draw(webgl: WebGLRenderingContext) {
  webgl.clearColor(0.0, 1.0, 0.0, 1.0);
  webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);
  webgl.enable(webgl.DEPTH_TEST);
  //纹理变动
  let uniformAnim: WebGLUniformLocation | null
  uniformAnim = webgl.getUniformLocation(webgl.program, "anim");
  count = count + 0.01;
  webgl.uniform1f(uniformAnim, count);

  webgl.drawArrays(webgl.TRIANGLES, 0, 6);
}

onMounted(() => {
  const webgl = initWebgl()
  initShader(webgl, vertexstring, fragmentstring)
  // initBuffer(webgl)
  tick(webgl)
})

</script>


<style lang="less" scoped>
</style>
