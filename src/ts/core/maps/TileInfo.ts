export class TileInfo {
  readonly id: number;
  readonly collide: boolean;

  constructor(id: number, collide: boolean) {
    this.id = id;
    this.collide = collide;
  }
}
