import { mat4 } from "gl-matrix";



export function initWebgl() {
  const webglDiv = document.getElementById('canvas') as HTMLCanvasElement;
  const webgl = webglDiv!.getContext("webgl")!;
  // webgl平面可视区域设置，x y width height
  webgl.viewport(0, 0, webglDiv.clientWidth, webglDiv.clientHeight);
  /**设置投影坐标系 */
  // 0， width ,height , z轴 0  -1 1  矩阵
  let projMat4 = mat4.create();
  mat4.identity(projMat4);
  mat4.ortho(projMat4, 0, webglDiv.clientWidth, webglDiv.clientHeight, 0, -1.0, 1.0)
  return webgl
}