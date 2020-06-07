import { BitflagHelper } from './BitflagHelper';
import { INode } from '../INode';

export class NodeStatusUtil {
  static hasStatus(node: INode, status: number, recrusive = false): boolean {
    let result = BitflagHelper.has(node.status, status);

    if (recrusive) {
      const parents = node.parent ? this.hasStatus(node.parent, status, true) : false;
      result = result || parents;
    }

    return result;
  }

  static setStatus(node: INode, status: number): void {
    // 全てのフラグをすでに所持している場合には何もしない
    if (this.hasStatus(node, status)) return;

    // フラグをセットして、状態が変わったのでdirty
    node.status |= status;
    node.dirty();
  }

  static removeStatus(node: INode, status: number): void {
    // 全てのフラグを最初から持っていない場合には何もしない
    if (this.neitherStatus(node, status)) return;
    
    // フラグをおろして、状態が変わったのでdirty
    node.status &= ~status;
    node.dirty();
  }

    /**
   * 指定したフラグのいずれも持っていない場合にtrue,一つでも持っていればfalse
   * @param status 
   */
  static neitherStatus(node: INode, status: number): boolean {
    // 反転したステータスの対象のフラグが全て立っていれば全て持っていないことになる
    return BitflagHelper.has(~node.status, status);
  }

}