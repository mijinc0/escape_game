export class Item {
  readonly name: string;
  readonly description: string;
  readonly iconFilePath: string;
  
  size: number;

  constructor(name: string, description: string, iconFilePath: string, size?: number) {
    this.name = name;
    this.description = description;
    this.iconFilePath = iconFilePath;
    this.size = size ? size : 0;
  }
}