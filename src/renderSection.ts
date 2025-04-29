import { PreviewSection } from "./previewSection";
import { Renderer } from "./renderer";

export class RenderSection {
    readonly element: JQuery;
    private readonly renderer = new Renderer(1, 1);
    private readonly widthInput = $(`<input type="number" min="1" value="800">`);
    private readonly heightInput = $(`<input type="number" min="1" value="600">`);
    private readonly resultDiv = $(`<div class="render-result">`);
    private readonly qualitySelect = $("<select>").append(
        $(`<option value="0">`).text("低"),
        $(`<option value="1" selected>`).text("中"),
        $(`<option value="2">`).text("高"),
        $(`<option value="3">`).text("最高"),
    );

    constructor(onRender: () => void) {
        this.element = $(`<section>`).append(
            $(`<h2>`).text("【STEP.2】 問題無ければ[画像生成]ボタンを押してください"),
            $(`<div class="render-contents">`).append(
                $(`<div class="params">`).append(
                    $(`<div>`).text("出力解像度："), 
                    $(`<div class="resolution">`).append(
                        this.widthInput,
                        $(`<div>`).text("×"),
                        this.heightInput,
                    ),
                    $(`<div>`).text("品質："), this.qualitySelect,

                ),
                $(`<button>`).text("画像生成").on("click", () => onRender()),
                $(`<ul>`).append(
                    [
                        "スマホでは品質や解像度を上げると正常に動作しない場合があります。なるべくハイスペックなPCでお試しください。",
                        "画像が生成されたら画像を右クリック（長押し）してコピーや保存を行ってください。",
                    ].map(p => $(`<li>`).text(p)),
                ),
                this.resultDiv,
            )
        );
    }

    render(previewSection: PreviewSection) {
        const quality = parseInt(this.qualitySelect.val() + "");
        const params = previewSection.getRenderParams(quality);
        
        const width = Math.max(Math.floor(parseInt(this.widthInput.val() + "")), 1);
        const height = Math.max(Math.floor(parseInt(this.heightInput.val() + "")), 1);

        this.resultDiv.empty();
        this.renderer.webGlCanvas.resize(width, height);
        this.renderer.render(params);
        const img = new Image();
        img.src = this.renderer.webGlCanvas.canvas.toDataURL("image/png");
        this.resultDiv.append(img);
    }
}