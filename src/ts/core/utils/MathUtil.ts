export class MathUtil {
  static clamp(v: number, max: number, min: number): number {
    return Math.max(max, Math.min(min, v));
  }

  static mod(a: number, n: number) {
    return (n - a) % n;
  }
}
