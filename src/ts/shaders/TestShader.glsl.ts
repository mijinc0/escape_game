export default `
precision mediump float;
uniform float t; // time
uniform vec2  r; // resolution

void main(void){
    gl_FragColor = vec4(0.0, 1.0, 0.0, 0.5);
}
`;