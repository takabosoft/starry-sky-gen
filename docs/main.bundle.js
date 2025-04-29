/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common/webGLCanvas.ts":
/*!***********************************!*\
  !*** ./src/common/webGLCanvas.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.WebGLCanvas = void 0;\nconst vertexShaderSource = `\nattribute vec4 a_position;\nvoid main() {\n    gl_Position = a_position;\n}\n`;\nclass WebGLCanvas {\n    constructor(width, height, fragmentShaderSource) {\n        this.fragmentShaderSource = fragmentShaderSource;\n        this.canvas = $(`<canvas>`)[0];\n        this.canvas.width = width;\n        this.canvas.height = height;\n        const gl = this.canvas.getContext(\"webgl\", { preserveDrawingBuffer: true });\n        if (!gl) {\n            alert(\"WebGLの初期化に失敗\");\n            throw \"WebGLの初期化に失敗\";\n        }\n        this.gl = gl;\n        this.setupWebGL();\n    }\n    get isContextLost() { return this.gl.isContextLost(); }\n    setupWebGL() {\n        const gl = this.gl;\n        const vertexShader = this.createShader(gl.VERTEX_SHADER, vertexShaderSource);\n        const fragmentShader = this.createShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource);\n        const program = gl.createProgram();\n        this.program = program;\n        gl.attachShader(program, vertexShader);\n        gl.attachShader(program, fragmentShader);\n        gl.linkProgram(program);\n        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {\n            console.error('Program link error:', gl.getProgramInfoLog(program));\n        }\n        gl.useProgram(program);\n        const vertices = new Float32Array([\n            -1.0, -1.0,\n            1.0, -1.0,\n            -1.0, 1.0,\n            1.0, 1.0\n        ]);\n        const buffer = gl.createBuffer();\n        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);\n        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);\n        const aPosition = gl.getAttribLocation(program, \"a_position\");\n        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);\n        gl.enableVertexAttribArray(aPosition);\n        this.uResolutionLocation = gl.getUniformLocation(program, \"u_resolution\");\n        gl.uniform2f(this.uResolutionLocation, this.canvas.width, this.canvas.height);\n    }\n    /** シェーダーへ渡すユニフォームの場所を取得します。 */\n    getUniformLocation(name) {\n        return this.gl.getUniformLocation(this.program, name);\n    }\n    /** シェーダーへ渡すユニフォーム値を更新します。 */\n    uniform1f(location, value) {\n        this.gl.uniform1f(location, value);\n    }\n    uniform1i(location, value) {\n        this.gl.uniform1i(location, value);\n    }\n    render() {\n        const gl = this.gl;\n        gl.clearColor(0.0, 0.0, 0.0, 1.0);\n        gl.clear(gl.COLOR_BUFFER_BIT);\n        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);\n        /*const error = gl.getError();\n        if (error != gl.NO_ERROR) {\n            alert(error);\n        }*/\n    }\n    resize(width, height) {\n        this.canvas.width = width;\n        this.canvas.height = height;\n        this.gl.uniform2f(this.uResolutionLocation, width, height);\n        this.gl.viewport(0, 0, width, height);\n    }\n    createShader(type, source) {\n        const shader = this.gl.createShader(type);\n        if (!shader) {\n            throw \"shader can't created!\";\n        }\n        this.gl.shaderSource(shader, source);\n        this.gl.compileShader(shader);\n        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {\n            console.log(source);\n            throw `Shader compile error: ${this.gl.getShaderInfoLog(shader)}`;\n        }\n        return shader;\n    }\n}\nexports.WebGLCanvas = WebGLCanvas;\n\n\n//# sourceURL=webpack://starry-sky-gen/./src/common/webGLCanvas.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n/**\n * Build: npx webpack -w\n * Release Build: npx webpack --mode=production -w\n * Server: npx live-server docs\n */\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst previewSection_1 = __webpack_require__(/*! ./previewSection */ \"./src/previewSection.ts\");\n$(() => new PageController());\nclass PageController {\n    constructor() {\n        console.log(\"OK\");\n        const previewSection = new previewSection_1.PreviewSection();\n        //const renderSection = new RenderSection(() => renderSection.render(previewSection));\n        $(document.body).append($(`<main>`).append(\n        //new ReadmeSection().element,\n        previewSection.element), $(`<div>`).css({ flex: \"1 1 0\" }), $(`<footer>`).html(`星空ジェネレーター Copyright (C) 2025 <a href=\"https://takabosoft.com/\" target=\"_blank\">Takabo Soft</a>`));\n    }\n}\n\n\n//# sourceURL=webpack://starry-sky-gen/./src/main.ts?");

/***/ }),

