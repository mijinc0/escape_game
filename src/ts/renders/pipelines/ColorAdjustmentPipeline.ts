import { CustomPipeline } from './CustomPipeline';
import FragShader from '../glsl/ColorAdjustment.glsl';

export class ColorAdjustmentPipeline extends CustomPipeline {
  private pColorBalance: number[];
  private pSaturation: number;
  private pLightness: number;

  constructor(game: Phaser.Game) {
    super(game, 'colorAdjustment', FragShader);

    this.colorBalance = [0.0, 0.0, 0.0];
    this.saturation = 1.0;
    this.lightness = 1.0;
  }

  get colorBalance(): number[] {
    return this.pColorBalance;
  }

  set colorBalance(v: number[]) {
    const r = (typeof(v[0]) === 'number') ? v[0] : this.colorBalance[0];
    const g = (typeof(v[1]) === 'number') ? v[1] : this.colorBalance[1];
    const b = (typeof(v[2]) === 'number') ? v[2] : this.colorBalance[2];

    this.pColorBalance = [r, g, b];

    this.setFloat3('colorBalance', r, g, b);
  }
  
  get saturation(): number {
    return this.pSaturation;
  }
  
  set saturation(v: number) {
    this.pSaturation = v;
    this.setFloat1('saturation', v);
  }
  
  get lightness(): number {
    return this.pLightness;
  }
  
  set lightness(v: number) {
    this.pLightness = v;
    this.setFloat1('lightness', v);
  }
}