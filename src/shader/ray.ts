export const ray = `
struct Ray {
    // レイの原点
    vec3 origin;
    // レイの方向（単位ベクトル）
    vec3 direction;
};

// レイ初期化
Ray rayInit(vec3 origin, vec3 direction) {
    return Ray(origin, normalize(direction));
}

// レイの進行度tにおける座標を取得
vec3 rayAt(Ray ray, float t) {
    return ray.origin + t * ray.direction;
}
`;