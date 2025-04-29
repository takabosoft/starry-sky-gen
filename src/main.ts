/**
 * Build: npx webpack -w
 * Release Build: npx webpack --mode=production -w
 * Server: npx live-server docs
 */

$(() => new PageController());

class PageController {
    constructor() {
        console.log("OK");
        //const previewSection = new PreviewSection();
        //const renderSection = new RenderSection(() => renderSection.render(previewSection));

        /*$(document.body).append(
            $(`<main>`).append(
                new ReadmeSection().element,
                previewSection.element,
                renderSection.element,
            ),
            $(`<div>`).css({ flex: "1 1 0" }),
            $(`<footer>`).html(`銀河ジェネレーター Copyright (C) 2025 <a href="https://takabosoft.com/" target="_blank">Takabo Soft</a>`),
        );*/
    }
}