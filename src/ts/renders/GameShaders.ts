import * as Render from '../core/renders';
import * as ColorAdjustment from './glsl/ColorAdjustment.glsl';
import * as TestShader from './glsl/TestShader.glsl';

export const GameShaders: Render.IFragShaderEntry[] = [
  {
    name: 'test',
    glslSrc: TestShader.default,
    defaultValues: [
      {type: Render.GlslValueType.Vec3, name: 'colorBalance', value: [0.0, 0.0, 0.0]},
      {type: Render.GlslValueType.Float, name: 'saturation', value: 1.0},
      {type: Render.GlslValueType.Float, name: 'lightness', value: 1.0},
    ],
  },

  {
    name: 'colorAdjustment',
    glslSrc: TestShader.default,
    defaultValues: [
      {type: Render.GlslValueType.Vec3, name: 'colorBalance', value: [0.0, 0.0, 0.0]},
      {type: Render.GlslValueType.Float, name: 'saturation', value: 1.0},
      {type: Render.GlslValueType.Float, name: 'lightness', value: 1.0},
    ],
  },
];