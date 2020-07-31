import * as Locales from '../../core/locales';
import { GameItemIds as id } from '../../items/GameItemIds';

const items = new Locales.ItemTexts(
  {
    id: id.KeyRoomA,
    name: '最初の部屋の鍵',
    description: '主人公が最初に目覚めた部屋のドアの鍵',
  },

  {
    id: id.KeyRoomBC,
    name: '1階西側部屋の鍵',
    description: '1階西(左側)廊下の2部屋の鍵',
  },

  {
    id: id.KeyRoomE,
    name: '2階南側部屋の鍵',
    description: '2階廊下の南側(下側)部屋の鍵',
  },

  {
    id: id.KeyRoomFG,
    name: '2階北側部屋の鍵',
    description: '2階廊下の北側(上側)2部屋の鍵',
  },

  {
    id: id.KeyStoreroom,
    name: '2階倉庫の鍵',
    description: '2階廊下つきあたりにある倉庫の鍵',
  },

  {
    id: id.KeyRoomD,
    name: '1階東側部屋の鍵',
    description: '1階東(右側)廊下の部屋の鍵',
  },

  {
    id: id.Hammer,
    name: 'ハンマー',
    description: '普通の金槌。小さいものであれば割ることが出来そう。',
  },

  {
    id: id.Lighter,
    name: 'ライター',
    description: 'オイルを注げるタイプのライター。油が無くなっているようでこれだけでは火がつかない。',
  },

  {
    id: id.LighterOil,
    name: 'ライターオイル',
    description: 'ライターのオイル',
  },

  {
    id: id.BlokenDish,
    name: '割れたお皿',
    description: '割れた面が鋭利で危ない。柔らかいものであれば切ったり穴を開けることが出来そう。',
  },

  {
    id: id.RoomGSafetyboxKey,
    name: '金庫の鍵',
    description: '2階北東の部屋の金庫の鍵',
  },
);

export default items;