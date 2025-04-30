export const stars = `

float fbm(int count, vec3 p, float scaleBase, float scalePow, float depthBase, float depthPow) {
    float res = 0.0;
    for (int i = 0; i < 500; i++) {
        if (i >= count) { break; }
        float scale = scaleBase * pow(scalePow, float(i));
        float depth = depthBase * pow(depthPow, float(i));
        res += snoise(p * scale) * depth;
    }
    return res;
}

// 0.0～1.0未満
float rand(float x) {
    return fract(sin(x) * 10000.0);
}

float randRange(float x, float min, float max) {
    return mix(min, max, rand(x));
}

// 天の川
vec3 getMilkyWayColor(Ray ray) {
    float noise = fbm(5, ray.direction, 0.9, 2.6, 1.0, 0.51) * 0.08;
    float band = pow(0.07 * u_milkyScale / length(ray.direction.x + noise), 1.8);


    vec3 baseCol = mix(vec3(0.6392, 0.8392, 1.0), vec3(0.1529, 0.1961, 0.2078), snoise(ray.direction * 10.1) * 0.5 + 0.5);
    
    float wayBrightness = clamp(fbm(8, ray.direction, 100.0, 2.0, 1.0, 0.52) * 0.09 + 0.2, 0.0, 1.0) * clamp(band, 0.0, 3.0);
    vec3 col = baseCol * wayBrightness;

    float noise2 = fbm(5, ray.direction, 0.55, 2.6, 1.0, 0.51) * 0.0015;
    float band2 = pow(0.02 * u_milkyScale / length(ray.direction.x + noise + noise2), 1.8);
    col -= vec3(0.9, 0.9, 1.0) * clamp(fbm(5, ray.direction, 40.0, 2.0, 1.0, 0.9) * 0.2 + 0.25, 0.0, 1.0) * clamp(band2, 0.0, 2.0) * 0.9;
    col = max(col, 0.0) * 0.3;

    float brightness = 0.0;
    for (int i = 0; i < 20; i++) {
        brightness += smoothstep(0.7, 1.0, snoise(ray.direction * (190.0 + float(i) * 5.0)));
    }
    col += baseCol * clamp(band, 0.0, 1.0) * brightness;

    return col;
}

// 星たちの色
vec3 getStarsColor(Ray ray) {
    ray.direction = normalize(ray.direction * rotateX(u_starXRot) * rotateZ(u_starZRot));
    vec3 col = getMilkyWayColor(ray) * u_milkyBlend;

    // 小さな星
    float n = snoise(ray.direction * 180.0);
    float brightness = smoothstep(0.7, 1.0, n);
    col += mix(vec3(1.0, 0.9, 0.8), vec3(0.8, 0.9, 1.0), fract(n)) * brightness;

    // 少し大きな星
    for (int i = 0; i < 500; i++) {
        float x = rand(float(i)) * 2.0 - 1.0;
        float y = rand(float(i) * 1.123) * 2.0 - 1.0;
        float z = rand(float(i) * 50.123) * 2.0 - 1.0;
        vec3 starPos = normalize(vec3(x, y, z));

        float d = dot(ray.direction, starPos);
        float t = randRange(float(i) * 1234.0, 1.0, 0.99998);
        d = smoothstep(t, 1.0, d);
        if (d < 0.001) {
            continue;
        }

        float angleFalloff = 1.0 - d; // 小さいほど中心
        col += vec3(1.0, 1.0, 1.0) * (1.0 - smoothstep(0.00, 0.005, angleFalloff));
        col += vec3(0.5, 0.6, 1.0) * (1.0 - smoothstep(0.005, 0.04, angleFalloff));
        col += vec3(0.2, 0.3, 0.8) * (1.0 - smoothstep(0.02, 0.2, angleFalloff));
    }

    return col;
}
`;