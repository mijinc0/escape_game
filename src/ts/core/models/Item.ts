export class Item {
  readonly id: number;

  name: string;

  description: string;

  readonly iconImageKey: string;

  size: number;

  constructor(id: number, name: string, description: string, iconImageKey: string, size?: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.iconImageKey = iconImageKey;
    this.size = size ? size : 0;
  }
}
