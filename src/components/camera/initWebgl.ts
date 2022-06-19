export function initWebgl() {
  const webglDiv = document.getElementById('canvas') as HTMLCanvasElement;
  const webgl = webglDiv!.getContext("webgl")!;
  return webgl
}