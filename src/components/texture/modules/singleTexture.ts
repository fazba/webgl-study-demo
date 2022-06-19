import { onMounted } from 'vue';
import { vec3, mat4, quat4 } from '@/utils/glMatrix-0.9.6.min.js'
import { initShader } from '../initShader'
import { initWebgl } from '../initWebgl'
import imgUrl from '../img/point64.png'

export default function () {


  const vertexstring = `
  attribute vec4 a_position;
  uniform     mat4    proj;
  void main(void){
    gl_Position =proj *  a_position;
    gl_PointSize=64.0;
  }
`;
  const fragmentstring = `
  precision mediump float;
  uniform sampler2D texture;
  void main(void){
    vec4 color =texture2D(texture,gl_PointCoord);
    //如果透明就不绘制
    if(color.a < 0.1)
      discard;
    gl_FragColor = color;
  }
`;
  const projMat4 = mat4.create();
  /**纹理变量 */
  let uniformTexture: any;
  let textureHandle: any;
  function initBuffer(webgl: WebGLRenderingContext, projMat4: any) {
    const pointPosition = new Float32Array([100.0, 100.0, 0.0, 1.0, 100.0, 200.0, 0.0, 1.0, 200.0, 200.0, 0.0, 1.0]);
    const aPsotion = webgl.getAttribLocation(webgl.program, "a_position");
    const triangleBuffer = webgl.createBuffer();
    webgl.bindBuffer(webgl.ARRAY_BUFFER, triangleBuffer);
    webgl.bufferData(webgl.ARRAY_BUFFER, pointPosition, webgl.STATIC_DRAW);
    webgl.enableVertexAttribArray(aPsotion);
    webgl.vertexAttribPointer(aPsotion, 4, webgl.FLOAT, false, 16, 0);
    const uniformProj = webgl.getUniformLocation(webgl.program, "proj");
    webgl.uniformMatrix4fv(uniformProj, false, projMat4);
    /**
     * 纹理制作
     */
    uniformTexture = webgl.getUniformLocation(webgl.program, "texture");

    /**开启混合 */
    webgl.enable(webgl.BLEND);
    /**
     * 混合函数
     * 混合颜色公式：rgba=(sourceColor * sfactor)+(destinationColor * dfactor)
     * rgba的值在0到1之间
     *  */
    webgl.blendFunc(webgl.SRC_ALPHA, webgl.ONE_MINUS_SRC_ALPHA);
    console.log(imgUrl)
    initTexture(webgl, imgUrl);


  }
  function handleLoadedTexture(webgl: WebGLRenderingContext, texture: WebGLTexture) {
    webgl.bindTexture(webgl.TEXTURE_2D, texture);
    webgl.texImage2D(webgl.TEXTURE_2D, 0, webgl.RGBA, webgl.RGBA, webgl.UNSIGNED_BYTE, texture.image);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MAG_FILTER, webgl.NEAREST);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MIN_FILTER, webgl.NEAREST);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_S, webgl.REPEAT);
    webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_T, webgl.REPEAT);
    //因为异步原因所以要加在这里
    webgl.uniform1i(uniformTexture, 0);
    draw(webgl);
    // webgl.bindTexture(webgl.TEXTURE_2D, null);
  }
  function initTexture(webgl: WebGLRenderingContext, imageFile: string) {
    textureHandle = webgl.createTexture();
    textureHandle.image = new Image();
    textureHandle.image.onload = function () {
      handleLoadedTexture(webgl, textureHandle)
    }
    textureHandle.image.src = imageFile;
  }
  function draw(webgl: WebGLRenderingContext) {
    webgl.clearColor(0.3, 0.5, 0.3, 1.0);
    webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);
    webgl.enable(webgl.DEPTH_TEST);
    webgl.drawArrays(webgl.POINTS, 0, 3);
  }
  onMounted(() => {
    const webgl = initWebgl(mat4, projMat4)
    initShader(webgl, vertexstring, fragmentstring)
    initBuffer(webgl, projMat4)
    draw(webgl)
  })
}