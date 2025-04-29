export const cloud = `

vec3 cameraOrigin;

// 雲をサンプリング
float sampleCloudDensity(vec3 p) {
    float res = 0.0;

    // 近いところは回数を増やしたい
    float dist = distance(cameraOrigin, p);
    int steps = int(mix(float(u_fbmMaxSteps), float(u_fbmMinSteps), clamp(dist / 3000.0, 0.0, 1.0)));

    p += vec3(8.0, 1.0, 4.0) * 0.4 * u_cloudTime;

    for (int i = 0; i < 100; i++) {
        if (i >= steps) {
            break;
        }
    
        float scale = u_fbmScale * pow(2.0, float(i));
        float depth = pow(u_fbmDepth, float(i));
        float noise = snoise(p * scale);
        if (i == 0) {
            noise -= (1.0 - u_fbmThreshold);
        }
        res += noise * depth;
    }
    return res;
}

float saturate(float f) {
   return clamp(f, 0.0, 1.0);
}

// Yが指定した値になるときのtを求めます。負の値なら存在しません。
float calcHitAtY(float y, Ray ray) {
    if (ray.direction.y == 0.0) { return -1.0; }
    return (y - ray.origin.y) / ray.direction.y;
}

// レイマーチングで雲の色を算出します。
vec4 getCloudColor(Ray ray) {
    if (ray.direction.y < 0.0) {
        ray.direction.y = -ray.direction.y;
    }

    // 透明度 1で完全透明、0で不透明
    float transmittance = 1.0;
    // 密度の累積
    float accumulatedDensity = 0.0; 

    float tMin = calcHitAtY(u_cloudMinY, ray);
    float tMax = calcHitAtY(u_cloudMinY + u_cloudThickness, ray);
    if (tMin < 0.0 || tMax < 0.0) { return vec4(0.0); }
    
    float stepSize = (tMax - tMin) / float(u_cloudMaxSteps);


    float t = tMin;
    vec3 p = rayAt(ray, tMin);
    float opacity = smoothstep(-1000.0, -300.0, p.z);
    vec3 pStep = ray.direction * stepSize;

    for (int i = 0; i < 1000; i++) {
        if (i >= u_cloudMaxSteps || p.z < -1100.0) {
            break;
        }

        float density = sampleCloudDensity(p);
        
        // 密度が小さすぎる値は無視します。
        if (density > 0.001) {
            float alpha = saturate(density * stepSize * u_cloudAlphaScale);
            accumulatedDensity += alpha * transmittance;
            transmittance *= 1.0 - alpha;
        }

        // 不透明度になってきたら計算を終了します。
        if (transmittance < 0.01) {
            break;
        }

        p += pStep;
    }

    return vec4(mix(vec3(0.5), vec3(0.1), accumulatedDensity), accumulatedDensity * opacity);
}
`;