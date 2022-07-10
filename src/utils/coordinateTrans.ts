import { mat4 } from "gl-matrix"
/**
 * 坐标转化
 */


/**
 * canvas to webgl
 */
export const canvasXToWebglX = (canvasDomWidth: number, canvasX: number) => {
  const half = canvasDomWidth / 2
  return (canvasX - half) / half
}
export const canvasYToWebglY = (canvasDomHeight: number, canvasY: number) => {
  const half = canvasDomHeight / 2
  return (half - canvasY) / half
}
/**
 * 近/远裁剪平面对应于 [-1, 1] 的标准化设备坐标 Z 范围 。
 * 将canvas尺寸归一化
 */
export const canvasNormalizing = (webgl: WebGLRenderingContext, program: WebGLProgram, uniformName: string) => {
  const webglDiv = document.getElementById('canvas')!
  if (!webglDiv) throw new Error(`不存在webglDiv`)
  const uniformProj = webgl.getUniformLocation(program, uniformName);
  if (!uniformProj) throw new Error(`不存在${uniformName}`)
  const projMat4 = mat4.create()
  mat4.identity(projMat4)
  mat4.ortho(projMat4, 0, webglDiv.clientWidth, webglDiv.clientHeight, 0, -1.0, 1.0)
  webgl.uniformMatrix4fv(uniformProj, false, projMat4)
}