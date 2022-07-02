import { mat4 } from 'gl-matrix';



let angle = 60;

export function initBuffer(webgl: WebGLRenderingContext, arr: any[]) {
  let pointPosition = new Float32Array(arr);
  let aPsotion = webgl.getAttribLocation(webgl.program, "a_position");
  let triangleBuffer = webgl.createBuffer();
  webgl.bindBuffer(webgl.ARRAY_BUFFER, triangleBuffer);
  webgl.bufferData(webgl.ARRAY_BUFFER, pointPosition, webgl.STATIC_DRAW);
  webgl.enableVertexAttribArray(aPsotion);
  webgl.vertexAttribPointer(aPsotion, 4, webgl.FLOAT, false, 8 * 4, 0);
  let aColor = webgl.getAttribLocation(webgl.program, "a_color");
  webgl.enableVertexAttribArray(aColor);
  webgl.vertexAttribPointer(aColor, 4, webgl.FLOAT, false, 8 * 4, 4 * 4);


  let ProjMatrix = mat4.create();
  mat4.identity(ProjMatrix);
  const webglDiv = document.getElementById('canvas')
  mat4.perspective(ProjMatrix, angle * Math.PI / 180, webglDiv!.clientWidth / webglDiv!.clientHeight, 1, 1000)    //修改可视域范围


  let uniformMatrix1 = webgl.getUniformLocation(webgl.program, "u_formMatrix");




  let ModelMatrix = mat4.create();
  mat4.identity(ModelMatrix);
  mat4.translate(ModelMatrix, ModelMatrix, [180, 0, 0]);

  let ViewMatrix = mat4.create();
  mat4.identity(ViewMatrix);
  mat4.lookAt(ViewMatrix, [0, 0, 300], [0, 0, -90], [0, 1, 0]);
  let mvMatrix = mat4.create();
  mat4.multiply(mvMatrix, ViewMatrix, ModelMatrix);

  let mvpMatrix = mat4.create();
  mat4.identity(mvpMatrix);
  mat4.multiply(mvpMatrix, ProjMatrix, mvMatrix);
  webgl.uniformMatrix4fv(uniformMatrix1, false, mvpMatrix)
}