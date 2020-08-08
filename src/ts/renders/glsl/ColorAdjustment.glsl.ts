export default `
precision mediump float;

varying vec2 outTexCoord;
uniform sampler2D uMainSampler;

uniform vec3 colorBalance;
uniform float saturation;
uniform float lightness;

vec3 adjustColorBalance(vec3 rgb) {
  return clamp(rgb + colorBalance, 0.0, 1.0);
}

vec3 adjustLightness(vec3 rgb) {
  return clamp(rgb * vec3(lightness), 0.0, 1.0);
}

vec3 adjustSaturation(vec3 rgb) {
  const vec3 W = vec3(0.2125, 0.7154, 0.0721);
  float gray = dot(rgb, W);

  float s = clamp(1.0 - saturation, 0.0, 1.0);

  return mix(rgb, vec3(gray), s);
}

void main(void) {
  vec4 color = texture2D(uMainSampler, outTexCoord);

  vec3 rgb = adjustColorBalance(color.rgb);
  rgb = adjustLightness(rgb);
  rgb = adjustSaturation(rgb);

  gl_FragColor = vec4(rgb, 1.0);
}
`;