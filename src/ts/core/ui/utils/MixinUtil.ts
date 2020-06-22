export class MixinUtil {
  static apply(derivedCtor: any, baseCtors: any[], exceptProperties?: string[]) {
    exceptProperties = exceptProperties ? exceptProperties : [];

    baseCtors.forEach((baseCtor: any) => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach((property: string) => {
        if (exceptProperties.includes(property)) return;

        Object.defineProperty(derivedCtor.prototype, property, Object.getOwnPropertyDescriptor(baseCtor.prototype, property));
      });
    });
  }
}