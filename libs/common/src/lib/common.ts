/**
 * Takes an object and makes any functions on that object return unknown.
 */
export type FunctionsReturnUnknown<T> = {
  [K in keyof T]: T[K] extends (...args: infer TArgs) => unknown
    ? (...args: TArgs) => unknown
    : T[K];
};

/**
 * Makes all types in a tuple optional
 */
export type MakeOptional<TTuple extends unknown[]> = TTuple extends []
  ? []
  : TTuple extends [infer THead, ...infer TTail]
  ? [THead | undefined, ...MakeOptional<TTail>]
  : TTuple;

/**
 * Takes a function type that returns an object, and modifies that return type.
 * Any functions inside that record will now return unknown.
 */
export type MockController<T> = T extends (
  ...args: infer TArgs
) => Record<string, unknown>
  ? (...args: MakeOptional<TArgs>) => FunctionsReturnUnknown<ReturnType<T>>
  : unknown;
