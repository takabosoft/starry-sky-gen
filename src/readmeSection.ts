export class ReadmeSection {
    readonly element: JQuery = $(`<section>`).append(
        $(`<h2>`).text("【STEP.0】 お読みください"),
        $(`<div>`).append(
            $(`<ul>`).append(
                $(`<li>`).text(`星空の画像を計算で生成します。`),
                $(`<li>`).text(`生成された画像の著作権は利用者に帰属します。商用利用可能です（クレジット表記などは歓迎いたします）。`),
                $(`<li>`).html(`WebGLを使用しています。NVIDIAの良いグラボが有ると快適に動作いたします。PC推奨。`),
                $(`<li>`).html(`ソースコードはこちら：<a href="https://github.com/takabosoft/starry-sky-gen" target="_blank">https://github.com/takabosoft/starry-sky-gen</a>`),
            )
        )
    )
}