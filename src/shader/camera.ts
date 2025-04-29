export const camera = `
Ray cameraGetRay(vec3 lookFrom, vec3 lookAt, vec3 vUp, float vFov) {
    float aspectRatio = u_resolution.x / u_resolution.y;
    float theta = radians(vFov);
    float h = tan(theta / 2.0);
    float viewportHeight = 2.0 * h;
    float viewportWidth = aspectRatio * viewportHeight;
    
    vec3 w = normalize(lookFrom - lookAt);
    vec3 u = normalize(cross(vUp, w));
    vec3 v = cross(w, u);
    
    vec3 horizontal = u * viewportWidth;
    vec3 vertical = v * viewportHeight;
    vec3 lowerLeftCorner = lookFrom - (horizontal / 2.0) - (vertical / 2.0) - w;
    
    vec2 uv = gl_FragCoord.xy / (u_resolution - 1.0);
    return rayInit(lookFrom, lowerLeftCorner + uv.x * horizontal + uv.y * vertical - lookFrom);
}
`;