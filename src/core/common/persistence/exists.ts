export default interface Exists<F> {
  exists(f: F): Promise<boolean>;
}
