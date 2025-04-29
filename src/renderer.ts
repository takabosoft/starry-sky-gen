import { WebGLCanvas } from "./common/webGLCanvas";
import { buildFragmentShader } from "./shader/build";

export interface RendererParams {
    
}

export class Renderer {
    readonly webGlCanvas: WebGLCanvas;

    constructor(
        width: number, 
        height: number,
    ) {
        this.webGlCanvas = new WebGLCanvas(width, height, buildFragmentShader());
        this.setupUniformLocations();
    }

    private setupUniformLocations() {
        //this.uniform1fInfos.forEach(info => info.location = this.webGlCanvas.getUniformLocation(info.name));
        //this.uniform1iInfos.forEach(info => info.location = this.webGlCanvas.getUniformLocation(info.name));
    }

    render(params: RendererParams): void {
        if (this.webGlCanvas.isContextLost) {
            this.webGlCanvas.setupWebGL();
            this.setupUniformLocations();
        }

        //this.uniform1fInfos.forEach(info => this.webGlCanvas.uniform1f(info.location!, info.getValue(params)));
        //this.uniform1iInfos.forEach(info => this.webGlCanvas.uniform1i(info.location!, info.getValue(params)));
      
        this.webGlCanvas.render();
    }
}
