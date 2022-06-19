export function initWebgl() {
  const webglDiv = document.getElementById('canvas') as HTMLCanvasElement;
  const webgl = webglDiv!.getContext("webgl")!;
  // webgl平面可视区域设置，x y width height
  webgl.viewport(0, 0, webglDiv.clientWidth, webglDiv.clientHeight);
  return webgl
}