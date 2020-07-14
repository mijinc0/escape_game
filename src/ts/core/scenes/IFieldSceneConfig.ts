import { Direction } from '../models/Direction';

export interface IFieldSceneConfig {
  fieldId: number;

  heroX: number;

  heroY: number;

  heroDirection: Direction;
}