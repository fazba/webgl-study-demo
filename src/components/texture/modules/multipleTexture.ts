import { onMounted } from 'vue';
import { vec3, mat4, quat4 } from '@/utils/glMatrix-0.9.6.min.js'
import { initShader } from '../initShader'
import { initWebgl } from '../initWebgl'
import fogUrl from '../img/fog.png'
import imgUrl from "../img/山水图像纹理映射.png"

export default function () {

  onMounted(() => {
    webglStart()
  })

  let vertexstring = `
  attribute vec4 a_position;
  uniform   mat4    proj;
  attribute vec2 outUV;
  varying vec2 inUV;
  void main(void){
      gl_Position =  a_position;
      inUV = outUV;
  }
  `;
  let fragmentstring = `
  precision mediump float;
  uniform sampler2D texture;
  uniform sampler2D texture1;
  uniform float anim;
  varying vec2 inUV;
  void main(void){
    vec4 color1 =texture2D(texture,inUV);
    vec4 color2 =texture2D(texture1, vec2(inUV.x + anim, inUV.y));

    gl_FragColor = color1 + color2 ;
  }
  `;
  const projMat4 = mat4.create();
  /**纹理变量 */
  let uniformTexture: WebGLUniformLocation
  let uniformTexture1: WebGLUniformLocation
  let uniformAnim: WebGLUniformLocation
  let count = 0;
  let texture0: WebGLTexture;
  let texture1: WebGLTexture;
  function webglStart() {
    const webgl = init();
    tick(webgl);
  }
  const requestAnimFrame: any = (function () {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback, element) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();
  function tick(webgl: WebGLRenderingContext) {
    requestAnimFrame(() => tick(webgl))
    draw(webgl);
  };
  function init() {
    const webgl = initWebgl(mat4, projMat4);
    initShader(webgl, vertexstring, fragmentstring);
    initBuffer(webgl, projMat4);
    return webgl
  }
  function initBuffer(webgl: WebGLRenderingContext, projMat4: any) {
    /**
     * 2个三角形绘制成一个正方形
     *
     *
     */
    const arr = [

      //webgl坐标：x,y,z,1    纹理坐标：x,y
      -0.5, -0.5, 0, 1, 0, 0,
      -0.5, 0.5, 0, 1, 0, 1,
      0.5, 0.5, 0, 1, 1, 1,
      0.5, -0.5, 0, 1, 1, 0,

      // -0.5, -0.5, 0, 1,      1, 1,
      // -0.5, 0.5, 0, 1,       0, 1,
      // 0.5, 0.5, 0, 1,        0, 0,
      // 0.5, -0.5, 0, 1,       1, 0,

    ]
    const index = [
      0, 1, 2,
      2, 0, 3
    ];
    const pointPosition = new Float32Array(arr);
    const aPsotion = webgl.getAttribLocation(webgl.program, "a_position");
    const triangleBuffer = webgl.createBuffer();
    webgl.bindBuffer(webgl.ARRAY_BUFFER, triangleBuffer);
    webgl.bufferData(webgl.ARRAY_BUFFER, pointPosition, webgl.STATIC_DRAW);
    webgl.enableVertexAttribArray(aPsotion);
    webgl.vertexAttribPointer(aPsotion, 4, webgl.FLOAT, false, 6 * 4, 0);

    let uniformProj = webgl.getUniformLocation(webgl.program, "proj");
    webgl.uniformMatrix4fv(uniformProj, false, projMat4);

    const attribOutUV = webgl.getAttribLocation(webgl.program, "outUV");
    webgl.enableVertexAttribArray(attribOutUV);
    webgl.vertexAttribPointer(attribOutUV, 2, webgl.FLOAT, false, 6 * 4, 4 * 4);

    let indexarr = new Uint8Array(index)
    let indexBuffer = webgl.createBuffer();
    webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    webgl.bufferData(webgl.ELEMENT_ARRAY_BUFFER, indexarr, webgl.STATIC_DRAW);


    uniformTexture = webgl.getUniformLocation(webgl.program, "texture")!
    uniformTexture1 = webgl.getUniformLocation(webgl.program, "texture1")!

    texture1 = initTexture(webgl, fogUrl);
    texture0 = initTexture(webgl, imgUrl);
    // webgl.bindTexture(webgl.TEXTURE_2D, texture0);
    // webgl.bindTexture(webgl.TEXTURE_2D, texture1);


  }
  function handleLoadedTexture(webgl: WebGLRenderingContext, texture: WebGLTexture) {
    webgl.bindTexture(webgl.TEXTURE_2D, texture);
    /**
     *
     * 将y轴坐标反转
     */
    webgl.pixelStorei(webgl.UNPACK_FLIP_Y_WEBGL, 666);
    //
    webgl.texImage2D(webgl.TEXTURE_2D, 0, webgl.RGBA, webgl.RGBA, webgl.UNSIGNED_BYTE, texture.image);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MAG_FILTER, webgl.LINEAR);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MIN_FILTER, webgl.LINEAR);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_S, webgl.REPEAT);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_T, webgl.REPEAT);

    // webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_S, webgl.CLAMP_TO_EDGE);
    // webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_T, webgl.CLAMP_TO_EDGE);

  }
  function initTexture(webgl: WebGLRenderingContext, imageFile: string) {
    // function initTexture(imageFile, num) {
    const textureHandle = webgl.createTexture()!;
    textureHandle.image = new Image();
    textureHandle.image.src = imageFile;
    textureHandle.image.onload = function () {
      handleLoadedTexture(webgl, textureHandle)
      // handleLoadedTexture(textureHandle, num)
    }
    return textureHandle;
  }
  function draw(webgl: WebGLRenderingContext) {
    webgl.clearColor(0.3, 0.5, 0.3, 1.0);
    webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);
    webgl.enable(webgl.DEPTH_TEST);
    //纹理变动
    uniformAnim = webgl.getUniformLocation(webgl.program, "anim")!
    count = count + 0.01;
    webgl.uniform1f(uniformAnim, count);
    webgl.activeTexture(webgl.TEXTURE0);
    webgl.bindTexture(webgl.TEXTURE_2D, texture0);
    webgl.uniform1i(uniformTexture, 0);

    webgl.activeTexture(webgl.TEXTURE1);
    webgl.bindTexture(webgl.TEXTURE_2D, texture1);
    webgl.uniform1i(uniformTexture1, 1);
    webgl.drawElements(webgl.TRIANGLES, 6, webgl.UNSIGNED_BYTE, 0);
  }
}