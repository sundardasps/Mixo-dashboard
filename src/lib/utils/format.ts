export const formatNumber = (value?: number) =>
  typeof value === "number"
    ? new Intl.NumberFormat("en-US").format(value)
    : "-";

export const formatCurrency = (value?: number) =>
  typeof value === "number"
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
      }).format(value)
    : "-";

export const formatPercentage = (value?: number) =>
  typeof value === "number" ? `${value.toFixed(2)}%` : "-";
