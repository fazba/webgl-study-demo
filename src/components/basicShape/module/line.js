

const vertexstring = `
        attribute vec3 a_position;
        uniform  mat4  proj;
        void main(void){
            gl_Position = proj*vec4(a_position,1.0)  ;
            gl_PointSize=60.0;
        }
        `;
const fragmentstring = `
        precision mediump float;
        void main(void){
          gl_FragColor = vec4(0.0,0.0,1.0,1.0);
        }
        `;
function initBuffer(webgl, projMat4) {
  const aPsotion = webgl.getAttribLocation(webgl.program, "a_position");
  const arr = [
    100.0, 100.0, 0,
    200.0, 200.0, 0,
    300.0, 200.0, 0,
    400, 600, 0
  ];
  const vertexArr = new Float32Array(arr);
  //
  const trangleBuffer = webgl.createBuffer();
  webgl.bindBuffer(webgl.ARRAY_BUFFER, trangleBuffer);
  webgl.bufferData(webgl.ARRAY_BUFFER, vertexArr, webgl.STATIC_DRAW);
  webgl.enableVertexAttribArray(aPsotion);
  webgl.vertexAttribPointer(aPsotion, 3, webgl.FLOAT, false, 0, 0);

  const uniformProj = webgl.getUniformLocation(webgl.program, "proj");
  webgl.uniformMatrix4fv(uniformProj, false, projMat4);
}
function draw(webgl) {
  webgl.clearColor(0.0, 0.0, 0.0, 1.0);
  webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);
  /**类型，从第几个开始，绘制几个   */
  // webgl.drawArrays(webgl.LINES, 0, 4);  //线段
  //webgl.drawArrays(webgl.LINE_STRIP,0,4)  //折线
  // webgl.drawArrays(webgl.LINE_LOOP, 0, 4)   //闭合曲线
  // webgl.drawArrays(webgl.TRIANGLES, 0, 3);  //三角形
  webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4); //后一个点与前2个点绘制
  // webgl.drawArrays(webgl.TRIANGLE_FAN, 0, 4); //后一个点与前一条画的边绘制

}

export {
  initBuffer, draw, vertexstring, fragmentstring
}