/***/ "./src/previewSection.ts":
/*!*******************************!*\
  !*** ./src/previewSection.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.PreviewSection = void 0;\nconst renderer_1 = __webpack_require__(/*! ./renderer */ \"./src/renderer.ts\");\nclass PreviewSection {\n    constructor() {\n        this.renderer = new renderer_1.Renderer(320, 240);\n        /*private readonly cameraYRotSlider = $(`<input type=\"range\" min=\"0.0\" max=\"1.0\" step=\"0.00001\" value=\"0.0\">`).on(\"input\", () => this.preview());\n        private readonly cameraXRotSlider = $(`<input type=\"range\" min=\"0.0\" max=\"0.999\" step=\"0.00001\" value=\"0.3\">`).on(\"input\", () => this.preview());\n        private readonly cameraZRotSlider = $(`<input type=\"range\" min=\"-1.0\" max=\"1.0\" step=\"0.00001\" value=\"0.0\">`).on(\"input\", () => this.preview());\n        private readonly cameraDistSlider = $(`<input type=\"range\" min=\"0.1\" max=\"10.0\" step=\"0.00001\" value=\"5.0\">`).on(\"input\", () => this.preview());\n        private readonly galaxyRadiusSlider = $(`<input type=\"range\" min=\"2.0\" max=\"5.0\" step=\"0.00001\" value=\"3.0\">`).on(\"input\", () => this.preview());\n        private readonly galaxyHeightSlider = $(`<input type=\"range\" min=\"0.1\" max=\"1.0\" step=\"0.00001\" value=\"0.3\">`).on(\"input\", () => this.preview());\n        private readonly armAlphaSlider = $(`<input type=\"range\" min=\"0.01\" max=\"2.0\" step=\"0.00001\" value=\"0.3\">`).on(\"input\", () => this.preview());\n        private readonly armWidthSlider = $(`<input type=\"range\" min=\"0.01\" max=\"5.0\" step=\"0.00001\" value=\"2.5\">`).on(\"input\", () => this.preview());\n        private readonly armsSlider = $(`<input type=\"range\" min=\"0.00\" max=\"10.0\" step=\"0.00001\" value=\"2.0\">`).on(\"input\", () => this.preview());\n        private readonly spiralStrengthSlider = $(`<input type=\"range\" min=\"-10.00\" max=\"10.0\" step=\"0.00001\" value=\"3.4\">`).on(\"input\", () => this.preview());\n        private readonly armDistortionSlider = $(`<input type=\"range\" min=\"0.00\" max=\"1.0\" step=\"0.00001\" value=\"0.3\">`).on(\"input\", () => this.preview());\n        private readonly stickRadiusSlider = $(`<input type=\"range\" min=\"0.00\" max=\"3.0\" step=\"0.00001\" value=\"0.0\">`).on(\"input\", () => this.preview());*/\n        this.element = $(`<section>`).append($(`<h2>`).text(\"【STEP.1】 各種設定を行ってください\"), $(`<div class=\"preview-container\">`).append($(this.renderer.webGlCanvas.canvas).on(\"click\", () => {\n            console.log(JSON.stringify(this.getRenderParams(0 /* RenderQuality.Low */)));\n        }), $(`<div class=\"params\">`).append(\n        /*$(`<div>`).text(\"カメラ左右：\"), this.cameraYRotSlider,\n        $(`<div>`).text(\"カメラ上下：\"), this.cameraXRotSlider,\n        $(`<div>`).text(\"カメラ傾き：\"), this.cameraZRotSlider,\n        $(`<div>`).text(\"カメラ距離：\"), this.cameraDistSlider,\n        $(`<div>`).text(\"銀河の半径：\"), this.galaxyRadiusSlider,\n        $(`<div>`).text(\"銀河の厚み：\"), this.galaxyHeightSlider,\n        $(`<div>`).text(\"腕の濃さ：\"), this.armAlphaSlider,\n        $(`<div>`).text(\"腕の幅：\"), this.armWidthSlider,\n        $(`<div>`).text(\"腕の数：\"), this.armsSlider,\n        $(`<div>`).text(\"腕の回転：\"), this.spiralStrengthSlider,\n        $(`<div>`).text(\"腕の歪み：\"), this.armDistortionSlider,\n        $(`<div>`).text(\"棒状銀河：\"), this.stickRadiusSlider,*/\n        )));\n        this.preview();\n    }\n    getRenderParams(quality) {\n        let cloudMaxSteps = 0;\n        let fbmMaxSteps = 0;\n        let fbmMinSteps = 0;\n        switch (quality) {\n            case 0 /* RenderQuality.Low */:\n                cloudMaxSteps = 40;\n                fbmMaxSteps = 10;\n                fbmMinSteps = 2;\n                break;\n            default:\n            case 1 /* RenderQuality.Medium */:\n                cloudMaxSteps = 100;\n                fbmMaxSteps = 10;\n                fbmMinSteps = 2;\n                break;\n            case 2 /* RenderQuality.High */:\n                cloudMaxSteps = 300;\n                fbmMaxSteps = 12;\n                fbmMinSteps = 6;\n                break;\n            case 3 /* RenderQuality.Max */:\n                cloudMaxSteps = 500;\n                fbmMaxSteps = 20;\n                fbmMinSteps = 10;\n                break;\n        }\n        return {\n        /*cameraYRot: -parseFloat(this.cameraYRotSlider.val() + \"\") * Math.PI * 2,\n        cameraXRot: -parseFloat(this.cameraXRotSlider.val() + \"\") * Math.PI / 2,\n        cameraZRot: parseFloat(this.cameraZRotSlider.val() + \"\") * Math.PI / 2,\n        cameraDist: parseFloat(this.cameraDistSlider.val() + \"\"),\n        galaxyRadius: parseFloat(this.galaxyRadiusSlider.val() + \"\"),\n        galaxyHeight: parseFloat(this.galaxyHeightSlider.val() + \"\"),\n        armAlpha: parseFloat(this.armAlphaSlider.val() + \"\"),\n        armWidth: parseFloat(this.armWidthSlider.val() + \"\"),\n        arms: parseFloat(this.armsSlider.val() + \"\"),\n        spiralStrength: parseFloat(this.spiralStrengthSlider.val() + \"\"),\n        armDistortion: parseFloat(this.armDistortionSlider.val() + \"\"),\n        stickRadius: parseFloat(this.stickRadiusSlider.val() + \"\"),\n        \n        cloudMaxSteps,\n        fbmMaxSteps,\n        fbmMinSteps,*/\n        };\n    }\n    preview() {\n        this.renderer.render(this.getRenderParams(0 /* RenderQuality.Low */));\n    }\n}\nexports.PreviewSection = PreviewSection;\n\n\n//# sourceURL=webpack://starry-sky-gen/./src/previewSection.ts?");

