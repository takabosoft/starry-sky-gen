export const skyBackgroundColor = `

const vec3 sky4 = vec3(0.0 / 255.0, 0.0 / 255.0, 0.0 / 255.0);
const vec3 sky3 = vec3(5.0 / 255.0, 16.0 / 255.0, 46.0 / 255.0);
const vec3 sky2 = vec3(16.0 / 255.0, 39.0 / 255.0, 80.0 / 255.0);
const vec3 sky1 = vec3(160.0 / 255.0, 50.0 / 255.0, 50.0 / 255.0);
const float skyGrad1 = 0.1;
const float skyGrad2 = 0.2;

// 背景の色
vec3 getSkyBackgroundColor(Ray ray) {
    float y = ray.direction.y;

    if (y < skyGrad1) {
        return mix(sky1, sky2, y / skyGrad1);
    } else if (y < skyGrad2) {
        float t = (y - skyGrad1) / (skyGrad2 - skyGrad1);
        return mix(sky2, sky3, t);
    } else {
        float t = (y - skyGrad2) / (0.5 - skyGrad2);
        return mix(sky3, sky4, t);
    }
}
`;