

export const vertexstring = `
  attribute vec3 a_position;
  uniform float angle;
  void main(){
    //写上旋转公式
    gl_Position =vec4(a_position.x*cos(angle)-a_position.y*sin(angle),a_position.x*sin(angle)+a_position.y*cos(angle),0,1.0);
    // gl_Position =vec4(a_position,1.0);
  }
`;
export const fragmentstring = `
  precision mediump float;
  void main(){
    gl_FragColor=vec4(0.0,0.0,1.0,1.0);
  }
`;


export function initBuffer(webgl: WebGLRenderingContext, program: WebGLProgram) {
  const arr = [
    0.100, 0.400, 0,
    0.100, 0.500, 0,
    0.200, 0.400, 0
  ]
  const floatArr = new Float32Array(arr);
  const bufferArr = webgl.createBuffer()
  webgl.bindBuffer(webgl.ARRAY_BUFFER, bufferArr)
  webgl.bufferData(webgl.ARRAY_BUFFER, floatArr, webgl.STATIC_DRAW);
  const a_position = webgl.getAttribLocation(program, "a_position");
  webgl.enableVertexAttribArray(a_position);
  webgl.vertexAttribPointer(a_position, 3, webgl.FLOAT, false, 3 * 4, 0);
  /**
   *
   */
  /**
   * 第二个参数：转过的弧度
   */
  const u_angle = webgl.getUniformLocation(program, "angle");
  webgl.uniform1f(u_angle, Math.PI);
  // debugger
}
export function draw(webgl: WebGLRenderingContext) {
  webgl.clearColor(0.0, 0.0, 0.0, 1.0);
  webgl.clear(webgl.COLOR_BUFFER_BIT);
  webgl.enable(webgl.DEPTH_TEST);
  webgl.drawArrays(webgl.TRIANGLES, 0, 3)
}
