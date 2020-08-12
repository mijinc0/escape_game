import * as Phaser from 'phaser';
import * as Render from '../../core/renders';
import * as Actor from '../../core/actors';

export class NightEffect implements Render.ICameraEffect {
  readonly name = 'nightEffect';

  isRunning: boolean;

  private darkFilter: Phaser.GameObjects.Rectangle;
  private light: Phaser.Display.Masks.GeometryMask;
  private lightTarget: Actor.ActorSprite;

  constructor() {
    this.isRunning = false;

    this.darkFilter = null;
    this.light = null;
    this.lightTarget = null;
  }

  start(camera: Phaser.Cameras.Scene2D.Camera, lightTarget?: Actor.ActorSprite): void {
    if (this.isRunning) {
      console.warn('night effect already run');
      return;
    }

    this.darkFilter = this._createDarkFilter(camera);

    if (lightTarget instanceof Actor.ActorSprite) {
      this.lightTarget = lightTarget;
      this.light = this._createLight(camera);

      this.darkFilter.setMask(this.light);

      this._updateLightPosition();
    } else {
      this.light = null;
      this.lightTarget = null;
    }

    this.isRunning = true;
  }

  reset(): void {
    this.darkFilter.destroy(true);
    // Phaser.Display.Masks.GeometryMask.destroyは内包するgraphicを
    // destroyしてくれないので先にdestroyしておく
    this.light.geometryMask.destroy(true);
    this.light.destroy();

    this.isRunning = false;
    this.darkFilter = null;
    this.light = null;
    this.lightTarget = null;
  }

  update(time: number, delta: number): void {
    if (!this.isRunning) return;

    this._updateLightPosition();
  }

  private _createDarkFilter(camera: Phaser.Cameras.Scene2D.Camera): Phaser.GameObjects.Rectangle {
    const scene = camera.scene;

    const cameraBounds = camera.getBounds();

    const color = 0x110833;
    const alpha = 0.5;

    const rectangle = scene.add.rectangle(
      cameraBounds.x,
      cameraBounds.y,
      cameraBounds.width,
      cameraBounds.height,
      color,
      alpha,
    );

    rectangle.setOrigin(0);
    Render.CameraEffectRenderOrder.base(rectangle);

    return rectangle;
  }

  private _createLight(camera: Phaser.Cameras.Scene2D.Camera): Phaser.Display.Masks.GeometryMask {
    const scene = camera.scene;

    const graphic = scene.add.graphics();

    // x,yは一時的な初期値
    graphic.fillCircle(0, 0, 72);
    graphic.alpha = 0;

    const mask = graphic.createGeometryMask();

    mask.setInvertAlpha(true);

    return mask;
  }

  private _updateLightPosition(): void {
    if (!this.light || !this.lightTarget) return;

    const targetCenter = this.lightTarget.getCenter();

    this.light.geometryMask.setPosition(targetCenter.x, targetCenter.y);
  }
}
