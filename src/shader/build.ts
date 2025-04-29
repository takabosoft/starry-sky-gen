import { camera } from "./camera";
import { defines } from "./defines";
import { matrix } from "./matrix";
import { ray } from "./ray";
import { simplexNoise } from "./simplexNoise";

export function buildFragmentShader(): string {
    return `${defines}
${ray}
${camera}
${simplexNoise}
${matrix}

void main() {
    vec3 lookFrom = vec3(0.0, 2.0, +5.0);
    vec3 lookAt = vec3(0.0, 3.0, 0.0);
    vec3 vUp = vec3(0.0, 1.0, 0.0);
    Ray ray = cameraGetRay(lookFrom, lookAt, vUp, 60.0);

    

    gl_FragColor = vec4(mix(vec3(1.0), vec3(0.0), abs(ray.direction.y)), 1.0);
}
`;
}