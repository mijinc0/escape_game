// groupを中心にして組んだ場合(こっちを採用)
// - 再帰的な構造はしない
// - 基本はselectorのみをupdateさせていって、他は組んでおいておくだけ
// - メニューだけのシーンを別で作るならselectorのupdateも良さそうだけど...
// - イベントバブリングみたいなのは作りにくいと思ったほうが良さげ
// - シンプルなのでこっちで良いか
// - コンポーネントはグループで作る(factroyがアレばいいやろ)
// - グループと言うよりむしろコンポーネントを作りたい

const basePosition = scene.cameras.worldView();
const ui = new UiFactory(scene, basepoint);

const mainMenu = ui.add.group({x: 10, y: 10, maxSize: 5, align: 'down', });
const selector = ui.add.selector({keys: input.keys, initGroup: mainMenu});

const itemButton = new UiButton({
  text: 'item',
  width: 160,
  height: 48,
  backgroundColor: 0x000000,
  backgroundAlpha: 0.5,
  select: (button: IElement, selector: ISelector) => {
    // コンポーネントを作れるようにする
    const itemList = new ItemList();
    const itemDescribe = new ItemDescribe();

    // データバインディングの方法はコレでOK
    OneWayPropertyBinder.bind(itemList, itemDescribe, 'currentItem');

    // キャンセル時の破壊はコレがよくね。(defaultはnull)
    selector.setGroup({group: itemList, destroyIfCanceled: itemMenuContents});
  },
});

update(frame): void {
  selector.update(frame);
}

class Button extends ElementGroup {

  rectangleObject: Phaser.GameObjects.GameObject;
  textObject: Phaser.GameObjects.GameObject;
}

class ItemList extends ElementGroup {

}