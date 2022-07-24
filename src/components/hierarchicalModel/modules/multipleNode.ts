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

// Indices of the vertices
const indices = new Uint8Array([
  0, 1, 2, 0, 2, 3,    // front
  4, 5, 6, 4, 6, 7,    // right
  8, 9, 10, 8, 10, 11,    // up
  12, 13, 14, 12, 14, 15,    // left
  16, 17, 18, 16, 18, 19,    // down
  20, 21, 22, 20, 22, 23     // back
]);
let angle = 45;
let g_joint1Angle = 0.0;
let ANGLE_STEP = 3.0;
var g_arm1Angle = 160.0;
var g_palm1Angle = 0.0;
var g_finger1Angle = 0.0;
var g_chest1Angle = 0




function initEvent(webgl: WebGLRenderingContext, program: WebGLProgram) {
  document.addEventListener('keydown', (e) => keydown(e, () => clear(webgl), () => draw(webgl, program)))
}
function keydown(ev: KeyboardEvent, ...fns: Array<(...args: any[]) => any>) {
  console.log(g_joint1Angle);
  // debugger
  switch (ev.keyCode) {

    case 38:
      if (g_joint1Angle < 135.0) g_joint1Angle += ANGLE_STEP;
      break;
    case 40:
      if (g_joint1Angle > -135.0) g_joint1Angle -= ANGLE_STEP;
      break;
    case 39:
      g_arm1Angle += ANGLE_STEP;
      break;
    case 37:
      g_arm1Angle -= ANGLE_STEP;
      break;
    case 87:
      g_palm1Angle += ANGLE_STEP;
      break;
    case 83:
      g_palm1Angle -= ANGLE_STEP;
      break;
    case 90:
      g_finger1Angle += ANGLE_STEP;
      break;
    case 79:
      g_chest1Angle += ANGLE_STEP;
      break;
    case 80:
      g_chest1Angle -= ANGLE_STEP;
      break;

    default: return;
  }
  // clearn()
  // initBuffer();
  // let drawMatrix = chestDraw();
  // let drawMatrixCopy = drawMatrix.slice(0)
  // drawLeft(drawMatrix);
  // drawRight(drawMatrixCopy);
  // drawHead()
  fns.forEach(fn => fn())
}

// function draw(webgl: WebGLRenderingContext, program: WebGLProgram) {
//   const modelArr = initTransformation(webgl, program, g_joint1Angle, [0, 1, 0]);
//   webgl.drawElements(webgl.TRIANGLES, indices.length, webgl.UNSIGNED_BYTE, 0);

//   mat4.translate(modelArr, modelArr, [0, 0, 0]);
//   const mvpArr = initTransformation(webgl, program, g_arm1Angle, [0, 0, 1], modelArr);
//   webgl.drawElements(webgl.TRIANGLES, indices.length, webgl.UNSIGNED_BYTE, 0);

// }
function drawHead(webgl: WebGLRenderingContext, program: WebGLProgram) {

  let positions = [];
  let indicesArr = []
  let SPHERE_DIV = 15;
  let i, ai, si, ci;
  let j, aj, sj, cj;
  let p1, p2;
  for (j = 0; j <= SPHERE_DIV; j++) {
    aj = j * Math.PI / SPHERE_DIV;
    sj = Math.sin(aj);
    cj = Math.cos(aj);
    for (i = 0; i <= SPHERE_DIV; i++) {
      ai = i * 2 * Math.PI / SPHERE_DIV;
      si = Math.sin(ai);
      ci = Math.cos(ai);

      positions.push(ci * sj);  // X
      positions.push(cj);       // Y
      positions.push(si * sj);  // Z
    }
  }
  for (j = 0; j < SPHERE_DIV; j++) {
    for (i = 0; i < SPHERE_DIV; i++) {
      p1 = j * (SPHERE_DIV + 1) + i;
      p2 = p1 + (SPHERE_DIV + 1);

      indicesArr.push(p1);
      indicesArr.push(p2);
      indicesArr.push(p1 + 1);

      indicesArr.push(p1 + 1);
      indicesArr.push(p2);
      indicesArr.push(p2 + 1);
    }
  }
  let pointPosition = new Float32Array(positions);
  let aPsotion = webgl.getAttribLocation(program, "a_position");
  let triangleBuffer = webgl.createBuffer();
  webgl.bindBuffer(webgl.ARRAY_BUFFER, triangleBuffer);
  webgl.bufferData(webgl.ARRAY_BUFFER, pointPosition, webgl.STATIC_DRAW);

  webgl.enableVertexAttribArray(aPsotion);
  webgl.vertexAttribPointer(aPsotion, 3, webgl.FLOAT, false, 0, 0);

  let aNormal = webgl.getAttribLocation(program, "a_Normal");
  let normalsBuffer = webgl.createBuffer();
  let normalsArr = new Float32Array(positions);
  webgl.bindBuffer(webgl.ARRAY_BUFFER, normalsBuffer);
  webgl.bufferData(webgl.ARRAY_BUFFER, normalsArr, webgl.STATIC_DRAW);

  webgl.enableVertexAttribArray(aNormal);
  webgl.vertexAttribPointer(aNormal, 3, webgl.FLOAT, false, 0, 0);


  let indexBuffer1 = webgl.createBuffer();
  let indices1 = new Uint8Array(indicesArr);
  webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, indexBuffer1);
  webgl.bufferData(webgl.ELEMENT_ARRAY_BUFFER, indices1, webgl.STATIC_DRAW);


  let headPosition = mat4.create();
  mat4.translate(headPosition, headPosition, [14.5, 22, 0]);
  mat4.scale(headPosition, headPosition, [8, 8, 8]);
  initTransformation(webgl, program, g_chest1Angle, [0, 1, 0], headPosition);
  webgl.drawElements(webgl.TRIANGLES, indicesArr.length, webgl.UNSIGNED_BYTE, 0);


  webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, null);
  webgl.deleteBuffer(indexBuffer1);
  webgl.bindBuffer(webgl.ARRAY_BUFFER, null);
  webgl.deleteBuffer(normalsBuffer);
  webgl.bindBuffer(webgl.ARRAY_BUFFER, null);
  webgl.deleteBuffer(triangleBuffer);
}
function drawChest(webgl: WebGLRenderingContext, program: WebGLProgram) {
  let chestPosition = mat4.create();
  mat4.translate(chestPosition, chestPosition, [14.5, 0, 0]);
  mat4.scale(chestPosition, chestPosition, [8, 1.5, 2]);
  let modelArr = initTransformation(webgl, program, g_chest1Angle, [0, 1, 0], chestPosition);
  webgl.drawElements(webgl.TRIANGLES, indices.length, webgl.UNSIGNED_BYTE, 0);
  return modelArr;
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
  //
  drawHead(webgl, program)

  //清空画板
  //创建光源
  //绘制图形
  let drawMatrix = drawChest(webgl, program);
  let drawMatrixCopy = drawMatrix.slice(0)
  // drawLeft(drawMatrix);
  // drawRight(drawMatrixCopy);
}