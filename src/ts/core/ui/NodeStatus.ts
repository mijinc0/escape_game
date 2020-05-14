export enum NodeStatus {
  Active = 0x00000001,

  // 有効か
  Disable = 0x00000002,

  // 隠すか
  Invisible = 0x00000004,
  
  // そのコンポーネント上にセレクタが載っているか
  On = 0x00000008,
  
  // そのコンポーネントが選択されているか
  Select = 0x00000010,
}