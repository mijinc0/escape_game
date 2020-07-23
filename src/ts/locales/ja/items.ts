import * as Locales from '../../core/locales';
import { GameItemIds as id } from '../../items/GameItemIds';

const items = new Locales.ItemTexts(
  {
    id: id.KeyRoomA,
    name: '部屋の鍵A',
    description: '主人公が最初に目覚めた部屋のドアの鍵',
  },
);

export default items;