export class ChangelogSection {
    readonly element: JQuery = $(`<section>`).append(
        $(`<h2>`).text("更新履歴"),
        $(`<div>`).append(
            $(`<ul>`).append(
                $(`<li>`).html(`2025/04/30 Ver.1.0.1 グラボによって大きいサイズの星の描画がおかしくなる症状を改善`),
                $(`<li>`).html(`2025/04/29 Ver.1.0.0 初期リリース`),
            )
        )
    )
}