<template>
  <canvas id='canvas' width="1920" height='1080'></canvas>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { initShader } from './initShader'
import { initWebgl } from './initWebgl'


const vertexstring = `
    attribute vec3 a_position;
    //1、用算数方法写平移公式
    uniform float deltaX;
    uniform float deltaY;
    //2、用矩阵方法写平移公式的变量
    uniform   mat4 proj;
    void main(){
      //1、用算数方法写平移公式
      gl_Position = vec4(a_position.x+deltaX,a_position.y+deltaY,0,1.0);
      //2、用矩阵方法写平移公式的变量??
      // gl_Position =proj*vec4(a_position,1.0);
    }
   `;
const fragmentstring = `
  precision mediump float;
  void main(){
    gl_FragColor =  vec4(0.0,0.0,1.0,1.0);
  }
   `;
let deltaX = 0;
let deltaY = 0;
function initBuffer(webgl: WebGLRenderingContext, program: WebGLProgram) {
  const arr = [
    0.1, 0.4, 0,
    0.1, 0.5, 0,
    0.2, 0.4, 0
  ];
  const vertexArr = new Float32Array(arr);
  const buffer = webgl.createBuffer();
  webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
  webgl.bufferData(webgl.ARRAY_BUFFER, vertexArr, webgl.STATIC_DRAW);
  const a_Position = webgl.getAttribLocation(program, "a_position");
  webgl.vertexAttribPointer(a_Position, 3, webgl.FLOAT, false, 0, 0);
  webgl.enableVertexAttribArray(a_Position);
  /**
 * 1、用算数方法写平移公式的变量
 */
  const anglexShader = webgl.getUniformLocation(program, "deltaX");
  const angleyShader = webgl.getUniformLocation(program, "deltaY");
  webgl.uniform1f(anglexShader, deltaX);
  webgl.uniform1f(angleyShader, deltaY);
  /**
 * 2、用矩阵方法写平移公式的变量
 */
  /**uniform   mat4 proj */
  const uniformProj = webgl.getUniformLocation(program, "proj");
  const projMat4 = [
    1, 0, 0, deltaX,
    0, 1, 0, deltaY,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]
  webgl.uniformMatrix4fv(uniformProj, false, projMat4)
}
function initEvent() {
  document.onkeydown = handleKeyDown;
}
function handleKeyDown(event: KeyboardEvent) {
  if (event.key.toUpperCase() == 'W') {
    deltaY += 0.01;
  }
  else if (event.key.toUpperCase() == 'S') {
    deltaY -= 0.01;
  }
  else if (event.key.toUpperCase() == 'A') {
    deltaX -= 0.01;
  }
  else if (event.key.toUpperCase() == 'D') {
    deltaX += 0.01;
  }
}
function draw(webgl: WebGLRenderingContext) {
  webgl.clearColor(0.3, 0.5, 0.2, 1.0);
  webgl.clear(webgl.COLOR_BUFFER_BIT);
  webgl.drawArrays(webgl.TRIANGLES, 0, 3);
}

function update(webgl: WebGLRenderingContext, program: WebGLProgram) {
  initBuffer(webgl, program); //数据缓冲区初始化
  draw(webgl); //绘制
  requestAnimationFrame(() => update(webgl, program))
}
onMounted(() => {
  initEvent()
  const webgl = initWebgl();  //webgl初始化
  const program = initShader(webgl, vertexstring, fragmentstring)!; //着色器初始化
  update(webgl, program)
})



</script>


<style lang="less" scoped>
</style>
