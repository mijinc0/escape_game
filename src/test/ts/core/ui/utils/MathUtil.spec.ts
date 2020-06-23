import 'mocha';
import { expect } from 'chai';
import { MixinUtil } from '../../../../../ts/core/ui/utils/MixinUtil';

class BaseClass {
  constructor(
    public baseA = 100,
    public baseB = 200,
  ) {}
}

class ComponentClass {
  componentA(): void {}

  get componentB(): number {
    return 1;
  }

  set componentB(v: number) {}
  
  componentC(): void {}
}

MixinUtil.apply(
  BaseClass,
  [ComponentClass],
  ['componentC'],
);

describe('MixinUtil.apply', () => {
  context('normal', () => {
    const baseClassInstance = new BaseClass();

    it('instance of BaseClass has "baseA"', async () => {
      expect(baseClassInstance).has.property('baseA');
    });

    it('instance of BaseClass has "baseB"', async () => {
      expect(baseClassInstance).has.property('baseB');
    });

    it('instance of BaseClass has "componentA" as property', async () => {
      expect(baseClassInstance).has.property('componentA');
    });

    it('instance of BaseClass has "componentB" as property', async () => {
      expect(baseClassInstance).has.property('componentB');
    });

    it('instance of BaseClass does not have "componentC" as property', async () => {
      expect(baseClassInstance).does.not.have.property('componentC');
    });
  });
});