export interface IMessageBufferFactory {
  create(message: string): string[];
}