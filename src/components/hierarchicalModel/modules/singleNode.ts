import { mat4, ReadonlyVec3 } from 'gl-matrix'
import { clear, initLight, initBuffer, degreesToRads } from './common';


export const vertexstring = `
attribute vec4 a_position;
uniform mat4 u_formMatrix;
attribute vec4 a_Normal;
uniform vec3 u_PointLightPosition;
uniform vec3 u_DiffuseLight;
uniform vec3 u_AmbientLight;
varying vec4 v_Color;
void main(void){
  gl_Position = u_formMatrix * a_position;
  vec3 normal = normalize(a_Normal.xyz);
  vec3 lightDirection = normalize(u_PointLightPosition - vec3(gl_Position.xyz));
  float nDotL = max(dot(lightDirection, normal), 0.0);
  vec3 diffuse = u_DiffuseLight * vec3(1.0,0,1.0)* nDotL;
  vec3 ambient = u_AmbientLight * vec3(1.0,0,1.0);
  v_Color = vec4(diffuse + ambient, 1);
}
`;
export const fragmentstring = `
precision mediump float;
varying vec4 v_Color;
void main(void){
  gl_FragColor =v_Color;
}
`;

let angle = 45;
let g_joint1Angle = 0.0;
let ANGLE_STEP = 3.0;
let g_arm1Angle = -90.0;
// Indices of the vertices
const indices = new Uint8Array([
  0, 1, 2, 0, 2, 3,    // front
  4, 5, 6, 4, 6, 7,    // right
  8, 9, 10, 8, 10, 11,    // up
  12, 13, 14, 12, 14, 15,    // left
  16, 17, 18, 16, 18, 19,    // down
  20, 21, 22, 20, 22, 23     // back
]);

function initEvent(webgl: WebGLRenderingContext, program: WebGLProgram) {
  document.addEventListener('keydown', (e) => keydown(e, () => clear(webgl), () => draw(webgl, program)))
}
function keydown(ev: KeyboardEvent, ...fns: Array<(...args: any[]) => any>) {
  switch (ev.key) {
    case 'ArrowUp':
      if (g_joint1Angle < 135.0) g_joint1Angle += ANGLE_STEP;
      break;
    case 'ArrowDown':
      if (g_joint1Angle > -135.0) g_joint1Angle -= ANGLE_STEP;
      break;
    case 'ArrowLeft':
      g_arm1Angle += ANGLE_STEP;
      break;
    case 'ArrowRight':
      g_arm1Angle -= ANGLE_STEP;
      break;
    default: return;
  }
  fns.forEach(fn => fn())
}
function draw(webgl: WebGLRenderingContext, program: WebGLProgram) {
  const modelArr = initTransformation(webgl, program, g_joint1Angle, [0, 1, 0]);
  webgl.drawElements(webgl.TRIANGLES, indices.length, webgl.UNSIGNED_BYTE, 0);

  mat4.translate(modelArr, modelArr, [0, 0, 0]);
  const mvpArr = initTransformation(webgl, program, g_arm1Angle, [0, 0, 1], modelArr);
  webgl.drawElements(webgl.TRIANGLES, indices.length, webgl.UNSIGNED_BYTE, 0);

}
//矩阵变换  g_joint1Angle
function initTransformation(webgl: WebGLRenderingContext, program: WebGLProgram, deg: number, rotateArr: ReadonlyVec3, ModelMatrix = mat4.create()) {
  const webglDiv = document.getElementById('canvas')!
  const ProjMatrix = mat4.create();
  mat4.identity(ProjMatrix);
  mat4.perspective(ProjMatrix, angle * Math.PI / 180, webglDiv.clientWidth / webglDiv.clientHeight, 1, 1000)    //修改可视域范围
  let uniformMatrix1 = webgl.getUniformLocation(program, "u_formMatrix");

  mat4.rotate(ModelMatrix, ModelMatrix, degreesToRads(deg), rotateArr);
  let ViewMatrix = mat4.create();
  mat4.identity(ViewMatrix);
  mat4.lookAt(ViewMatrix, [50, 50, 50], [0, 0, 0], [0, 1, 0]);

  let mvMatrix = mat4.create();
  mat4.identity(mvMatrix);
  mat4.multiply(mvMatrix, ViewMatrix, ModelMatrix);

  let mvpMatrix = mat4.create();
  mat4.identity(mvpMatrix);
  mat4.multiply(mvpMatrix, ProjMatrix, mvMatrix);
  webgl.uniformMatrix4fv(uniformMatrix1, false, mvpMatrix)
  return ModelMatrix;

}
export function init(webgl: WebGLRenderingContext, program: WebGLProgram) {

  //初始化数据
  initBuffer(webgl, program, indices);
  //初始化事件
  initEvent(webgl, program)
  //清空画板
  clear(webgl);
  //创建光源
  initLight(webgl, program);
  //绘制图形
  draw(webgl, program);
}