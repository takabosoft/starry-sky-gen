import { Renderer, RendererParams } from "./renderer";

export const enum RenderQuality {
    Low = 0,
    Medium = 1,
    High = 2,
    Max = 3,
}

export class PreviewSection {
    readonly renderer = new Renderer(320, 240);
    private readonly cameraYSlider = $(`<input type="range" min="0.001" max="10.0" step="0.00001" value="2.0">`).on("input", () => this.preview());
    private readonly cameraXRotSlider = $(`<input type="range" min="-0.999" max="0.999" step="0.00001" value="0.2">`).on("input", () => this.preview());
    private readonly mountainTimeSlider = $(`<input type="range" min="0" max="10.0" step="0.00001" value="0">`).on("input", () => this.preview());
    private readonly starZRotSlider = $(`<input type="range" min="-0.999" max="0.999" step="0.00001" value="0.4">`).on("input", () => this.preview());
    private readonly starXRotSlider = $(`<input type="range" min="-0.999" max="0.999" step="0.00001" value="0.0">`).on("input", () => this.preview());
    private readonly milkyScaleSlider = $(`<input type="range" min="0.1" max="5.0" step="0.00001" value="1.0">`).on("input", () => this.preview());
    private readonly milkyBlendSlider = $(`<input type="range" min="0.0" max="5.0" step="0.00001" value="1.0">`).on("input", () => this.preview());

    readonly element = $(`<section>`).append(
        $(`<h2>`).text("【STEP.1】 各種設定を行ってください"),
        $(`<div class="preview-container">`).append(
            $(this.renderer.webGlCanvas.canvas).on("click", () => {
                console.log(JSON.stringify(this.getRenderParams(RenderQuality.Low)));
            }),
            $(`<div class="params">`).append(
                $(`<div>`).text("カメラ上下位置："), this.cameraYSlider,
                $(`<div>`).text("カメラ上下向き："), this.cameraXRotSlider,
                $(`<div>`).text("山形状："), this.mountainTimeSlider,
                $(`<div>`).text("天球Z軸回転："), this.starZRotSlider,
                $(`<div>`).text("天球X軸回転："), this.starXRotSlider,
                $(`<div>`).text("天の川大きさ："), this.milkyScaleSlider,
                $(`<div>`).text("天の川濃さ："), this.milkyBlendSlider,
            ),
        ),
    );

    constructor() {
        this.preview();
    }

    getRenderParams(quality: RenderQuality): RendererParams {
        let cloudMaxSteps = 0;
        let fbmMaxSteps = 0;
        let fbmMinSteps = 0;

        switch (quality) {
            case RenderQuality.Low:
                cloudMaxSteps = 40;
                fbmMaxSteps = 10;
                fbmMinSteps = 2;
                break;
            default:
                case RenderQuality.Medium:
                    cloudMaxSteps = 100;
                    fbmMaxSteps = 10;
                    fbmMinSteps = 2;
                    break;
                case RenderQuality.High:
                    cloudMaxSteps = 300;
                    fbmMaxSteps = 12;
                    fbmMinSteps = 6;
                    break;
                case RenderQuality.Max:
                    cloudMaxSteps = 500;
                    fbmMaxSteps = 20;
                    fbmMinSteps = 10;
                    break;
        }

        return {
            cameraY: parseFloat(this.cameraYSlider.val() + ""),
            cameraXRot: -parseFloat(this.cameraXRotSlider.val() + "") * Math.PI / 2,
            mountainTime: parseFloat(this.mountainTimeSlider.val() + ""),
            starZRot: parseFloat(this.starZRotSlider.val() + "") * Math.PI / 2,
            starXRot: -parseFloat(this.starXRotSlider.val() + "") * Math.PI / 2,
            milkyScale: parseFloat(this.milkyScaleSlider.val() + ""),
            milkyBlend: parseFloat(this.milkyBlendSlider.val() + ""),
        }
    }

    preview() {
        this.renderer.render(this.getRenderParams(RenderQuality.Low));
    }
}