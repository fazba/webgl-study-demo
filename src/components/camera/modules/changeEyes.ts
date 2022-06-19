import { mat4 } from 'gl-matrix'
import { initShader } from '../initShader'
import { initWebgl } from '../initWebgl'

const vertexstring = `
  attribute vec4 a_position;
  uniform mat4 u_formMatrix;
  attribute vec4 a_color;
  varying vec4 color;
  void main(void){
    gl_Position = u_formMatrix * a_position;
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


function initBuffer(webgl: WebGLRenderingContext) {
  const arr = [

    0.0, 0.5, -0.4, 1, 0.4, 1.0, 0.4, 1,
    -0.5, -0.5, -0.4, 1, 0.4, 1.0, 0.4, 1,
    0.5, -0.5, -0.4, 1, 0.4, 1.0, 0.4, 1,

    0.5, 0.4, -0.2, 1, 1.0, 1.0, 0.4, 1,
    -0.5, 0.4, -0.2, 1, 1.0, 1.0, 0.4, 1,
    0.0, -0.6, -0.2, 1, 1.0, 1.0, 0.4, 1,

    0.0, 0.5, 0.0, 1, 0.4, 0.4, 1.0, 1,
    -0.5, -0.5, 0.0, 1, 0.4, 0.4, 1.0, 1,
    0.5, -0.5, 0.0, 1, 0.4, 0.4, 1.0, 1,

    // 0.0, 0.6, -0.4, 1,    0.4, 1.0, 1,1, // The back green one
    // -0.5, -0.4, -0.4,  1, 0.4, 1.0, 1,1,
    // 0.5, -0.4, -0.4, 1,  0.4, 1.0,1,1,

    // 0.5, 0.4, -0.2,  1, 1.0, 1.0, 0.4,1, // The middle yellow one
    // -0.5, 0.4, -0.2, 1,  1.0, 1.0, 0.4,1,
    // 0.0, -0.6, -0.2,1,   1.0, 1.0, 0.4,1,

    // 0.0, 0.5, 0.0,  1,   0.4, 0.4, 1.0,1, // The front blue one
    // -0.5, -0.5, 0.0,1,  0.4, 0.4, 1.0,1,
    // 0.5, -0.5, 0.0, 1,  0.4, 0.4, 1.0,1,
  ]

  let pointPosition = new Float32Array(arr);
  let aPsotion = webgl.getAttribLocation(webgl.program, "a_position");
  let triangleBuffer = webgl.createBuffer();
  webgl.bindBuffer(webgl.ARRAY_BUFFER, triangleBuffer);
  webgl.bufferData(webgl.ARRAY_BUFFER, pointPosition, webgl.STATIC_DRAW);
  webgl.enableVertexAttribArray(aPsotion);
  //                                                  是否转置
  webgl.vertexAttribPointer(aPsotion, 4, webgl.FLOAT, false, 8 * 4, 0);
  let aColor = webgl.getAttribLocation(webgl.program, "a_color");
  webgl.enableVertexAttribArray(aColor);
  webgl.vertexAttribPointer(aColor, 4, webgl.FLOAT, false, 8 * 4, 4 * 4);
  //
  let modelView = mat4.create();
  mat4.identity(modelView);
  // 修改
  modelView = mat4.lookAt(modelView, [0, 0, 0.2], [0, 0.1, 0], [0, 1, 0]);
  console.log(modelView);

  let uniformMatrix1 = webgl.getUniformLocation(webgl.program, "u_formMatrix");
  webgl.uniformMatrix4fv(uniformMatrix1, false, modelView);
}
function draw(webgl: WebGLRenderingContext) {
  webgl.clearColor(0.0, 1.0, 0.0, 1.0);
  webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);
  webgl.drawArrays(webgl.TRIANGLES, 0, 9);
}
export function init() {
  const webgl = initWebgl();  //webgl初始化
  initShader(webgl, vertexstring, fragmentstring); //着色器初始化
  initBuffer(webgl); //数据缓冲区初始化
  draw(webgl); //绘制
}