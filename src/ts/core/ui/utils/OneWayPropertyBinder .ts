export class OneWayPropertyBinder {
  static bind(emitter: any,　emitterProperty: string, receiver: any, receiverProperty?: string,): void {
    receiverProperty = receiverProperty ? receiverProperty : emitterProperty;

    if (!(emitterProperty in emitter) || !(receiverProperty in receiver)) {
      throw Error(`binded property should be in both emitter and receiver`);
    }

    if (typeof(emitter[emitterProperty]) != typeof (receiver[receiverProperty])) {
      throw Error('type of emitter[property] should equal receiver[property]\'s');
    }

    let currentValue = emitter[emitterProperty];

    // 最初、receiverPeopertyのgetとemitterPoerptyのgetを直接接続するやりかたで書いたが、
    // それだとreceiver側のget,setで何かしていたら挙動がおかしくなるので、こっちにした。
    // TODO : 両方に影響を与えないようにするために、Proxyを使ってちゃんと書いたほうが良いかも
    Object.defineProperty(emitter, emitterProperty, {
      get: () => {
        return currentValue;
      },
      set: (v: any) => {
        currentValue = v;
        receiver[receiverProperty] = currentValue;
      },
    });
  }
}