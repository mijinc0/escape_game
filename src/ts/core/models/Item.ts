export class Item {
  readonly id: number;

  readonly name: string;

  readonly description: string;
  
  readonly iconFilePath: string;
  
  size: number;

  constructor(id: number, name: string, description: string, iconFilePath: string, size?: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.iconFilePath = iconFilePath;
    this.size = size ? size : 0;
  }
}