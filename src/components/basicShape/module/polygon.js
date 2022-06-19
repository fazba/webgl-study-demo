

const vertexstring = `
        attribute vec3 a_position;

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
function initBuffer(webgl, projMat4) {
  let aPsotion = webgl.getAttribLocation(webgl.program, "a_position");
  let arr = [
    0, 0.5, 0,
    0.17, 0.17, 0,
    0.5, 0, 0,
    0.17, -0.17, 0,

    0.33, -0.67, 0,
    0, -0.33, 0,

    -0.33, -0.67, 0,
    -0.17, -0.17, 0,

    -0.5, 0, 0,
    -0.17, 0.17, 0,
  ];
  let vertexArr = new Float32Array(arr);
  let trangleBuffer = webgl.createBuffer();
  webgl.bindBuffer(webgl.ARRAY_BUFFER, trangleBuffer);
  webgl.bufferData(webgl.ARRAY_BUFFER, vertexArr, webgl.STATIC_DRAW);
  webgl.enableVertexAttribArray(aPsotion);
  webgl.vertexAttribPointer(aPsotion, 3, webgl.FLOAT, false, 0, 0);

  let uniformProj = webgl.getUniformLocation(webgl.program, "proj");
  webgl.uniformMatrix4fv(uniformProj, false, projMat4);
}
function draw(webgl) {
  webgl.clearColor(0.0, 0.0, 0.0, 1.0);
  webgl.clear(webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT);
  //利用闭合曲线画
  webgl.drawArrays(webgl.LINE_LOOP, 0, 10);
}

export {
  initBuffer, draw, vertexstring, fragmentstring
}