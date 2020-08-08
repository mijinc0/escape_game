export default `
precision mediump float;
uniform sampler2D uMainSampler;
varying vec2 outTexCoord;

void main(void) {
  vec4 color = texture2D(uMainSampler, outTexCoord);
  float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  gl_FragColor = vec4(vec2(gray), 0.5, 1.0);
}
`;