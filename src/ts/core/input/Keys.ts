import * as Phaser from 'phaser';
import { ICursorKeys } from './ICursorKeys';

export class Keys {
  constructor (
    public readonly cursors: ICursorKeys,
    public readonly action: Phaser.Input.Keyboard.Key,
    public readonly cancel: Phaser.Input.Keyboard.Key,
  ) {}
}