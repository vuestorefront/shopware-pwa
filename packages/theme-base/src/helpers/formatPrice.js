import currency from "currency.js";

const defaultFormatPriceOptions = {
  pattern: `# !`,
  separator: ` `,
  decimal: `,`,
  symbol: `€`,
  formatWithSymbol: true,
};

export function formatPrice(price, options) {
  if (typeof price !== "number") {
    return;
  }

  return currency(
    price,
    Object.assign(defaultFormatPriceOptions, options)
  ).format();
}
