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