import * as Model from '../core/models';
import { GameGlobal } from '../GameGlobal';
import { TestEvent } from './commands/TestEvent';
import { ActorSpriteTint } from './commands/ActorSpriteTint';
import { Message } from './commands/Message';
import { MessageBufferFactory } from './commands/MessageBufferFactory';
import { Item } from './commands/Item';
import { Flag } from './commands/Flag';
import { Variable } from './commands/Variable';
import { Sleep } from './commands/Sleep';
import { MoveField } from './commands/MoveField';
import { CameraFadeIn } from './commands/CameraFadeIn';
import { CameraFadeOut } from './commands/CameraFadeOut';
import { CameraFadeInAll } from './commands/CameraFadeInAll';
import { CameraFadeOutAll } from './commands/CameraFadeOutAll';
import { PlayActorAnim } from './commands/PlayActorAnim';
import { PopGettingItemModal } from './commands/PopGettingItemModal';
import { PlaySe } from './commands/PlaySe';
import { Choices } from './commands/Choices';
import { Passcode } from './commands/Passcode';
import { MoveActor } from './commands/MoveActor';
import { ChangeActorDirection } from './commands/ChangeActorDirection';
import { CameraEffectNight } from './commands/CameraEffectNight';
import { ActorSpriteAlpha } from './commands/ActorSpriteAlpha';
import { Ending } from './commands/Ending';

export class ScenarioEventCommandsFactory {
  static messageBufferFactory = new MessageBufferFactory(GameGlobal);

  static test(isAsync?: boolean): TestEvent {
    return new TestEvent();
  }

  static message(message: string, isAsync = false, align = 'left', hasBackground = true, justify = 'bottom'): Message {
    return new Message(
      message,
      isAsync,
      align,
      hasBackground,
      justify,
      this.messageBufferFactory.create.bind(this.messageBufferFactory),
    );
  }

  static item(itemId: number, delta: number): Item {
    return new Item(itemId, delta);
  }

  static flag(key: number, value: boolean): Flag {
    const _value = value ? 1 : -1;
    return new Flag(key, _value);
  }

  static toggleFlag(key: number): Flag {
    return new Flag(key, 0);
  }

  static setVariable(key: number, value: number): Variable {
    return new Variable(key, value, 0);
  }

  static addVariable(key: number, value: number): Variable {
    return new Variable(key, value, 1);
  }

  static substractVariable(key: number, value: number): Variable {
    return new Variable(key, value, -1);
  }

  static sleep(frame: number): Sleep {
    return new Sleep(frame);
  }

  static moveField(fieldId: number, x: number, y: number, direction: Model.Direction): MoveField {
    return new MoveField(fieldId, x, y, direction);
  }

  static cameraEffectNight(): CameraEffectNight {
    return new CameraEffectNight();
  }

  static cameraFadeIn(duration?: number, async?: boolean): CameraFadeIn {
    return new CameraFadeIn(duration, async);
  }

  static cameraFadeOut(duration?: number, async?: boolean): CameraFadeOut {
    return new CameraFadeOut(duration, async);
  }

  static cameraFadeInAll(duration?: number, async?: boolean): CameraFadeInAll {
    return new CameraFadeInAll(duration, async);
  }

  static cameraFadeOutAll(duration?: number, async?: boolean): CameraFadeOutAll {
    return new CameraFadeOutAll(duration, async);
  }

  static playActorAnim(actorId: number, animName: string, repeat?: number, async?: boolean): PlayActorAnim {
    return new PlayActorAnim(actorId, animName, repeat, async);
  }

  static popGettingItemModal(itemId: number): PopGettingItemModal {
    return new PopGettingItemModal(itemId);
  }

  static playSe(audioKey: string, volume?: number, delay?: number, rate?: number, async?: boolean): PlaySe {
    return new PlaySe(audioKey, volume, delay, rate, async);
  }

  static choices(message: string, items: string[], resultValueKey: number, defaultValue?: number): Choices {
    return new Choices(message, items, resultValueKey, defaultValue);
  }

  static passcode(digits: number, resultValueKey: number): Passcode {
    return new Passcode(digits, resultValueKey);
  }

  static moveActor(
    actorId: number,
    x: number,
    y: number,
    velocity?: number,
    playAnim?: boolean,
    gridMoving?: boolean,
    lockDirection?: boolean,
    isAsync?: boolean,
  ): MoveActor {
    return new MoveActor(actorId, x, y, velocity, playAnim, gridMoving, lockDirection, isAsync);
  }

  static changeActorDirection(actorId: number, direction: Model.Direction, isAsync?: boolean): ChangeActorDirection {
    return new ChangeActorDirection(actorId, direction, isAsync);
  }

  static actorSpriteTint(actorId: number, color: number, duration: number, isAsync?: boolean): ActorSpriteTint {
    return new ActorSpriteTint(actorId, color, duration, isAsync);
  }

  static actorSpriteAlpha(actorId: number, alpha: number, duration: number, isAsync?: boolean): ActorSpriteAlpha {
    return new ActorSpriteAlpha(actorId, alpha, duration, isAsync);
  }

  static ending(): Ending {
    return new Ending();
  }
}
