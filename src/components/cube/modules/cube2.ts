import { mat4 } from "gl-matrix";

export const vertexstring = `
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
export const fragmentstring = `
precision mediump float;
varying vec4 color;
void main(void){
  gl_FragColor =color;
}
`;

let angle = 45;

export function initBuffer(webgl: WebGLRenderingContext) {

  //    v6----- v5
  //   /|      /|
  //  v1------v0|
  //  | |     | |
  //  | |v7---|-|v4
  //  |/      |/
  //  v2------v3

  const arr = [
    /**前面 */
    1, 1, 1, 1, 1.0, 1.0, 1.0, 1.0, //4个坐标，4个颜色
    -1, 1, 1, 1, 1.0, 1.0, 1.0, 1.0,
    -1, -1, 1, 1, 1.0, 1.0, 1.0, 1.0,
    1, 1, 1, 1, 1.0, 1.0, 1.0, 1.0,
    -1, -1, 1, 1, 1.0, 1.0, 1.0, 1.0,
    1, -1, 1, 1, 1.0, 1.0, 1.0, 1.0,
    /**右 */
    1, 1, -1, 1, 0.0, 1.0, 1.0, 1.0,
    1, 1, 1, 1, 0.0, 1.0, 1.0, 1.0,
    1, -1, 1, 1, 0.0, 1.0, 1.0, 1.0,
    1, 1, -1, 1, 0.0, 1.0, 1.0, 1.0,
    1, -1, 1, 1, 0.0, 1.0, 1.0, 1.0,
    1, -1, -1, 1, 0.0, 1.0, 1.0, 1.0,
    /**后 */
    -1, 1, -1, 1, 1.0, 0.0, 0.0, 1.0,
    1, 1, -1, 1, 1.0, 0.0, 0.0, 1.0,
    1, -1, -1, 1, 1.0, 0.0, 0.0, 1.0,
    -1, 1, -1, 1, 1.0, 0.0, 0.0, 1.0,
    1, -1, -1, 1, 1.0, 0.0, 0.0, 1.0,
    -1, -1, -1, 1, 1.0, 0.0, 0.0, 1.0,
    /**左 */
    -1, 1, 1, 1, 1.0, 1.0, 1, 1.0,
    -1, 1, -1, 1, 1.0, 1.0, 1, 1.0,
    -1, -1, -1, 1, 1.0, 1.0, 1, 1.0,
    -1, 1, 1, 1, 1.0, 1.0, 1, 1.0,
    -1, -1, -1, 1, 1.0, 1.0, 1, 1.0,
    -1, -1, 1, 1, 1.0, 1.0, 1, 1.0,
    /**上 */
    -1, 1, -1, 1, 0.0, 1.0, 1.0, 1.0,
    -1, 1, 1, 1, 0.0, 1.0, 1.0, 1.0,
    1, 1, 1, 1, 0.0, 1.0, 1.0, 1.0,
    -1, 1, -1, 1, 0.0, 1.0, 1.0, 1.0,
    1, 1, 1, 1, 0.0, 1.0, 1.0, 1.0,
    1, 1, -1, 1, 0.0, 1.0, 1.0, 1.0,
    /**下 */
    -1, -1, 1, 1, 1.0, 1.0, 0, 1.0,
    -1, -1, -1, 1, 1.0, 1.0, 0, 1.0,
    1, -1, -1, 1, 1.0, 1.0, 0, 1.0,
    -1, -1, 1, 1, 1.0, 1.0, 0, 1.0,
    1, -1, -1, 1, 1.0, 1.0, 0, 1.0,
    1, -1, 1, 1, 1.0, 1.0, 0, 1.0,
  ]

  let pointPosition = new Float32Array(arr);
  let aPsotion = webgl.getAttribLocation(webgl.program, "a_position");
  let triangleBuffer = webgl.createBuffer();
  webgl.bindBuffer(webgl.ARRAY_BUFFER, triangleBuffer);
  webgl.bufferData(webgl.ARRAY_BUFFER, pointPosition, webgl.STATIC_DRAW);
  webgl.enableVertexAttribArray(aPsotion);
  webgl.vertexAttribPointer(aPsotion, 4, webgl.FLOAT, false, 8 * 4, 0);
  let aColor = webgl.getAttribLocation(webgl.program, "a_color");
  webgl.enableVertexAttribArray(aColor);
  //变量，需要4个点，浮点型，是否转置，8个点每个需要4个字节，偏移量：数组中第几个开始算
  webgl.vertexAttribPointer(aColor, 4, webgl.FLOAT, false, 8 * 4, 4 * 4);


  let ProjMatrix = mat4.create();
  mat4.identity(ProjMatrix);
  const webglDiv = document.getElementById('canvas')!
  mat4.perspective(ProjMatrix, angle * Math.PI / 180, webglDiv.clientWidth / webglDiv.clientHeight, 1, 1000)    //修改可视域范围

  let uniformMatrix1 = webgl.getUniformLocation(webgl.program, "u_formMatrix");


  let ModelMatrix = mat4.create();
  mat4.identity(ModelMatrix);
  mat4.translate(ModelMatrix, ModelMatrix, [1, 0, 0]);

  let ViewMatrix = mat4.create();
  mat4.identity(ViewMatrix);
  mat4.lookAt(ViewMatrix, [5, 5, 5], [0, 0, 0], [0, 0, 1]);

  let mvMatrix = mat4.create();
  mat4.identity(mvMatrix);
  mat4.multiply(mvMatrix, ViewMatrix, ModelMatrix);

  let mvpMatrix = mat4.create();
  mat4.identity(mvpMatrix);
  mat4.multiply(mvpMatrix, ProjMatrix, mvMatrix);
  webgl.uniformMatrix4fv(uniformMatrix1, false, mvpMatrix)


  webgl.clearColor(0, 0, 0, 1);
  webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);
  webgl.enable(webgl.DEPTH_TEST);
  webgl.drawArrays(webgl.TRIANGLES, 0, 36);




}