export class MathUtil {
  static clamp(v: number, max: number, min: number): number {
    return Math.max(min, Math.min(max, v));
  }

  static mod(a: number, n: number) {
    return (n - a) % n;
  }
}
