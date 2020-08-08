import * as Phaser from 'phaser';
import * as Render from '../core/renders';
import * as Util from '../core/utils';
import { GameShaders } from './GameShaders';

type TextureTintPipeline = Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline;
type WebGLRenderer = Phaser.Renderer.WebGL.WebGLRenderer;

export class GameShadersRegistrar {
  static regist(game: Phaser.Game): boolean {
    const renderer = game.renderer;

    if (renderer instanceof Phaser.Renderer.WebGL.WebGLRenderer) {
      this._registGameShaders(renderer);
      return true;

    } else {
      console.warn('game.renderer is not Phaser.Renderer.WebGL.WebGLRenderer. shaders will not be used.');
      return false;
    } 
  }

  private static _registGameShaders(renderer: WebGLRenderer): void {
    GameShaders.forEach((entry: Render.IFragShaderEntry) => {
      console.log(`start to regist renderer pipeline (shader) : ${entry.name}`);

      const pipeline = this._registPipeline(renderer, entry.name, entry.glslSrc);

      console.log('- set defaul values');

      const defaultValues = entry.defaultValues ? entry.defaultValues : [];

      defaultValues.forEach((defaultValue: {type: Render.GlslValueType, name: string, value: any}) => {
        this._setUniformValue(
          pipeline,
          defaultValue.type,
          defaultValue.name,
          defaultValue.value,
        );
      });
      console.log('- complete');
    });
  }

  private static _registPipeline(renderer: WebGLRenderer, name: string, fragShader: string): TextureTintPipeline {
    const config = {
      game: renderer.game,
      renderer: renderer,
      fragShader: fragShader,
    };

    const pipelineInstance = new Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline(config);

    renderer.addPipeline(name, pipelineInstance);

    return pipelineInstance;
  }

  private static _setUniformValue(pipeline: TextureTintPipeline, type: Render.GlslValueType, name: string, value: any): void {
    this._checkDefaultValueType(type, value);

    switch(type) {
      case Render.GlslValueType.Float :
        pipeline.setFloat1(name, value);
        break;
  
      case Render.GlslValueType.Vec2 :
        pipeline.setFloat2(name, value[0], value[1]);
        break;

      case Render.GlslValueType.Vec3 :
        pipeline.setFloat3(name, value[0], value[1], value[2]);
        break;

      case Render.GlslValueType.Vec4 :
        pipeline.setFloat4(name, value[0], value[1], value[3], value[4]);
        break;
    }
  }

  private static _checkDefaultValueType(type: Render.GlslValueType, value: any): void {
    let result = false;

    switch(type) {
      case Render.GlslValueType.Float :
        if (Util.ValueTypeUtil.isNumber(value)) {
          result = true;
        }
        break;
  
      case Render.GlslValueType.Vec2 :
        if (Util.ValueTypeUtil.isNumberArray(value) && value.length === 2) {
          result = true;
        }
        break;

      case Render.GlslValueType.Vec3 :
        if (Util.ValueTypeUtil.isNumberArray(value) && value.length === 3) {
          result = true;
        }
        break;

      case Render.GlslValueType.Vec4 :
        if (Util.ValueTypeUtil.isNumberArray(value) && value.length === 4) {
          result = true;
        }
        break;
    }

    if (!result) {
      throw Error(`invalid default value type {type: ${type}, value: ${value}}`);
    }
  }
}