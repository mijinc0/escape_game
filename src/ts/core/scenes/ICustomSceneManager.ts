import { IFieldScene } from './IFieldScene';
import { IUiScene } from './IUiScene';

export interface ICustomSceneManager {
  field: IFieldScene|null;

  ui: IUiScene|null;
}