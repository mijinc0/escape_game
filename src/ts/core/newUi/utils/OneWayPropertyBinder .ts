class OneWayPropertyBinder {
  static bind(emitter: any, receiver: any, property: string): void {
    if (!(property in emitter) || !(property in receiver)) {
      throw Error(`"${property}" should be in both emitter and receiver`);
    }

    if (typeof(emitter[property]) != typeof (receiver[property])) {
      throw Error('type of emitter[property] should equal receiver[property]\'s');
    }

    let currentValue = emitter[property];

    Object.defineProperty(emitter, property, {
      get: () => {
        return currentValue;
      },
      set: (v: any) => {
        currentValue = v;
      },
    });

    Object.defineProperty(receiver, property, {
      get: () => {
        return currentValue;
      },
      set: (v: any) => {
        throw Error(`using setter of ${property} is forbidden`);
      },
    });
  }
}