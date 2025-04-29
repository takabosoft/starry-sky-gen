import { WebGLCanvas } from "./common/webGLCanvas";
import { buildFragmentShader } from "./shader/build";

export interface RendererParams {
    readonly cameraY: number;
    readonly cameraXRot: number;
    readonly mountainTime: number;
    readonly starZRot: number;
    readonly starXRot: number;
}

interface Uniform1fInfo {
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
    ]

    constructor(
        width: number, 
        height: number,
    ) {
        this.webGlCanvas = new WebGLCanvas(width, height, buildFragmentShader());
        this.setupUniformLocations();
    }

    private setupUniformLocations() {
        this.uniform1fInfos.forEach(info => info.location = this.webGlCanvas.getUniformLocation(info.name));
    }

    render(params: RendererParams): void {
        if (this.webGlCanvas.isContextLost) {
            this.webGlCanvas.setupWebGL();
            this.setupUniformLocations();
        }

        this.uniform1fInfos.forEach(info => this.webGlCanvas.uniform1f(info.location!, info.getValue(params)));
      
        this.webGlCanvas.render();
    }
}