/***/ }),

/***/ "./src/renderer.ts":
/*!*************************!*\
  !*** ./src/renderer.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Renderer = void 0;\nconst webGLCanvas_1 = __webpack_require__(/*! ./common/webGLCanvas */ \"./src/common/webGLCanvas.ts\");\nconst build_1 = __webpack_require__(/*! ./shader/build */ \"./src/shader/build.ts\");\nclass Renderer {\n    constructor(width, height) {\n        this.webGlCanvas = new webGLCanvas_1.WebGLCanvas(width, height, (0, build_1.buildFragmentShader)());\n        this.setupUniformLocations();\n    }\n    setupUniformLocations() {\n        //this.uniform1fInfos.forEach(info => info.location = this.webGlCanvas.getUniformLocation(info.name));\n        //this.uniform1iInfos.forEach(info => info.location = this.webGlCanvas.getUniformLocation(info.name));\n    }\n    render(params) {\n        if (this.webGlCanvas.isContextLost) {\n            this.webGlCanvas.setupWebGL();\n            this.setupUniformLocations();\n        }\n        //this.uniform1fInfos.forEach(info => this.webGlCanvas.uniform1f(info.location!, info.getValue(params)));\n        //this.uniform1iInfos.forEach(info => this.webGlCanvas.uniform1i(info.location!, info.getValue(params)));\n        this.webGlCanvas.render();\n    }\n}\nexports.Renderer = Renderer;\n\n\n//# sourceURL=webpack://starry-sky-gen/./src/renderer.ts?");

/***/ }),

/***/ "./src/shader/build.ts":
/*!*****************************!*\
  !*** ./src/shader/build.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.buildFragmentShader = buildFragmentShader;\nconst camera_1 = __webpack_require__(/*! ./camera */ \"./src/shader/camera.ts\");\nconst defines_1 = __webpack_require__(/*! ./defines */ \"./src/shader/defines.ts\");\nconst matrix_1 = __webpack_require__(/*! ./matrix */ \"./src/shader/matrix.ts\");\nconst ray_1 = __webpack_require__(/*! ./ray */ \"./src/shader/ray.ts\");\nconst simplexNoise_1 = __webpack_require__(/*! ./simplexNoise */ \"./src/shader/simplexNoise.ts\");\nfunction buildFragmentShader() {\n    return `${defines_1.defines}\n${ray_1.ray}\n${camera_1.camera}\n${simplexNoise_1.simplexNoise}\n${matrix_1.matrix}\n\nvoid main() {\n    vec3 lookFrom = vec3(0.0, 2.0, +5.0);\n    vec3 lookAt = vec3(0.0, 3.0, 0.0);\n    vec3 vUp = vec3(0.0, 1.0, 0.0);\n    Ray ray = cameraGetRay(lookFrom, lookAt, vUp, 60.0);\n\n    \n\n    gl_FragColor = vec4(mix(vec3(1.0), vec3(0.0), abs(ray.direction.y)), 1.0);\n}\n`;\n}\n\n\n//# sourceURL=webpack://starry-sky-gen/./src/shader/build.ts?");

