// こんな感じでUIを作っていきたいという最終型
/**
 * - イベントの登録が対象でなくてはならないと実装が複雑で面倒な問題は、イベントバブリング(イベントの伝搬)を実装すれば良い
 * - セレクタの管理コンテナの切り替えは、セレクタ自身がツリーを探査してコンテナを発見すればよい(Element側に実装を入れない)
 *
 */

const root = new RootNode();

root.align = 'center';
root.x = scene.cameras.main.worldView.x;
root.y = scene.cameras.main.worldView.y;

const menuMainBox = root.add.box({x: 10, y: 10, width: 400, height: 400});
const mainWindow = root.add.box({x: 410, y: 10, width: 400, height: 400});

const mainMenu = menuMainBox.add.container({x: 10, y: 10, width: 160, height: 380, align: 'down', margin: 10});

const itemButton = mainMenuContainer.add.button({
  width: 160,
  height: 40,
  text: 'items',
  select: (itemButton: IElement, selector: ISelector) => {
    const itemList = new ItemList({items: GameGlobal.ownItems, x: 10, y: 0, width: 100, height: 300});
    mainWindow.add.existing(itemList);
    
    const itemDescribe = new ItemDescribe({x: 100, y: 100, widht: 100, height: 400});
    mainWindow.add.existing(itemDescribe);
  
    // 同じ名前のフィールドをバインドさせる(一方向バインド。双方向はクソコードを生みそうなので不要)
    PropertyBinder.bind(itemList, itemDescribe, 'currentItem');
  
    // セレクタの管理対象がItemListに変わる
    // セレクタのキャンセルイベントが発生した時に戻る位置は、セレクタの中に保存する
    // (配列でスタックを作って取り出す)
    selector.setContainer({container: itemList, destroyIfCanceled: [itemList, itemDescribe]});
  },
});

class ItemList extends ArrayMapContainer<Item> {
  currentItem: Item;

  constructor(items: Item[]) {
    super(items);

    this.currentItem = null;
    this.elementFactoryCallback = this._createItemListElement.bind(this);
  }

  private _createItemListElement(item: Item): UiElement {
    const itemListElement = new ItemListElement(item);

    itemListElement.addSelectorOverEvent(() => {
      this.currentItem = item;
    });
  }
}


class RootNode extends Node {
  readonly parent = null;

  selector = new DefaultElementSelector();

  update(frame: number) {
    this.selector.update(frame);
  }

  addCloseEvent(): void {

  }

  close(): void {

  }
}