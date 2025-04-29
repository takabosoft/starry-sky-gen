import { WebGLCanvas } from "./common/webGLCanvas";
import { buildFragmentShader } from "./shader/build";

export interface RendererParams {
    readonly cameraY: number;
    readonly cameraXRot: number;
    readonly mountainTime: number;
    readonly starZRot: number;
    readonly starXRot: number;
    readonly milkyScale: number;
    readonly milkyBlend: number;

    readonly cloudMaxSteps: number;
    readonly fbmMaxSteps: number;
    readonly fbmMinSteps: number;
}

interface Uniform1fInfo {
    readonly name: string;
    readonly getValue: (params: RendererParams) => number;
    location?: WebGLUniformLocation | null;
}

interface Uniform1iInfo {
    readonly name: string;
    readonly getValue: (params: RendererParams) => number;
    location?: WebGLUniformLocation | null;
}

export class Renderer {
    readonly webGlCanvas: WebGLCanvas;
    private readonly uniform1fInfos: readonly Uniform1fInfo[] = [
        { name: "u_cameraY", getValue: p => p.cameraY },
        { name: "u_cameraXRot", getValue: p => p.cameraXRot },
        { name: "u_mountainTime", getValue: p => p.mountainTime },
        { name: "u_starZRot", getValue: p => p.starZRot },
        { name: "u_starXRot", getValue: p => p.starXRot },
        { name: "u_milkyScale", getValue: p => p.milkyScale },
        { name: "u_milkyBlend", getValue: p => p.milkyBlend },
    ];
    private readonly uniform1iInfos: readonly Uniform1iInfo[] = [
        { name: "u_cloudMaxSteps", getValue: p => p.cloudMaxSteps },
        { name: "u_fbmMaxSteps", getValue: p => p.fbmMaxSteps },
        { name: "u_fbmMinSteps", getValue: p => p.fbmMinSteps },
    ];

    constructor(
        width: number, 
        height: number,
    ) {
        this.webGlCanvas = new WebGLCanvas(width, height, buildFragmentShader());
        this.setupUniformLocations();
    }

    private setupUniformLocations() {
        this.uniform1fInfos.forEach(info => info.location = this.webGlCanvas.getUniformLocation(info.name));
        this.uniform1iInfos.forEach(info => info.location = this.webGlCanvas.getUniformLocation(info.name));
    }

    render(params: RendererParams): void {
        if (this.webGlCanvas.isContextLost) {
            this.webGlCanvas.setupWebGL();
            this.setupUniformLocations();
        }

        this.uniform1fInfos.forEach(info => this.webGlCanvas.uniform1f(info.location!, info.getValue(params)));
        this.uniform1iInfos.forEach(info => this.webGlCanvas.uniform1i(info.location!, info.getValue(params)));
      
        this.webGlCanvas.render();
    }
}
