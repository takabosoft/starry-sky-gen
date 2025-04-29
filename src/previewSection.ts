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
    private readonly mountainTimeSlider = $(`<input type="range" min="0" max="20.0" step="0.00001" value="0">`).on("input", () => this.preview());
    private readonly starZRotSlider = $(`<input type="range" min="-0.999" max="0.999" step="0.00001" value="0.4">`).on("input", () => this.preview());
    private readonly starXRotSlider = $(`<input type="range" min="-0.999" max="0.999" step="0.00001" value="0.0">`).on("input", () => this.preview());
    private readonly milkyScaleSlider = $(`<input type="range" min="0.1" max="5.0" step="0.00001" value="1.0">`).on("input", () => this.preview());
    private readonly milkyBlendSlider = $(`<input type="range" min="0.0" max="5.0" step="0.00001" value="1.0">`).on("input", () => this.preview());

    private readonly fbmScaleSlider = $(`<input type="range" min="0.00001" max="0.01" step="0.00001" value="0.003">`).on("input", () => this.preview());
    private readonly fbmDepthSlider = $(`<input type="range" min="0.1" max="1" step="0.00001" value="0.63">`).on("input", () => this.preview());
    private readonly fbmThresholdSlider = $(`<input type="range" min="0.1" max="1" step="0.00001" value="0.8">`).on("input", () => this.preview());
    private readonly cloudTimeSlider = $(`<input type="range" min="0.001" max="3000.0" step="0.00001" value="0.0">`).on("input", () => this.preview());
    private readonly cloudMinYSlider = $(`<input type="range" min="100" max="400" step="0.00001" value="100">`).on("input", () => this.preview());
    private readonly cloudThicknessSlider = $(`<input type="range" min="10" max="700" step="0.000011" value="50">`).on("input", () => this.preview());
    private readonly cloudAlphaScaleSlider = $(`<input type="range" min="0" max="0.05" step="0.00001" value="0.04">`).on("input", () => this.preview());

    private readonly waveFactorSlider = $(`<input type="range" min="0.001" max="0.1" step="0.00001" value="0.02">`).on("input", () => this.preview());
    private readonly waveScaleSlider = $(`<input type="range" min="0.000" max="2.0" step="0.00001" value="1.0">`).on("input", () => this.preview());
    private readonly waveTimeSlider = $(`<input type="range" min="0.000" max="100.0" step="0.00001" value="0.0">`).on("input", () => this.preview());

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

                $(`<div>`).text("雲の高度："), this.cloudMinYSlider,
                $(`<div>`).text("雲の濃さ："), this.cloudAlphaScaleSlider,
                $(`<div>`).text("雲の厚み："), this.cloudThicknessSlider,
                $(`<div>`).text("雲の細かさ："), this.fbmScaleSlider,
                $(`<div>`).text("雲の細部強調："), this.fbmDepthSlider,
                $(`<div>`).text("雲の量："), this.fbmThresholdSlider,
                $(`<div>`).text("雲の時間："), this.cloudTimeSlider,

                $(`<div>`).text("湖面ゆらぎ強さ："), this.waveFactorSlider,
                $(`<div>`).text("湖面ゆらぎサイズ："), this.waveScaleSlider,
                $(`<div>`).text("湖面の時間："), this.waveTimeSlider,
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

            fbmScale: parseFloat(this.fbmScaleSlider.val() + ""),
            fbmDepth: parseFloat(this.fbmDepthSlider.val() + ""),
            fbmThreshold: parseFloat(this.fbmThresholdSlider.val() + ""),
            cloudTime: parseFloat(this.cloudTimeSlider.val() + ""),
            cloudMinY: parseFloat(this.cloudMinYSlider.val() + ""),
            cloudThickness: parseFloat(this.cloudThicknessSlider.val() + ""),
            cloudAlphaScale: parseFloat(this.cloudAlphaScaleSlider.val() + ""),

            waveFactor: parseFloat(this.waveFactorSlider.val() + ""),
            waveScale: parseFloat(this.waveScaleSlider.val() + ""),
            waveTime: parseFloat(this.waveTimeSlider.val() + ""),

            cloudMaxSteps,
            fbmMaxSteps,
            fbmMinSteps,
        }
    }

    preview() {
        this.renderer.render(this.getRenderParams(RenderQuality.Low));
    }
}