/***/ }),

/***/ "./src/shader/camera.ts":
/*!******************************!*\
  !*** ./src/shader/camera.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.camera = void 0;\nexports.camera = `\nRay cameraGetRay(vec3 lookFrom, vec3 lookAt, vec3 vUp, float vFov) {\n    float aspectRatio = u_resolution.x / u_resolution.y;\n    float theta = radians(vFov);\n    float h = tan(theta / 2.0);\n    float viewportHeight = 2.0 * h;\n    float viewportWidth = aspectRatio * viewportHeight;\n    \n    vec3 w = normalize(lookFrom - lookAt);\n    vec3 u = normalize(cross(vUp, w));\n    vec3 v = cross(w, u);\n    \n    vec3 horizontal = u * viewportWidth;\n    vec3 vertical = v * viewportHeight;\n    vec3 lowerLeftCorner = lookFrom - (horizontal / 2.0) - (vertical / 2.0) - w;\n    \n    vec2 uv = gl_FragCoord.xy / (u_resolution - 1.0);\n    return rayInit(lookFrom, lowerLeftCorner + uv.x * horizontal + uv.y * vertical - lookFrom);\n}\n`;\n\n\n//# sourceURL=webpack://starry-sky-gen/./src/shader/camera.ts?");

/***/ }),

/***/ "./src/shader/defines.ts":
/*!*******************************!*\
  !*** ./src/shader/defines.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.defines = void 0;\nexports.defines = `\nprecision highp float;\nprecision highp int;\n\nuniform vec2 u_resolution;\n\nconst float PI = 3.14159265359;\n`;\n\n\n//# sourceURL=webpack://starry-sky-gen/./src/shader/defines.ts?");

/***/ }),

/***/ "./src/shader/matrix.ts":
/*!******************************!*\
  !*** ./src/shader/matrix.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.matrix = void 0;\nexports.matrix = `\nmat3 rotateX(float theta) {\n    float c = cos(theta);\n    float s = sin(theta);\n    return mat3(\n        1.0, 0.0, 0.0,\n        0.0, c, -s,\n        0.0, s, c\n    );\n}\n\nmat3 rotateY(float theta) {\n    float c = cos(theta);\n    float s = sin(theta);\n    return mat3(\n        c, 0.0, -s,\n        0.0, 1.0, 0.0,\n        s, 0.0, c\n    );\n}\n\nmat3 rotateZ(float theta) {\n    float c = cos(theta);\n    float s = sin(theta);\n    return mat3(\n        c, -s, 0.0,\n        s,  c, 0.0,\n        0.0, 0.0, 1.0\n    );\n}\n`;\n\n\n//# sourceURL=webpack://starry-sky-gen/./src/shader/matrix.ts?");

/***/ }),

/***/ "./src/shader/ray.ts":
/*!***************************!*\
  !*** ./src/shader/ray.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ray = void 0;\nexports.ray = `\nstruct Ray {\n    // レイの原点\n    vec3 origin;\n    // レイの方向（単位ベクトル）\n    vec3 direction;\n};\n\n// レイ初期化\nRay rayInit(vec3 origin, vec3 direction) {\n    return Ray(origin, normalize(direction));\n}\n\n// レイの進行度tにおける座標を取得\nvec3 rayAt(Ray ray, float t) {\n    return ray.origin + t * ray.direction;\n}\n`;\n\n\n//# sourceURL=webpack://starry-sky-gen/./src/shader/ray.ts?");

/***/ }),

/***/ "./src/shader/simplexNoise.ts":
/*!************************************!*\
  !*** ./src/shader/simplexNoise.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.simplexNoise = void 0;\n/**\n * Array and textureless GLSL 2D/3D/4D simplex noise functions.\n * Copyright (C) 2011 Ashima Arts. All rights reserved.\n * https://github.com/hughsk/glsl-noise/blob/master/simplex/3d.glsl\n */\nexports.simplexNoise = `\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n     return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289(i);\n  vec4 p = permute( permute( permute(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n`;\n\n\n//# sourceURL=webpack://starry-sky-gen/./src/shader/simplexNoise.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;