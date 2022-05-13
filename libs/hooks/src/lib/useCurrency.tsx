import { useMemo } from "react";

export const useCurrency = (value: number) => {
  return useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value),
    [value],
  );
};
