export interface Element {
  update(frame?: number): void;

  destroy(): null;
}