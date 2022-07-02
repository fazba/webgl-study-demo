import { mat4 } from "gl-matrix";
import imgPath from '../container2_specular.png'

export const vertexstring = `
attribute vec4 a_position;
uniform mat4 u_formMatrix;
attribute vec4 a_color;
varying vec4 color;
attribute vec2 a_outUV;
varying vec2 v_inUV;
void main(void){
    gl_Position = u_formMatrix * a_position;
    color = a_color;
    v_inUV = a_outUV;
}
`;
export const fragmentstring = `
precision mediump float;
varying vec4 color;
uniform sampler2D texture;
varying vec2 v_inUV;
void main(void){
  gl_FragColor =texture2D(texture, v_inUV);
}
`;

let angle = 45;
let uniformTexture: WebGLUniformLocation
let texture: WebGLTexture

export function initBuffer(webgl: WebGLRenderingContext) {

  //    v6----- v5
  //   /|      /|
  //  v1------v0|
  //  | |     | |
  //  | |v7---|-|v4
  //  |/      |/
  //  v2------v3
  //顶点数据准备
  const arr = [
    /**前 */
    1, 1, 1, 1, 1, 1,
    -1, 1, 1, 1, 0, 1,
    - 1, -1, 1, 1, 0, 0,
    1, 1, 1, 1, 1, 1,
    - 1, - 1, 1, 1, 0, 0,
    1, - 1, 1, 1, 1, 0,
    /**右 */
    1, 1, -1, 1, 1, 1,
    1, 1, 1, 1, 0, 1,
    1, -1, 1, 1, 0, 0,
    1, 1, -1, 1, 1, 1,
    1, -1, 1, 1, 0, 0,
    1, -1, -1, 1, 1, 0,
    /**后 */
    -1, 1, -1, 1, 1, 1,
    1, 1, -1, 1, 0, 1,
    1, -1, -1, 1, 0, 0,
    -1, 1, -1, 1, 1, 1,
    1, -1, -1, 1, 0, 0,
    -1, -1, -1, 1, 1, 0,
    /**左 */
    -1, 1, 1, 1, 1, 1,
    -1, 1, -1, 1, 1, 0,
    -1, -1, -1, 1, 0, 0,
    -1, 1, 1, 1, 1, 1,
    -1, -1, -1, 1, 0, 0,
    -1, -1, 1, 1, 1, 0,
    /**上 */
    -1, 1, -1, 1, 0, 1,
    -1, 1, 1, 1, 0, 0,
    1, 1, 1, 1, 1, 0,
    -1, 1, -1, 1, 0, 1,
    1, 1, 1, 1, 1, 0,
    1, 1, -1, 1, 1, 1,
    /**下 */
    -1, -1, 1, 1, 0, 1,
    -1, -1, -1, 1, 0, 0,
    1, -1, -1, 1, 1, 0,
    -1, -1, 1, 1, 0, 1,
    1, -1, -1, 1, 1, 0,
    1, -1, 1, 1, 1, 1,
  ]

  let pointPosition = new Float32Array(arr);
  let aPsotion = webgl.getAttribLocation(webgl.program, "a_position");
  let triangleBuffer = webgl.createBuffer();
  webgl.bindBuffer(webgl.ARRAY_BUFFER, triangleBuffer);
  webgl.bufferData(webgl.ARRAY_BUFFER, pointPosition, webgl.STATIC_DRAW);
  webgl.enableVertexAttribArray(aPsotion);
  webgl.vertexAttribPointer(aPsotion, 4, webgl.FLOAT, false, 6 * 4, 0);

  let attribOutUV = webgl.getAttribLocation(webgl.program, "a_outUV");
  webgl.enableVertexAttribArray(attribOutUV);
  webgl.vertexAttribPointer(attribOutUV, 2, webgl.FLOAT, false, 6 * 4, 4 * 4);
  //矩阵变换
  let ProjMatrix = mat4.create();
  mat4.identity(ProjMatrix);
  const webglDiv = document.getElementById('canvas')!
  mat4.perspective(ProjMatrix, angle * Math.PI / 180, webglDiv.clientWidth / webglDiv.clientHeight, 1, 1000)    //修改可视域范围

  let uniformMatrix1 = webgl.getUniformLocation(webgl.program, "u_formMatrix");

  let ModelMatrix = mat4.create();
  mat4.identity(ModelMatrix);
  mat4.translate(ModelMatrix, ModelMatrix, [0, 0, 0]);

  let ViewMatrix = mat4.create();
  mat4.identity(ViewMatrix);
  mat4.lookAt(ViewMatrix, [5, 5, 5], [0, 0, 0], [0, 1, 0]);

  let mvMatrix = mat4.create();
  mat4.identity(mvMatrix);
  mat4.multiply(mvMatrix, ViewMatrix, ModelMatrix);

  let mvpMatrix = mat4.create();
  mat4.identity(mvpMatrix);
  mat4.multiply(mvpMatrix, ProjMatrix, mvMatrix);
  webgl.uniformMatrix4fv(uniformMatrix1, false, mvpMatrix)
  //纹理绘制
  uniformTexture = webgl.getUniformLocation(webgl.program, "texture")!;

  texture = initTexture(webgl, imgPath);



}

function initTexture(webgl: WebGLRenderingContext, imageFile: string) {
  let textureHandle = webgl.createTexture()!;
  textureHandle.image = new Image();
  textureHandle.image.src = imageFile;
  textureHandle.image.onload = function () {
    handleLoadedTexture(webgl, textureHandle)
  }
  return textureHandle;
}
function handleLoadedTexture(webgl: WebGLRenderingContext, texture: WebGLTexture) {


  webgl.bindTexture(webgl.TEXTURE_2D, texture);
  webgl.pixelStorei(webgl.UNPACK_FLIP_Y_WEBGL, 666);

  webgl.texImage2D(webgl.TEXTURE_2D, 0, webgl.RGBA, webgl.RGBA, webgl.UNSIGNED_BYTE, texture.image);
  webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MAG_FILTER, webgl.LINEAR);// 纹理放大方式
  webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MIN_FILTER, webgl.LINEAR);// 纹理缩小方式
  webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_S, webgl.CLAMP_TO_EDGE);// 纹理水平填充方式
  webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_T, webgl.CLAMP_TO_EDGE);// 纹理垂直填充方式

  debugger
  webgl.clearColor(0, 0, 0, 1);
  webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);
  webgl.enable(webgl.DEPTH_TEST);
  webgl.activeTexture(webgl.TEXTURE0);
  webgl.bindTexture(webgl.TEXTURE_2D, texture);
  webgl.uniform1i(uniformTexture, 0);
  webgl.drawArrays(webgl.TRIANGLES, 0, 36);
}