import { INode } from '../INode';
import { Direction } from '../Direction';
import { IAlignmentStrategy } from './IAlignmentStrategy';
import { Position } from '../../models/Position';

export class TableAlignmentStrategy implements IAlignmentStrategy {
  // 行サイズ(一行にノードが何個入るか)
  private rowSize: number;
  // ノード間の間隔(px)
  private margin: Position;

  constructor (
    rowSize: number,
    marginX: number,
    marginY: number,
  ) {
    this.rowSize = rowSize;
    this.margin = {x: marginX, y: marginY};
  }

  align(parentNode: INode): void {
    const baseX = parentNode.position.x;
    const baseY = parentNode.position.y;

    parentNode.children.forEach((node: INode, index: number) => {
      const nextPosition = this._getNodePosition(
        baseX,
        baseY,
        index,
        parentNode.children
      );

      node.setPosition(nextPosition.x, nextPosition.y);
    });
  }

  getNextNodeIndex(index: number, direction: Direction): number {
    switch (direction) {
      case Direction.Down :
        return index + this.rowSize;
    
      case Direction.Right :
        return index + 1;
    
      case Direction.Left :
        return index - 1;
    
      case Direction.Up :
        return index - this.rowSize;
    }
  }

  private _getNodePosition(
    baseX: number,
    baseY: number,
    index: number,
    nodes: INode[],
  ): Position {
    if (index < 0 || index >= nodes.length) throw Error(`illegal node index : ${index}`);

    // 何行目か
    const rowCount = Math.floor(index / this.rowSize);

    // 一つ上の行の底のy座標を取る(これがyの基準)
    const y = this._getBottomOfRow(nodes, rowCount - 1, baseY);

    // 一つ手前のノードの右端のx座標を取る(ただし自分が行の先頭ならbaseXになる)
    // (最初に index === 0 のパターンは切ってあるので nodes[index - 1] はundefinedにならない)
    const rowIndex = index % this.rowSize;
    const x = (rowIndex === 0) ? baseX : nodes[index - 1].getRight(); 

    return {
      x: rowIndex === 0 ? x : x + this.margin.x,
      y: rowCount === 0 ? y : y + this.margin.y,
    };
  }

  private _getBottomOfRow(nodes: INode[], rows: number, baseY: number): number {
    // 自身が一番上の行の場合はbaseY
    if (rows < 0) return baseY;
  
    // それ以外は一つ上の行の中で一番heightがあるNodeの底
    const upperNodesStartIndex = rows * this.rowSize;
    const upperNodes = nodes.slice(upperNodesStartIndex, upperNodesStartIndex + this.rowSize);

    const nodeBottoms = upperNodes.map((node: INode) => (node.getBottom()));

    return Math.max(...nodeBottoms);
  }
}
