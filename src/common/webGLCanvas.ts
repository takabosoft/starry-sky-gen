const vertexShaderSource = `
attribute vec4 a_position;
void main() {
    gl_Position = a_position;
}
`;

export class WebGLCanvas {
    readonly canvas: HTMLCanvasElement;
    private readonly gl: WebGLRenderingContext;
    private program!: WebGLProgram;
    private uResolutionLocation!: WebGLUniformLocation | null;

    constructor(
        width: number, 
        height: number,
        private readonly fragmentShaderSource: string,
    ) {
        this.canvas = $(`<canvas>`)[0] as HTMLCanvasElement
        this.canvas.width = width;
        this.canvas.height = height;

        const gl = this.canvas.getContext("webgl", { preserveDrawingBuffer: true });
        if (!gl) {
            alert("WebGLの初期化に失敗");
            throw "WebGLの初期化に失敗";
        }
        this.gl = gl;
        this.setupWebGL();
    }

    get isContextLost() { return this.gl.isContextLost(); }

    setupWebGL() {
        const gl = this.gl;
        const vertexShader = this.createShader(gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = this.createShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource);

        const program = gl.createProgram();
        this.program = program;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program link error:', gl.getProgramInfoLog(program));
        }

        gl.useProgram(program);

        const vertices = new Float32Array([
            -1.0, -1.0,
            1.0, -1.0,
            -1.0, 1.0,
            1.0, 1.0
        ]);

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        const aPosition = gl.getAttribLocation(program, "a_position");
        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(aPosition);

        this.uResolutionLocation = gl.getUniformLocation(program, "u_resolution");
        gl.uniform2f(this.uResolutionLocation, this.canvas.width, this.canvas.height);
    }

    /** シェーダーへ渡すユニフォームの場所を取得します。 */
    getUniformLocation(name: string): WebGLUniformLocation | null {
        return this.gl.getUniformLocation(this.program, name);
    }

    /** シェーダーへ渡すユニフォーム値を更新します。 */
    uniform1f(location: WebGLUniformLocation | null, value: GLfloat) {
        this.gl.uniform1f(location, value);
    }

    uniform1i(location: WebGLUniformLocation | null, value: GLint) {
        this.gl.uniform1i(location, value);
    }

    render() {
        const gl = this.gl;
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        /*const error = gl.getError();
        if (error != gl.NO_ERROR) {
            alert(error);
        }*/
    }

    resize(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.gl.uniform2f(this.uResolutionLocation, width, height);
        this.gl.viewport(0, 0, width, height);
    }

    private createShader(type: GLenum, source: string): WebGLShader {
        const shader = this.gl.createShader(type);
        if (!shader) {
            throw "shader can't created!"
        }
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.log(source);
            throw `Shader compile error: ${this.gl.getShaderInfoLog(shader)}`;
        }
        return shader;
    }
}