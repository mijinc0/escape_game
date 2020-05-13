import * as Phaser from 'phaser';

export class Keys {
  constructor (
    public readonly cursors: Phaser.Types.Input.Keyboard.CursorKeys,
    public readonly action: Phaser.Input.Keyboard.Key,
  ) {}
}