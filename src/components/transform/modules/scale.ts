import { mat4 } from 'gl-matrix'


export default function initBuffer(webgl: WebGLRenderingContext) {
  // 1.算矩阵
  // let matrixArr = [
  //   1, 0, 0, 0,
  //   0, 2, 0, 0,
  //   0, 0, 1, 0,
  //   0, 0, 0, 1
  // ];
  // let matrixPosition = new Float32Array(matrixArr);

  // 2.用库算矩阵
  let matrixPosition = mat4.create();
  mat4.identity(matrixPosition);
  mat4.scale(matrixPosition, matrixPosition, [1, 5, 1]);
  //

  let arr = [
    0, 0, 0, 1,
    0, 0.05, 0, 1,
    0.5, 0, 0, 1,

    0.5, 0, 0, 1,
    0, 0.05, 0, 1,
    0.5, 0.05, 0, 1

  ]
  let pointPosition = new Float32Array(arr);
  let aPsotion = webgl.getAttribLocation(webgl.program, "a_position");
  let triangleBuffer = webgl.createBuffer();
  webgl.bindBuffer(webgl.ARRAY_BUFFER, triangleBuffer);
  webgl.bufferData(webgl.ARRAY_BUFFER, pointPosition, webgl.STATIC_DRAW);
  webgl.enableVertexAttribArray(aPsotion);
  webgl.vertexAttribPointer(aPsotion, 4, webgl.FLOAT, false, 4 * 4, 0);

  let uniformMatrix = webgl.getUniformLocation(webgl.program, "u_formMatrix");
  webgl.uniformMatrix4fv(uniformMatrix, false, matrixPosition)

}
