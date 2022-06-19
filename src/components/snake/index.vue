<template>
  <canvas id='canvas' width="1920" height='1080'></canvas>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { initShader } from './initShader'
import { initWebgl } from './initWebgl'


const vertexstring = `
   attribute vec3 a_position;
   uniform float anglex;
   uniform float angley;
   void main(){
     //写上平移公式
    gl_Position = vec4(a_position.x+anglex,a_position.y+angley,0,1.0);
   }
   `;
const fragmentstring = `
   precision mediump float;
   void main(){
    gl_FragColor =  vec4(0.0,0.0,1.0,1.0);
   }
   `;
let angley = 0;
let anglex = 0;
// let count = 0
function initBuffer(webgl: WebGLRenderingContext) {
  // count = Math.PI
  const arr = [
    0.1, 0.4, 0,
    0.1, 0.5, 0,
    0.2, 0.4, 0
  ];
  const floatArr = new Float32Array(arr);
  const buffer = webgl.createBuffer();
  webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
  webgl.bufferData(webgl.ARRAY_BUFFER, floatArr, webgl.STATIC_DRAW);

  const a_Position = webgl.getAttribLocation(webgl.program, "a_position");
  webgl.vertexAttribPointer(a_Position, 3, webgl.FLOAT, false, 0, 0);
  webgl.enableVertexAttribArray(a_Position);
  const anglexShader = webgl.getUniformLocation(webgl.program, "anglex");
  const angleyShader = webgl.getUniformLocation(webgl.program, "angley");
  webgl.uniform1f(anglexShader, anglex);
  webgl.uniform1f(angleyShader, angley);
}
function initEvent() {
  document.onkeydown = handleKeyDown;
}
function handleKeyDown(event: KeyboardEvent) {
  if (event.key.toUpperCase() == 'W') {
    angley += 0.01;
  }
  else if (event.key.toUpperCase() == 'S') {
    angley -= 0.01;
  }
  else if (event.key.toUpperCase() == 'A') {
    anglex -= 0.01;
  }
  else if (event.key.toUpperCase() == 'D') {
    anglex += 0.01;
  }

}
function draw(webgl: WebGLRenderingContext) {
  webgl.clearColor(0.3, 0.5, 0.2, 1.0);
  webgl.clear(webgl.COLOR_BUFFER_BIT);
  webgl.drawArrays(webgl.TRIANGLES, 0, 3);
}

function update(webgl: WebGLRenderingContext) {
  initBuffer(webgl); //数据缓冲区初始化
  draw(webgl); //绘制
  requestAnimationFrame(() => update(webgl))
}
onMounted(() => {
  initEvent()
  const webgl = initWebgl();  //webgl初始化
  initShader(webgl, vertexstring, fragmentstring); //着色器初始化
  update(webgl)
})



</script>


<style lang="less" scoped>
</style>
