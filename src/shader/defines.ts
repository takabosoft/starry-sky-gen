export const defines = `
precision highp float;
precision highp int;

uniform vec2 u_resolution;

uniform float u_cameraY;
uniform float u_cameraXRot;

const int u_fbmMaxSteps = 10;
const int u_fbmMinSteps = 5;
const float u_fbmScale = 0.003;
const float u_fbmDepth = 0.63;
const float u_fbmThreshold = 0.8;
const float u_cloudTime = 0.0;

const float u_waveFactor = 0.02;
const float u_waveScale = 1.0;
const float u_waveTime = 0.0;

const float PI = 3.14159265359;
`;