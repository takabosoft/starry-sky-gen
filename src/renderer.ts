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

    readonly fbmScale: number;
    readonly fbmDepth: number;
    readonly fbmThreshold: number;
    readonly cloudTime: number;
    readonly cloudMinY: number;
    readonly cloudThickness: number;
    readonly cloudAlphaScale: number;

    readonly waveFactor: number;
    readonly waveScale: number;
    readonly waveTime: number;

    readonly cloudMaxSteps: number;
    readonly fbmMaxSteps: number;
    readonly fbmMinSteps: number;
    readonly sampleCount: number;
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

        { name: "u_fbmScale", getValue: p => p.fbmScale },
        { name: "u_fbmDepth", getValue: p => p.fbmDepth },
        { name: "u_fbmThreshold", getValue: p => p.fbmThreshold },
        { name: "u_cloudTime", getValue: p => p.cloudTime },
        { name: "u_cloudMinY", getValue: p => p.cloudMinY },
        { name: "u_cloudThickness", getValue: p => p.cloudThickness },
        { name: "u_cloudAlphaScale", getValue: p => p.cloudAlphaScale },

        { name: "u_waveFactor", getValue: p => p.waveFactor },
        { name: "u_waveScale", getValue: p => p.waveScale },
        { name: "u_waveTime", getValue: p => p.waveTime },
  
    ];
    private readonly uniform1iInfos: readonly Uniform1iInfo[] = [
        { name: "u_cloudMaxSteps", getValue: p => p.cloudMaxSteps },
        { name: "u_fbmMaxSteps", getValue: p => p.fbmMaxSteps },
        { name: "u_fbmMinSteps", getValue: p => p.fbmMinSteps },
        { name: "u_sampleCount", getValue: p => p.sampleCount },
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
