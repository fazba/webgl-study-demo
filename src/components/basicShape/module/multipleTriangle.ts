import { mat4 } from "gl-matrix";


export const vertexstring = `
    attribute vec3 a_position;
    void main(void){
        gl_Position = vec4(a_position,1.0)  ;
        gl_PointSize=60.0;
    }
    `;
export const fragmentstring = `
    precision mediump float;
    void main(void){
      gl_FragColor = vec4(0.0,0.0,1.0,1.0);
    }
    `;
export function initBuffer(webgl: WebGLRenderingContext, program: WebGLProgram) {

  const aPsotion = webgl.getAttribLocation(program, "a_position");
  //索引数组
  const arrindex = [
    0, 1, 2,
    0, 3, 4
  ]
  const arr = [
    0.1, 0.1, 0, 1.0,
    0.2, 0.2, 0, 1.0,
    0.3, 0.2, 0, 1.0,

    0.4, 0.6, 0, 1.0,
    0.5, 0.7, 0, 1.0,
  ];
  const pointPosition = new Float32Array(arr);
  const lineBuffer = webgl.createBuffer()
  webgl.bindBuffer(webgl.ARRAY_BUFFER, lineBuffer);
  webgl.bufferData(webgl.ARRAY_BUFFER, pointPosition, webgl.STATIC_DRAW);
  webgl.enableVertexAttribArray(aPsotion);
  webgl.vertexAttribPointer(aPsotion, 4, webgl.FLOAT, false, 4 * 4, 0 * 4);
  //索引缓冲区
  const indexArr = new Uint16Array(arrindex)
  const indexBuffer = webgl.createBuffer()
  webgl.bindBuffer(webgl.ELEMENT_ARRAY_BUFFER, indexBuffer)
  webgl.bufferData(webgl.ELEMENT_ARRAY_BUFFER, indexArr, webgl.STATIC_DRAW)
}
export function draw(webgl: WebGLRenderingContext) {
  webgl.clearColor(0.0, 0.0, 0.0, 1.0);
  webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);
  /**
 * drawElements和drawArrays区别
 * drawArray缺点：画一个三角形就需要存入3个点，当量大的时候内存有问题
 * drawElements特有的索引缓冲区：通过点的复用，来绘制多边形
 *
 * */
  //绘制模式，顶点个数，索引值数据类型,从第0个开始
  webgl.drawElements(webgl.TRIANGLES, 6, webgl.UNSIGNED_SHORT, 0);
}