export const defines = `
precision highp float;
precision highp int;

uniform vec2 u_resolution;

uniform float u_cameraY;
uniform float u_cameraXRot;
uniform float u_mountainTime;
uniform float u_starZRot;
uniform float u_starXRot;
uniform float u_milkyScale;
uniform float u_milkyBlend;

uniform int u_fbmMaxSteps;
uniform int u_fbmMinSteps;
uniform int u_cloudMaxSteps;

const float u_fbmScale = 0.003;
const float u_fbmDepth = 0.63;
const float u_fbmThreshold = 0.8;
const float u_cloudTime = 0.0;
const float u_cloudMinY = 100.0;
const float u_cloudThickness = 50.0;

const float u_cloudAlphaScale = 0.04;

const float u_waveFactor = 0.02;
const float u_waveScale = 1.0;
const float u_waveTime = 0.0;

const float PI = 3.14159265359;
`;