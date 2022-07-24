import { mat4 } from "gl-matrix";

export const vertexstring = /*glsl*/`
attribute vec4 a_position;
uniform mat4 u_formMatrix;
attribute vec4 a_Normal;
//新增：
varying vec4 v_Normal;
varying vec4 v_position;

void main(void){
  gl_Position = u_formMatrix * a_position;
  v_position = gl_Position;
  v_Normal= a_Normal;
}
`;
export const fragmentstring = `
precision mediump float;
//
varying vec4 v_Normal;
varying vec4 v_position;

uniform vec3 u_PointLightPosition;
uniform vec3 u_DiffuseLight;
uniform vec3 u_AmbientLight;
void main(void){
vec3 normal = normalize(v_Normal.xyz);
vec3 lightDirection = normalize(u_PointLightPosition - vec3(v_position.xyz));
float nDotL = max(dot(lightDirection, normal), 0.0);
vec3 diffuse = u_DiffuseLight * vec3(1.0,0,1.0)* nDotL;
vec3 ambient = u_AmbientLight * vec3(1.0,0,1.0);

  gl_FragColor =vec4(diffuse + ambient, 1);
}
`;

let angle = 45;
export function initBuffer(webgl: WebGLRenderingContext, program: WebGLProgram) {

  const positions: number[] = [];
  const indices: number[] = [];
  let SPHERE_DIV = 15;

  let i, ai, si, ci;
  let j, aj, sj, cj;
  let p1, p2;



  // Generate coordinates
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

      indices.push(p1);
      indices.push(p2);
      indices.push(p1 + 1);

      indices.push(p1 + 1);
      indices.push(p2);
      indices.push(p2 + 1);
    }
  }





  const pointPosition = new Float32Array(positions);
  const aPsotion = webgl.getAttribLocation(program, "a_position");
  const triangleBuffer = webgl.createBuffer();
  webgl.bindBuffer(webgl.ARRAY_BUFFER, triangleBuffer);
  webgl.bufferData(webgl.ARRAY_BUFFER, pointPosition, webgl.STATIC_DRAW);
  webgl.enableVertexAttribArray(aPsotion);
  webgl.vertexAttribPointer(aPsotion, 3, webgl.FLOAT, false, 0, 0);

  const aNormal = webgl.getAttribLocation(program, "a_Normal");
  const normalsBuffer = webgl.createBuffer();
  const normalsArr = new Float32Array(positions);
  webgl.bindBuffer(webgl.ARRAY_BUFFER, normalsBuffer);
  webgl.bufferData(webgl.ARRAY_BUFFER, normalsArr, webgl.STATIC_DRAW);
  webgl.enableVertexAttribArray(aNormal);
  webgl.vertexAttribPointer(aNormal, 3, webgl.FLOAT, false, 0, 0);

  const u_DiffuseLight = webgl.getUniformLocation(program, 'u_DiffuseLight');
  webgl.uniform3f(u_DiffuseLight, 1.0, 1.0, 1.0);
  const u_LightDirection = webgl.getUniformLocation(program, 'u_PointLightPosition');
  webgl.uniform3fv(u_LightDirection, [3.0, 3.0, 4.0]);
  const u_AmbientLight = webgl.getUniformLocation(program, 'u_AmbientLight');
  webgl.uniform3f(u_AmbientLight, 0.2, 0., 0.2);




  const indexBuffer = webgl.createBuffer();
  const indices1 = new Uint8Array(indices);
  webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  webgl.bufferData(webgl.ELEMENT_ARRAY_BUFFER, indices1, webgl.STATIC_DRAW);





  //矩阵变换
  const ProjMatrix = mat4.create();
  mat4.identity(ProjMatrix);
  const webglDiv = document.getElementById('canvas')!
  //角度小，看到的物体大，角度大，看到的物体小。
  mat4.perspective(ProjMatrix, angle * Math.PI / 180, webglDiv.clientWidth / webglDiv.clientHeight, 1, 1000)    //修改可视域范围

  const uniformMatrix1 = webgl.getUniformLocation(program, "u_formMatrix");

  const ModelMatrix = mat4.create();
  mat4.identity(ModelMatrix);
  mat4.translate(ModelMatrix, ModelMatrix, [0, 0, 0]);

  const ViewMatrix = mat4.create();
  mat4.identity(ViewMatrix);
  mat4.lookAt(ViewMatrix, [3, 3, 7], [0, 0, 0], [0, 1, 0]);

  const mvMatrix = mat4.create();
  mat4.identity(mvMatrix);
  mat4.multiply(mvMatrix, ViewMatrix, ModelMatrix);

  const mvpMatrix = mat4.create();
  mat4.identity(mvpMatrix);
  mat4.multiply(mvpMatrix, ProjMatrix, mvMatrix);
  webgl.uniformMatrix4fv(uniformMatrix1, false, mvpMatrix)

  //draw
  webgl.clearColor(0, 0, 0, 1);
  webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);
  webgl.enable(webgl.DEPTH_TEST);
  webgl.drawElements(webgl.TRIANGLES, indices.length, webgl.UNSIGNED_BYTE, 0);


}