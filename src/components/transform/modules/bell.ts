import { mat4 } from 'gl-matrix'


export function initBuffer1(webgl: WebGLRenderingContext, count: number) {
  let modelView = mat4.create();
  mat4.identity(modelView);
  mat4.scale(modelView, modelView, [1, 1, 1]);
  //一分钟 转0.5度
  // (Math.PI/180) (0.5/60)  *count
  const angle = -Math.PI / 1800 * count * 5 / 60;
  mat4.rotate(modelView, modelView, angle, [0, 0, 1])

  let arr = [
    0, 0, 0, 1,
    0, 0.05, 0, 1,
    0.3, 0, 0, 1,

    0.3, 0, 0, 1,
    0, 0.05, 0, 1,
    0.3, 0.05, 0, 1

  ]
  let pointPosition = new Float32Array(arr);
  let aPsotion = webgl.getAttribLocation(webgl.program, "a_position");
  let triangleBuffer = webgl.createBuffer();
  webgl.bindBuffer(webgl.ARRAY_BUFFER, triangleBuffer);
  webgl.bufferData(webgl.ARRAY_BUFFER, pointPosition, webgl.STATIC_DRAW);
  webgl.enableVertexAttribArray(aPsotion);
  webgl.vertexAttribPointer(aPsotion, 4, webgl.FLOAT, false, 4 * 4, 0);



  let uniformMatrix = webgl.getUniformLocation(webgl.program, "u_formMatrix");
  webgl.uniformMatrix4fv(uniformMatrix, false, modelView)

  webgl.clearColor(0.0, 1.0, 0.0, 1.0);
  webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);
  webgl.enable(webgl.DEPTH_TEST);

  webgl.drawArrays(webgl.TRIANGLES, 0, 6);

}
export function initBuffer2(webgl: WebGLRenderingContext, count: number) {
  let modelView1 = mat4.create();
  mat4.identity(modelView1);
  mat4.scale(modelView1, modelView1, [1, 1, 1]);
  const angle = -Math.PI / 1800 * count;
  mat4.rotate(modelView1, modelView1, angle, [0, 0, 1])
  let arr = [
    0, 0, 0, 1,
    0, 0.05, 0, 1,
    0.4, 0, 0, 1,

    0.4, 0, 0, 1,
    0, 0.05, 0, 1,
    0.4, 0.05, 0, 1

  ]
  let pointPosition = new Float32Array(arr);
  let aPsotion = webgl.getAttribLocation(webgl.program, "a_position");
  let triangleBuffer = webgl.createBuffer();
  webgl.bindBuffer(webgl.ARRAY_BUFFER, triangleBuffer);
  webgl.bufferData(webgl.ARRAY_BUFFER, pointPosition, webgl.STATIC_DRAW);
  webgl.enableVertexAttribArray(aPsotion);
  webgl.vertexAttribPointer(aPsotion, 4, webgl.FLOAT, false, 4 * 4, 0);


  let uniformMatrix = webgl.getUniformLocation(webgl.program, "u_formMatrix");
  webgl.uniformMatrix4fv(uniformMatrix, false, modelView1)

  webgl.drawArrays(webgl.TRIANGLES, 0, 6);

}
export function initBuffer3(webgl: WebGLRenderingContext, count: number) {
  let modelView1 = mat4.create();
  mat4.identity(modelView1);
  mat4.scale(modelView1, modelView1, [1, 1, 1]);
  const angle = -Math.PI / 30 * count;

  mat4.rotate(modelView1, modelView1, angle, [0, 0, 1])
  let arr = [
    0, 0, 0, 1,
    0, 0.05, 0, 1,
    0.8, 0, 0, 1,

    0.8, 0, 0, 1,
    0, 0.05, 0, 1,
    0.8, 0.05, 0, 1

  ]
  let pointPosition = new Float32Array(arr);
  let aPsotion = webgl.getAttribLocation(webgl.program, "a_position");
  let triangleBuffer = webgl.createBuffer();
  webgl.bindBuffer(webgl.ARRAY_BUFFER, triangleBuffer);
  webgl.bufferData(webgl.ARRAY_BUFFER, pointPosition, webgl.STATIC_DRAW);
  webgl.enableVertexAttribArray(aPsotion);
  webgl.vertexAttribPointer(aPsotion, 4, webgl.FLOAT, false, 4 * 4, 0);


  let uniformMatrix = webgl.getUniformLocation(webgl.program, "u_formMatrix");
  webgl.uniformMatrix4fv(uniformMatrix, false, modelView1)

  webgl.drawArrays(webgl.TRIANGLES, 0, 6);

}