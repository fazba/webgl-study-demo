

export const vertexstring = /* glsl*/`
  attribute vec3 a_position;
  uniform float angle;  //1、用算数方法写旋转公式的变量
  uniform   mat4 proj;  //2、用矩阵方法写旋转公式的变量
  void main(){
    //1、用算数方法写旋转公式
    // gl_Position =vec4(a_position.x*cos(angle)-a_position.y*sin(angle),a_position.x*sin(angle)+a_position.y*cos(angle),0,1.0);
    //2、用矩阵方法写旋转公式
    gl_Position =proj*vec4(a_position,1.0);
  }
`;
export const fragmentstring = `
  precision mediump float;
  void main(){
    gl_FragColor=vec4(0.0,0.0,1.0,1.0);
  }
`;
const angle = 2 * Math.PI

export function initBuffer(webgl: WebGLRenderingContext, program: WebGLProgram) {
  const arr = [
    0.1, 0.4, 0,
    0.1, 0.5, 0,
    0.2, 0.4, 0
  ]
  const vertexArr = new Float32Array(arr);
  const bufferArr = webgl.createBuffer()
  webgl.bindBuffer(webgl.ARRAY_BUFFER, bufferArr)
  webgl.bufferData(webgl.ARRAY_BUFFER, vertexArr, webgl.STATIC_DRAW);
  const a_position = webgl.getAttribLocation(program, "a_position");
  webgl.enableVertexAttribArray(a_position);
  webgl.vertexAttribPointer(a_position, 3, webgl.FLOAT, false, 3 * 4, 0);
  /**
   * 1、用算数方法写旋转公式的变量
   */
  // const u_angle = webgl.getUniformLocation(program, "angle");
  // webgl.uniform1f(u_angle, angle);
  /**
   * 2、用矩阵方法写旋转公式的变量
   */
  /**uniform   mat4 proj */
  const uniformProj = webgl.getUniformLocation(program, "proj");
  const projMat4 = [
    Math.cos(angle), -Math.sin(angle), 0, 0,
    Math.sin(angle), Math.cos(angle), 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]
  webgl.uniformMatrix4fv(uniformProj, false, projMat4);
}
export function draw(webgl: WebGLRenderingContext) {
  webgl.clearColor(0.0, 0.0, 0.0, 1.0);
  webgl.clear(webgl.COLOR_BUFFER_BIT);
  webgl.enable(webgl.DEPTH_TEST);
  webgl.drawArrays(webgl.TRIANGLES, 0, 3)
}
