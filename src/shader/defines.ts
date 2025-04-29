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

uniform float u_fbmScale;
uniform float u_fbmDepth;
uniform float u_fbmThreshold;
uniform float u_cloudTime;
uniform float u_cloudMinY;
uniform float u_cloudThickness;
uniform float u_cloudAlphaScale;

uniform float u_waveFactor;
uniform float u_waveScale;
uniform float u_waveTime;

uniform int u_fbmMaxSteps;
uniform int u_fbmMinSteps;
uniform int u_cloudMaxSteps;
uniform int u_sampleCount;

const float PI = 3.14159265359;
`;