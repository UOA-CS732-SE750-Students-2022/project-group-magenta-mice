/**
 * Takes an object and makes any functions on that object return unknown.
 */
export type FunctionsReturnUnknown<T> = {
  [K in keyof T]: T[K] extends (...args: infer TArgs) => unknown
    ? (...args: TArgs) => unknown
    : T[K];
};

/**
 * Takes a function type that returns an object, and modifies that return type.
 * Any functions inside that record will now return unknown.
 */
export type MockController<
  T extends (...args: unknown[]) => Record<string, unknown>,
> = (...args: Parameters<T>) => FunctionsReturnUnknown<ReturnType<T>>;
