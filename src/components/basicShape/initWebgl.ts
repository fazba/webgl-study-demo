export function initWebgl(mat4: any, projMat4: any) {
  const webglDiv = document.getElementById('canvas') as HTMLCanvasElement;
  const webgl = webglDiv!.getContext("webgl")!;
  // webgl平面可视区域设置，x y width height
  webgl.viewport(0, 0, webglDiv.clientWidth, webglDiv.clientHeight);
  /**设置投影坐标系 */
  // 0， width ,height , z轴 0  -1 1  矩阵
  mat4.ortho(0, webglDiv.clientWidth, webglDiv.clientHeight, 0, -1.0, 1.0, projMat4)
  return webgl
}