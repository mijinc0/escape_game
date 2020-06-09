import { AllItems } from './AllItems';
import { GameItems as GameItemsClass } from '../core/models/GameItems';

export const GameItems = new GameItemsClass(...AllItems);