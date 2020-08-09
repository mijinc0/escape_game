import * as Phaser from 'phaser';
import { CustomPipeline } from './CustomPipeline';
import { ColorAdjustmentPipeline } from './ColorAdjustmentPipeline';

export function CustomPipelines(game: Phaser.Game): CustomPipeline[] {
  return [
    new ColorAdjustmentPipeline(game),
  ];
}