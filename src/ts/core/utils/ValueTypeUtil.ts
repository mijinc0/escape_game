export class ValueTypeUtil {
  static isObjectArray(value: any): value is object[] {
    if (!(value instanceof Array)) return false;

    const results = value.map((el: any) => typeof el === 'object');
    return !results.includes(false);
  }

  static isNumberArray(value: any): value is number[] {
    if (!(value instanceof Array)) return false;

    const results = value.map((el: any) => typeof el === 'number');
    return !results.includes(false);
  }

  static isNumber(value: any): value is number {
    return typeof value === 'number';
  }

  static isString(value: any): value is string {
    return typeof value === 'string';
  }

  static isBoolean(value: any): value is string {
    return typeof value === 'boolean';
  }
}
