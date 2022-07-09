export function initShader(webgl: WebGLRenderingContext, vertexstring: string, fragmentstring: string) {
  //创建shader对象
  const vsshader = webgl.createShader(webgl.VERTEX_SHADER)!;
  const fsshader = webgl.createShader(webgl.FRAGMENT_SHADER)!;
  // 将glsl代码写入shader对象
  webgl.shaderSource(vsshader, vertexstring);
  webgl.shaderSource(fsshader, fragmentstring);
  // 编译
  webgl.compileShader(vsshader);
  webgl.compileShader(fsshader);
  /**
   * 方便js查看调试信息
   *
   * getShaderParameter  获取shader的状态
   * webgl.COMPILE_STATUS ：表示着色器是否编译成功，是(GL_TRUE)不是(GL_FALSE)
   * webgl.DELETE_STATUS ：表示着色器是否被删除，是(GL_TRUE)不是(GL_FALSE)
   * webgl.SHADER_TYPE ：表示着色器类型
   * */
  if (!webgl.getShaderParameter(vsshader, webgl.COMPILE_STATUS)) {
    //验证glsl字符串是否有问题
    const err = webgl.getShaderInfoLog(vsshader)
    alert(err)
    return
  }
  if (!webgl.getShaderParameter(fsshader, webgl.COMPILE_STATUS)) {
    const err = webgl.getShaderInfoLog(vsshader)
    alert(err)
    return
  }
  /**
   * 创建程序对象
   * 为了实现CPU和GPU的通信，控制GPU着色器的工作状态，切换不同着色器程序
   *
   *
   * */
  const program = webgl.createProgram()!;
  //将shader绑定到程序对象上
  webgl.attachShader(program, vsshader);
  webgl.attachShader(program, fsshader)
  /**
   * 在useProgram前，要先连接程序对象的顶点和片元着色器程序，检查着色程序的错误。通过连接测试后，才能通过useProgram方法把着色器程序传递给GPU，否则报错。
   * 1. 检查顶点、片元着色器程序中同名varying变量是否一一对应
   * 2. 检查顶点着色器程序中是否给varying变量赋值顶点数据
   * 3. 硬件资源有限，要检测attribute、uniform、varying变量的数量是否超出限制范围
   *
   */
  webgl.linkProgram(program);
  if (!webgl.getProgramParameter(program, webgl.LINK_STATUS)) {
    const err = webgl.getShaderInfoLog(program)
    alert(err)
    return
  }
  //使用
  webgl.useProgram(program);

  return program
}