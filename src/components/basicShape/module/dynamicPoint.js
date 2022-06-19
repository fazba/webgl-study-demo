
// 思路：监听鼠标事件->将点推送到数组->绘制数组中的点
const vertexstring = `
    attribute vec3 a_position;
    uniform   mat4 proj;
    void main(void){
      gl_Position = vec4(a_position,1.0)  ;
      gl_PointSize=60.0;
    }
    `;
const fragmentstring = `
    precision mediump float;
    void main(void){
      gl_FragColor = vec4(0.0,0.0,1.0,1.0);
    }
    `;
const points = [];
const colors = [];
function initBuffer(webgl, projMat4) {
  const aPsotion = webgl.getAttribLocation(webgl.program, "a_position");

  document.addEventListener("mousedown", function (e) {
    const x = e.clientX;
    const y = e.clientY;
    const rect = e.target.getBoundingClientRect();
    console.log(x, y, rect)
    /**canvas坐标转化为webgl坐标 */
    const pointx = ((x - rect.left) - 512) / 512;
    const pointy = (350 - (y - rect.top)) / 350;
    points.push(pointx, pointy, 0);
    /**定义点的坐标： x, y, z, 1.0 */
    const pointPosition = new Float32Array(points);
    const pointBuffer = webgl.createBuffer();
    /**绑定。数组buffer */
    webgl.bindBuffer(webgl.ARRAY_BUFFER, pointBuffer);
    /** ， ， 静态数据*/
    webgl.bufferData(webgl.ARRAY_BUFFER, pointPosition, webgl.STATIC_DRAW);
    /**使用 */
    webgl.enableVertexAttribArray(aPsotion);
    /** 赋值： ， points是几个数一组，数的类型，是否转置，*/
    webgl.vertexAttribPointer(aPsotion, 3, webgl.FLOAT, false, 0, 0);
    /**绘制 */
    webgl.clearColor(0.0, 0.0, 0.0, 1.0);
    webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);
    // 绘制是点 ，从数组第几个开始， 绘制几个
    webgl.drawArrays(webgl.POINTS, 0, points.length / 3);
  })
  /**获取shader里定义的变量 */
  const uniformProj = webgl.getUniformLocation(webgl.program, "proj");
  /**给该变量赋值 */
  webgl.uniformMatrix4fv(uniformProj, false, projMat4);
}
//绘制
function draw(webgl) {
  webgl.clearColor(0.0, 0.0, 0.0, 1.0);
  webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);
}





export {
  initBuffer, draw, vertexstring, fragmentstring
}