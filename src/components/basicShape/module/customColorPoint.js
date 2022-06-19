

let vertexstring = `
 attribute vec3 a_position;
 uniform     mat4    proj;
 attribute vec3 a_color;
 varying vec3 inColor;
 void main(void){
     gl_Position = vec4(a_position,1.0)  ;
     gl_PointSize=60.0;
     inColor = a_color;
 }
 `;
let fragmentstring = `
 precision mediump float;
 varying vec3 inColor;
 void main(void){
   gl_FragColor = vec4(inColor,1.0);
 }
 `;
var points = [];
var colors = [];
function initBuffer(webgl, projMat4) {
  const aPsotion = webgl.getAttribLocation(webgl.program, "a_position");
  const aColor = webgl.getAttribLocation(webgl.program, "a_color");

  document.addEventListener("mousedown", function (e) {
    const x = e.clientX;
    const y = e.clientY;
    const rect = e.target.getBoundingClientRect();
    const pointx = ((x - rect.left) - 512) / 512;
    const pointy = (350 - (y - rect.top)) / 350;
    points.push(pointx, pointy, 0);
    if (pointx > 0 && pointy > 0) {
      colors.push(1.0, 0.0, 0.0)
    } else if (pointx < 0 && pointy > 0) {
      colors.push(0.0, 1.0, 0.0)
    } else if (pointx < 0 && pointy < 0) {
      colors.push(0.0, 0.0, 1.0)
    } else {
      colors.push(0.0, 1.0, 1.0)
    }
    //
    const pointPosition = new Float32Array(points);
    const pointBuffer = webgl.createBuffer();
    webgl.bindBuffer(webgl.ARRAY_BUFFER, pointBuffer);
    webgl.bufferData(webgl.ARRAY_BUFFER, pointPosition, webgl.STATIC_DRAW);
    webgl.enableVertexAttribArray(aPsotion);
    webgl.vertexAttribPointer(aPsotion, 3, webgl.FLOAT, false, 0, 0);
    //
    const pointColor = new Float32Array(colors);
    const pointColorBuffer = webgl.createBuffer();
    webgl.bindBuffer(webgl.ARRAY_BUFFER, pointColorBuffer);
    webgl.bufferData(webgl.ARRAY_BUFFER, pointColor, webgl.STATIC_DRAW);
    webgl.enableVertexAttribArray(aColor);
    webgl.vertexAttribPointer(aColor, 3, webgl.FLOAT, false, 0, 0);
    //
    webgl.clearColor(0.0, 0.0, 0.0, 1.0);
    webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);
    webgl.drawArrays(webgl.POINTS, 0, points.length / 3);
  })
  const uniformProj = webgl.getUniformLocation(webgl.program, "proj");
  webgl.uniformMatrix4fv(uniformProj, false, projMat4);
}
function draw(webgl) {
  webgl.clearColor(0.0, 0.0, 0.0, 1.0);
  webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);

}

export {
  initBuffer, draw, vertexstring, fragmentstring
}