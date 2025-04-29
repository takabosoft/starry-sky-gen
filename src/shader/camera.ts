export const camera = `
struct Camera {
    vec3 lookFrom;
    vec3 lowerLeftCorner;
    vec3 horizontal;
    vec3 vertical;
};

Camera cameraInit(vec3 lookFrom, vec3 lookAt, vec3 vUp, float vFov) {
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
    return Camera(lookFrom, lowerLeftCorner, horizontal, vertical);
}

Ray cameraGetRay(Camera camera, vec2 uv) {
    return rayInit(camera.lookFrom, camera.lowerLeftCorner + uv.x * camera.horizontal + uv.y * camera.vertical - camera.lookFrom);
}
`;