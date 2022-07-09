import { mat4 } from "gl-matrix";


//顶点着色器
export const vertexstring = `
  attribute vec4 a_position;
  uniform   mat4 proj;
  void main(void){
    gl_Position =proj *  a_position;
    gl_PointSize=60.0;
  }
`;
//片元着色器
export const fragmentstring = `
  void main(void){
    gl_FragColor = vec4(0,0,1.0,1.0);
  }
  `;



//数据缓冲区
export function initBuffer(webgl: WebGLRenderingContext, program: WebGLProgram) {
  /**定义点的webgl坐标： x, y, z, 1.0 */
  const pointPosition = new Float32Array([0.1, -0.3, 0.0, 1.0]); //创建js数组
  /**获取shader里定义的变量 */
  const aPsotion = webgl.getAttribLocation(program, "a_position");
  /**给该变量赋值 */
  webgl.vertexAttrib4fv(aPsotion, pointPosition);
  /**获取shader里定义的变量 */
  const uniformProj = webgl.getUniformLocation(program, "proj");
  const projMat4 = mat4.create();
  mat4.identity(projMat4);
  webgl.uniformMatrix4fv(uniformProj, false, projMat4);
}
//绘制
export function draw(webgl: WebGLRenderingContext) {
  //刷颜色
  webgl.clearColor(0.0, 0.0, 0.0, 0.5);
  //清理缓冲区
  webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);
  // 绘制是点 ，从数组第几个开始， 绘制几个
  webgl.drawArrays(webgl.POINTS, 0, 1);
}
