import { camera } from "./camera";
import { cloud } from "./cloud";
import { defines } from "./defines";
import { matrix } from "./matrix";
import { ray } from "./ray";
import { simplexNoise } from "./simplexNoise";
import { skyBackgroundColor } from "./skyBackgroundColor";
import { stars } from "./stars";

export function buildFragmentShader(): string {
    return `${defines}
${ray}
${camera}
${simplexNoise}
${matrix}
${skyBackgroundColor}
${stars}
${cloud}

float getMountainShadow(Ray ray) {
    vec3 mountainUnit = normalize(vec3(ray.direction.x, 0, ray.direction.z));
    float noise = fbm(8, vec3(mountainUnit.x, u_mountainTime, mountainUnit.z) * 1.4, 0.8, 2.0, 1.0, 0.51);
    float mountainHeight = pow(noise, 2.0) * 10.0 + 4.5;
    float dis = 100.0;

    // 角度の差でスムージング
    float mountainY = normalize(vec3(mountainUnit.x * dis, mountainHeight, mountainUnit.z * dis)).y;
    float delta = 0.001; // この幅を調整すると影の「ぼかし具合」が変わる
    return smoothstep(mountainY - delta, mountainY + delta, ray.direction.y);
}

// レイ方向の色を取得します。
vec3 getWorldColor(Ray ray) {
    float mountainShadow = getMountainShadow(ray);
    vec3 col = vec3(0.0);
    if (mountainShadow < 0.0001) {
        return col;
    }
    col += getStarsColor(ray);
    col += getSkyBackgroundColor(ray);

    vec4 cloud = getCloudColor(ray);
    col = mix(col, cloud.rgb, cloud.a);

    col *= mountainShadow;

    // ガンマ値補正
    col = pow(col, vec3(0.8));
    return col;
}

vec3 getLakeColor(Ray ray) {
    float t = -ray.origin.y / ray.direction.y;
    if (ray.direction.y < 0.0 && t > 0.0) {
        vec3 hitPoint = ray.origin + t * ray.direction;
        
        // 波紋パターンを生成
        float noiseX = snoise(vec3(hitPoint.x * u_waveScale, hitPoint.z * u_waveScale, u_waveTime)) * u_waveFactor;
        float noiseZ = snoise(vec3(hitPoint.x * u_waveScale + 100.0, hitPoint.z * u_waveScale, u_waveTime)) * u_waveFactor;
        
        // 法線
        vec3 normal = normalize(vec3(-noiseX, 1.0, -noiseZ));
        
        vec3 reflectedDir = reflect(ray.direction, normal);
        
        // レイを反射方向に更新
        ray.origin = hitPoint + normal * 0.001; // 自己交差を避けるための微小オフセット
        ray.direction = reflectedDir;

        return getWorldColor(ray) * 0.7;
    }
    return vec3(0.0);
}

vec3 getColor(Camera cam) {
    Ray ray = cameraGetRay(cam, gl_FragCoord.xy / (u_resolution - 1.0));

    // レイがy=0と交わる場合は反射を行う　水面のように揺らぐ
    float t = -ray.origin.y / ray.direction.y;
    if (ray.direction.y < 0.0 && t > 0.0) {
        // 湖面だけアンチエイリアシング対応（星空の方は暗くなるので掛けない）
        
        vec3 col = vec3(0.0);
        for (int i = 0; i < 40; i++) {
            if (i >= u_sampleCount) { break; }
            float xOffset = rand(float(i));
            float yOffset = rand(float(i) + 100.0);
            col += getLakeColor(cameraGetRay(cam, (gl_FragCoord.xy + vec2(xOffset, yOffset)) / (u_resolution - 1.0)));
        }
        return col / float(u_sampleCount);
    } else {
        return getWorldColor(ray);
    }
}

void main() {
    vec3 lookFrom = vec3(0.0, u_cameraY, +5.0);
    cameraOrigin = lookFrom;
    vec3 lookAt = lookFrom + rotateX(u_cameraXRot) * vec3(0.0, 0.0, -1.0);
    vec3 vUp = vec3(0.0, 1.0, 0.0);

    Camera cam = cameraInit(lookFrom, lookAt, vUp, 60.0);
    gl_FragColor = vec4(getColor(cam), 1.0);
}
`;
}