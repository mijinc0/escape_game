import { IKeyMapping } from './IKeyMapping';

export class DefaultKeyMapping implements IKeyMapping {
  action: string;
  escape: string;
}