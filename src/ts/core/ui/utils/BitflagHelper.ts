export class BitflagHelper {
  /**
   * 
   * @param flagField 
   * @param flag 
   * @return boolean フラグが立っていればtrue、そうでなければfalse
   */
  static has(flagField: number, flag: number): boolean {
    this._checkFlags(flagField);
    this._checkFlags(flag);
    return (flagField & flag) === flag;
  }

  static up(flagField: number, flag: number): number {
    this._checkFlags(flagField);
    this._checkFlags(flag);
    return flagField | flag;
  }

  static down(flagField: number, flag: number): number {
    this._checkFlags(flagField);
    this._checkFlags(flag);
    const mask = ~flag;
    return flagField & mask;
  }
  
  /* private */
  private static _checkFlags(flags: number): void {
    if (flags > 0xffffffff) throw Error('bitflags size is too big (max 32bit)');
  }
}