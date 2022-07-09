import { canvasXToWebglX, canvasYToWebglY } from "@/utils/coordinateTrans";
import { mat4 } from "gl-matrix";


export const vertexstring = `
  attribute vec3 a_position;
  attribute vec3 a_color;
  varying vec3 inColor;
  void main(void){
    gl_Position = vec4(a_position,1.0)  ;
    gl_PointSize=30.0;
    inColor = a_color;
  }
 `;
export const fragmentstring = `
  precision mediump float;
  varying vec3 inColor;
  void main(void){
    gl_FragColor = vec4(inColor,1.0);
  }
 `;
const points: number[] = [];
const colors: number[] = [];
export function initBuffer(webgl: WebGLRenderingContext, program: WebGLProgram) {
  /**attribute vec3 a_position */
  const aPsotion = webgl.getAttribLocation(program, "a_position");
  /**attribute vec3 a_color */
  const aColor = webgl.getAttribLocation(program, "a_color");
  document.addEventListener("mousedown", function (e: MouseEvent) {
    const x = e.clientX;
    const y = e.clientY;
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const pointx = canvasXToWebglX(rect.width, x - rect.left)
    const pointy = canvasYToWebglY(rect.height, y - rect.top)
    /**添加点坐标 */
    points.push(pointx, pointy, 0);
    /**添加颜色 */
    const rgb = [Math.abs(pointx), Math.abs(pointy), Math.random()]
    colors.push(...rgb)
    /**
     * 位置buffer
     */
    const pointPosition = new Float32Array(points);
    const pointBuffer = webgl.createBuffer();
    webgl.bindBuffer(webgl.ARRAY_BUFFER, pointBuffer);
    webgl.bufferData(webgl.ARRAY_BUFFER, pointPosition, webgl.STATIC_DRAW);
    webgl.enableVertexAttribArray(aPsotion);
    webgl.vertexAttribPointer(aPsotion, 3, webgl.FLOAT, false, 0, 0);
    /**
     * 颜色buffer
     */
    const pointColor = new Float32Array(colors);
    const pointColorBuffer = webgl.createBuffer();
    webgl.bindBuffer(webgl.ARRAY_BUFFER, pointColorBuffer);
    webgl.bufferData(webgl.ARRAY_BUFFER, pointColor, webgl.STATIC_DRAW);
    webgl.enableVertexAttribArray(aColor);
    webgl.vertexAttribPointer(aColor, 3, webgl.FLOAT, false, 0, 0);
    /**
     * 绘制
     */
    webgl.clearColor(0.0, 0.0, 0.0, 1.0);
    webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);
    webgl.drawArrays(webgl.POINTS, 0, points.length / 3);
  })
}
export function draw(webgl: WebGLRenderingContext) {
  webgl.clearColor(0.0, 0.0, 0.0, 1.0);
  webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);
}