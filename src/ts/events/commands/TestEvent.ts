import * as Util from '../../core/utils';
import * as Event from '../../core/events';
import * as Scene from '../../core/scenes';

/**
 * 色々試す時に使うイベント(本編では不要)
 */
export class TestEvent implements Event.IScenarioEvent {
  readonly isAsync: boolean;

  isComplete: boolean;

  constructor(isAsync?: boolean) {
    this.isAsync = isAsync ? isAsync : false;
  }

  init(scenes: Scene.IFieldScene): void {
    this.isComplete = false;
    
    const graphic = scenes.phaserScene.make.graphics({
      fillStyle: {
        color: 0x000000,
      }
    });
    
    graphic.fillCircle(0, 0, 96);
    graphic.alpha = 1;

    const primaryActorSprite = scenes.primaryActor.sprite;
    
    Object.defineProperty(graphic, 'x', {
      get: () => {
        return primaryActorSprite.x + (primaryActorSprite.width / 2);
      },
    });

    Object.defineProperty(graphic, 'y', {
      get: () => {
        return primaryActorSprite.y + (primaryActorSprite.height / 2);
      },
    });

    const demoSprite = scenes.actorsManager.findActorById(0);
  
    const maskA = graphic.createGeometryMask();
    const maskB = graphic.createGeometryMask();
    maskB.invertAlpha = true;

    const worldView = scenes.phaserScene.cameras.main.worldView;
    const filter = scenes.phaserScene.add.rectangle(
      worldView.x,
      worldView.y,
      worldView.width * 2,
      worldView.height * 2,
      0x000000,
      0.5,
    );

    Object.defineProperty(filter, 'x', {
      get: () => {
        return primaryActorSprite.x + (primaryActorSprite.width / 2);
      },
    });

    Object.defineProperty(filter, 'y', {
      get: () => {
        return primaryActorSprite.y + (primaryActorSprite.height / 2);
      },
    });

    (<any>demoSprite.sprite).setMask(maskA);
    filter.setMask(maskB);
  }

  update(scenes: Scene.IFieldScene): void {
    this.complete();
  }

  complete(): void {
    this.isComplete = true;
  }
}
